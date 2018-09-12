'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (req, res, next) {
  var errors = {};
  var foodItem = req.body;

  if (!foodItem.name) {
    errors.name = 'Food item name is required';
  }
  if (!foodItem.description) {
    errors.description = 'Item Description is required';
  }
  if (!foodItem.quantity) {
    errors.quantity = 'Food Item Quantity required';
  }
  if (!foodItem.unitPrice) {
    errors.unitPrice = 'Food item unit price required';
  }

  if (Object.keys(errors).length !== 0) {
    return res.status(422).json({ errors: errors });
  }
  next();
};
//# sourceMappingURL=validateFoodItem.js.map