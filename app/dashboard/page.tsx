"use client";

import React, { useEffect, useState } from "react";
import Protected from "../components/Protected";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Calendar, MapPin, DollarSign, Car } from "lucide-react";

interface RentalRequest {
  _id: string;
  carId: {
    title: string;
    location: string;
    images: string[];
  };
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: "pending" | "approved" | "rejected" | "cancelled" | "completed";
}

const Dashboard = () => {
  const { user } = useAuth();
  const [rentalRequests, setRentalRequests] = useState<RentalRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchRentalRequests();
    }
  }, [user]);

  const fetchRentalRequests = async () => {
    try {
      setError(null);
      const response = await axios.get(`/api/rentals/${user?._id}`);
      setRentalRequests(response.data.rentals || []);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch rental requests. Please try again later.");
      toast.error("Failed to fetch rental requests");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (requestId: string, newStatus: string) => {
    try {
      await axios.put(`/api/rentals/${requestId}`, { status: newStatus });
      toast.success("Rental status updated successfully");
      fetchRentalRequests();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update rental status");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 shadow-md">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your rentals...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 shadow-md text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchRentalRequests}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <Protected>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-gray-100 px-6 py-10">
        <div className="mt-[7rem] max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">My Rentals</h1>

          {!rentalRequests || rentalRequests.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <Car className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Rentals Found</h2>
              <p className="text-gray-600 mb-4">You haven't made any rental requests yet.</p>
              <a 
                href="/rentals" 
                className="inline-block px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Browse Available Cars
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {rentalRequests.map((request) => (
                <div key={request._id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-gray-800">{request.carId?.title || "Unknown Car"}</h2>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        request.status === "approved" ? "bg-green-100 text-green-800" :
                        request.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                        request.status === "rejected" ? "bg-red-100 text-red-800" :
                        request.status === "cancelled" ? "bg-gray-100 text-gray-800" :
                        "bg-blue-100 text-blue-800"
                      }`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2 text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{request.carId?.location || "Location not available"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        <span>Rs. {request.totalPrice.toLocaleString()}</span>
                      </div>
                    </div>

                    {request.status === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStatusUpdate(request._id, "cancelled")}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Cancel Request
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Protected>
  );
};

export default Dashboard;