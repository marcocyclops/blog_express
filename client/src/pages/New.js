import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const New = function() {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [msg, setMsg] = useState('')
    const navigate = useNavigate()

    function onChangeTitle(e) {
        setTitle(e.target.value)
    }

    function onChangeContent(e) {
        setContent(e.target.value)
    }

    async function onClickSubmit() {
        let formdata = new FormData()
        formdata.append('title', title)
        formdata.append('content', content)
        formdata.append('author', 'root')
        const res = await axios.post('/api/blog/new', formdata, {headers: {'content-type': 'application/json'}})
        console.log(res)
        if (res.data.errno === 0) {
            navigate('/admin?isadmin=1')
        }
        else {
            setMsg(`Failed to create post. ${res.data.message}.`)
        }
    }

    return (
        <div className="flex flex-col w-full">
            <h1 className="text-xl font-bold my-4">New Post</h1>

            <div className="text-lg text-red-500">{ msg }</div>

            <form>
                <div className="flex flex-row mt-2">
                    <label className="w-20">Title: </label>
                    <input onChange={ onChangeTitle } type='text' className="border border-solid rounded-sm w-full p-2" />
                </div>

            
                <div className="flex flex-row mt-2">
                    <label className="w-20">Content: </label>
                    <textarea onChange={ onChangeContent } className="border border-solid rounded-md w-full h-60 p-2"></textarea>
                </div>

                <div onClick={onClickSubmit} className="flex px-8 py-1 border border-solid rounded-md w-fit my-4 ml-auto cursor-pointer">Submit</div>
            </form>
        </div>
    );
}

export { New }