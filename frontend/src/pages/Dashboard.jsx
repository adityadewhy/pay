// function Dashboard() {
//     let userBalance = 1000;
// 	return (
// 		<div>
// 			<div className="bg-black h-screen text-white flex flex-row justify-center">
// 				<div className="Card bg-gray-600 flex flex-col justify-center p-10 m-10 rounded gap-3 w-full relative">
//                     <div className="banner flex justify-between mb-8 mt-5 ml-5 mr-5 h-14 border-4 border-pink-300 absolute top-0 right-10 left-10 "> 
//                         <div className="left flex flex-row justify-between h-full  border border-white"> 
//                             <img src="logo.png" alt="logo" className="h-full mr-3 border border-red-600 " /> 
//                             <p className="text-6xl font-bold  h-full border border-blue-400 ">
// 						        PayWallet
// 					        </p>
                    
//                          </div>
//                          <div className="right text-4xl h-full text-center underline">
//                             Hello UserName
//                          </div>
                    
//                     </div>
// 					<h6 className="dashboard-heading text-4xl border border-black absolute top-20 right-10 left-10 flex justify-center">Dashboard</h6>
//                     <p>Your balance : {userBalance}</p>

// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default Dashboard;

function Dashboard() {
    let userBalance = 1000;
	return (
		<div>
			<div className="bg-black h-screen text-white flex flex-row justify-center">
				<div className="Card bg-gray-600 flex flex-col justify-start p-10 pt-6 m-10 rounded gap-3 w-full">
                    <div className="banner flex justify-between mb-0 mt-0 ml-5 mr-5 h-14"> 
                        <div className="left flex flex-row justify-between h-full"> 
                            <img src="logo.png" alt="logo" className="h-full mr-3"/> 
                            <p className="text-6xl font-bold  h-full">
						        PayWallet
					        </p>
                         </div>
                         <div className="right text-4xl h-full text-center underline">
                            Hello UserName
                         </div>
                    
                    </div>
                    <hr class="h-px my-8 mt-1 bg-gray-200 border-1 dark:bg-gray-700"/>

					<h6 className="dashboard-heading text-4xl flex justify-center mb-8 font-bold">Dashboard</h6>
                    <p className="userbalance text-2xl font-bold">Your balance : {userBalance}</p>

				</div>
			</div>
		</div>
	);
}

export default Dashboard;
