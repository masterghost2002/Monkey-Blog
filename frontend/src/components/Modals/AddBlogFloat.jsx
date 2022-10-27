import React, {useState} from 'react'
import { Link } from 'react-router-dom';
export default function AddBlog() {
    const [showBtn, setShowBtn] = useState(true);
    window.onscroll = function () {
        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight || !window.pageYOffset) {
            setShowBtn(false);
        }
        else if(showBtn === false)
            setShowBtn(true)
    }
    return (
        <>
            {showBtn && <Link className='btn addBlogBtn' to='/addBlog' title='add-new-blog'><i className="fa-solid fa-plus"></i></Link>}
        </>
    )
}
