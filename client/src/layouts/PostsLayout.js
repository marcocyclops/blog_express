import { NavLink, Outlet, useLocation } from "react-router-dom"

const PostsLayout = function() {
    // const urlThis = useLocation()
    return (
        <div className="flex flex-row w-full">
            <div className="flex flex-col w-[160px] border-r border-solid h-screeen mr-8">
                {/* <NavLink style={({isActive})=>{return (isActive && urlThis.pathname === '/posts') ? {backgroundColor:'skyblue',fontWeight:'bold'} : {}}} to="/posts">Post Dashboard</NavLink> */}
                <NavLink style={({isActive})=>{return isActive ? {backgroundColor:'pink',fontWeight:'bold'} : {}}} to="/admin">
                    {({isActive}) => {
                        return isActive ? 'Active Posts' : 'Posts'
                    }}
                </NavLink>
                <NavLink className="ml-4" style={({isActive})=>{return isActive ? {backgroundColor:'skyblue',fontWeight:'bold'} : {}}} to="/admin/new">New Post</NavLink>
            </div>
            <div className="flex flex-col w-full">
                {/* Nest route the Routes included in the Route applied with this component. */}
                {/* You can pass down one single variable(object, a normal react context) to the sub-routes by context */}
                <Outlet context={{hello: "world"}} className="w-full" />
            </div>
        </div>
    )
}

export { PostsLayout}