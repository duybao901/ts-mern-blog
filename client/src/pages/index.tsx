import React, { PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'
import { RootStore } from '../utils/TypeScript'
import { Link } from 'react-router-dom'
import CardBlog from '../components/card/CardBlog'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const Home = () => {
    const { blogs } = useSelector((state: RootStore) => state)
    const { featureBlog, homeBlog } = blogs;

    return (
        <div className='home'>
            <div className='home__banner'>
                <div className="container">
                    <div className="home__banner-feature-post">
                        <h2>Feature Posts</h2>
                        <ul className="feature-post__list">
                            {
                                featureBlog.featureBlogLoading ?
                                    <>
                                        {
                                            [0, 1, 2, 3].map((i) => {
                                                return <div style={{ marginBottom: 30, display: "flex", justifyContent: 'space-between', alignItems: "center" }}>
                                                    <div style={{ lineHeight: 1 }}>
                                                        <Skeleton width={90} height={90}></Skeleton>
                                                    </div>
                                                    <div style={{ flex: 1, marginLeft: "15px" }}>
                                                        <div style={{ lineHeight: 1 }}>
                                                            <Skeleton height={22} width={"100%"} style={{ marginBottom: "10px" }}></Skeleton>
                                                        </div>
                                                        <div style={{ lineHeight: 1, display: "flex" }}>
                                                            <Skeleton height={14} width={60} style={{ marginRight: 10 }}></Skeleton>
                                                            <Skeleton height={14} width={60}></Skeleton>
                                                        </div>
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </>
                                    :
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
                                                            if (index < 2) {
                                                                return <li key={index}>
                                                                    <Link to={`/blogs/${tagName}`}>
                                                                        #{tagName}
                                                                    </Link>
                                                                </li>
                                                            }
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
            <div className="home__blogs">
                <div className="container">
                    <div className="home__blogs-wrapper">
                        {
                            homeBlog.blogs?.map((blog) => {
                                return <CardBlog key={blog._id} blog={blog}></CardBlog>
                            })
                        }
                    </div>
                    <Link to={`/blogs`} >
                        <button className="btn-primary" style={{ margin: "0 auto" }}>See more</button>
                    </Link>
                </div>
            </div>
        </div >
    )
}

export default Home
