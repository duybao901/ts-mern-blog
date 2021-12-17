import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Search from './Search'

const Header = () => {
    const location = useLocation()
    const [openSearch, setOpenSearch] = useState(false)
    const headerRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    const menu = [
        { path: '/', label: 'home' },
        { path: '/blog', label: 'blog' },
    ]

    const activeMenu = (path: string) => {
        if (path === location.pathname) return 'active'
    }

    useEffect(() => {
        const handleScroll = () => {
         
            if (window.scrollY > 40) {
                headerRef.current.classList.add('sticky')
            } else {
                headerRef.current.classList.remove('sticky')
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (

        <div className="header" ref={headerRef}>
            <div className='header__container'>
                <div className="header__logo">
                    <Link to='/'>Blog<span>Hub</span></Link>
                </div>
                <div className='header__menu'>
                    <ul>
                        {menu.map((item, index) => {
                            return <li key={index}>
                                <Link to={`${item.path}`} className={activeMenu(item.path)}>{item.label}</Link>
                            </li>
                        })}
                        <li>
                            <Link to="/register" className={activeMenu('/register')}>register</Link>
                        </li>
                        <li>
                            <Link to="/login" className={activeMenu('/login')}>login</Link>
                        </li>
                        <li>
                            <i className='bx bx-search' onClick={() => setOpenSearch(!openSearch)}></i>
                        </li>
                    </ul>
                </div>
            </div>
            <Search open={openSearch} setOpen={setOpenSearch} />
        </div>
    )
}

export default Header
