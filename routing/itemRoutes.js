const express = require("express");

const { items } = require("../fakeDb");
const router = new express.Router();

/** GET /items: get list of items */
router.get("/", function (req, res) {
  return res.json({ items });
});

/** POST /items: accept JSON body, add item, and return it */
router.post("/", function (req, res) {
  const { name, price } = req.body;

  items.push({ name, price });

  return res.json({ added: { name, price } });
});

/** GET /items/:name: return single item */
router.get("/:name", function (req, res) {
  const item = items.find(item => item.name === req.params.name);

  return res.json(item);
});

/** Patch /items/:name update an item and return updated item */
router.patch("/:name", function (req, res) {
  const item = items.find(item => item.name === req.params.name);

  const newItem = req.body;

  item.name = newItem.name;
  item.price = newItem.price;

  return res.json({ updated: item });
});

/**DELETE /items/:name delete an item and return a message */
router.delete("/:name", function (req, res) {
  const itemIndex = items.findIndex(item => item.name === req.params.name);

  const removedItem = items.splice(itemIndex, 1);

  return res.json({ message: "Deleted" });
});
// /** DELETE /users/[id]: delete user, return {message: Deleted} */
// router.delete("/:id", function (req, res) {
//   db.User.delete(req.params.id);
//   return res.json({ message: "Deleted" });
// });

module.exports = router;
