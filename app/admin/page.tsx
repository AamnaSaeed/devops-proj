"use client";

// React
import React, { useState, useEffect } from "react";

// Dependancies
import axios from "axios";
import { toast } from "react-toastify";

// Components
import WarningPopUp from "../components/WarningPopup";
import Table from "../components/Table";

// Types
import { UserType, BrandType, targetItemType } from "@/types";

const Page = () => {
  // States
  const [users, setUsers] = useState<Array<UserType>>([]);
  const [brands, setBrands] = useState<Array<BrandType>>([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [targetItem, setTargetItem] = useState<null | targetItemType>(null);

  // Effects
  useEffect(() => {
    fetchUsers();
    fetchBrands();
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

  const fetchBrands = async () => {
    try {
      const data = await axios.get("/api/brands");
      setBrands(data.data.brands);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  const deleteItem = async (item: targetItemType) => {
    try {
      const endpoint = `/api/${item.type.toLowerCase()}/${item.id}`;
      const res = await axios.delete(endpoint);
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
      if ((targetItem as targetItemType).type === "Users") deleteItem(targetItem as targetItemType);
      if ((targetItem as targetItemType).type === "Brands") deleteItem(targetItem as targetItemType);
    }

    // Close the pop up now, regardless of the choice
    setShowPopUp(false);
  };

  const handleDeleteClick = (item: targetItemType) => {
    setTargetItem(item);
    setShowPopUp(true);
  };

  return (
    <>
      <div className="p-[2rem] flex flex-col gap-[5rem] justify-start items-center min-h-[100vh] w-[100vw] mt-[7rem]">
        <Table handleDeleteClick={handleDeleteClick} items={users} type="Users" columns={["Name", "Email", "Phone Number", "Actions"]} />
        <Table handleDeleteClick={handleDeleteClick} items={brands} type="Brands" columns={["Name", "Email", "Logo", "Verify", "Actions"]} />
      </div>

      {showPopUp && <WarningPopUp handleYesOrNo={handleYesOrNo} setShowPopUp={setShowPopUp} description="This action cannot be reversed. Are you sure that you want to continue?" redIcon={true} />}
    </>
  );
};

export default Page;
