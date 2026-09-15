import User from "../models/user.model.js"
import bcrypt from "bcrypt";
import gentoken from "../utils/gentoken.js";

const cookieOptions = {
    httpOnly: true,
    // we have to avoid XSS and CSRF attacks
}

export const registerUser = async (req, res) => {

    const { name, username, email, password } = req.body


    try {
        if (!username || !name || !email || !password) {
            return res.status(422).json({ message: 'All fields Required' })
        }



        const userNameExist = await User.findOne({ username })
        if (userNameExist) {
            return res.status(400).json({ message: 'Already Taken' })
        }

        const emailExist = await User.findOne({ email })
        if (emailExist) {
            return res.status(400).json({ message: 'Already Taken' })
        }

        if (password.length <= 8) {
            return res.status(400).json({ message: "password length should be greater" })
        }


        const hashpassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({ username, name, email, password: hashpassword })

        const token = gentoken(newUser._id)

        res.cookie("token", token, cookieOptions)
        return res.status(200).json(newUser)


    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}



export const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({ message: 'All fields Required' })
        }

        const userExist = await User.findOne({ email })

        if (!userExist) {
            return res.status(404).json({ message: "User Not Found" })
        }

        const correctpassword = bcrypt.compareSync(password, userExist.password)

        if (!correctpassword) {
            return res.status(401).json({ message: "Invalid Password" })
        }

        const token = gentoken(userExist._id)
        res.cookie("token", token, cookieOptions)

        return res.status(200).json({
            message: "Login Successful",
            user: userExist,
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Intenal Server Error" }, error)
    }
}

export const getuser = (req, res) => {
    return res.status(200).json(req.user)
}

export const logoutUser = (req, res) => {
    res.clearCookie("token")
    return res.status(200).json({ message: "Logout Successful" })
}

export const getUserProfile = async (req, res) => {

    try {
        const { username } = req.params
        const userData = await User.findOne({ username })
        .select("-password")
        .populate("followers" , "name username")
        .populate("following" , "name username")
        // console.log("USER DATA:", userData)

        if (!userData) {
            return res.status(404).json({ message: "User Not Found" })
        }

        return res.status(200).json({
            message: "User found",
            userDetails: userData
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


export const followUser = async (req, res) => {

    try {
        const currentUserId = req.user._id; // this give id in object
        const targetUserId = req.params.id;   // this give id in string

        if (currentUserId.toString() === targetUserId.toString()) {
            return res.status(409).json({ message: "you cannot follow yourSelf" });
        }

        const targetUser = await User.findById(targetUserId); // checking weather the user exist in the Db 

        if (!targetUser) {
            return res.status(404).json({ message: "User Not Found" });
        }

        const alreadyFollowing = targetUser.followers.some((id) => id.toString() === currentUserId.toString()); //  checking weather the already following the user or not

        if (alreadyFollowing) {
            return res.status(409).json({ message: "You are already following this User" });
        }

        await User.findByIdAndUpdate(currentUserId, {
            $addToSet: { following: targetUserId }
        })

        await User.findByIdAndUpdate(targetUserId, {
            $addToSet: { followers: currentUserId }
        })

        return res.status(200).json({ message: "User Followed" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })

    }
}



export const unfollowUser = async (req, res) => {

    try {
        const currentUserId = req.user._id; // this give id in object
        const targetUserId = req.params.id;   // this give id in string

        if (currentUserId.toString() === targetUserId.toString()) {
            return res.status(409).json({ message: "you cannot unfollow yourSelf" });
        }

        const targetUser = await User.findById(targetUserId); // checking weather the user exist in the Db 

        if (!targetUser) {
            return res.status(404).json({ message: "User Not Found" });
        }

        await User.findByIdAndUpdate(currentUserId, {
            $pull: { following: targetUserId }
        })

        await User.findByIdAndUpdate(targetUserId, {
            $pull: { followers: currentUserId }
        })

        return res.status(200).json({ message: "User unFollowed" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })

    }
}