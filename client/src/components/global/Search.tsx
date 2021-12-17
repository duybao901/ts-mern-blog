import React, { useState } from 'react'

interface Search {
    open: boolean
    setOpen: Function
}

const Search = ({ open, setOpen }: Search) => {

    const [state, setState] = useState('')

    const onHandleSubmit = (e: any) => {
        e.preventDefault()
    }

    return (
        <div className={open ? "search active" : "search"}>
            <div className="container">
                <form action="#" onSubmit={onHandleSubmit}>
                    <input type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder='Enter Your Search Topic'
                    />
                </form>
                <i className='bx bx-x' onClick={() => setOpen(false)}></i>
            </div>
        </div>
    )
}

export default Search
