import React from "react";
import { FaDownload } from "react-icons/fa";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const Downloads = ({ notices }) => {
  return (
    <div className="container mx-auto  shadow-sm shadow-gray-400">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse border border-gray-500">
          <thead>
            <tr>
              <th className="border border-gray-500 px-6 py-2 bg-gray-200 text-left merriweather-bold text-sm  uppercase tracking-wider w-3/5">
                Description
              </th>
              <th className="border border-gray-500 px-4 py-2 bg-gray-200 text-left merriweather-bold text-sm   uppercase tracking-wider w-1/5">
                Date
              </th>
              <th className="border border-gray-500 px-4 py-2 bg-gray-200 text-left merriweather-bold text-sm  uppercase tracking-wider w-1/5">
                Download
              </th>
            </tr>
          </thead>
          <tbody className="merriweather-regular">
            {notices.map((notice, index) => (
              <tr
                key={index}
                className={index % 2 === 1 ? "bg-gray-200" : "bg-gray-100"}
              >
                <td className="border border-gray-500 px-6 py-2 text-sm">
                  {notice.title}
                </td>
                <td className="border border-gray-500 px-4 py-2 text-sm">
                  {formatDate(notice.updatedAt)}
                </td>
                <td className="border border-gray-500 px-4 py-2 text-sm">
                  <a
                    href={`/files/${notice.pdf}`}
                    target="_blank"
                    className="flex items-center text-blue-500 hover:underline"
                  >
                    <FaDownload className="mr-1" /> Download link
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Downloads;
