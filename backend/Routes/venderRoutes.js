const express = require("express");
const venderSchema = require("../Model/venderSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const middleware = require("../Middleware/middleWare");

const router = express.Router();
router.use(express.json());

router.post("/vender/register", async (req, res) => {
  try {
    const { name, email, contact, password, confirmPassword } = req.body;

    const exist = await venderSchema.findOne({ $or: [{ email }, { contact }] });
    if (exist) {
      return res.status(400).send("User Already Exists");
    }

    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await venderSchema.create({
      name,
      email,
      contact,
      password: hashPassword,
      confirmPassword: hashPassword,
    });

    res.status(201).send("Registration Successful");
  } catch (err) {
    console.error(err);
    res.status(400).send(`Registration Failed: ${err.message}`);
  }
});



router.post("/vender/login", async (req, res) => {
  try {
    const { contact, password } = req.body;

    const exists = await venderSchema.findOne({ contact });
    if (!exists) {
      return res.status(400).json({ msg: "User Not Found" });
    }

    const isMatch = await bcrypt.compare(password, exists.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const payload = {
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
        return res.json({ token, msg: "Login Successful" });
      }
    );
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
});

router.get("/vender/profile", middleware, async (req, res) => {
  try {
    const user = await venderSchema.findById(req.user.id);
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

module.exports = router;
