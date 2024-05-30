import React from "react";
import {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import axios from "axios";
import InputField from "../components/InputField";
import Button from "../components/Button";

function Signin() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const {navigate} = useNavigate();

	const handleSignin = async () => {
		try {
			const res = await axios.post(
				"http://localhost:3000/api/v1/user/signin",
				{
					username: username,
					password: password,
				},
				{
					headers: {
						"Content-Type": "application/json",
						// 'Content-Length': JSON.stringify({ firstName, lastName, username, password }).length,
					},
				}
			);

			const token = res.data.token;
			localStorage.setItem("token", token);
			navigate("/dashboard");
		} catch (error) {
			console.error("Error during signin", error);
			alert(error.response?.data?.message || "Error signing you up");
		}
	};

	return (
		<div className="bg-black h-screen text-white flex flex-row justify-center">
			<div className="Card bg-gray-600 flex flex-col justify-center p-10 m-10 rounded gap-3 ">
				<p className="text-center text-6xl mb-8 font-bold underline">
					PayWallet
				</p>
				<p>Enter your credentials to access your account</p>
				<InputField
					type="text"
					label="Username"
					onChange={(e) => {
						setUsername(e.target.value);
					}}
				/>
				<InputField
					type="password"
					label="Password"
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
				<Button label="Sigin" onClick={handleSignin} />
				<div>
					<p>
						Don't have an account?{" "}
						<Link className="underline" to="/signup">
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Signin;
