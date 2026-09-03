
import User from "../models/user.model.js"
import bcrypt from "bcrypt";
import gentoken from "../utils/gentoken.js";

const cookieOptions = {
    httpOnly: true,
    // we have to avoid XSS and CSRF attacks
}

export const registerUser = async (req, res) => {

    const { name, username, email, password } = req.body

    // validation 
    try {
        if (!username || !name || !email || !password) {
            return res.status(422).json({ message: 'All fields Required' })
        }

        // if user exist 

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
        res.status(200).json(newUser)


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
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

        res.status(200).json({
            message: "Login Successful",
            user: userExist,
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Intenal Server Error" }, error)
    }
}

export const getuser = (req, res) =>{
    res.status(200).json(req.user)
}

export const logoutUser = (req, res) =>{
   res.clearCookie("token")
   res.status(200).json({message: "Logout Successful"})
}