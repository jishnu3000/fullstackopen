import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

export const getAll = () =>
  axios.get(baseUrl).then(res => res.data)

export const create = content => {
  if (content.length < 5) {
    return Promise.reject('too short anecdote, must have length 5 or more')
  }
  const newAnecdote = {
    content: content,
    id: getId(),
    votes:0
  }
  return axios.post(baseUrl, newAnecdote).then(res => res.data)
}

export const update = updatedAnecdote => 
  axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote).then(res => res.data)