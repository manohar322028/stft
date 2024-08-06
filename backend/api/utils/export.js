import { json2csv } from "json-2-csv";
import fs from "fs/promises"; // Using fs/promises for cleaner async handling
import Member from "../models/member.model.js";

(async () => {
  try {
    const memberData = await Member.find();

    const result = memberData.map((item, index) => {
      const memberObject = item.toObject();

      delete memberObject.first_name;
      delete memberObject.last_name;

      return {
        SN: index + 1,
        "Full Name": `${item.first_name} ${item.last_name}`,
        ...memberObject,
      };
    });

    const csv = json2csv(result);

    if (result.length > 0) {
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

      const fileName = `../../exports/export_${formattedDate}_time_${formattedTime}.csv`;
      await fs.writeFile(fileName, csv);
      console.log("File saved");
    } else {
      console.log("No data found in Team collection. Skipping CSV generation.");
    }
  } catch (error) {
    console.error("Error generating CSV:", error);
  }
})();
