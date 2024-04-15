import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Notices from "./pages/Notices";
import News from "./pages/News";
import Downloads from "./pages/Downloads";
import Header from "./components/Header";
import Login from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/admindashboard" element={<Dashboard props />} />
        <Route path="/notices" element={<Notices />} />
        <Route path="/news" element={<News />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/adminlogin" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
