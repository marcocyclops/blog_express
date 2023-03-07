// import logo from './logo.svg';
import './App.css';
import { Routes, Route, useRoutes } from 'react-router-dom';
import { Posts } from './pages/Posts.js';
import { Post } from './pages/Post.js';
import { New } from './pages/New.js';
import { Edit } from './pages/Edit.js';
import { NotFound } from './pages/NotFound.js';
import { PostsLayout } from './layouts/PostsLayout';
import { Header } from './layouts/Header.js';
import { Books } from './pages/books/books.js';
import { Login } from './pages/Login.js';
import { Admin } from './pages/Admin.js';
import { useState } from 'react';

function App() {
    let element = useRoutes([
        {
            path: "/books",
            element: <Books />
        },
        {
            path: "/books/new",
            element: <h1>Create a new book</h1>
        },
        {
            path: "/*",
            element: <h1>File not found from option 3</h1>
        }
    ])
    
    const [username, setUsername] = useState('')

    function changeUsername(username) {
        setUsername(username)
    }

    return (
        <div className='flex flex-col m-4'>
            <Header username={ username }  changeLoginUsername={changeUsername} />
            <Routes>
                <Route path='/' element={
                    <>
                        <h1>Hello World</h1>
                        <p>This is the frontend of my nodejs blog.</p>
                    </>
                } />

                {/* Option 1: Route separately. */}
                {/* <Route path='/posts' element={<Posts />} /> */}
                {/* <Route path='/posts/:id' element={<Post />} /> */}
                {/* <Route path='/posts/new' element={<New />} /> */}

                {/* Option 2: group the Routes with a same basename. */}
                {/* Then you can add a component to the base path as a sidebar menu. */}
                {/* You can add a component to the Route index as a Dashboard as well. */}
                {/* use ':' to declare a parameter. */}
                <Route path='/posts'>
                    <Route index element={<Posts />} />
                    <Route path=':id' element={<Post />} />
                </Route>

                <Route path='/login' element={<Login changeLoginUsername={changeUsername} />} />

                <Route path='/admin' element={<PostsLayout />} >
                    <Route index element={<Admin />} />
                    <Route path='new' element={<New />} />
                    <Route path='edit/:id' element={<Edit />} />
                </Route>

                <Route path='*' element={<NotFound />} />
            </Routes>

            {/* Extra content for a specific page by implement same route path. */}
            {/* Other pages will not be affected even in the same route group. */}
            <Routes>
                <Route path='/posts' element={
                    <div className="border-t border-solid mt-4 p-4">
                        This is an extra content from a separate route with same path.
                    </div>
                } />
            </Routes>


            {/* Option 3: use javascript object to implement Routes */}
            {/* You may see the file not found rendered, because of the route not found from option 2. */}
            {/* In real project, you should avoid multi <Routes> to avoid a NOT FOUND from other <Routes> rendered on page. */}
            {/* { element } */}
        </div>
    );
}

export default App;
