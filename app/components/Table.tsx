// React
import React from "react";

// Next Js
import Image from "next/image";

// Icons
import { IoTrash } from "react-icons/io5";

// Types
import { BrandType, UserType, targetItemType } from "@/types";

interface Props {
  handleDeleteClick: (item: targetItemType) => void;
  items: Array<UserType | BrandType>;
  type: string;
  columns: Array<string>;
}

const Table = ({ handleDeleteClick, items, type, columns }: Props) => {
  return (
    <div className="flex flex-col gap-[2rem] w-full justify-center items-center">
      <h1 className="text-4xl text-center">{type}</h1>

      {items.length > 0 ? (
        <div className="overflow-x-auto bg-white w-[80%] rounded-lg shadow-md">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                {columns.map((column) => (
                  <th key={column} className="py-2 px-4 border-b text-center text-gray-700 font-semibold">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="hover:bg-gray-100 transition duration-300">
                  <td className="py-3 px-4 border-b text-center">{item.name}</td>
                  <td className="py-3 px-4 border-b text-center">{item.email}</td>

                  <td className="py-3 px-4 border-b flex flex-row justify-center">
                    {type === "Users" ? (
                      (item as UserType).phoneNumber
                    ) : (
                      <div className="relative w-10 h-10">
                        <Image src={(item as BrandType).logo} alt="brand-logo" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-contain" />
                      </div>
                    )}
                  </td>

                  {type === "Brands" && <td className="py-3 px-4 border-b text-center">{(item as BrandType).isVerified ? "True" : "False"}</td>}

                  <td className="py-3 px-4 border-b text-center">
                    <button onClick={() => handleDeleteClick({ id: item._id, type })} className="text-red-600 hover:text-red-700 text-xl transition duration-300">
                      <IoTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-lg text-gray-600 shadow p-6 text-center max-w-md mx-auto border border-neutral-300 font-comfortaa">No users found.</div>
      )}
    </div>
  );
};

export default Table;
