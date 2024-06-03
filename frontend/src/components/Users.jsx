import axios from "axios";
import {useEffect, useState} from "react";

const Users = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const token = localStorage.getItem("token");
				const res = await axios.get("http://localhost:3000/api/v1/user/bulk", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				setUsers(res.data.users);
				console.log("users state:", users);
			} catch (err) {
				console.log(err);
			}
		};
		fetchUsers();
	}, []);

	return (
		<div>
			<div className="searchBar">
				<input
					type="text"
					placeholder="Search users.. "
					className="w-full px-2 py-1 border rounded border-slate-200 mb-2"
				/>
			</div>
			<div className="userslist">
                Users List:
                <ul>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <li key={user.id}>
                                {user.firstName} {user.lastName} ({user.username})
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
