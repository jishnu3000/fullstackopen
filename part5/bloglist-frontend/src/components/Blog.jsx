import { useState } from 'react'

const Blog = ({ blog, likeButton, removeButton, userId }) => {
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
            likes {blog.likes} <button onClick={() => likeButton(blog.id, blog)}>like</button>
          </div>
          <div>
            {blog.user.name}
          </div>
          { blog.user.id === userId ?
            <div>
              <button onClick={() => removeButton(blog.id)}>remove</button>
            </div> :
            null
          }
        </div> :
        null
      }
    </div>
  )
}

export default Blog