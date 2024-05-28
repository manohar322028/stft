import React from "react";
import { useState } from "react";

export default function Membership() {
  const [isNew, setIsNew] = useState(false);

  const clickNew = () => {
    setIsNew(true);
  };

  return (
    <>
      <div className="container flex items-center align-middle gap-4 h-full w-full">
        <div className=" p-4 bg-blue-600 border-white" onClick={clickNew}>
          New Member
        </div>
        <div className="p-4 bg-blue-600 border-white">Existing Member</div>
      </div>
    </>
  );
}
