import { NavLink } from 'react-router-dom';
import axios from 'axios'
import { useState } from 'react'

const Header = function ({ username, changeLoginUsername }) {

    async function onClickLogout() {
        const res = await axios.post('/api/user/logout')
        console.log(res)
        if (res.data.errno === 0) {
            changeLoginUsername('')
        }
    }
    return (
        <div className="flex flex-row border-b border-solid py-2 mb-4 justify-between">
            <div className="flex flex-row">
                <div id="branding" className="flex flex-row">
                    <div className="cursor-default">CHEUNG Marco Cyclops Blog</div>
                    <div className="mx-4">|</div>
                </div>
                <nav>
                    <ul className="flex flex-row">
                        <li className="flex flex-row"><NavLink style={({isActive}) => {return isActive ? {color:'red',fontWeight:'bold'} : {}}} to="/">Home</NavLink><div className="mx-4">|</div></li>
                        <li className="flex flex-row"><NavLink style={({isActive}) => {return isActive ? {color:'red',fontWeight:'bold'} : {}}} to="/books">Books</NavLink><div className="mx-4">|</div></li>
                        <li className="flex flex-row"><NavLink style={({isActive}) => {return isActive ? {color:'red',fontWeight:'bold'} : {}}} to="/posts">Posts</NavLink><div className="mx-4">|</div></li>
                        <li className="flex flex-row"><NavLink style={({isActive}) => {return isActive ? {color:'red',fontWeight:'bold'} : {}}} to="/admin?isadmin=1">Admin</NavLink></li>
                    </ul>
                </nav>
            </div>
            {
                username ? (
                    <div className="flex flex-row">
                        <div>{ username }</div>
                        <div className="mx-2">|</div>
                        <div onClick="onClickLogout" className="cursor-pointer">Logout</div>
                    </div>
                ):(
                    <div className="px-2 py-1 border border-solid rounded-md">
                        <NavLink to="/login">Login</NavLink>
                    </div>
                )
            }
        </div>
    )
}

export { Header };