import {jwtDecode} from "jwt-decode";

export const getUserIdFromToken = () => {
  const token = localStorage.getItem("token"); // Retrieve token from localStorage
  if (!token) return null; // Handle case where user is not logged in

  try {
    const decoded = jwtDecode(token);
    return decoded.userId; // Ensure your token includes `userId`
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export default getUserIdFromToken
