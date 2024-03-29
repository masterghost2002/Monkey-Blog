const { default: mongoose } = require('mongoose');
const Blog = require('../models/Blog');
const User = require('../models/User');
// return all the blogs
const getAllBlogs = async (req, res) => {
    let blogs;
    try {
        blogs = await (await Blog.find().sort('-created_at').populate('user', 'name badge'));
    } catch (err) {
        return res.status(500).json({message: "Server Error"});
    }
    if (!blogs)
        return res.status(404).json({ message: "No Blog Found" });

    return res.status(200).json({ blogs });
};

// add a new blog
const addBlog = async (req, res) => {
    const { title, description} = req.body;
    const user_id = req.verified_user._id;
    let existingUser;
    try{
        existingUser = await User.findById(user_id);
    }catch(err){
        res.status(400).json({message: "Internal Server Error"});
    }
    if(!existingUser) return res.status(400).json({message: "Unable To find user"});
    // creatint a new blog
    const newBlog = new Blog({
        title: title,
        description: description,
        user: user_id
    });
    // try catch
    try {
        // the acid property completion of transaction dbms
        const mongooseSession = await mongoose.startSession();
        mongooseSession.startTransaction();
        await newBlog.save({mongooseSession});
        existingUser.blogs.push(newBlog);
        await existingUser.save({mongooseSession});
        await mongooseSession.commitTransaction();

    } catch (err) {
        console.log(err);
        return res.status(500).json({message: "Server Error"});
    }
    return res.status(200).json({message: "Blog Added" });
};

// update the already present blog
const updateBlog = async (req, res) => {
    const { title, description } = req.body;
    const blogId = req.params.id;
    const user = req.verified_user;

    try {
        blogs = await (await Blog.findById(blogId).populate('user', '_id'));
    } catch (err) {
        return res.status(500).json({message: "Server Error"});
    }
    if (!blogs)
        return res.status(404).json({ message: "No Blog Found" });

    const blogUserId = JSON.stringify(blogs.user._id);
    const reqUserId = JSON.stringify(user._id);


    if(blogUserId !== reqUserId){
        return res.status(401).json({validationError:"Anauthorized User"});
    }
    
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title: title,
            description: description
        });
    }catch(err){
        return console.log(err);
    }
    if(!blog)
    return res.status(500).json({message: "Unable To update"});
    return res.status(200).json({message:"Update Success"});
};



// return the blog by id
const getById = async (req, res)=>{
    const Id = req.params.id;
    let blog;
    try{
        blog = await Blog.findById(Id).populate('user', 'name');
    }catch(err){
        return res.status(500).json({message: "Internal server error"});
    }
    if(!blog){
        return res.status(404).json({message: "Blog Not found"});
    }
    return res.status(200).json({blog});
};


// delete the given blog by id
const deleteBlog = async (req, res)=>{
    const blogId = req.params.id;
    const user = req.verified_user;
    try {
        blogs = await (await Blog.findById(blogId).populate('user', '_id'));
    } catch (err) {
        return res.status(500).json({message: "Server Error"});
    }
    if (!blogs)
        return res.status(404).json({ message: "No Blog Found" });

    const blogUserId = JSON.stringify(blogs.user._id);
    const reqUserId = JSON.stringify(user._id);
    if(blogUserId !== reqUserId){
        return res.status(401).json({validationError:"Anauthorized User"});
    }
    
    let blog;
    try{
        blog = await Blog.findByIdAndRemove(blogId).populate('user'); // populate works with the refrence collection
        // it will find  out the detail of the particular user which refers to the curr blog
        // now blog contain the blog and user detail as well 
        await blog.user.blogs.pull(blog._id); 
        // blog.user.blogs refers to the user{the user whose blog is this}.blogs.pull(blog);
        // .blogs is the array of blogs which  we refers to the user
        //.pull (pop) pull the blog (which we are going to delete) from the blogs array of user
        await blog.user.save();
    }catch(err){
        return res.status(500).json({message:"Server Error"});
    }
    if(!blog) return res.status(500).json({message: "Unable to delete"});
    return res.status(200).json({message: "Blog delete success"});
};

// get blogs of user by user id

const getByUserId = async (req, res)=>{
    const userId = req.verified_user._id;
    let userBlogs;
    try{
        userBlogs = await User.findById(userId).populate('blogs');
    }catch(err){
        return console.log("Unable to fetch"+err);
    }
    if(!userBlogs)
        return res.status(404).json({message: "No blogs found"});
    return res.status(200).json({blogs: userBlogs.blogs.reverse()});
}
module.exports = { getAllBlogs, addBlog, updateBlog , getById, deleteBlog, getByUserId};