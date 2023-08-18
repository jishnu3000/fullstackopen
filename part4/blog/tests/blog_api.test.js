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

afterAll(async () => {
    await mongoose.connection.close()
})