"""
hltv_tournaments.py
-------------------
Агрегирует данные о турнирах из HLTV API (https://api.csapi.de).

Использование:
    python hltv_tournaments.py
    python hltv_tournaments.py --limit 500          # взять больше матчей
    python hltv_tournaments.py --event "IEM"        # фильтр по названию турнира
    python hltv_tournaments.py --output result.json # сохранить в файл
"""

import argparse
import json
import sys
from collections import defaultdict
from typing import Optional

import requests

BASE_URL = "https://api.csapi.de"


def fetch_all_matches(limit: int = 200, offset: int = 0) -> list[dict]:
    """Получает матчи с пагинацией."""
    all_matches = []
    print(f"[→] Загрузка матчей (всего запрошено: {limit})...")

    while len(all_matches) < limit:
        batch = min(100, limit - len(all_matches))
        url = f"{BASE_URL}/matches/"
        resp = requests.get(url, params={"limit": batch, "offset": offset}, timeout=15)
        resp.raise_for_status()
        data = resp.json()

        if not data:
            break

        all_matches.extend(data)
        offset += len(data)

        if len(data) < batch:
            break  # дошли до конца

    print(f"[✓] Загружено матчей: {len(all_matches)}")
    return all_matches


def fetch_match_detail(match_id: int) -> Optional[dict]:
    """Получает детали конкретного матча (карты, победитель)."""
    url = f"{BASE_URL}/matches/{match_id}"
    try:
        resp = requests.get(url, timeout=15)
        resp.raise_for_status()
        return resp.json()
    except requests.HTTPError:
        return None


def determine_winner(match: dict) -> Optional[dict]:
    """
    Определяет победителя матча.
    Сначала смотрим поле winner, потом сравниваем счёт team1/team2.
    """
    # Прямое поле winner
    if match.get("winner"):
        return match["winner"]

    team1 = match.get("team1")
    team2 = match.get("team2")
    if not team1 or not team2:
        return None

    score1 = team1.get("score", 0) or 0
    score2 = team2.get("score", 0) or 0

    if score1 > score2:
        return {"id": team1["id"], "name": team1["name"]}
    if score2 > score1:
        return {"id": team2["id"], "name": team2["name"]}
    return None  # ничья / неизвестно


def build_tournament_data(
    matches: list[dict],
    fetch_details: bool = True,
    event_filter: Optional[str] = None,
) -> dict:
    """
    Группирует матчи по турнирам и вычисляет победителя каждого турнира
    как команду с наибольшим числом побед внутри него.
    """
    # { event_name: { matches: [...] } }
    tournaments: dict[str, dict] = defaultdict(lambda: {"matches": []})

    for raw in matches:
        event_name: str = raw.get("event") or "Unknown"

        if event_filter and event_filter.lower() not in event_name.lower():
            continue

        match_id = raw["id"]
        detail = fetch_match_detail(match_id) if fetch_details else raw
        if detail is None:
            detail = raw

        winner = determine_winner(detail)

        match_entry = {
            "id": match_id,
            "date": detail.get("date"),
            "team1": {
                "id": detail.get("team1", {}).get("id"),
                "name": detail.get("team1", {}).get("name"),
                "score": detail.get("team1", {}).get("score"),
            },
            "team2": {
                "id": detail.get("team2", {}).get("id"),
                "name": detail.get("team2", {}).get("name"),
                "score": detail.get("team2", {}).get("score"),
            },
            "maps": detail.get("maps", []),
            "best_of": detail.get("best_of"),
            "winner": winner,
        }

        tournaments[event_name]["matches"].append(match_entry)

    # Финальная сборка результата
    result: dict[str, dict] = {}
    for event_name, data in tournaments.items():
        # Победитель турнира — победитель самого позднего матча по дате
        tournament_winner = None
        matches_with_winner = [m for m in data["matches"] if m["winner"] and m["date"]]
        if matches_with_winner:
            last_match = max(matches_with_winner, key=lambda m: m["date"])
            tournament_winner = {
                "id": last_match["winner"]["id"],
                "name": last_match["winner"]["name"],
                "last_match_date": last_match["date"],
                "last_match_id": last_match["id"],
            }

        result[event_name] = {
            "tournament_name": event_name,
            "matches": data["matches"],
            "tournament_winner": tournament_winner,
        }

    return result


def main():
    parser = argparse.ArgumentParser(description="Агрегатор турниров HLTV API")
    parser.add_argument(
        "--limit", type=int, default=200,
        help="Сколько матчей загрузить (по умолчанию 200)"
    )
    parser.add_argument(
        "--event", type=str, default=None,
        help="Фильтр по названию турнира (частичное совпадение)"
    )
    parser.add_argument(
        "--output", type=str, default=None,
        help="Путь к JSON-файлу для сохранения результата"
    )
    parser.add_argument(
        "--no-details", action="store_true",
        help="Не запрашивать детали каждого матча (быстрее, меньше данных)"
    )
    args = parser.parse_args()

    try:
        matches = fetch_all_matches(limit=args.limit)
    except requests.RequestException as e:
        print(f"[✗] Ошибка при получении матчей: {e}", file=sys.stderr)
        sys.exit(1)

    if not matches:
        print("[!] Матчей не найдено.")
        sys.exit(0)

    fetch_details = not args.no_details
    if fetch_details:
        print(f"[→] Запрос деталей для {len(matches)} матчей (может занять время)...")

    tournaments = build_tournament_data(
        matches,
        fetch_details=fetch_details,
        event_filter=args.event,
    )

    if not tournaments:
        print("[!] Турниры не найдены (возможно, фильтр слишком строгий).")
        sys.exit(0)

    # Вывод сводки
    print(f"\n{'─' * 60}")
    print(f"  Найдено турниров: {len(tournaments)}")
    print(f"{'─' * 60}")
    for name, t in sorted(tournaments.items()):
        w = t["tournament_winner"]
        winner_str = f"{w['name']} (финал {w['last_match_date']})" if w else "неизвестен"
        print(f"  🏆 {name}")
        print(f"     Матчей: {len(t['matches'])}  |  Победитель: {winner_str}")
    print(f"{'─' * 60}\n")

    if args.output:
        with open(args.output, "w", encoding="utf-8") as f:
            json.dump(tournaments, f, ensure_ascii=False, indent=2)
        print(f"[✓] Результат сохранён в: {args.output}")
    else:
        print(json.dumps(tournaments, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()