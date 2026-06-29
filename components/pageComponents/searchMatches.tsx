"use client";

import { Tournament } from "@/types/interface";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Loupe({ tournaments }: { tournaments: Tournament[] }) {
  const [query, setQuery] = useState("");
  const [isOpen, SetIsOpen] = useState(false);

  const refDiv = useRef<HTMLDivElement>(null);

  //   console.log(refDiv.current)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (refDiv.current && !refDiv.current.contains(e.target as Node))
        SetIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = tournaments.filter((t) =>
    t.tournament_name.toLowerCase().includes(query.toLowerCase()),
  );
  //   console.log(filtered)

  return (
    <div ref={refDiv} className="absolute rounded-2xl right-114 top-4 ">
      <input
        placeholder="Поиск турнира..."
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          SetIsOpen(true);
        }}
        className="bg-cs-bg-card border-2 border-cs-bg-border rounded-2xl outline-none px-2"
      />
      {isOpen && query && (
        <div className="absolute overflow-y-auto max-h-60 custom-scroll">
          {filtered.length === 0 ? (
            <div className="bg-cs-danger">Ничего нет</div>
          ) : (
            filtered.map((t) => (
              <Link
                className="flex flex-col min-w-max bg-cs-bg-deep hover:bg-cs-muted p-2"
                href={`/matches/${t.tournament_winner?.last_match_id}`}
                key={t.tournament_name}
                onClick={() => setQuery("")}
              >
                {t.tournament_name.length > 38
                  ? t.tournament_name.slice(0, 38) + "..."
                  : t.tournament_name}
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
