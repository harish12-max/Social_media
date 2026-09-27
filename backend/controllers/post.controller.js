import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import uploadtocloudnary from "../utils/uploadtocloudnary.js";


export const createPost = async(req, res) =>{
    try {
      const caption = req.body.caption?.trim()|| "";

      if(!caption || !req.file){
        return res.status(400).json({message:"Add a Caption or upload an Image"});
      }

      if(caption.length >500){
        return res.status(400).json({message:"Caption should be less than 500"})
      }

      let image;

      if(req.file){
        const uploadImage = await uploadtocloudnary(req.file.buffer)
          image = uploadImage.secure_url;
      }


      const post = await Post.create({
        author: req.user._id,
        caption,
        image,  
      });

      await User.findByIdAndUpdate(req.user._id ,{
         $push:{posts:post._id}
      })

      const populatedPost = await Post.findById(post._id).populate("author" , "name username profileImage")

      return res.status(201).json({
        message: "Post Created",
        post: populatedPost
    });
          
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Server Error"})
    }
}



export const getPost = async(req , res) =>{
    try {
        const posts = await Post.find().populate("author","name username profileImage").sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Posts fetched successfully",
            posts
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"})
    }
}


export const updateLikes = async(req, res) =>{
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "No Post Found" });
        }

        const userId = req.user._id;

        const isAlreadyLiked = post.likes.some(
            (id) => id.toString() === userId.toString()
        );


        if (isAlreadyLiked) {
            post.likes.pull(userId);
        } else {
            post.likes.push(userId);
        }

        await post.save();


        return res.status(200).json({
            message: isAlreadyLiked ? "Post Unliked" : "Post Liked",
            likes: post.likes.length,
            liked: !isAlreadyLiked
        });
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Server Error"})
    }
}