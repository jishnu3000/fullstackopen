import { useState } from "react"

const BlogForm = ({ handleSubmit }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        handleSubmit({
            title: title,
            author: author,
            url: url
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    title: <input type="text" value={title} onChange={({ target }) => setTitle(target.value)}/>
                </div>
                <div>
                    author: <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)}/>
                </div>
                <div>
                    url: <input type="text" value={url} onChange={({ target }) => setUrl(target.value)}/>
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm