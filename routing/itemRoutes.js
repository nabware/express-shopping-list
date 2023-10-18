const express = require("express");

const { items } = require("../fakeDb");
const router = new express.Router();

/** GET /items: get list of items */
router.get("/", function (req, res) {
  return res.json({ items });
});

/** POST /items: accept JSON body, add item, and return it */
router.post("/", function(req, res) {
  const { name, price } = req.body;

  items.push({ name, price });

  return res.json({ added: { name, price }});
});

/** GET /items/:name: return single item */
router.get("/:name", function (req, res) {
  const item = items.find(item => item.name === req.params.name);

  return res.json(item);
});

// /** DELETE /users/[id]: delete user, return {message: Deleted} */
// router.delete("/:id", function (req, res) {
//   db.User.delete(req.params.id);
//   return res.json({ message: "Deleted" });
// });

module.exports = router;