import { ComponentLoader } from "adminjs";

import path from "path";

const componentLoader = new ComponentLoader();

const accept_path = path.resolve("api/ApproveMember.tsx");
const reject_path = path.resolve("api/RejectMember.tsx");

const Components = {
  ApproveMember: componentLoader.add("ApproveMember", accept_path),
  RejectMember: componentLoader.add("RejectMember", reject_path),
};

console.log(componentLoader.getComponents());

export { componentLoader, Components };
