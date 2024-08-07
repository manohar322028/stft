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
      <div className="container mx-auto mt-8 mb-12 p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-4 text-yellow-800">
          महत्त्वपूर्ण जानकारी
        </h3>
        <p className="text-sm text-yellow-900 leading-relaxed">
          नेपालीमा भर्नु पर्ने फिल्डमा{" "}
          <span className="font-semibold">Nepali Unicode Romanized</span> को
          Layout अनुसार टाईप गर्नु पर्नेछ। Nepali Unicode Romanized मा कसरी टाईप
          गर्ने हेर्नको लागि यहाँ
          <a
            href="https://www.thapaliya.com/en/writings/practice-romanized-nepali-unicode-in-your-browser/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-medium mx-1"
          >
            Click
          </a>
          गर्नुहोस्।
        </p>
      </div>
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
