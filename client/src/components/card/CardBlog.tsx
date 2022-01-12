import React from 'react'
import { Blog } from "../../utils/TypeScript"
import { Link } from 'react-router-dom'
import moment from "moment"
interface CardBlogProps {
    blog: Blog
}
const CardBlog: React.FC<CardBlogProps> = ({ blog }) => {
    return (
        <div className='card-blog'>
            <Link to={`/blogs/${blog._id}`}>
                <div className="card-blog__thumbnail">
                    <img alt='thumbnail' src={typeof blog.thumbnail !== "string" ? URL.createObjectURL(blog.thumbnail as File) : blog.thumbnail}>
                    </img>
                    <div className="card-blog__createdat">

                        {(blog.title || blog.description || blog.thumbnail) && <>
                            <p>{moment(blog.createdAt).format("DD")}</p>
                            <span>{moment(blog.createdAt).format("MMM")}</span>
                        </>}

                    </div>
                </div>
            </Link>
            <ul className="card-blog__cate">
                {
                    blog.tags?.map((item, index) => {
                        return <li key={index}>
                            <Link to={`/blogs/${blog.slug}`}>
                                #{item}
                            </Link>
                        </li>
                    })
                }
            </ul>
            <h2 className="card-blog__title">
                <Link to={`/blogs/${blog.slug}`}>
                    {blog.title}
                </Link>
            </h2>
            <p className="card-blog__description">
                {blog.description}
            </p>
        </div>
    )
}

export default CardBlog
