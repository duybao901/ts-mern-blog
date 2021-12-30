import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { RootStore, Params } from '../../utils/TypeScript'

import UserInfor from '../../components/profile/UserInfor'
import OrtherInfor from '../../components/profile/OrtherInfor'
import UserBlog from '../../components/profile/UserBlog'

const Profile = () => {
    const history = useHistory()
    const { auth } = useSelector((state: RootStore) => state)
    const { slug }: Params = useParams()

    useEffect(() => {
        if (!auth.access_token) {
            history.push('/')
        }
    }, [auth.access_token])

    return (
        <div className="profile">
            <div className="container">
                <h2 className='profile__header'>Profile</h2>
                <div className='indicator'></div>
                <div className="profile__body">
                    <div className='profile__infor'>
                        {
                            auth.user?._id === slug ?
                                <UserInfor />
                                :
                                <OrtherInfor />
                        }
                    </div>
                    <div className="profile__blog">
                        <UserBlog />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
