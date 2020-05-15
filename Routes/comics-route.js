const express = require("express");
const axios = require("axios");
const uid2 = require("uid2");
const md5 = require("md5");

const router = express.Router();

const publicKey = process.env.API_PUBLIC_KEY;
const privateKey = process.env.API_PRIVATE_KEY;
const ts = uid2(16);
const hash = md5(ts + privateKey + publicKey);

router.get("/comics", async (req, res) => {
  try {
    const offset = req.headers.offset;
    const comics = await axios.get(
      `https://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=100&offset=${offset}&orderBy=title`
    );
    return res.json(comics.data);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = router;
