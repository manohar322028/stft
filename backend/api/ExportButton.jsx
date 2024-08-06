import React from "react";
import { Button } from "@adminjs/design-system";
import { useNotice, useRecords } from "adminjs";
import { json2csv } from "json-2-csv";

const ExportButton = (props) => {
  const { resource } = props;
  const addNotice = useNotice();
  const { records } = useRecords(resource.id);

  const handleClick = async () => {
    try {
      if (records && records.length > 0) {
        const result = records.map((record, index) => {
          const item = record.params;
          const memberObject = { ...item };
          delete memberObject._id;

          return {
            SN: index + 1,
            "Full Name": `${item.first_name} ${item.last_name}`,
            ...memberObject,
          };
        });

        const csv = json2csv(result);
        const utf8Bom = "\uFEFF";
        const csvWithBom = utf8Bom + csv;

        const now = new Date();
        const formattedDate = now
          .toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .replace(/\D/g, "_");
        const formattedTime = now
          .toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
          })
          .replace(/\D/g, "_");

        const fileName = `export_${formattedDate}_time_${formattedTime}.csv`;

        // Create a Blob from the CSV data
        const blob = new Blob([csvWithBom], {
          type: "text/csv;charset=utf-8;",
        });

        // Create a link element, hide it, direct it towards the blob, and then trigger a click
        const link = document.createElement("a");
        if (link.download !== undefined) {
          const url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", fileName);
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
        addNotice({ message: "Export successful", type: "success" });
      } else {
        addNotice({
          message: "No data found in the collection. Skipping CSV generation.",
          type: "info",
        });
      }
    } catch (error) {
      console.error("Export failed:", error);
      addNotice({ message: "Export failed", type: "error" });
    }
  };

  return <Button onClick={handleClick}>Export CSV</Button>;
};

export default ExportButton;
