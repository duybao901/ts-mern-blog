import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Search from './Search'

const Header = () => {
    const location = useLocation()
    const [openSearch, setOpenSearch] = useState(false)
    const [openMenuLeftSide, setOpenMenuLeftSide] = useState(false)

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
                <div className="header__icon-lsb">  {/* -> For Reponsive */}
                    <i className='bx bx-menu-alt-left' onClick={() => setOpenMenuLeftSide(true)}></i>
                </div>
                <div className={openMenuLeftSide ? "header__menu-lsb active" : "header__menu-lsb"}>  {/* -> For Reponsive */}
                    <div className={openMenuLeftSide ? "drawer-mask active" : "drawer-mask"}>
                    </div>
                    <div className={openMenuLeftSide ? "sidebar active" : "sidebar"}>
                        <div className="sidebar__header">
                            <div className="logo">
                                <Link to='/'>Blog<span>Hub</span></Link>
                            </div>
                            <i className='bx bx-x' onClick={() => setOpenMenuLeftSide(false)}></i>
                        </div>
                        <ul className="sidebar__menu">
                            {menu.map((item, index) => {
                                return <li key={index}>
                                    <Link onClick={() => setOpenMenuLeftSide(false)} to={`${item.path}`} className={activeMenu(item.path)}>{item.label}</Link>
                                </li>
                            })}
                            <li>
                                <Link onClick={() => setOpenMenuLeftSide(false)} to="/register" className={activeMenu('/register')}>register</Link>
                            </li>
                            <li>
                                <Link onClick={() => setOpenMenuLeftSide(false)} to="/login" className={activeMenu('/login')}>login</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="logo">
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
                <div className="header__search-icon">
                    <i className='bx bx-search' onClick={() => setOpenSearch(!openSearch)}></i> {/* -> For Reponsive */}
                </div>
            </div>
            <Search open={openSearch} setOpen={setOpenSearch} />

        </div>
    )
}

export default Header
