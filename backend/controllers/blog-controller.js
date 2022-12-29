const { default: mongoose } = require('mongoose');
const Blog = require('../models/Blog');
const User = require('../models/User');
const {verify_token} = require('../middleware/auth_jwt');
// return all the blogs
const getAllBlogs = async (req, res, next) => {
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
const addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;
    let existingUser;
    try{
        existingUser = await User.findById(user);
    }catch(err){
        return console.log(err);
    }

    if(!existingUser) return res.status(400).json({message: "Unable To find user"});

    // creatint a new blog
    const newBlog = new Blog({
        title: title,
        description: description,
        image: image,
        user: user
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
        return res.status(500).json({message: "Server Error"});
    }
    return res.status(200).json({message: "Blog Added" });
};

// update the already present blog

const verifyUser = async (req, res, next)=>{
    const authHeader = req.headers['authorization'];
    const ACCESS_TOKEN = authHeader.split(" ")[1];
    if(ACCESS_TOKEN === null) res.status(401);
    const user = verify_token(ACCESS_TOKEN);
    console.log(user);
    const blogId = req.params.id;
    try {
        blogs = await (await Blog.findById(blogId).populate('user', '_id'));
    } catch (err) {
        return console.log(err);
    }
    if (!blogs)
        return res.status(404).json({ message: "No Blog Found" });
    const blogUserId = JSON.stringify(blogs.user._id);
    const reqUserId = JSON.stringify(user._id);

    console.log(blogUserId);
    console.log(reqUserId);

    if(blogUserId === reqUserId){
        console.log("hello");
        next();
    }
    return res.status(401).json({validationError:"Anauthorized User"});
}
const updateBlog = async (req, res) => {
    const { title, description } = req.body;
    const blogId = req.params.id;
    const authHeader = req.headers['authorization'];
    const ACCESS_TOKEN = authHeader.split(" ")[1];
    if(ACCESS_TOKEN === null) res.status(401).json({validationError:"Anauthorized User"});
    const user = verify_token(ACCESS_TOKEN);

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
        console.log("Blog not found");
    }
    if(!blog){
        return res.status(404).json({message: "Blog Not found"});
    }
    return res.status(200).json({blog});
};


// delete the given blog by id
const deleteBlog = async (req, res, next)=>{
    const Id = req.params.id;
    let blog;
    try{
        blog = await Blog.findByIdAndRemove(Id).populate('user'); // populate works with the refrence collection
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

const getByUserId = async (req, res, next)=>{
    const userId = req.params.id;
    let userBlogs;
    try{
        userBlogs = await User.findById(userId).populate('blogs').sort('-created_at');
    }catch(err){
        return console.log("Unable to fetch"+err);
    }
    if(!userBlogs)
        return res.status(404).json({message: "No blogs found"});
    return res.status(200).json({blogs: userBlogs.blogs});
}
module.exports = { getAllBlogs, addBlog, updateBlog , getById, deleteBlog, getByUserId, verifyUser};