import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'
import moment from 'moment'

const Post = () => {
    
    const { id } = useParams()
    const [post, setPost] = useState({})

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get(`/api/blog/detail?id=${id}`)
            if (res.data.errno === 0) {
                setPost(res.data.data)
            }
        }

        getPost()
    }, [])
    console.log('post', post)
    console.log('moment', moment(post.created_at).format('YYYY-MM-DD'))
    return (
        <>

            <div className="text-xl font-bold pt-4 pb-2">{ post && post.title }</div>
            <div className="py-2">{ post && post.author } | { post && moment(post.created_at).format('YYYY-MM-DD') }</div>
            <div className="py-2">{ post && post.content }</div>
        </>
    );
}

export { Post };