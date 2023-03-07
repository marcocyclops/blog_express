import axios from 'axios'
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import moment from 'moment'


export function Admin() {

    const [posts, setPosts] = useState()
    const [msg, setMsg] = useState('')
    const [deleted, setDeleted] = useState(0)

    useEffect(() => {
        const getPosts = async () => {
            const res = await axios.get('/api/blog/list?isadmin=1')
            console.log('axios', res)
            if (res.data.errno === 0) {
                setPosts(res.data.data)
            }
        }
        
        getPosts()
    }, [deleted])

    console.log('posts', posts)

    function onClickDelete(id) {
        const delPost = async () => {
            const res = await axios.post(`/api/blog/delete?id=${id}`)
            console.log('after delete', res)
            if (res.data.errno === 0) {
                setDeleted(deleted + 1)  // control useEffect to getPosts once deleted
                setMsg('Delete post successfully.')
            }
            else {
                setMsg('Failed to delete post.')
            }
        }
        delPost()
    }

    return(
        <>
            <h1 className="text-xl font-bold py-2">Admin</h1>

            <div className="text-lg text-red-500">{ msg }</div>

            <div>{ posts && posts.map((item) => {
                return(
                    <div className="flex flex-col border-b border-solid py-2" key={`post${item.id}`}>
                        <div className="font-bold"><Link to={`/posts/${item.id}`} >{item.title}</Link></div>
                        <div>Author: {item.author} | { moment(item.created_at).format('YYYY-MM-DD') }</div>
                        <div>{item.content}</div>
                        <div className="flex flex-row w-full justify-between">
                            <div onClick={(e) => {onClickDelete(item.id)}} className="px-2 py-1 border border-solid rounded-md w-fit cursor-pointer">Delete</div>
                            <div className="px-2 py-1 border border-solid rounded-md w-fit"><Link to={`/admin/edit/${item.id}`}>Edit</Link></div>
                        </div>
                    </div>
                )
            }) }</div>
        </>
    );

    
}
