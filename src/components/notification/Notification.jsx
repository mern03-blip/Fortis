// import { useState, useEffect } from "react";
// import {
//   Popover,
//   Badge,
//   Typography,
//   List,
//   //  Avatar,
//   Empty,
// } from "antd";
// import { RiNotification2Line } from "react-icons/ri";
// import {
//   fetchNotifications,
//   markAllAsRead,
// } from "../../firebase/collection/noticeForAdmin";
// import { GoBell } from "react-icons/go";

// // const capitalizeName = (name) => {
// //   if (!name) return "";
// //   return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
// // };

// const Notification = () => {
//   const [notifications, setNotifications] = useState([]);
//   // console.log(notifications);
//   useEffect(() => {
//     const getNotifications = async () => {
//       try {
//         const data = await fetchNotifications();
//         setNotifications(data.filter((notification) => !notification.isRead));
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//       }
//     };

//     getNotifications();
//   }, []);

//   const handleMarkAllAsRead = async () => {
//     try {
//       await markAllAsRead();
//       setNotifications((prevNotifications) =>
//         prevNotifications.map((notif) => ({ ...notif, isRead: true }))
//       );
//     } catch (error) {
//       console.error("Error marking all notifications as read:", error);
//     }
//   };

//   const content = (
//     <div className="w-[280px]">
//       <div className="flex justify-between items-center">
//         <Typography className="text-h4 font-b6 font-custom">
//           Notifications
//         </Typography>
//         {notifications.length > 0 ? (
//           <Typography
//             className="text-[10px] font-custom underline text-blue-400 cursor-pointer hover:text-[11px]"
//             onClick={handleMarkAllAsRead}
//           >
//             Mark all as read
//           </Typography>
//         ) : null}
//       </div>
//       {notifications.length > 0 ? (
//         <List
//           className="flex flex-col gap-2 p-2"
//           dataSource={notifications}
//           renderItem={(item) => (
//             <List.Item className="p-2 border border-[#E9E9E9] rounded-md flex items-start mb-2">
//               <div className="flex items-center">
//                 {/* <Avatar className="bg-secondaryColor mr-3 w-10">
//                   {capitalizeName(item.name).charAt(0)}
//                 </Avatar> */}
//                 <div>
//                   <Typography className="font-b5 text-text1">
//                     {item.title}
//                   </Typography>
//                   <Typography className="text-[#A4A4A4]">
//                     {item.service}
//                   </Typography>
//                 </div>
//               </div>
//               <Typography className="text-[#316FB5] text-text2">
//                 {item.time}
//               </Typography>
//             </List.Item>
//           )}
//         />
//       ) : (
//         <Empty className="text-center text-gray-500" />
//       )}
//     </div>
//   );

//   return (
//     <div>
//       <Popover
//         content={content}
//         trigger="click"
//         placement="bottomRight"
//         arrowPointAtCenter
//       >

//         <div className="border-custom h-10 w-10  p-2 bg-bgColor cursor-pointer">
//           <Badge
//             count={notifications.filter((notif) => !notif.isRead).length}
//             showZero
//             overflowCount={99}
//             style={{ backgroundColor: "#E53935", color: "#fff" }}
//           >
//             <GoBell className="text-[#9CCC5A] w-[25px] h-[25px] text-h4" />
//           </Badge>
//         </div>
//       </Popover>
//     </div>
//   );
// };

// export default Notification;
