const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();

const {
  getUrls,
  getUrl,
  deleteUrl,
  createUrl,
} = require("../controllers/urlController");

// @desc Get all urls
// @route GET /api/urls
// @access Public
router.get("/", asyncHandler(getUrls));

// @desc Create a url
// @route POST /api/urls
// @access Public
router.post("/", asyncHandler(createUrl));

// @desc Get url by id
// @route GET /api/urls/:id
// @access Public
router.get("/:id", asyncHandler(getUrl));

// @desc Delete url by id
// @route DELETE /api/urls/:id
// @access Public
router.delete("/:id", asyncHandler(deleteUrl));

module.exports = router;
