import axios from 'axios'
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import moment from 'moment'


export function Posts() {

    const [posts, setPosts] = useState()

    useEffect(() => {
        const getPosts = async () => {
            const res = await axios.get('/api/blog/list')
            console.log('axios', res)
            if (res.data.errno === 0) {
                setPosts(res.data.data)
            }
        }
        
        getPosts()
    }, [])

    console.log('posts', posts)

    return(
        <>
            <h1 className="text-xl font-bold py-2">Posts List</h1>

            <div>{ posts && posts.map((item) => {
                return(
                    <div className="flex flex-col border-b border-solid py-2" key={`post${item.id}`}>
                        <div className="font-bold"><Link to={`/posts/${item.id}`} >{item.title}</Link></div>
                        <div>Author: {item.author} | { moment(item.created_at).format('YYYY-MM-DD') }</div>
                        <div>{item.content}</div>
                    </div>
                )
            }) }</div>
        </>
    );

    
}
