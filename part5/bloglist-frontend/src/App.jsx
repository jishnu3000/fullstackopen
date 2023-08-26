import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification  from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [info, setInfo] = useState({ message: null})
  const blogFormRef = useRef()

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

  const notifyWith = (message, type='info') => {
    setInfo({
      message, type
    })

    setTimeout(() => {
      setInfo({ message: null} )
    }, 3000)
  }

  const cleanLoginForm = () => {
    setUsername('')
    setPassword('')
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      console.log(exception.response.data.error)
      notifyWith('wrong username or password', 'error')
    }
    cleanLoginForm()
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    setUser(null)
  }

  const addNewBlog = async (blogObject) => {
    try {
      const createdBlog = await blogService.create(blogObject)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(createdBlog))
      notifyWith(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
    } catch (exception) {
      console.log(exception);
    }
  }

  const updateLikes = async (id, blogObject) =>{
    const newBlog = {
      ...blogObject,
      likes: blogObject.likes + 1
    }
    try {
      await blogService.update(id, newBlog)
    } catch (exception) {
      console.log(exception);
    }
    setBlogs(blogs.map(blog => blog.id !== blogObject.id ? blog : newBlog))
  } 
 
  return (
    <div>
      { user === null ? 
        <div>
          <h2>log in to application</h2>
          <Notification info={info} />
          <LoginForm handleSubmit={handleLogin} 
            name={username} handleName={({ target }) => setUsername(target.value)} 
            pwd={password} handlePwd={({ target }) => setPassword(target.value)}
          />
        </div> :
        <div>
          <h2>blogs</h2>
          <Notification info={info} />
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <h2>create new</h2>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm handleSubmit={addNewBlog} />
          </Togglable>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} userName={user.name} likeButton={updateLikes} />
          )}
        </div> 
      }
    </div>
  )
}

export default App