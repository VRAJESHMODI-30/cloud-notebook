const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult, header } = require("express-validator");

//ROUTE 1: Get all notes using GET "/api/notes/fetchallnotes" - Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//ROUTE 2: Add a new note with userId using POST "/api/notes/addnote" - Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter the valid data").isLength({ min: 3 }),
    body("description", "Enter the valid data").isLength({ min: 5 }),
  ],

  async (req, res) => {
    const { title, description, tag } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server ERROR!");
    }
  }
);

//ROUTE 3: Update an exsisting note of user using PUT "/api/notes/updatenote" - Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    //Create a new note
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //Find a note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server ERROR!");
  }
});

//ROUTE 4: Delete an exsisting note of user using DELETE "/api/notes/deletenote" - Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //Find a note to be deleted and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.status(202).json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server ERROR!");
  }
});

module.exports = router;
