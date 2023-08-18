const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    
    await Promise.all(promiseArray)
}, 100000)

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 100000)

test('all blogs have returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 100000)

test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    const body = response.body

    expect(body[0].id).toBeDefined()
}, 100000)

test('a new blog post can be created', async () => {
    const newBlog = {
        title: "Test Blog",
        author: "Test author",
        url: "www.testblog.com",
        likes: 4,
        __v: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain('Test Blog')
}, 100000)

test('if the likes property is missing default to 0', async () => {
    const newBlog = {
        title: "Test Blog",
        author: "Test author",
        url: "www.testblog.com",
        __v: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    const findBlog = blogsAtEnd.find(blog => blog.title === 'Test Blog')
    expect(findBlog.likes).toBe(0)
}, 100000)

test('if title is missing, response is 400 Bad Request', async () => {
    const newBlog = {
        author: "Test author",
        url: "www.testblog.com",
        likes: 4,
        __v: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
}, 100000)

test('if url is missing, response is 400 Bad Request', async () => {
    const newBlog = {
        title: "Test Blog",
        author: "Test author",
        likes: 4,
        __v: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
}, 100000)

test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).not.toContain(blogToDelete.title)
})

test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    
    const newBlog = {
        title: "Test Blog",
        author: "Test author",
        url: "www.testblog.com",
        likes: 4,
        __v: 0
    }

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(newBlog)
        .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain(newBlog.title)
})

afterAll(async () => {
    await mongoose.connection.close()
})