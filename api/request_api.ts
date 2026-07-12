import { Fantasy, News, NewsResponse } from "@/types/interface";

// const URL_CSAPI = "https://api.csapi.de";
// const URL_NEWSAPI = `https://gnews.io/api/v4/search?q=%22Counter-Strike%22&lang=ru&apikey=${process.env.URL_NEWSAPI_KEY}`;

// export async function Request_fantasy_CSAPI() {
//   const respons = await fetch(`${URL_CSAPI}/fantasy/`);
//   const data: Fantasy[] = await respons.json();
//   // console.log(data)
//   return data;
// }

export async function Request_news_NEWSAPI(numberPage : number=1) {
  const respons = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news?pageSize=5&page=${numberPage}`);  //q=+CS2+tournament&language=en&sortBy=popularity&
  const data: NewsResponse = await respons.json();
  // console.log(data);
  return {articles: data.articles, totalResults: data.totalResults};
}



export async function getTournaments() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tournaments`);
  if (!res.ok) throw new Error('Failed to fetch tournaments');
  return res.json();
}



