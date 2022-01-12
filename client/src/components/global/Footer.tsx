import React, { useState } from 'react'

const Footer = () => {
    const [state, setState] = useState("")
    return (
        <div className='footer'>
            <div className="footer__subscribe ">
                <h2>Get The Best Of All Hands Delivered To Your Inbox</h2>
                <p>Subscribe to our newsletter and stay updated.</p>
                <div className="footer__subscribe-form">
                    <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
                    <button className="btn-primary">Subscribe</button>
                </div>
            </div>
            <div className="footer__bottom">
                <p>Copyright © 2022 RedQ, Inc.</p>
            </div>
        </div>
    )
}

export default Footer
