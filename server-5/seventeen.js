const express = require("express");

const app = express();

app.use(express.json());

const users = [
    { "attendence": 80, "uid": 108618, "total_sub": 14, "bonus": 20, "name": "Mayank" },
    { "attendence": 75, "uid": 108616, "total_sub": 14, "bonus": 25, "name": "Dhvanit" }
];

app.get("/", (req, res) => {
    res.status(200).json(users);
});

app.get("/users/:uid", (req, res) => {
    const userId = Number(req.params.uid);
    const user = users.find(u => u.uid === userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
});

app.post("/users/:uid", (req, res) => {
    const newUser = {
        attendence: req.body.attendence,
        uid: req.body.uid,
        total_sub: req.body.total_sub,
        bonus: req.body.bonus,
        name: req.body.name
    };

    users.push(newUser);

    res.status(201).json({
        message: "User created",
        user: newUser
    });
});

app.put("/users/:uid", (req, res) => {
    const userId = Number(req.params.uid);
    const index = users.findIndex(u => u.uid === userId);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users[index] = {
        attendence: req.body.attendence,
        uid: userId,
        total_sub: req.body.total_sub,
        bonus: req.body.bonus,
        name: req.body.name
    };

    console.log(req.body);

    res.status(200).json({
        message: "User replaced",
        user: users[index]
    });
});

app.patch("/users/:uid", (req, res) => {
  const userId = Number(req.params.uid);
  const user = users.find(u => u.uid === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (req.body.attendence) user.name = req.body.attendence;
  if (req.body.total_sub) user.role = req.body.total_sub;
  if (req.body.total_sub) user.role = req.body.total_sub;

  res.status(200).json({
    message: "User updated",
    user
  });
});

app.delete("/users/:uid", (req, res) => {
  const userId = Number(req.params.uid);
  const index = users.findIndex(u => u.uid === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);

  res.status(204).end();
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});

