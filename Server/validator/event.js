const { check } = require("express-validator");

exports.eventCreateValidator = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("age").not().isEmpty().withMessage("age is required"),
];
