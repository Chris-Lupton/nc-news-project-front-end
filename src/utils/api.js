import axios from "axios"

const news = axios.create({baseURL: 'https://chrisl-nc-news-project.onrender.com/api'})

export async function getArticles(page, topic) {
    let url = `/articles?`
    if (topic) url += `topic=${topic}&`
    if (page) url += `p=${page}&`
    try {
        const { data: { articles }} = await news.get(url)
        return articles
    } catch (err) {
        return err.response.data.msg
    }
}

export async function getArticleById(id) {
    try {
        const { data: { article }} = await news.get(`/articles/${id}`)
        return article
    } catch (err) {
        return err.response.data.msg
    }
}

export async function getTopics () {
    try {
        const { data: { topics }} = await news.get(`/topics`)
        return topics
    } catch (err) {
        return err.response.data.msg
    }
}

export async function getCommentsForArticle (id, page) {
    try {
        const { data: { comments }} = await news.get(`/articles/${id}/comments?p=${page}`)
        return comments
    } catch (err) {
        return err.response.data.msg
    }
}