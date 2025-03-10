import { jwtDecode } from "jwt-decode"; // ✅ Correct import

export const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null; // User not logged in or token missing

  try {
    const decoded = jwtDecode(token);
    return decoded?.userId || null; // ✅ Ensure `userId` exists, else return `null`
  } catch (error) {
    console.error("Error decoding token:", error);
    return null; // Return `null` if decoding fails
  }
};

export default getUserIdFromToken;
