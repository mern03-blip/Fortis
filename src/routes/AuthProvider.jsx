// import { createContext, useContext, useState } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const login = () => setIsAuthenticated(true);
//   const logout = () => setIsAuthenticated(false);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


// AuthContext.jsx

// import { createContext, useContext, useState, useEffect } from "react";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { auth } from "../firebase/config/firebase"; // Assuming this is the correct path

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true); // New state for initial loading
//   const [currentUser, setCurrentUser] = useState(null); // To store Firebase user object

//   // Listen for authentication state changes (The best way to manage session)
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         // User is signed in (token is valid and active)
//         setCurrentUser(user);
//         setIsAuthenticated(true);
//         // Optional: Ensure token is in local storage for external checks
//         const token = await user.getIdToken();
//         localStorage.setItem("token", token);
//       } else {
//         // User is signed out or token expired
//         setCurrentUser(null);
//         setIsAuthenticated(false);
//         localStorage.removeItem("token"); // Clean up localStorage on logout
//       }
//       setLoading(false);
//     });

//     // Cleanup subscription on component unmount
//     return () => unsubscribe();
//   }, []);

//   // Function to explicitly log out
//   const logout = async () => {
//     try {
//       await signOut(auth);
//       // State and local storage are cleaned up by the onAuthStateChanged listener above
//       message.success("Logged out successfully.");
//     } catch (error) {
//       console.error("Logout Error:", error);
//       message.error("Failed to log out.");
//     }
//   };

//   // The login function is handled in the Login component using signInWithEmailAndPassword.
//   // We expose the state and logout function.
//   return (
//     <AuthContext.Provider value={{ isAuthenticated, currentUser, loading, logout }}>
//       {/* Show loading indicator or simple children while checking initial auth state */}
//       {loading ? <div>Loading Authentication...</div> : children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


