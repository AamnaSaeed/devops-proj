import React from "react";

// Icons
import { IoTrash } from "react-icons/io5";

// Types

import { UserType } from "@/types";

interface Props {
  handleDeleteClick: (item: string | object) => void;
  items: Array<UserType>;
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
                  <td className="py-3 px-4 border-b text-center">{item.phoneNumber}</td>

                  <td className="py-3 px-4 border-b text-center">
                    <button onClick={() => handleDeleteClick(item._id)} className="text-red-600 hover:text-red-700 text-xl transition duration-300">
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
