import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LogoSplash from "../Reponses/LogoSplash";
// using lazy to prevent rendering of all the components even if they are not required
const Auth = lazy(() => import('../Auth/Auth'));
const BlogContainer = lazy(() => import('../Blogs/BlogContainer'));
const ViewFullBlog = lazy(()=>import('../Blogs/VIewFullBlog'));
const AddUpdate = lazy(()=>import("../Blogs/AddUpdate"));
const NotFound = lazy(()=>import("../Reponses/NotFound"));
export default function NavRouter(props) {
    return (
        <Suspense fallback={<LogoSplash />}>
            <Routes>
                <Route path='/' element={<Auth />}></Route> :
                <Route path='/blogs' element={<BlogContainer type={"All Blogs"} />}></Route>
                <Route path='/myblogs' element={<BlogContainer type={"My Blogs"} />}></Route>
                <Route path='/addblog' element={<AddUpdate />}></Route>
                <Route path='/updateblog/:id' element={<AddUpdate />}></Route>
                <Route path = '/blog/:id' element={<ViewFullBlog/>}></Route>
                <Route path = '/*' element={<NotFound />}></Route>
            </Routes>
        </Suspense>

    )
};
