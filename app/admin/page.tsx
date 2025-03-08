"use client";

// React
import React, { useState, useEffect } from "react";

// Dependancies
import axios from "axios";
import { toast } from "react-toastify";

// Types
import { UserType } from "@/types";

// Components
import WarningPopUp from "../components/WarningPopup";

// Icons
import { IoTrash } from "react-icons/io5";

const Page = () => {
  // States
  const [users, setUsers] = useState<Array<UserType>>([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [targetItem, setTargetItem] = useState<null | string | object>(null);

  // Effects
  useEffect(() => {
    fetchUsers();
  }, []);

  // Functions
  const fetchUsers = async () => {
    try {
      const data = await axios.get("/api/users");
      setUsers(data.data.users);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const res = await axios.delete(`/api/users/${id}`);
      toast.warning(res.data.message);
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred.");
    }
  };

  const handleYesOrNo = (yes: boolean) => {
    // Delete the item
    if (yes) {
      if (typeof targetItem === "string") {
        deleteUser(targetItem);
      }
    }

    // Close the pop up now, regardless of the choice
    setShowPopUp(false);
  };

  const handleDeleteClick = (item: string | object) => {
    setTargetItem(item);
    setShowPopUp(true);
  };

  return (
    <>
      <div className="p-[2rem] flex flex-col gap-[2rem] justify-start items-center min-h-[100vh] w-[100vw] mt-[7rem]">
        <h1 className="text-4xl text-center">Users</h1>

        {users.length > 0 ? (
          <div className="overflow-x-auto bg-white w-[80%] rounded-lg shadow-md">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4 border-b text-center text-gray-700 font-semibold">Name</th>
                  <th className="py-2 px-4 border-b text-center text-gray-700 font-semibold">Email</th>
                  <th className="py-2 px-4 border-b text-center text-gray-700 font-semibold">Phone Number</th>
                  <th className="py-2 px-4 border-b text-center text-gray-700 font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-100 transition duration-300">
                    <td className="py-3 px-4 border-b text-center">{user.name}</td>
                    <td className="py-3 px-4 border-b text-center">{user.email}</td>
                    <td className="py-3 px-4 border-b text-center">{user.phoneNumber}</td>

                    <td className="py-3 px-4 border-b text-center">
                      <button onClick={() => handleDeleteClick(user._id)} className="text-red-600 hover:text-red-700 text-xl transition duration-300">
                        <IoTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">No users found</p>
        )}
      </div>

      {showPopUp && <WarningPopUp handleYesOrNo={handleYesOrNo} setShowPopUp={setShowPopUp} description="This action cannot be reversed. Are you sure that you want to continue?" redIcon={true} />}
    </>
  );
};

export default Page;
