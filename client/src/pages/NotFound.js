import { useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"

const NotFound = function() {
    // redirect to "/" when not found by <tag>
    // return <Navigate to="/" />

    // redirect after 1 second by function call
    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            navigate("/")
            // navigate(-1)  // redirect backward
        }, 1000)
    }, [])
    return (

        <>
            <h1>404</h1>
            <p>File not found from option 2</p>
        </>
    )
}

export { NotFound }