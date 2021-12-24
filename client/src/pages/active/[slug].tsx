import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Params } from '../../utils/TypeScript'
import { useDispatch } from 'react-redux'
import { ALERT } from '../../redux/types/alertTypes'
import axios from 'axios'
const ActiveAccount = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const { slug }: Params = useParams();
    useEffect(() => {
        if (slug) {
            dispatch({ type: ALERT, payload: { loading: true } })
            axios.post('/api/active', { active_token: slug })
                .then((res) => {
                    history.push('/login')
                    dispatch({ type: ALERT, payload: { success: res.data.msg } })
                })
                .catch(err => {
                    history.push('/register')
                    dispatch({ type: ALERT, payload: { error: err.response.data.msg } })
                })
            dispatch({ type: ALERT, payload: { loading: false } })
           
        } else {
            history.push('/')
        }
    }, [])
    return <></>
}

export default ActiveAccount
