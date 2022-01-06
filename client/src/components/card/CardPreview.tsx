import React from 'react'
import { Blog } from '../../utils/TypeScript'
import { Link } from 'react-router-dom'
import moment from 'moment'
interface CardPreviewProps {
    blog: Blog
}

const CardPreview: React.FC<CardPreviewProps> = ({ blog }) => {
    return (
        <div className='card-preview'>
            <h2>Preview</h2>
            <div className="card-preview__blog">
                {blog.thumbnail &&
                    <div className="card-preview__blog-thumbnail">

                        <img alt='thumbnail' src={typeof blog.thumbnail !== "string" ? URL.createObjectURL(blog.thumbnail as File) : blog.thumbnail}>
                        </img>

                        <div className="card-preview__blog-createdat">

                            {(blog.title || blog.description || blog.thumbnail) && <>
                                <p>{moment(blog.createdAt).format("DD")}</p>
                                <span>{moment(blog.createdAt).format("MMM")}</span>
                            </>}

                        </div>
                    </div>
                }
                <ul className="card-preview__blog-cate">
                    {
                        blog.tags?.map((item, index) => {
                            return <li key={index}>
                                <Link to={`#`}>
                                    #{item}
                                </Link>
                            </li>
                        })
                    }
                </ul>
                <h2 className="card-preview__blog-title">
                    {blog.title}
                </h2>
                <p className="card-preview__blog-description">
                    {blog.description}
                </p>
            </div>
        </div>
    )
}

export default CardPreview
