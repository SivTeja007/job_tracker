const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async(req, res) =>{
    try{
        const { name, email , password } = req.body;

        const exists = await User.findOne({email});
            if(exists) return res.status(401).json({message : "email already exists"});

        const hashed = await bcrypt.hash(password, 10)
        
        await User.create({ name , email , password:hashed });
        
        res.status(201).json({message : "User created successfully"})
    }
    catch(err){
        res.status(500).json({ message : err.message})
    }
    };


exports.login = async(req,res) => {
    try{
        const {email, password} = req.body;

        const exists = await User.findOne({email});
        if(!exists) return res.status(400).json({message : "email not fount"});
        
        const match = await bcrypt.compare(password, exists.password);
        if (!match) return res.status(400).json({ message: "Wrong password" });
            
        const token = jwt.sign({ id: exists._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.json({ token });
        }
        catch(err){
            res.status(500).json({ message: err.message });
        }


}; 

