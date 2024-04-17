import React from "react";

const NoticeHome = () => {
  const notices = [
    { title: "Notice 1", date: "2022-01-01", pdfUrl: "/path/to/notice1.pdf" },
    { title: "Notice 2", date: "2022-01-02", pdfUrl: "/path/to/notice2.pdf" },
    { title: "Notice 3", date: "2022-01-03", pdfUrl: "/path/to/notice3.pdf" },
  ];

  return (
    <div className="container mx-auto px-4 py-2">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Title
              </th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Download
              </th>
            </tr>
          </thead>
          <tbody>
            {notices.map((notice, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="border border-gray-300 px-4 py-2 text-sm">
                  {notice.title}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm">
                  {notice.date}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm">
                  <a
                    href={notice.pdfUrl}
                    download
                    className="text-blue-500 hover:underline"
                  >
                    Download PDF
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

export default NoticeHome;
