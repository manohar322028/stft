import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

import Notices from "./pages/Notices";
import News from "./pages/News";
import Downloads from "./pages/Downloads";
import Header from "./components/Header";

import { useEffect } from "react";

import Footer from "./components/Footer";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function App() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <BrowserRouter>
        <Header />
        <div className="flex-grow">
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />

            <Route path="/notices" element={<Notices />} />
            <Route path="/news" element={<News />} />
            <Route path="/downloads" element={<Downloads />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
