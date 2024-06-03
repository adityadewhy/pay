import axios from "axios";
import {useEffect, useState} from "react";
import Users from "../components/Users";

function Dashboard() {
	const [userBalance, setUserBalance] = useState("");
	const [wait, setWait] = useState(true);

	useEffect(() => {
		const fetchBalance = async () => {
			try {
				const token = localStorage.getItem("token");
				const res = await axios.get(
					"http://localhost:3000/api/v1/userAccount/balance",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setUserBalance(res.data.balance);
				setWait(false);
			} catch (error) {
				setUserBalance("error fetching balance");
				setWait(false);
			}
		};
		fetchBalance();
	}, []);

	if (wait) {
		return <div> Fetching balance... </div>;
	}

	return (
		<div>
			<div className="bg-black h-screen text-white flex flex-row justify-center">
				<div className="Card bg-gray-600 flex flex-col justify-start p-10 pt-6 m-10 rounded gap-3 w-full">
					<div className="banner flex justify-between mb-0 mt-0 ml-5 mr-5 h-14">
						<div className="left flex flex-row justify-between h-full">
							<img src="logo.png" alt="logo" className="h-full mr-3" />
							<p className="text-6xl font-bold  h-full">PayWallet</p>
						</div>
						<div className="right text-4xl h-full text-center underline">
							Hello UserName
						</div>
					</div>
					<hr className="h-px my-8 mt-1 bg-gray-200 border-1 dark:bg-gray-700" />

					<h6 className="dashboard-heading text-4xl flex justify-center mb-8 font-bold">
						Dashboard
					</h6>
					<p className="userbalance text-2xl font-bold">
						Your balance : ₹ {userBalance}
					</p>

					<Users />
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
