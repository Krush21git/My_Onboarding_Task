import React, { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";

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

  // Render a single row
  const renderRow = (row, rowIndex) => {
    return (
      <tr
        key={row.id || rowIndex}
        className={`${rowIndex % 2 === 0 ? "bg-slate-100" : "bg-white"}`}
      >
        {columns.map((col, colIndex) => (
          <td
            key={`${row.id || rowIndex}-${col.id || colIndex}`}
            className="border border-slate-300 px-4 py-2"
          >
            {col.name.toLowerCase() === "price"
              ? `$${parseFloat(row[col.name.toLowerCase()]).toFixed(2)}` // Format price
              : row[col.name.toLowerCase()]}
          </td>
        ))}
        <td className="border border-slate-300 px-4 py-2 h-12">
          <center>
            <button
              className="flex items-center bg-yellow-500 text-white px-3 py-1 rounded shadow hover:bg-yellow-600 transition duration-300"
              onClick={() => onEdit(row)}
            >
              <PencilIcon className="h-5 w-5 mr-2" />
              Edit
            </button>
          </center>
        </td>
        <td className="border border-slate-300 px-4 py-2 h-12">
          <center>
            <button
              className="flex items-center bg-rose-600 text-white px-3 py-1 rounded shadow hover:bg-rose-700 transition duration-300"
              onClick={() => onDelete(row.id)}
            >
              <TrashIcon className="h-5 w-5 mr-2" />
              Delete
            </button>
          </center>
        </td>
      </tr>
    );
  };

  // Render all rows
  const renderRows = () => paginatedData.map((row, index) => renderRow(row, index));

  return (
    <div className="container mx-auto p-4">
      <table className="table-auto border-collapse border border-slate-300 w-full text-center">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th
                key={col.id || index}
                className="border px-4 py-2 border-slate-300"
              >
                {col.name}
              </th>
            ))}
            <th className="border px-4 py-2 border-slate-300">Actions</th>
            <th className="border px-4 py-2 border-slate-300">Actions</th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <label htmlFor="itemsPerPage" className="mr-2"></label>
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
