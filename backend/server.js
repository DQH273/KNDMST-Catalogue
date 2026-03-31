const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/images", express.static("images"));

const filePath = path.join(__dirname, "data.json");

// GET
app.get("/api/culture", (req, res) => {
  try {
    if (!fs.existsSync(filePath)) {
      return res.status(500).json({ error: "data.json not found" });
    }

    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw || "[]");

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST
app.post("/api/culture", (req, res) => {
  const newItem = req.body;
  let data = JSON.parse(fs.readFileSync(filePath));

  newItem.id = data.length ? data[data.length - 1].id + 1 : 1;
  data.push(newItem);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.json(data);
});

// DELETE
app.delete("/api/culture/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let data = JSON.parse(fs.readFileSync(filePath));

  data = data.filter((item) => item.id !== id);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.json(data);
});

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
app.listen(PORT, () => console.log("Server running"));
