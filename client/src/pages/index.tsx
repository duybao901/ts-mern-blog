import React from 'react'
import { useSelector } from 'react-redux'
import { RootStore } from '../utils/TypeScript'
import { Link } from 'react-router-dom'
const Home = () => {
    const { blogs } = useSelector((state: RootStore) => state)
    const { featureBlog } = blogs;
    return (
        <div className='home'>
            <div className='home__banner'>
                <div className="container">
                    <div className="home__banner-feature-post">
                        <h2>Feature Posts</h2>
                        <ul className="feature-post__list">
                            {
                                featureBlog.blogs?.map((blog) => {
                                    return <li className='feature-post__list-item' key={blog._id}>
                                        <Link to={`/blogs/${blog._id}`}>
                                            <img alt='thumbnail' src={typeof blog.thumbnail !== "string" ? URL.createObjectURL(blog.thumbnail as File) : blog.thumbnail}>
                                            </img>
                                        </Link>
                                        <div className="item__infor">
                                            <Link to={`/blogs/${blog._id}`}>
                                                {blog.title}
                                            </Link>
                                            <ul className="item__infor-category">
                                                {
                                                    blog.tags.map((tagName, index) => {
                                                        return <li key={index}>
                                                            <Link to={`/blogs/${tagName}`}>
                                                                #{tagName}
                                                            </Link>
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
