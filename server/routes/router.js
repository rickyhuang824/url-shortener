const router = require("express").Router();
const validUrl = require("valid-url");
const ShortUrl = require("../models/ShortUrl");

router.get("/", async (req, res) => {
  try {
    const urls = await ShortUrl.find();
    res.status(200).json(urls);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:shortUrl", async (req, res) => {
  try {
    const shortUrl = await ShortUrl.findOne({ shortUrl: req.params.shortUrl });
    if (shortUrl) {
      return res.status(200).redirect(shortUrl.fullUrl);
    } else {
      return res.status(404).json("No URL Found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/shorten", async (req, res) => {
  if (!validUrl.isUri(req.body.url)) res.status(401).json("Invalid URL");

  try {
    const newShortUrl = new ShortUrl({ fullUrl: req.body.url });
    savedShortUrl = await newShortUrl.save();
    res.status(201).json(savedShortUrl);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
