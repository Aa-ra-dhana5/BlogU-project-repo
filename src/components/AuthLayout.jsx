import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        // Handling authentication redirection
        if (authentication && authStatus !== authentication) {
            navigate("/login");
        } else if (!authentication && authStatus !== authentication) {
            navigate("/");
        }
        setTimeout(() => setLoading(false), 500); // Small delay for smooth loading effect
    }, [authStatus, navigate, authentication]);

    return (
        <div className="relative">
            {/* Show Loading Overlay while authentication is being checked */}
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50">
                    <div className="flex flex-col items-center">
                        <span className="loading loading-spinner loading-lg text-white"></span>
                        <p className="text-white text-lg mt-2">Checking Authentication...</p>
                    </div>
                </div>
            )}

            {/* Render children only when loading is done */}
            {!loading && children}
        </div>
    );
}
