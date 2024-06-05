import {useSearchParams} from "react-router-dom";
import axios from "axios";
import InputField from "../components/InputField";
import SendMoneyButton from "../components/SendMoneyButton";
import {useState} from "react";

function SendMoney() {
	const [searchParams] = useSearchParams();
	const [amount, setAmount] = useState("");
	const id = searchParams.get("id");
	const fName = searchParams.get("fName");
	const lName = searchParams.get("lName");
	const username = searchParams.get("username");

	return (
		<div className="bg-black h-screen text-white flex flex-row justify-center">
			<div className="Card bg-gray-600 flex flex-col justify-center p-10 m-10 rounded gap-3 ">
				<p className="text-center text-6xl mb-8 font-bold underline">
					PayWallet
				</p>
				<div className="text-3xl font-bold text-center underline">
					To : {fName} {lName}{" "}
				</div>
				<div className="receiver text-small no-underline">
					{username} {id}
				</div>

				<InputField
					label="Amount"
					type="text"
					onChange={(e) => {
						setAmount(e.target.value);
					}}
				/>
				<SendMoneyButton
					onClick={() => {
						axios.post(
							"http://localhost:3000/api/v1/userAccount/transfer",
							{
								toAcc: id,
								amount: amount,
							},
							{
								headers: {
									Authorization: "Bearer " + localStorage.getItem("token"),
								},
							}
						);
                        alert("transaction successfull")
					}}
                    
				/>
			</div>
		</div>
	);
}

export default SendMoney;
