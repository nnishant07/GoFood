const express= require('express')
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret="e2iukjlwaJJJJJKJJKFJSKSJDFKDJJDSKAFSJFF";

router.post("/createuser",[body('email').isEmail(), body('password').isLength({min:5})] ,async (req,res) =>{
    try {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password,salt);

        await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location
        })


        res.json({success:true});
    } catch (error) {
        console.log(error)
        res.json({success:false});
    }
})

router.post("/login",[body('email').isEmail(), body('password').isLength({min:5})],async (req,res) =>{
    let email=req.body.email;
    let password=req.body.password;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
        let userData=await User.findOne({email});

        if(!userData){
            return res.status(400).json({errors: "Please enter valid email"});
        }
        
        const pwdCompare = await bcrypt.compare(password,userData.password);
        if(!pwdCompare){
            return res.status(400).json({errors: "Incorrect password"});
        }

        const data = {
            user: {
                id: userData.id,
            }
        }
        const authToken = jwt.sign(data,jwtSecret);
        res.json({success:true,authToken:authToken});
    } catch (error) {
        console.log(error)
        res.json({success:false});
    }
})




module.exports = router;