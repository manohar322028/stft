import React from "react";
import { FaFilePdf } from "react-icons/fa";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const NoticeHome = ({ notices }) => {
  return (
    <div
      className="container mx-auto shadow-sm shadow-gray-400"
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
              <th className="border border-gray-500 px-6 py-2 bg-[#f0f4f8] text-left mukta-semibold text-sm uppercase tracking-wider w-4/5">
                Title
              </th>
              <th className="border border-gray-500 px-4 py-2 bg-[#f0f4f8] text-left mukta-semibold text-sm uppercase tracking-wider w-1/5">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="mukta-regular">
            {notices.map((notice, index) => (
              <tr
                key={index}
                className={index % 2 === 1 ? "bg-gray-100" : "bg-white"}
              >
                <td className="border border-gray-500 px-6 py-2 text-base">
                  <a
                    href={`/files/${notice.pdf}`}
                    target="_blank"
                    className="flex items-center text-gray-700 hover:text-blue-500 hover:underline group"
                  >
                    {notice.title}
                    <FaFilePdf className="ml-2 text-transparent group-hover:text-blue-500" />
                  </a>
                </td>
                <td className="border border-gray-500 px-4 py-2 text-base">
                  <span className="mukta-regular">
                    {formatDate(notice.updatedAt)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NoticeHome;
