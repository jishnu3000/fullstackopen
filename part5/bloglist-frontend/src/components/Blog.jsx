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
    <div className='blog' style={blogStyle}>
      <div className='title-author'>
        {blog.title} {blog.author} <button onClick={toggleShow}>{ show ? 'hide' : 'view' }</button>
      </div>
      { show ?
        <div className='details'>
          <div className='url'>
            {blog.url}
          </div>
          <div className='likes'>
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