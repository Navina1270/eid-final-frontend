"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Table({
  tableData = [],
  labels,
  icon = "",
  redirectTo = () => {},
  onEdit,
  valueWrap = false,
  visibleRows = 5,
  renderers = {},
}) {
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(visibleRows);
  const router = useRouter();
  const [selectedRow, setSelectedRow] = useState(null);
  const headers =
    labels?.length > 0
      ? labels
      : tableData.length > 0
      ? Object.keys(tableData[0])
      : [];

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const filteredData = tableData.filter((row) =>
    Object.values(row).some((value) =>
      value?.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.direction) return 0;
    return sortConfig.direction === "asc"
      ? a[sortConfig.key] > b[sortConfig.key]
        ? 1
        : -1
      : a[sortConfig.key] < b[sortConfig.key]
      ? 1
      : -1;
  });

  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setPage(0);
  };

  return (
    <div className="w-full text-slate-800">
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-[#f1f5f9] text-slate-700 uppercase text-xs font-bold">
            <tr>
              {headers.map((key) => (
                <th
                  key={key}
                  className="px-4 py-3 cursor-pointer select-none border-b border-slate-200"
                  onClick={() => handleSort(key)}
                >
                  <div className="flex items-center justify-between">
                    {key.toUpperCase()}
                    {sortConfig.key === key && (
                      <span>{sortConfig.direction === "asc" ? "▲" : "▼"}</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <tr
                  key={row.id || rowIndex}
                  className={`hover:bg-blue-50/50 transition cursor-pointer border-b border-slate-50 ${
                    selectedRow === rowIndex ? "bg-blue-50" : ""
                  }`}
                  onClick={() => {
                    setSelectedRow(rowIndex);
                    redirectTo(row);
                  }}
                >
                  {headers.map((header, i) => {
                    let value = row[header] ?? "-";

                    if (renderers && renderers[header]) {
                      return (
                        <td key={i} className="px-4 py-3 text-slate-700 border-r border-slate-50">
                          {renderers[header](value, row)}
                        </td>
                      );
                    }

                    if (
                      header.toLowerCase() === "description" &&
                      typeof value === "string"
                    ) {
                      const words = value.trim().split(/\s+/);
                      const displayValue =
                        valueWrap && words.length > 3
                          ? `${words.slice(0, 3).join(" ")}...`
                          : value;
                      return (
                        <td
                          key={i}
                          className="px-4 py-3 text-slate-700"
                          title={value}
                        >
                          {i === 0 && icon ? icon : ""} {displayValue}
                        </td>
                      );
                    }

                    if (header === "edit") {
                      return (
                        <td
                          key={i}
                          className="px-4 py-3 text-slate-700"
                          onClick={(e) => {
                            onEdit(row);
                          }}
                        >
                          {value}
                        </td>
                      );
                    }

                    return (
                      <td
                        key={i}
                        className="px-4 py-3 text-slate-700"
                      >
                        {i === 0 && icon ? icon : ""}
                        {header.toLowerCase() === "is active" ? (
                          value === "Active" ? (
                            <span className="text-emerald-600 font-semibold px-2 py-0.5 rounded-full bg-emerald-50">Active</span>
                          ) : (
                            <span className="text-red-600 font-semibold px-2 py-0.5 rounded-full bg-red-50">Inactive</span>
                          )
                        ) : (
                          value
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                  <td
                    colSpan={headers.length}
                    className="text-center py-6 text-slate-500 bg-slate-50/30"
                  >
                    No records found
                  </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {sortedData.length > 0 && (
        <div className="flex items-center justify-between mt-4 text-sm text-slate-600">
          <div>
            Rows per page:
            <select
              className="ml-2 px-2 py-1 border rounded-md bg-white border-slate-200 text-slate-800 outline-none"
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
            >
              {[5, 10, 25].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <button
              disabled={page === 0}
              onClick={() => handleChangePage(page - 1)}
              className="px-3 py-1 border rounded border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-50 transition"
            >
              Prev
            </button>
            <span>
              Page {page + 1} of {Math.ceil(sortedData.length / rowsPerPage)}
            </span>
            <button
              disabled={(page + 1) * rowsPerPage >= sortedData.length}
              onClick={() => handleChangePage(page + 1)}
              className="px-3 py-1 border rounded border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-50 transition"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
