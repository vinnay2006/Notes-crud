const express=require('express');
const User=require("../models/User")
const router=express.Router();
const {body,validationResult}=require('express-validator');
const bcrypt=require("bcryptjs");
const jwt = require('jsonwebtoken');
var fetchuser=require('../middleware/fetchuser');
const JWT_SECRET="vinayisatruthfulperson";

//create a user using api/auth/createuser...................
router.post('/createuser',[    body('name').notEmpty().withMessage('Username is required'),
    body('email',"enter a valid email of type ").isEmail().withMessage('Email is not valid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')],async (req,res)=>{
    let success=false;
     const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    try{

    let user= await User.findOne({email:req.body.email});
    if (user){
        return res.status(400).json({success, error:"sorry a user exist" });
    }
    const salt = await bcrypt.genSaltSync(10);
     const secPass=  await bcrypt.hashSync(req.body.password, salt);
     user=await User.create({
        name:req.body.name,
        email:req.body.email,
        password:secPass
    })
    // .then(user=>res.json(user))
    // .catch(err=>{console.log("you have entered a duplicate email")
    // res.json({error:"please dont add duplicate entries"})})
    const data={
        user:{
            id:user.id
        }
    };
const authtoken=jwt.sign(data,JWT_SECRET);
success=true;
res.json({success,authtoken:authtoken});

}catch(error){
    console.error(error.message);
    res.status(500).send("some errors have taken place ")
}
})
//doing the authentication of the user  entered using/api/auth/login
router.post('/login',[  
    body('email',"enter a valid email of type ").isEmail().withMessage('Email is not valid'),
    body('password',"password cannot be blank").exists()],async (req,res)=>{
      let success=false;
     const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
const{email,password}=req.body;
try {
let user= await User.findOne({email})
if(!user){
    return res.status(400).json({ error:"please login with correct user credientials" });  
} 
const passwordcompare= await bcrypt.compare(password,user.password);
if(!passwordcompare){
  success=false
  return res.status(400).json({success ,error:"please login with correct credentials " });  
}
    const data={
        user:{
            id:user.id
        }
    };
    success=true;
const authtoken=jwt.sign(data,JWT_SECRET);
res.json({success,authtoken:authtoken});

} catch(error){
    console.error(error.message);
    res.status(500).send("some errors have taken place ")
}
})
//getting  the information  of the loggedin user 
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred");
  }
});

module.exports=router