import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  id: 'testblog1',
  title: 'Test Blog 1',
  author: 'Test Author ',
  url: 'www.testblog1.com',
  likes: 1,
  user: {
    id: 'jishnu100',
    username: 'jishnu2',
    name: 'Jishnu J'
  }
}

test('renders title and author, but not URL or number of likes by default', () => {
  const { container } = render(<Blog blog={blog} userId={'jishnu100'} />)

  const divTitle = container.querySelector('.titleAuthor')
  expect(divTitle).toHaveTextContent('Test Blog 1')

  const divDetails = container.querySelector('.details')
  expect(divDetails).toBeNull()
})

test('URL and number of likes are shown when the "show" button is clicked', async () => {
  const { container } = render(<Blog blog={blog} userId={'jishnu100'} />)

  const divDetails = container.querySelector('.details')
  expect(divDetails).toBeNull()

  const user = userEvent.setup()
  const showButton = screen.getByText('view')
  await user.click(showButton)

  const divUrl = container.querySelector('.url')
  expect(divUrl).toHaveTextContent('www.testblog1.com')

  const divLikes = container.querySelector('.likes')
  expect(divLikes).toHaveTextContent('likes 1')
})

test('if the "like" button is clicked twice, the received event handler is called twice', async () => {
  const mockHandler = jest.fn()

  render(<Blog blog={blog} likeButton={mockHandler} userId={'jishnu100'} />)

  const user = userEvent.setup()

  const showButton = screen.getByText('view')
  await user.click(showButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})