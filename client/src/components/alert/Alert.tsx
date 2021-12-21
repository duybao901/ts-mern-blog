import React from 'react'
import { useSelector } from 'react-redux'
import { RootStore } from '../../utils/TypeScript'
import Loading from './Loading'
import Toast from './Toast'
const Alert = () => {
    const { alert } = useSelector((state: RootStore) => state)
    const { loading, success, error } = alert
    return (
        <div className="alert">
            {loading && <Loading />}
            {success && <Toast titie='Sucess' bgColor='bg-success' body={success} isSuccess={true} />}
            {error && <Toast titie='Error' bgColor='bg-error' body={error} isError={true} />}
        </div>
    )
}

export default Alert
