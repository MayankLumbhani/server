const express = require("express");

const app = express();

const users = [
  { id: 1, name: "Mayank", role: "student" },
  { id: 2, name: "Jalak", role: "mentor" },
  { id: 3, name: "Jaydeep", role: "student" },
  { id: 4, name: "Arjun", role: "student" },
  { id: 5, name: "Priyesha", role: "mentor" }
];

app.get("/", (req, res) => {
  res.send("My name is Mayank");
});

app.get("/users", (req, res) => {
  res.status(200).json(users);
});

app.get("/users/test/:user_id", (req, res) => {
    console.log("This is req",req.params);
    console.log("This is req",req);
  res.status(200).json(users);
     
});

app.get("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});