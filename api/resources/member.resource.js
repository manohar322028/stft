import Member from "../models/member.model.js";
import { componentLoader, Components } from "../component-loader.js";

import { privateLocalProvider } from "../upload-provider.js";
import uploadFeature from "@adminjs/upload";
import path from "path";
import fs from "fs";

export default {
  resource: Member,

  options: {
    actions: {
      approve: {
        icon: "Check",
        label: "Approve",
        actionType: "record",
        component: Components.ApproveMember,
        isVisible: (context) => context.record.get("isApproved") === false,
        handler: async (request, response, context) => {
          request.method = "post";
          return {
            record: context.record.toJSON(context.currentAdmin),
          };
        },
      },
      reject: {
        icon: "Close",
        label: "Reject",
        actionType: "record",
        component: "D:\\Web-apps\\stft\\api\\ApproveMember.jsx",
        isVisible: (context) => context.record.get("isApproved") === false,
        handler: async (request, response, context) => {
          console.log("Reject action");
          return {
            record: context.record.toJSON(context.currentAdmin),
          };
        },
      },
    },

    properties: {
      _id: {
        isVisible: { list: false, show: true, edit: false, filter: false },
      },
      first_name: {
        isVisible: { list: true, show: true, edit: true, filter: true },
        position: 1,
      },
      last_name: {
        isVisible: { list: true, show: true, edit: true, filter: true },
        position: 2,
      },
      isNew: {
        isVisible: { list: false, show: true, edit: true, filter: true },
      },
      isApproved: {
        isVisible: { list: true, show: true, edit: true, filter: true },
      },
      membership_number: {
        isVisible: { list: false, show: true, edit: true, filter: true },
      },
      membership_date: {
        isVisible: { list: false, show: true, edit: true, filter: false },
      },
      membership_certificate: {
        isVisible: { list: false, show: false, edit: false, filter: false },
      },
      membership_certificate_file: {
        isVisible: { list: false, show: true, edit: true, filter: false },
      },
      voucher: {
        isVisible: { list: false, show: false, edit: false, filter: false },
      },
      voucher_file: {
        isVisible: { list: false, show: true, edit: true, filter: false },
      },
      email: {
        isVisible: { list: false, show: true, edit: true, filter: true },
      },
      phone_number: {
        isVisible: { list: false, show: true, edit: true, filter: true },
      },
      district: {
        isVisible: { list: true, show: true, edit: true, filter: true },
      },
      municipality: {
        isVisible: { list: false, show: true, edit: true, filter: true },
      },
      ward: {
        isVisible: { list: false, show: true, edit: true, filter: true },
      },
      school_name: {
        isVisible: { list: true, show: true, edit: true, filter: true },
      },
      school_address: {
        isVisible: { list: true, show: true, edit: true, filter: false },
      },
      school_appointment_date: {
        isVisible: { list: false, show: true, edit: true, filter: false },
      },
      appointment_type: {
        isVisible: { list: false, show: true, edit: true, filter: false },
      },
      createdAt: {
        isVisible: { list: false, show: true, edit: false, filter: false },
      },
      updatedAt: {
        isVisible: { list: false, show: true, edit: false, filter: false },
      },
    },
  },
  features: [
    uploadFeature({
      componentLoader: componentLoader,
      provider: privateLocalProvider,
      properties: {
        key: "voucher",
        bucket: "bucket",
        file: "voucher_file",
        filePath: "filePath",
        filesToDelete: "filesToDelete",
      },
      validation: {
        mimeTypes: ["image/jpeg", "image/png", "image/jpg"],
      },
      uploadPath: (record, filename) => {
        const firstName = record.get("first_name");
        const lastName = record.get("last_name");
        const extension = path.extname(filename);
        let baseFilename = `${firstName}-${lastName}`;
        let index = 0;
        let uniqueFilename = `${baseFilename}${extension}`;
        const folderPath = "./members/uploads/vouchers";

        // Function to check if the file exists synchronously
        const fileExistsSync = (filePath) => {
          try {
            fs.accessSync(filePath, fs.constants.F_OK);
            return true;
          } catch (err) {
            return false;
          }
        };

        // Check for file existence and create a unique filename
        while (fileExistsSync(path.join(folderPath, uniqueFilename))) {
          index += 1;
          uniqueFilename = `${baseFilename}-${index}${extension}`;
        }

        return `vouchers/${uniqueFilename}`;
      },
    }),

    uploadFeature({
      componentLoader: componentLoader,
      provider: privateLocalProvider,
      properties: {
        key: "membership_certificate",
        bucket: "_bucket",
        file: "membership_certificate_file",
        filePath: "_filePath",
        filesToDelete: "_filesToDelete",
      },
      validation: {
        mimeTypes: ["image/jpg", "image/jpeg", "image/png"],
      },
      uploadPath: (record, filename) => {
        const firstName = record.get("first_name");
        const lastName = record.get("last_name");
        const extension = path.extname(filename);
        let baseFilename = `${firstName}-${lastName}`;
        let index = 0;
        let uniqueFilename = `${baseFilename}${extension}`;
        const folderPath = "./members/uploads/certificates";

        // Function to check if the file exists synchronously
        const fileExistsSync = (filePath) => {
          try {
            fs.accessSync(filePath, fs.constants.F_OK);
            return true;
          } catch (err) {
            return false;
          }
        };

        // Check for file existence and create a unique filename
        while (fileExistsSync(path.join(folderPath, uniqueFilename))) {
          index += 1;
          uniqueFilename = `${baseFilename}-${index}${extension}`;
        }

        return `certificates/${uniqueFilename}`;
      },
    }),
  ],
};
