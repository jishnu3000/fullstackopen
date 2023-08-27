import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> calls the event handler with the correct details', async () => {
  const mockHandler = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm handleSubmit={mockHandler} />)

  const titleInput = screen.getByPlaceholderText('enter title')
  const authorInput = screen.getByPlaceholderText('enter author')
  const urlInput = screen.getByPlaceholderText('enter url')
  const createButton = screen.getByText('create')

  await user.type(titleInput, 'Blog Title')
  await user.type(authorInput, 'Blog Author')
  await user.type(urlInput, 'www.blogurl.com')
  await user.click(createButton)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe('Blog Title')
  expect(mockHandler.mock.calls[0][0].author).toBe('Blog Author')
  expect(mockHandler.mock.calls[0][0].url).toBe('www.blogurl.com')
})