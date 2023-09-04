import axios from "axios"

const news = axios.create({baseURL: 'https://chrisl-nc-news-project.onrender.com/api'})

export async function getArticles(page) {
    let url = `/articles`
    if (page) url += `?p=${page}`
    try {
        const { data: { articles }} = await news.get(url)
        return articles
    } catch (err) {
        return err.response.data.msg
    }
}