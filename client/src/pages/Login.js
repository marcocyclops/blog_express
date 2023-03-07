import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = function( { changeLoginUsername }) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')
    const navigate = useNavigate()

    function onChangeUsername(e) {
        setUsername(e.target.value)
    }

    function onChangePassword(e) {
        setPassword(e.target.value)
    }

    async function onClickSubmit() {
        console.log('username', username)
        console.log('password', password)
        let formdata = new FormData()
        formdata.append('username', username)
        formdata.append('password', password)
        const res = await axios.post('/api/user/login', formdata, {headers: {'content-type': 'application/json'}})
        console.log(res)
        if (res.data.errno === 0) {
            changeLoginUsername(res.data.data.username)
            navigate('/admin?isadmin=1')
        }
        else {
            setMsg('Login failed.')
        }
    }

    return (
        <div className="flex flex-col w-full">
            <h1 className="text-xl font-bold my-4">Login</h1>

            <div className="text-lg text-red-500">{ msg }</div>

            <form>
                <div className="flex flex-row mt-2">
                    <label className="w-24">Username: </label>
                    <input onChange={ onChangeUsername } type='text' className="border border-solid rounded-sm w-full p-2" />
                </div>

            
                <div className="flex flex-row mt-2">
                    <label className="w-24">Password: </label>
                    <input onChange={ onChangePassword } type='password' className="border border-solid rounded-md w-full p-2" />
                </div>

                <div onClick={onClickSubmit} className="flex px-8 py-1 border border-solid rounded-md w-fit my-4 ml-auto cursor-pointer">Submit</div>
            </form>
        </div>
    );
}

export { Login }