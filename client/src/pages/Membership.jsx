import React, { useState } from "react";
import MemberForm from "../components/MemberForm";

export default function Membership() {
  const [isNew, setIsNew] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const clickNew = () => {
    setIsClicked(true);
    setIsNew(true);
  };

  const clickExisting = () => {
    setIsClicked(true);
    setIsNew(false);
  };

  const form = <MemberForm isNew={isNew} />;

  return (
    <>
      <div className="container flex items-center justify-center gap-4 h-full w-full my-10 mx-auto">
        <div
          className={`p-4  cursor-pointer mukta-regular hover:bg-blue-700 ${
            isClicked && isNew
              ? "bg-themeBlue  text-gray-100"
              : "bg-themeGray text-themeBrown"
          }`}
          onClick={clickNew}
        >
          नयाँ सदस्यता
        </div>
        <div
          className={`p-4  mukta-regular cursor-pointer hover:bg-blue-700 ${
            isClicked && !isNew
              ? "bg-themeBlue  text-gray-100"
              : "bg-themeGray text-themeBrown"
          }`}
          onClick={clickExisting}
        >
          पुरानो सदस्यता
        </div>
      </div>

      {isClicked && form}
    </>
  );
}
