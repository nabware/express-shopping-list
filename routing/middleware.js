const { NotFoundError } = require("../expressError");

const { items } = require("../fakeDb");

/** Check that name param item exists */

function checkItem(req, res, next) {
  const item = items.find(item => item.name === req.params.name);

  if (!item) {
    throw new NotFoundError("Not found.");
  }

  res.locals.item = item;

  return next();
}

module.exports = { checkItem };