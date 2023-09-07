import axios from "axios"

const news = axios.create({baseURL: 'https://chrisl-nc-news-project.onrender.com/api'})

export async function getArticles(page, topic, sort_by, order) {
    let url = `/articles?`
    if (topic) url += `topic=${topic}&`
    if (sort_by) url += `sort_by=${sort_by}&`
    if (order) url += `order=${order}&`
    if (page) url += `p=${page}`
    const { data: { articles }} = await news.get(url)
    return articles
}

export async function getArticleById(id) {
    const { data: { article }} = await news.get(`/articles/${id}`)
    return article
}

export async function getTopics () {
    const { data: { topics }} = await news.get(`/topics`)
    return topics
}

export async function getCommentsForArticle (id, page) {
    const { data: { comments }} = await news.get(`/articles/${id}/comments?p=${page}`)
    return comments
}

export async function patchArticle (id, vote) {
    const { data: { article }} = await news.patch(`articles/${id}`, { inc_votes: vote })
    return article
}

export async function postComment (id, newComment) {
    const { data: { comment } } = await news.post(`/articles/${id}/comments`, newComment)
    return comment
}