const router = require("express").Router();
const {
  shorten,
  redirect,
  shorts,
  deleteShort,
} = require("../controllers/ShortController");

router.post("/", shorten);

router.get("/:short", redirect);

router.get("/", shorts);

router.delete("/", deleteShort);

module.exports = router;
