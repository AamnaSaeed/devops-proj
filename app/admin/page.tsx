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
import Table from "../components/Table";

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
      <div className="p-[2rem] flex flex-col gap-[5rem] justify-start items-center min-h-[100vh] w-[100vw] mt-[7rem]">
        <Table handleDeleteClick={handleDeleteClick} items={users} type="Users" columns={["Name", "Email", "Phone Number", "Actions"]} />
        <Table handleDeleteClick={handleDeleteClick} items={users} type="Brands" columns={["Logo", "Name", "Verified", "# of cars", "Actions"]} />
      </div>

      {showPopUp && <WarningPopUp handleYesOrNo={handleYesOrNo} setShowPopUp={setShowPopUp} description="This action cannot be reversed. Are you sure that you want to continue?" redIcon={true} />}
    </>
  );
};

export default Page;
