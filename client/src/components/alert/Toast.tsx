import React from 'react'
import { useDispatch } from 'react-redux'
import { ALERT } from '../../redux/types/alertTypes'
interface Props {
    titie: string
    body: string | string[]
    bgColor: string
    isSuccess?: boolean
    isError?: boolean
}

const Toast: React.FC<Props>= ({ titie, body, bgColor, isSuccess, isError }) => {

    const dispatch = useDispatch()

    const closeToast = () => {
        dispatch({ type: ALERT, payload: {} })
    }

    return (
        <div className={`toast ${bgColor}`}>
            <div className='toast__icon'>
                {isError && <i className='bx bxs-error-circle'></i>}
                {isSuccess && <i className='bx bxs-check-circle'></i>}
            </div>
            <div className="toast__body">
                <h3>{titie}</h3>
                {
                    typeof body === 'string'
                        ?
                        <p>{body}</p>
                        :
                        <ul>
                            {body.map((text, index) => {
                                return <li key={index}>{text}</li>
                            })}
                        </ul>
                }
            </div>
            <div className="toast__close">
                <i onClick={closeToast} className='bx bx-x'></i>
            </div>
        </div >
    )
}

export default Toast
