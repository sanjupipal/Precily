const { json } = require("express");
const Event = require("../Model/event");

exports.create = async (req, res) => {
  const { name, age, about } = req.body;

  const newEvent = new Event({
    name,
    age,
  });
  const old = await Event.findOne({ name }).exec();
  if (old) {
    return res.status(400).json({ msg: "user exist" });
  }

  if (about) newEvent.about = about;
  newEvent.count = 1;
  try {
    const event = await newEvent.save();
    res.json(event);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.count = async (req, res) => {
  try {
    const events = await Event.find();
    total = 0;
    add = 0;
    events.map((eve) => {
      total += eve.count;
      add++;
    });
    res.json({ total, add });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.update = async (req, res) => {
  const { name, age, about } = req.body;
  const old = await Event.findOne({ name }).exec();
  if (!old) {
    return res.status(400).json({ msg: "User doesn't exists" });
  }
  old.count++;
  try {
    old.save();
    return res.json(old);
  } catch (error) {
    res.send("Server error");
  }
};
