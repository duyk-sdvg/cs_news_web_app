import {Fantasy, News, NewsResponse} from "@/types/interface"

const URL_CSAPI = "https://api.csapi.de"
const URL_NEWSAPI = `https://gnews.io/api/v4/search?q=%22Counter-Strike%22&lang=ru&apikey=${process.env.URL_NEWSAPI_KEY}`



export async function Request_fantasy_CSAPI(){

    const respons = await fetch(`${URL_CSAPI}/fantasy/`)
    const data : Fantasy[] = await respons.json()
    // console.log(data)
    return data

}

export async function Request_news_NEWSAPI() {
    const respons = await fetch(URL_NEWSAPI, { cache: 'no-store' })
    const data : NewsResponse = await respons.json()
    console.log(data)
    return data.articles
    
}