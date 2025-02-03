const express = require("express");
const User = require("./user.model");
const jwt = require("jsonwebtoken");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET_KEY;

router.post("/admin", async (req, res) => {
	const { username, password } = req.body;

	// Check for hard-coded admin credentials
	if (username === "admin" && password === "admin123") {
		const token = jwt.sign(
			{ id: "default-admin", username: "admin", role: "admin" },
			JWT_SECRET,
			{ expiresIn: "1h" }
		);

		return res.status(200).json({
			message: "Authentication successful",
			token: token,
			user: {
				username: "admin",
				role: "admin"
			}
		});
	}

	try {
		const admin = await User.findOne({ username });
		console.log("first admin found", admin);
		if (!admin) {
			res.status(404).send({ message: "Admin not found!" });
		}
		console.log(admin.password !== password, "comparing password", password);
		if (admin.password !== password) {
			res.status(401).send({ message: "Invalid password!" });
		}

		const token = jwt.sign(
			{ id: "admin._id.toString()", username: admin.username, role: "admin" },
			JWT_SECRET,
			{ expiresIn: "1h" }
		);

		return res.status(200).json({
			message: "Authentication successful",
			token: token,
			user: {
				username: admin.username,
				role: admin.role
			}
		});
	} catch (error) {
		console.error("Failed to login as admin", error);
		res.status(401).send({ message: "Failed to login as admin" });
	}
});

router.post("/admin/signup", async (req, res) => {
	const { username, password, email } = req.body;
	console.log("Received signup request:", { username, email }); // Debug log

	try {
		// Check if admin already exists
		const existingAdmin = await User.findOne({
			$or: [{ username }, { email }]
		});
		console.log("Existing admin check:", existingAdmin); // Debug log

		if (existingAdmin) {
			return res
				.status(400)
				.json({ message: "Username or email already exists" });
		}

		// Create new admin
		const newAdmin = new User({
			username,
			password,
			email,
			role: "admin"
		});

		await newAdmin.save();

		const token = jwt.sign(
			{ id: newAdmin._id, username: newAdmin.username, role: newAdmin.role },
			JWT_SECRET,
			{ expiresIn: "1h" }
		);

		return res.status(201).json({
			message: "Admin created successfully",
			token,
			user: {
				username: newAdmin.username,
				role: newAdmin.role
			}
		});
	} catch (error) {
		console.error("Failed to create admin - Detailed error:", error); // Enhanced error logging
		res.status(500).json({ message: "Failed to create admin" });
	}
});

module.exports = router;
