// import { useLocation, Link } from "react-router-dom";
// import { useState } from "react";
// import { ActiveBot, ActiveFolder, ActiveGear, ActiveGrid, ActiveSquareList, Arrow, Block, Bot, Folder, Gear, Logo2, SquareList } from "../../assets/image";
// import Logout from "../../components/modals/Logout";
// import { useNavigate } from "react-router-dom";
// import "./sidebar.scss";

// const sidebarItems = [
//   {
//     name: "Dashboard",
//     icon: Block,
//     activeIcon: ActiveGrid,
//     link: "/",
//     paths: ["/", "/userDetail", "/editUserDetail"],
//   },
//   {
//     name: "My Watchlist",
//     icon: SquareList,
//     activeIcon: ActiveSquareList,
//     link: "/watchlist",
//     paths: ["/watchlist"],
//   },
//   {
//     name: "My Applications",
//     icon: Folder,
//     activeIcon: ActiveFolder,
//     link: "/application",
//     paths: ["/application"],
//   },
//   {
//     name: "AI Recommended",
//     icon: Bot,
//     activeIcon: ActiveBot,
//     link: "/recommanded",
//     paths: ["/recommanded"],
//   },
//   {
//     name: "Settings",
//     icon: Gear,
//     activeIcon: ActiveGear,
//     link: "/settings",
//     paths: ["/settings"],
//   },
//   {
//     name: "Logout",
//     icon: Arrow,
//     isLogout: true,
//   },
// ];

// const Sidebar = () => {
//   const location = useLocation();
//   const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
//   const navigate = useNavigate();

//   const isActiveRoute = (item) => {
//     if (!item.paths) return false;
//     if (location.pathname === "/" && item.link === "/") {
//       return true;
//     }
//     return item.paths.some((path) => {
//       if (path === "/") return false;
//       return location.pathname.startsWith(path);
//     });
//   };

//   const handleLogout = () => {
//     // Remove the token from localStorage
//     localStorage.removeItem("token");

//     // Redirect the user to the login page
//     navigate("/auth");
//   };

//   const showLogoutModal = () => {
//     setIsLogoutModalOpen(true);
//   };

//   const closeLogoutModal = () => {
//     setIsLogoutModalOpen(false);
//   };


//   return (
//     <div className="h-full bg-whiteColor text-white w-[100%]">
//       <div className="text-center py-3 mb-4">
//         <img className="mx-auto w-[230px] h-[autopx]" src={Logo2} alt="Logo" />
//       </div>
//       <ul>
//         {sidebarItems.map((item, index) => (
//           <li key={index} className="mb-4 mx-8 relative font-custom">
//             {item.isLogout ? (
//               <a
//                 href="#"
//                 onClick={showLogoutModal}
//                 className={`flex items-center text-text1 font-b5 p-3 rounded-[.5rem] text-descColor hover:bg-mainColor hover:text-whiteColor`}
//               >
//                 <img className="mr-3 w-6" src={item.icon} alt={item.name} />
//                 {item.name}
//               </a>
//             ) : (
//               <Link
//                 to={item.link}
//                 className={`flex items-center text-text1 font-b5 p-3  rounded-[.5rem] text-descColor
//                 before-class ${isActiveRoute(item)
//                     ? "bg-mainColor text-whiteColor font-b6 text-[18px] rounded-[.5rem] active"
//                     : ""
//                   }`}
//               >
//                 <img
//                   src={isActiveRoute(item) ? item.activeIcon : item.icon}
//                   alt={item.name}
//                   className="w-5 h-5 mr-2"
//                 />
//                 {item.name}
//               </Link>
//             )}
//           </li>
//         ))}
//       </ul>
//       <Logout
//         open={isLogoutModalOpen}
//         handleOk={handleLogout} // Handle the logout action here
//         handleCancel={closeLogoutModal}
//       />
//     </div>
//   );
// };

// export default Sidebar;
