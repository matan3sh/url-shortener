const Url = require("../models/Url");

const getUrls = async (req, res) => {
  const urls = await Url.find().sort({ createdAt: -1 });
  res.status(200).json(urls);
};

const getUrl = async (req, res) => {
  const url = await Url.findById(req.params.id);
  res.status(200).json(url);
};

const deleteUrl = async (req, res) => {
  await Url.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: `${req.params.id} url has been deleted!`,
    urlId: req.params.id,
  });
};

const createUrl = async (req, res) => {
  const { baseUrl } = req.body;
  if (!baseUrl) {
    res.status(400);
    throw new Error("Invalid url data!");
  }
  const url = await Url.create(req.body);
  res.status(200).json(url);
};

module.exports = {
  getUrls,
  getUrl,
  deleteUrl,
  createUrl,
};
