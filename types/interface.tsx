export interface Fantasy {
  id: number;
  name: string;
}


export interface News {
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  source: {
    name: string
  }
}
export interface NewsResponse {
  articles: News[]
}