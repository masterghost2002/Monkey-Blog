import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LogoSplash from "../Reponses/LogoSplash";
const Auth = lazy(() => import('../Auth/Auth'));
const BlogContainer = lazy(() => import('../Blogs/BlogContainer'));
const AddUpdate = lazy(()=>import("../Blogs/AddUpdate"));
const NotFound = lazy(()=>import("../Reponses/NotFound"));
const ContactUs = lazy(()=>import('../ContactUS/ContactUs'));
const AboutDeveloper = lazy(()=>import('../AboutDeveloper/AboutDeveloper'));
export default function NavRouter(props) {
    return (
        <Suspense fallback={<LogoSplash />}>
            <Routes>
                <Route path='/' element={<Auth />}></Route> :
                <Route path='/blogs' element={<BlogContainer type={"All Blogs"} />}></Route>
                <Route path='/myblogs' element={<BlogContainer type={"My Blogs"} />}></Route>
                <Route path='/addblog' element={<AddUpdate />}></Route>
                <Route path= '/contactus' element = {<ContactUs/>}></Route>
                <Route path= '/aboutdeveloper' element = {<AboutDeveloper/>}></Route>
                <Route path = '/*' element={<NotFound />}></Route>
            </Routes>
        </Suspense>

    )
};
