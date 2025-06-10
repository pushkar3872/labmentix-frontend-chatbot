import { useState } from "react";
import { useAuthStore } from "../store/auth";
import toast from 'react-hot-toast';


export default function SignOut() {
  const [isLoading, setIsLoading] = useState(false);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/callsignout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const contentType = response.headers.get("content-type");
      let result;

      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        result = { message: await response.text() };
      }

      if (!response.ok) {
        throw new Error(result.message || "Sign out failed");
      }

      clearAuth();
      //alert("You have been signed out successfully.");
      toast.success(' you have signed out successfully!');

      window.location.href = "/";
    } catch (error) {
      //alert(`Sign out failed: ${error.message}`);
      toast.error('Signed out fail!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h3 className="text-xl font-semibold mb-4">This is the Sign Out component</h3>

      <button
        onClick={handleSignOut}
        disabled={isLoading}
        className={`px-6 py-2 rounded-xl font-medium shadow-md transition-all duration-200 ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-red-500 hover:bg-red-600 text-white"
        }`}
      >
        {isLoading ? "Signing out..." : "Sign Out"}
      </button>
    </div>
  );
}