const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
const path = require("path");

app.use(express.json()); // Middleware to parse JSON
app.use(express.static("public")); // Serve static files (HTML, CSS, JS)

app.get("/reset-password/:token", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "reset-password.html"));
});

const USERS_DB_PATH = "../db.json"; // Adjust based on your project structure

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "ivonnenabangala@gmail.com", // Replace with your email
        pass: "wyyo hajx lnqq zeac",   
    },
});

// Read users from JSON file
const readUsers = () => {
    return JSON.parse(fs.readFileSync(USERS_DB_PATH, "utf8")).users || [];
};

// Write users to JSON file
const writeUsers = (users) => {
    const dbData = JSON.parse(fs.readFileSync(USERS_DB_PATH, "utf8"));
    dbData.users = users;
    fs.writeFileSync(USERS_DB_PATH, JSON.stringify(dbData, null, 2));
};

// Send verification email
app.post("/send-verification", (req, res) => {
    const { email } = req.body;
    const users = readUsers();
    const user = users.find((u) => u.email === email);

    if (!user) return res.status(404).json({ message: "User not found" });

    const verificationLink = `http://localhost:5000/verify-email/${user.token}`;

    const mailOptions = {
        from: "ivonnenabangala@gmail.com",
        to: email,
        subject: "Verify Your Account",
        text: `Click the link to verify your account: ${verificationLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: "Error sending email", error });
        }
        res.json({ message: "Verification email sent", info });
    });
});

// Verify email
app.get("/verify-email/:token", (req, res) => {
    const { token } = req.params;
    const users = readUsers();
    const userIndex = users.findIndex((u) => u.token === token);

    if (userIndex === -1) {
        return res.status(404).json({ message: "Invalid token" });
    }

    users[userIndex].isActive = true;
    delete users[userIndex].token;
    writeUsers(users);

    res.send(`
        <html>
        <head><title>Email Verification</title></head>
        <body style="text-align:center; font-family:Arial, sans-serif;">
            <h2 style="color:green;">Email Verified Successfully!</h2>
            <p>You can now <a href="http://127.0.0.1:5500/">log in</a> to your account.</p>
        </body>
        </html>
    `);
});

// Send password reset link
app.post("/send-reset-link", (req, res) => {
    console.log("Received request to send password reset link");
    
    const { email } = req.body;
    const users = readUsers();
    const user = users.find((u) => u.email === email);

    if (!user) return res.status(404).json({ message: "Email not registered" });

    const resetToken = uuidv4();
    user.resetToken = resetToken;
    writeUsers(users);

    const resetLink = `http://localhost:5000/reset-password/${resetToken}`;

    const mailOptions = {
        from: "ivonnenabangala@gmail.com",
        to: email,
        subject: "Password Reset",
        text: `Click here to reset your password: ${resetLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: "Error sending email", error });
        }
        res.json({ message: "Reset link sent to your email", info });
    });
});

app.get("/reset-password/:token", (req, res) => {
    res.sendFile(__dirname + "/reset-password.html"); // Serve a password reset form
});


// Reset password
app.post("/reset-password/:token", (req, res) => {
    console.log("Received request to reset password");
    console.log("Token:", req.params.token);
    console.log("Request Body:", req.body);

    const { token } = req.params;
    const { newPassword } = req.body;
    const users = readUsers();

    const userIndex = users.findIndex((u) => u.resetToken === token);
    if (userIndex === -1) {
        console.log("Invalid token:", token);
        return res.status(404).json({ message: "Invalid token" });
    }

    users[userIndex].password = newPassword;
    delete users[userIndex].resetToken;
    writeUsers(users);

    res.json({ message: "Password has been reset successfully." });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
