import React, { useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to certain position
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top of page when button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Add scroll event listener when component mounts
  React.useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-10">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="text-themeBlue opacity-80 hover:opacity-100 focus:outline-none"
        >
          <FaArrowCircleUp size={40} />
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
