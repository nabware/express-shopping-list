const express = require("express");

const { items } = require("../fakeDb");
const { BadRequestError } = require("../expressError");
const { checkItem } = require("./middleware");
const router = new express.Router();

/** GET /items: get list of items */
router.get("/", function (req, res) {
  return res.json({ items });
});

/** POST /items: accept JSON body, add item, and return it */
router.post("/", function (req, res) {
  // TODO: optional chaining to check if req.body exists
  if (!req.body || !req.body.name || !req.body.price) {
    throw new BadRequestError("Missing name and/or price.");
  }

  const { name, price } = req.body;

  items.push({ name, price });

  return res.status(201).json({ added: { name, price } });
});

/** GET /items/:name: return single item */
router.get("/:name", checkItem, function (req, res) {
  // const item = items.find(item => item.name === req.params.name);
  const item = res.locals.item;

  return res.json(item);
  // return res.json(item);
});

/** Patch /items/:name update an item and return updated item */
router.patch("/:name", checkItem, function (req, res) {
  // const item = items.find(item => item.name === req.params.name);
  const item = res.locals.item;

  const newItem = req.body;

  item.name = newItem.name;
  item.price = newItem.price;

  return res.json({ updated: item });
});

/**DELETE /items/:name delete an item and return a message */
// TODO: in docstring show the expected JSON input and output
router.delete("/:name", checkItem, function (req, res) {
  const itemIndex = items.findIndex(item => item.name === req.params.name);

  items.splice(itemIndex, 1);

  return res.json({ message: "Deleted" });
});

module.exports = router;
