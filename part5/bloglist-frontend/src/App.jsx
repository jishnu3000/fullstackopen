import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    const getData = async () => {
      if (user) {
        const data = await blogService.getAll()
        setBlogs(data) 
      }
    }

    getData().catch(error => console.log(error))
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception);
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    setUser(null)
  }

  const addNewBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    try {
      const createdBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(createdBlog))
    } catch (exception) {
      console.log(exception);
    }
    setTitle('')
    setAuthor('')
    setUrl('')
  }
 
  return (
    <div>
      { user === null ? 
        <div>
          <h2>log in to application</h2>
          <LoginForm handleSubmit={handleLogin} 
            name={username} handleName={({ target }) => setUsername(target.value)} 
            pwd={password} handlePwd={({ target }) => setPassword(target.value)}
          />
        </div> :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <h2>create new</h2>
          <BlogForm handleSubmit={addNewBlog}
            title={title} handleTitle={({ target }) => setTitle(target.value)}
            author={author} handleAuthor={({ target }) => setAuthor(target.value)}
            url={url} handleUrl={({ target }) => setUrl(target.value)}
          />
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div> 
      }
    </div>
  )
}

export default App