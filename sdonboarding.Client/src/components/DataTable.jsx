import React, { useState } from "react";
import { TrashIcon } from "@heroicons/react/solid";

const DataTable = ({ columns, data, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default to 10 items per page

  // Pagination logic: Calculate the data to display on the current page
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when items per page change
  };

  return (
    <div className="container mx-auto p-4">
      <table className="table-auto border-collapse border border-slate-300 w-full text-center">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.id} className="border px-4 py-2 border-slate-300">
                {col.name}
              </th>
            ))}
            <th className="border px-4 py-2 border-slate-300">Edit</th>
            <th className="border px-4 py-2 border-slate-300">Delete</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, index) => (
            <tr
              key={row.id}
              className={`${index % 2 === 0 ? "bg-slate-100" : "bg-white"}`}
            >
              {columns.map((col) => (
                <td key={col.id} className="border border-slate-300 px-4 py-2">
                  {col.name.toLowerCase() === "price"
                    ? `$${parseFloat(row[col.name.toLowerCase()]).toFixed(2)}`
                    : row[col.name.toLowerCase()]}{" "}
                  {/* keys in `columns` match `data` object keys */}
                </td>
              ))}
              <td className="border border-slate-300 px-4 py-2 h-12">
                <button
                  className="flex items-center bg-yellow-500 text-white px-3 py-1 rounded shadow hover:bg-yellow-600 transition duration-300"
                  onClick={() => onEdit(row)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5 mr-2"
                  >
                    <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                    <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                  </svg>
                  Edit / Update
                </button>
              </td>
              <td className="border border-slate-300 px-4 py-2 h-12">
                <button
                  className="flex items-center bg-rose-600 text-white px-3 py-1 rounded shadow hover:bg-red-700 transition duration-300"
                  onClick={() => onDelete(row.id)}
                >
                  <TrashIcon className="h-5 w-5 mr-2" />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <label htmlFor="itemsPerPage" className="mr-2">
            Items per page:
          </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border rounded-md p-2"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="50">50</option>
          </select>
        </div>

        <div className="flex items-center">
          <button
            className="bg-gray-300 px-4 py-2 rounded-md mr-2"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="bg-gray-300 px-4 py-2 rounded-md"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
