// import React from "react";
// import {useState} from "react";
// import {useNavigate, Link} from "react-router-dom";
// import axios from "axios";
// import Button from "../components/Button";
// import InputField from "../components/InputField";

// function Signup() {
// 	const [firstName, setFirstName] = useState("");
// 	const [lastName, setLastName] = useState("");
// 	const [username, setUsername] = useState("");
// 	const [password, setPassword] = useState("");
// 	const navigate = useNavigate();

// 	const handleSignupClick = async () => {
// 		const res = await axios.post("http://localhost:3000/api/v1/user/signup", {
// 			firstName,
// 			lastName,
// 			username,
// 			password,
// 		});

// 		const token = res.data.token;
// 		localStorage.setItem("token", token);

// 		navigate("/dashboard");
// 	};
// 	return (
// 		<div className="bg-black h-screen text-white flex flex-row justify-center">
// 			<div className="Card bg-gray-600 flex flex-col justify-center p-10 m-10 rounded gap-3 ">
// 				<p className="text-center text-6xl mb-8 font-bold underline">
// 					PayWallet
// 				</p>
// 				<h6 className="text-center text-4xl mb-0">Create a new account</h6>
// 				<h2 className="text-center mb-7 mt-0 text-xl">It's quick and easy.</h2>
// 				<div className="flex space-x-4">
// 					<InputField
// 						type="text"
// 						label="First Name"
// 						onChange={(e) => {
// 							setFirstName(e.target.value);
// 						}}
// 					/>
// 					<InputField
// 						type="text"
// 						label="Last Name"
// 						onChange={(e) => {
// 							setLastName(e.target.value);
// 						}}
// 					/>
// 				</div>
// 				<InputField
// 					label="Username"
// 					type="text"
// 					onChange={(e) => {
// 						setUsername(e.target.value);
// 					}}
// 				/>
// 				<InputField
// 					type="password"
// 					label="Password"
// 					onChange={(e) => {
// 						setPassword(e.target.value);
// 					}}
// 				/>
// 				<Button label="Signup" onClick={handleSignupClick} />
// 				<div>
// 					<p>
// 						Already have an account?{" "}
// 						<Link className="underline" to="/signin">
// 							Sign in
// 						</Link>
// 					</p>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default Signup;

//gpt
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";
import InputField from "../components/InputField";

function Signup() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSignupClick = async () => {
		try {
			const res = await axios.post("http://localhost:3000/api/v1/user/signup", {
				firstName:firstName,
				lastName:lastName,
				username:username,
				password:password,
			});

			const token = res.data.token;
			localStorage.setItem("token", token);

			navigate("/dashboard");
		} catch (error) {
			console.error("Error during signup", error);
			alert(error.response?.data?.message || "Error signing you up");
		}
	};

	return (
		<div className="bg-black h-screen text-white flex flex-row justify-center">
			<div className="Card bg-gray-600 flex flex-col justify-center p-10 m-10 rounded gap-3">
				<p className="text-center text-6xl mb-8 font-bold underline">PayWallet</p>
				<h6 className="text-center text-4xl mb-0">Create a new account</h6>
				<h2 className="text-center mb-7 mt-0 text-xl">It's quick and easy.</h2>
				<div className="flex space-x-4">
					<InputField
						type="text"
						label="First Name"
						onChange={(e) => {
                            setFirstName(e.target.value);
                            console.log(e.target.value);
                        }}
					/>
					<InputField
						type="text"
						label="Last Name"
						onChange={(e) => setLastName(e.target.value)}
					/>
				</div>
				<InputField
					type="text"
					label="Username"
					onChange={(e) => setUsername(e.target.value)}
				/>
				<InputField
					type="password"
					label="Password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button label="Signup" onClick={handleSignupClick} />
				<div>
					<p>
						Already have an account?{" "}
						<Link className="underline" to="/signin">
							Sign in
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Signup;
