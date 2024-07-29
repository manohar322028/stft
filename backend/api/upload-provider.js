import fs from "fs";
import { move } from "fs-extra";
import path from "path";
import { BaseProvider } from "@adminjs/upload";
import { ERROR_MESSAGES } from "./errorMessages.js";

class LocalProvider extends BaseProvider {
  constructor(options) {
    super(options.bucket, options?.opts);
    if (!fs.existsSync(options.bucket)) {
      throw new Error(ERROR_MESSAGES.NO_DIRECTORY(options.bucket));
    }
  }

  async upload(file, key) {
    const filePath =
      process.platform === "win32" ? this.path(key) : this.path(key).slice(1); // adjusting file path according to OS

    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
    await move(file.path, filePath, { overwrite: true });
  }

  async delete(key, bucket) {
    const fileLink =
      process.platform === "win32"
        ? this.path(key, bucket)
        : this.path(key, bucket).slice(1);
    if (fs.existsSync(fileLink)) {
      await fs.promises.unlink(fileLink);
    }
  }

  path(key, bucket) {
    // Windows doesn't require the '/' in path, while UNIX system does
    return process.platform === "win32"
      ? `${path.join(bucket || this.bucket, key)}`
      : `/${path.join(bucket || this.bucket, key)}`;
  }
}

const publicProviderOptions = {
  bucket: "./../../files",
  opts: {
    baseUrl: "/files",
  },
};

const privateProviderOptions = {
  bucket: "./members/uploads",
  opts: {
    baseUrl: "/uploads",
  },
};

const localProvider = new LocalProvider(publicProviderOptions);

const privateLocalProvider = new LocalProvider(privateProviderOptions);

export { localProvider, privateLocalProvider };
