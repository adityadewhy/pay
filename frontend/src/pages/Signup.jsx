import React from "react";
import InputField from "../components/InputField"; // Adjust the path as needed

function Signup() {
    return (
        <div className="bg-black h-screen text-white flex flex-row justify-center">
            <div className="Card bg-gray-600 flex flex-col justify-center p-10 m-10 rounded gap-3 ">
                <h6 className="text-center text-4xl">Signup</h6>
                <h2 className="text-center mb-10 text-xl">Enter your details below</h2>
                <div className="flex space-x-4">
                    <InputField label="First Name" />
                    <InputField label="Last Name" />
                </div>
                <InputField label="Email" />
                <InputField label="Username" />
                <InputField label="Password" />
            </div>
        </div>
    );
}

export default Signup;
