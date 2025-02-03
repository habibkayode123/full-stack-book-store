const express = require("express");
const app = express();
const cors = require("cors");
const uri =
	"mongodb+srv://habibkayodenew:Chd83ZmCjakx51ad@cluster0.peeye.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const mongoose = require("mongoose");
const port = process.env.PORT || 5001;
require("dotenv").config();

// middleware
app.use(express.json());
app.use(cors());

// routes
const bookRoutes = require("./src/books/book.route");
const orderRoutes = require("./src/orders/order.route");
const userRoutes = require("./src/users/user.route");
const adminRoutes = require("./src/stats/admin.stats");

app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

async function main() {
	await mongoose.connect(uri);
	app.use("/", (req, res) => {
		res.send("Book Store Server is running!");
	});
}

main()
	.then(() => console.log("Mongodb connect successfully!"))
	.catch((err) => console.log(err));

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
