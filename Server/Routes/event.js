const express = require("express");

const router = express.Router();

// validators
const { eventCreateValidator } = require("../validator/event");

//middleware
const { runValidation } = require("../validator/index");

// function
const { create, update, count } = require("../Controller/event");

//routes
router.post("/event", eventCreateValidator, runValidation, create);
router.put("/event", eventCreateValidator, runValidation, update);
router.get("/event", count);

module.exports = router;
