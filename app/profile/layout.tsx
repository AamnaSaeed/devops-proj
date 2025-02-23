"use client";

// React
import React, { useEffect, useState } from "react";

// Next Js
import { useRouter } from "next/navigation";

// Dependencies
import axios from "axios";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  // Next Js
  const router = useRouter();

  // States
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Interfaces
  interface UserResponse {
    user: string | null;
    error: boolean;
  }

  // Use Effects
  useEffect(() => {
    const getUser = async (): Promise<UserResponse> => {
      try {
        // Add a timeout to the request
        const response = await axios.get("/api/users/isauth", {
          // Only throw for 500+ errors
          validateStatus: (status) => {
            return status < 500;
          },
        });

        // No error, Ok status
        if (response.status === 200) {
          return {
            user: response.data,
            error: false,
          };
        }

        // Handle unauthorized/forbidden (401, 403) gracefully
        return {
          user: null,
          error: true,
        };
      } catch (error) {
        // Only log actual server errors, not auth failures
        if (axios.isAxiosError(error) && error.response?.status && error.response.status >= 500) {
          console.error("Server error:", error.message);
        }

        return {
          user: null,
          error: true,
        };
      }
    };

    const fetchUser = async () => {
      try {
        const { user, error } = await getUser();

        console.log(user, error);

        if (error) {
          router.push("/login");
          return;
        }

        // No error
        setIsAuthenticated(user !== null);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [router]);

  // Don't show the content until we know that the user is authenticated
  if (!isAuthenticated) {
    return <p className="mt-[5rem]">Loading...</p>;
  }

  return <main>{children}</main>;
}
