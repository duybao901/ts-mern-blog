import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Search from './Search'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore } from '../../utils/TypeScript'
import { logout } from '../../redux/actions/authActions'
const Header = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const { auth } = useSelector((state: RootStore) => state)
    const [openSearch, setOpenSearch] = useState(false);
    const [openMenuLeftSide, setOpenMenuLeftSide] = useState(false);
    const [openSubMenuUser, setOpenSubMenuUser] = useState(false);

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

    const userLogout = () => {
        setOpenSubMenuUser(false)
        setOpenMenuLeftSide(false)
        dispatch(logout())
    }

    return (
        <div className="header" ref={headerRef}>
            <div className='header__container'>
                <div className="header__icon-lsb">  {/* -> For Reponsive */}
                    <i className='bx bx-menu-alt-left' onClick={() => setOpenMenuLeftSide(true)}></i>
                </div>
                <div className={openMenuLeftSide ? "header__menu-lsb active" : "header__menu-lsb"}>  {/* -> For Reponsive */}
                    <div onClick={() => setOpenMenuLeftSide(false)} className={openMenuLeftSide ? "drawer-mask active" : "drawer-mask"}>
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
                            {
                                auth.access_token ?
                                    <>
                                        {
                                            auth.user?.role === 'admin' &&
                                            <li>
                                                <Link onClick={() => setOpenMenuLeftSide(false)} to="/create_category" className={activeMenu('/create_category')}>Create Category</Link>
                                            </li>
                                        }
                                        <li>
                                            <Link onClick={() => setOpenMenuLeftSide(false)} className={activeMenu(`/profile/${auth.user?._id}`)} to={`/profile/${auth.user?._id}`}>Profile</Link>
                                        </li>
                                        <li>
                                            <Link to="#" onClick={userLogout}>Logout</Link>
                                        </li>
                                    </>
                                    :
                                    <>
                                        <li>
                                            <Link onClick={() => setOpenMenuLeftSide(false)} to="/register" className={activeMenu('/register')}>register</Link>
                                        </li>
                                        <li>
                                            <Link onClick={() => setOpenMenuLeftSide(false)} to="/login" className={activeMenu('/login')}>login</Link>
                                        </li>
                                    </>
                            }
                        </ul>
                    </div>
                </div>
                <div className="logo">
                    <Link to='/'>Blog<span>Hub</span></Link>
                </div>
                <div className='header__menu'>
                    <ul>
                        {
                            menu.map((item, index) => {
                                return <li key={index}>
                                    <Link to={`${item.path}`} className={activeMenu(item.path)}>{item.label}</Link>
                                </li>
                            })
                        }
                        {
                            auth.user?.role === 'admin' &&
                            <li>
                                <Link className={activeMenu('/create_category')} to="/create_category">Create Category</Link>
                            </li>
                        }
                        {
                            !auth.access_token ?
                                <>
                                    <li>
                                        <Link to="/register" className={activeMenu('/register')}>register</Link>
                                    </li>
                                    <li>
                                        <Link to="/login" className={activeMenu('/login')}>login</Link>
                                    </li>
                                </> :
                                <>
                                    <div className="header__menu-user">
                                        <li className="user__infor" onClick={() => setOpenSubMenuUser(!openSubMenuUser)}>
                                            <p className="user__infor-name">{auth.user?.name}</p>
                                            <span><i className='bx bxs-down-arrow'></i></span>
                                        </li>
                                        <ul className={openSubMenuUser ? 'user__sub-menu active' : 'user__sub-menu'}>
                                            <div className="">
                                                <img src={auth.user?.avatar} alt="logo" />
                                                <p>{auth.user?.name}</p>
                                                <span>{auth.user?.account}</span>
                                                <Link to={`/profile/${auth.user?._id}`} onClick={() => setOpenSubMenuUser(false)}>
                                                    Manage your BlogHub Account
                                                </Link>
                                            </div>
                                            <li>
                                                <Link to="#" onClick={userLogout}>Logout</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </>
                        }
                        <li>
                            <i className='bx bx-search' onClick={() => setOpenSearch(!openSearch)}></i>
                        </li>
                    </ul>
                </div >
                <div className="header__search-icon">
                    <i className='bx bx-search' onClick={() => setOpenSearch(!openSearch)}></i> {/* -> For Reponsive */}
                </div>
            </div >
            <Search open={openSearch} setOpen={setOpenSearch} />

        </div >
    )
}

export default Header

