const express = require("express");
const proposalsSchema = require("../Model/proposalsSchema");
const jwtMiddleware = require("../Middleware/middleWare");
const cloudinary = require("cloudinary").v2;

const router = express.Router();

router.use(express.json());

// Configure Cloudinary
cloudinary.config({
  cloud_name: "da5ptw96m",
  api_key: "543278654946695",
  api_secret: "TtHxqn9vciV6ujGFRLKr0h0r1cQ"
});

// Middleware
router.use(jwtMiddleware);

router.post("/proposals", jwtMiddleware, async (req, res) => {
  const files = req.files.images || [];

  try {
    const userId = req.user.id; // Get the authenticated user's ID from the token

    // Upload each image and collect their URLs
    const uploadPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.url);
          }
        });
      });
    });

    const imageUrls = await Promise.all(uploadPromises);

    const proposal = new proposalsSchema({
      eventName: req.body.eventName,
      placeOfEvent: req.body.placeOfEvent,
      proposalType: req.body.proposalType,
      eventType: req.body.eventType,
      budget: req.body.budget,
      fromDate: req.body.fromDate,
      toDate: req.body.toDate,
      description: req.body.description,
      foodPreferences: req.body.foodPreferences,
      events: req.body.events,
      images: imageUrls,
      createdBy: {
        _id: userId,
        name: req.user.name,
        email: req.user.email,
        contact: req.user.contact,
      },
    });

    const savedProposal = await proposal.save();
    res.status(200).json({ data: savedProposal });
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});



// Get all proposals
// router.get("/proposals", async (req, res) => {
//   try {
//     const proposals = await proposalsSchema.find().sort({ createdAt: -1 });
//     res.status(200).send({ data: proposals });
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });
// ...
router.get("/proposals", async (req, res) => {
  try {
    const userId = req.user.id; // Get the authenticated user's ID from the token
    const proposals = await proposalsSchema.find({ "createdBy._id": userId }).sort({ createdAt: -1 });
    res.status(200).send({ data: proposals });
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});



// Get a specific proposal by ID
router.get("/proposals/:id", async (req, res) => {
  try {
    const proposal = await proposalsSchema.findById(req.params.id);
    if (!proposal) {
      return res.status(404).send({ msg: "Proposal not found" });
    }
    res.status(200).send({ data: proposal });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete a proposal by ID
router.delete("/proposals/:id", async (req, res) => {
  try {
    const proposal = await proposalsSchema.findByIdAndDelete(req.params.id);
    if (!proposal) {
      return res.status(404).send({ msg: "Proposal not found" });
    }
    res.status(200).send({ data: proposal, msg: "Proposal deleted successfully" });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update a proposal by ID
router.put("/proposals/:id", async (req, res) => {
  try {
    const {
      eventName,
      placeOfEvent,
      proposalType,
      eventType,
      budget,
      fromDate,
      toDate,
      description,
      foodPreferences,
      events
    } = req.body;

    const files = req.files;
    const images = [];

    if (files && files.length > 0) {
      for (const file of files) {
        const result = await cloudinary.uploader.upload(file.path);
        images.push(result.secure_url);
      }
    }

    const updatedProposal = await proposalsSchema.findByIdAndUpdate(
      req.params.id,
      {
        eventName,
        placeOfEvent,
        proposalType,
        eventType,
        budget,
        fromDate,
        toDate,
        description,
        images,
        foodPreferences,
        events
      },
      { new: true }
    );

    if (!updatedProposal) {
      return res.status(404).send({ msg: "Proposal not found" });
    }

    res.status(200).send({ data: updatedProposal, msg: "Proposal updated successfully" });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
