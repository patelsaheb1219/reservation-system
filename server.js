// Import Module
const express = require("express");
const mongoose = require("mongoose");
const Reservation = require("./Reservation");
const cors = require("cors");

// Create app Instance
const app = express();

// Declare static variable
const port = 3000;

// MongoDB connection
const connectDB = async () => {
  const connection = await mongoose.connect(
    "mongodb://localhost:27017/reservation"
  );
  console.log(`MongoDB Connected: ${connection.connection.host}`);
};

connectDB();

// Import Middlewares
app.use(express.json());
app.use(cors());

app.get("/reservations", async (req, res) => {
  try {
    const response = await Reservation.find();
    res.status(200).json({ success: true, data: response });
  } catch (e) {
    console.error(e);
  }
});

app.get("/reservations/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      return new Error("Reservation Id not found");
    }

    let reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return new Error(
        `No reservation found with the given id ${req.params.id}`
      );
    }
    res.status(200).json({ success: true, data: reservation });
  } catch (e) {
    console.error(e);
  }
});

app.post("/reservations", async (req, res) => {
  try {
    const response = await Reservation.create(req.body);
    res.status(201).json({ success: true, data: response });
  } catch (e) {
    console.error(e);
  }
});

app.put("/reservations/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      return new Error("Reservation Id not found");
    }

    let reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return new Error(
        `No reservation found with the given id ${req.params.id}`
      );
    }
    reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: reservation });
  } catch (e) {
    console.error(e);
  }
});

app.delete("/reservations/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      return new Error("Reservation Id not found");
    }

    let reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return new Error(
        `No reservation found with the given id ${req.params.id}`
      );
    }

    reservation.remove();
    res.status(200).json({ success: true, data: {} });
  } catch (e) {
    console.error(e);
  }
});

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
