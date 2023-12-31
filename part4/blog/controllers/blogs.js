const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
        .populate('user', { username: 1, name: 1})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    const user = request.user
    
    if (!body.likes) {
        body.likes = 0
    }
    
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id
    })
     
    if (!blog.title || !blog.url) {
        response.status(400).end()
    } else {
        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.status(201).json(savedBlog)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    const user = request.user

    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() === user._id.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        user.blogs = user.blogs.filter(blog => blog.toString() !== request.params.id)
        await user.save()
        response.status(204).end()
    } else {
        return response.status(401).json({ error: 'blog access not authorized'})
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const user = request.user

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id,
        __v: 0
    }

    await Blog.findByIdAndUpdate(request.params.id, blog, { new:true })
    response.status(200).json()
})

module.exports = blogsRouter