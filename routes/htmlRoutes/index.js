const path = require("path");
const router = require("express").Router();

// Will direct to the notes.html file for the (base url)/notes
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/notes.html"));
});

// Will direct to the index.html file for anything other than the (base url)/notes
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});

module.exports = router;