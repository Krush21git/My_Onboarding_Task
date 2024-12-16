import React from 'react';
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";

const DataTable = ({ columns, data, onEdit, onDelete }) => {
  return (
    <div className='flex justify-center'>
      <table className="table-auto border-collapse border border-slate-300 w-full text-center">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col} className="border px-4 py-2 border-slate-300">
                {col}
              </th>
            ))}
            <th className="border px-4 py-2 border-slate-300">Actions</th>
            <th className="border px-4 py-2 border-slate-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.id} className={`${index % 2 === 0 ? 'bg-slate-100' : 'bg-white'}`}>
              {columns.map((col) => (
                <td key={col} className="border border-slate-300 px-4 py-2">
                  {row[col.toLowerCase()]} {/* Ensure keys in `columns` match `data` object keys */}
                </td>
              ))}
              <td className="border border-slate-300 px-4 py-2 h-12">
                <center>
                  <button className="flex items-center bg-yellow-500 text-white px-3 py-1 rounded shadow hover:bg-yellow-500 transition duration-300" onClick={() => onEdit(row, columns)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 h-5 w-5 mr-2"><path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" /><path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" /></svg>
                    Edit
                  </button>
                </center>
              </td>
              <td className="border border-slate-300 px-4 py-2 h-12">
                <center>
                  <button className="flex items-center bg-rose-600 text-white px-3 py-1 rounded shadow hover:bg-rose-600 transition duration-300" onClick={() => onDelete(row.id)}>
                    <TrashIcon className="h-5 w-5 mr-2" />
                    Delete
                  </button>
                </center>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
