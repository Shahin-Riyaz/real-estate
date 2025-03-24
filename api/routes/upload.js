import express from "express";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/", upload.single("image"), (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ success: false, message: "Image upload failed" });
    }

    res.status(200).json({
      success: true,
      imageUrl: req.file.path, 
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
