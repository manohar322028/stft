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
    <div
      className="container mx-auto  shadow-sm shadow-gray-400"
      data-aos="fade-up"
      data-aos-delay="50"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
      data-aos-once="false"
      data-aos-anchor-placement="top-bottom"
    >
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse border border-gray-500">
          <thead>
            <tr>
              <th className="border border-gray-500 px-6 py-2 bg-[#f0f4f8] text-left mukta-semibold text-sm uppercase tracking-wider w-3/5">
                Description
              </th>
              <th className="border border-gray-500 px-6 py-2 bg-[#f0f4f8] text-left mukta-semibold text-sm uppercase tracking-wider w-1/5">
                Date
              </th>
              <th className="border border-gray-500 px-6 py-2 bg-[#f0f4f8] text-left mukta-semibold text-sm uppercase tracking-wider w-1/5">
                Download
              </th>
            </tr>
          </thead>
          <tbody className="merriweather-regular">
            {notices.map((notice, index) => (
              <tr
                key={index}
                className={index % 2 === 1 ? "bg-gray-100" : "bg-white"}
              >
                <td className="border border-gray-500 px-6 py-2 text-base">
                  <span className="mukta-regular">{notice.title}</span>
                </td>
                <td className="border border-gray-500 px-4 py-2 text-base">
                  <span className="mukta-regular">
                    {formatDate(notice.updatedAt)}
                  </span>
                </td>
                <td className="border border-gray-500 px-4 py-2 text-sm">
                  <a
                    href={notice.url}
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
