const BlogForm = ({ handleSubmit, title, handleTitle, author, handleAuthor, url, handleUrl }) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    title: <input type="text" value={title} onChange={handleTitle}/>
                </div>
                <div>
                    author: <input type="text" value={author} onChange={handleAuthor}/>
                </div>
                <div>
                    url: <input type="text" value={url} onChange={handleUrl}/>
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm