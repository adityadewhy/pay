import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import SendMoneyButton from "./SendMoneyButton";

const Users = () => {
	const [users, setUsers] = useState([]);
	const [filter, setFilter] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const token = localStorage.getItem("token");
				const res = await axios.get(
					"http://localhost:3000/api/v1/user/bulk?filter=" + filter,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setUsers(res.data.users);
				console.log("users state:", users);
			} catch (err) {
				console.log(err);
			}
		};
		fetchUsers();
	}, [filter]);

	return (
		<div>
			<div className="searchBar">
				<input
					type="text"
					placeholder="Search users.. "
					className="w-full px-2 py-1 border rounded border-slate-200 mb-2 text-black"
					onChange={(e) => {
						setFilter(e.target.value);
					}}
				/>
			</div>
			<div className="userslist">
				Users List:
				<ul>
					{users.length > 0 ? (
						users.map((user) => (
							<li
								key={user.id}
								className="usersList text-1xl font-bold flex flex-row justify-between items-center"
							>
								<div>
									{user.firstName} {user.lastName} ({user.username})
								</div>
								<SendMoneyButton
									onClick={(e) => {
										navigate(
											"/sendmoney?id=" +
												user._id +
												"&fName=" +
												user.firstName +
												"&lName=" +
												user.lastName +
												"&username=" +
												user.username
										);
									}}
								/>
							</li>
						))
					) : (
						<p>No users found</p>
					)}
				</ul>
			</div>
		</div>
	);
};

export default Users;
