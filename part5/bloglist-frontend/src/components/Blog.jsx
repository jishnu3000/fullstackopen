import { useState } from "react"

const Blog = ({ blog, userName }) => {
  const [show, setShow] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleShow = (event) => {
    event.preventDefault()
    setShow(!show)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleShow}>{ show ? 'hide' : 'view' }</button>
      </div>
      { show ? 
        <div>
          <div>
            {blog.url}
          </div>
          <div>
            likes {blog.likes} <button>like</button>
          </div>
          <div>
            {userName}
          </div>
        </div> :
        null
      }
    </div>
  )
}

export default Blog