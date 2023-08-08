const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    
    if (blogs.length === 0) {
        return 0
    } else if (blogs.length === 1) {
        return blogs[0].likes
    }

    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    
    if (blogs.length === 0) {
        return {}
    } else if (blogs.length === 1) {
        return {
            title: blogs[0].title,
            author: blogs[0].author,
            likes: blogs[0].likes
        }
    }

    const likes = blogs.map(blog => blog.likes)
    const maxLikes = Math.max(...likes)
    const favBlog = blogs.find(blog => blog.likes === maxLikes)

    return {
        title: favBlog.title,
        author: favBlog.author,
        likes: favBlog.likes
    }
} 

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}