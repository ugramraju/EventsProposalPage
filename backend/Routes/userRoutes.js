const express = require("express");
const userSchema = require("../Model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const middleware = require("../Middleware/middleWare")
const router = express.Router();
const proposalsSchema = require("../Model/proposalsSchema");
const User = require("../Model/venderSchema")
router.post("/user/register", async(req,res)=>{
    try{
        const{name,email,contact,password,confirmPassword} = req.body;
        let exist = await userSchema.findOne({ $or: [{ email }, { contact }] });
        if(exist){
            return res.status(400).send("User Already Exists")
        }
        if(password !== confirmPassword){
            return res.status(400).send("passwords not matching")
        }
        //pasword hashing
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await userSchema.create({
            name,
            email,
            contact,
            password: hashPassword,
            confirmPassword: hashPassword
        });
        res.status(201).send("Registration Successfully")
    }
    catch(err){
        console.log(err);
        res.status(400).send("registration Failed")
    }
})
router.post("/user/login", async (req, res) => {
    try {
      const { contact, password } = req.body;
      let exists = await userSchema.findOne({ contact });
      if (!exists) {
        return res.status(400).json({ msg: "User Not Found" });
      }
      const isMatch = await bcrypt.compare(password, exists.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      let payload = {
        user: {
          id: exists.id,
        },
      };
      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) throw err;
          return res.json({ token, msg: "Login Successfully" });
        }
      );
    } catch (err) {
      console.error(err);
      return res.status(500).send("Server Error");
    }
});
router.get("/user/profile", middleware, async (req, res) => {
    try {
      const user = await userSchema.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // Exclude sensitive information like password
      res.json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server Error" });
    }
  });
  router.get("/getproposals", async (req, res) => {
    try {
      const proposals = await proposalsSchema
        .find()
        .sort({ createdAt: -1 })
        .populate({
          path: "createdBy",
          select: "name",
        });
  
      res.status(200).send({ data: proposals });
    } catch (err) {
      console.error(err);  
      res.status(400).send(err);
    }
  });
  
  
  
  router.get("/getproposals/:id", async (req, res) => {
    try {
      const proposal = await proposalsSchema.findById(req.params.id)
        .populate("createdBy", "name email contact");
  
      if (!proposal) {
        return res.status(404).send({ msg: "Proposal not found" });
      }
  
      const { createdBy } = proposal;
      const user = await User.findById(createdBy);
  
      if (!user) {
        return res.status(404).send({ msg: "User not found" });
      }
  
      const { name, email, contact } = user;
  
      res.status(200).send({ data: { ...proposal._doc, createdBy: { name, email, contact } } });
    } catch (err) {
      res.status(400).send(err);
    }
  });
  
module.exports = router;