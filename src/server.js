const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Sample data (replace this with your actual data)
let uploadedData = [];

// Endpoint to get the uploaded data
app.get("/api/data", (req, res) => {
  res.json(uploadedData);
});

// Endpoint to update the uploaded data
app.put("/api/data", (req, res) => {
  uploadedData = req.body;
  res.status(200).json({ message: "Data updated successfully." });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
