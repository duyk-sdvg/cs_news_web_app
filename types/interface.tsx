export interface Fantasy {
  id: number;
  name: string;
}

export interface Maps {
  id: number;
  name: string;
  team1_score: number;
  team2_score: number;
}

export interface Matches {
  id: number;
  date: string;
  team1: {
    id: number;
    name: string;
    score: number | null;
  };
  team2: {
    id: number;
    name: string;
    score: number | null;
  };
  best_of: number | null;
  maps: Maps[];
  winner: {
    id: number;
    name: string;
  } | null;
}

export interface Tournament {
  tournament_name: string;
  matches: Matches[];
  tournament_winner: {
    id: number;
    name: string;
    last_match_date: string;
    last_match_id: number;
  } | null; //у данных с апи может быть победителя в турнире (бред)
}

export interface News {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}
export interface NewsResponse {
  articles: News[];
}
