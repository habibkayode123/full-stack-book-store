import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import getBaseUrl from "../utils/baseURL";
import { useNavigate } from "react-router-dom";

const AdminSignup = () => {
	const [message, setMessage] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();

	const navigate = useNavigate();

	const onSubmit = async (data) => {
		try {
			// Make sure this URL matches your backend route
			const response = await axios.post(
				`${getBaseUrl()}/api/auth/admin/signup`,
				data,
				{
					headers: {
						"Content-Type": "application/json"
					}
				}
			);
			const auth = response.data;

			if (auth.token) {
				localStorage.setItem("token", auth.token);
				setTimeout(() => {
					localStorage.removeItem("token");
					alert("Token has expired! Please login again.");
					navigate("/");
				}, 3600 * 1000);
			}

			alert("Admin account created successfully!");
			navigate("/dashboard");
		} catch (error) {
			setMessage(
				error.response?.data?.message || "Failed to create admin account"
			);
			console.error(error);
		}
	};

	return (
		<div className="h-screen flex justify-center items-center">
			<div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<h2 className="text-xl font-semibold mb-4">Admin Signup</h2>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="username"
						>
							Username
						</label>
						<input
							{...register("username", { required: true })}
							type="text"
							id="username"
							placeholder="Username"
							className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="email"
						>
							Email
						</label>
						<input
							{...register("email", { required: true, pattern: /^\S+@\S+$/i })}
							type="email"
							id="email"
							placeholder="Email"
							className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="password"
						>
							Password
						</label>
						<input
							{...register("password", { required: true, minLength: 6 })}
							type="password"
							id="password"
							placeholder="Password"
							className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
						/>
					</div>
					{message && (
						<p className="text-red-500 text-xs italic mb-3">{message}</p>
					)}
					<div className="w-full">
						<button className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none">
							Sign Up
						</button>
					</div>
				</form>

				<div className="mt-4 text-center">
					<p className="text-sm text-gray-600 mb-2">Already have an account?</p>
					<button
						onClick={() => navigate("/admin")}
						className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-8 rounded focus:outline-none"
					>
						Login
					</button>
				</div>

				<p className="mt-5 text-center text-gray-500 text-xs">
					©2025 Book Store. All rights reserved.
				</p>
			</div>
		</div>
	);
};

export default AdminSignup;
