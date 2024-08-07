import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitterX } from "react-icons/bs";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const server_url = import.meta.env.VITE_SERVER_URL;

export default function FooterCom() {
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      await fetch(server_url + "/api/abouts/names")
        .then((res) => res.json())
        .then((data) => {
          setProvinces(data);
        });
    };
    fetchProvinces();
  }, []);

  return (
    <Footer
      container
      className=" border-t-2 border-themeBlue bg-[#f0f4f8] bg-opacity-80"
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-delay="50"
      data-aos-easing="ease-in-out"
      data-aos-once="false"
      data-aos-anchor-placement="top-bottom"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="w-full justify-between sm:flex">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl merriweather-regular flex flex-row align-middle items-center mb-10"
            >
              <img src="/logo.png" alt="Logo" className="w-12 h-12" />
              <span className="mx-2 text-xl font-bold">STFT Nepal</span>
            </Link>
          </div>
          <div className="right-0 top-full grid grid-cols-2 mt-4 sm:grid-cols-3 merriweather-light">
            <div>
              <Footer.Title title="Navigate" />
              <Footer.LinkGroup col>
                <Footer.Link href="/" className="text-gray-800 dark:text-white">
                  STFT Nepal
                </Footer.Link>
                <Footer.Link
                  href="/news"
                  className="text-gray-800 dark:text-white"
                >
                  News
                </Footer.Link>
                <Footer.Link
                  href="/notices"
                  className="text-gray-800 dark:text-white"
                >
                  Notices
                </Footer.Link>
                <Footer.Link
                  href="/about"
                  className="text-gray-800 dark:text-white"
                >
                  About
                </Footer.Link>
                <Footer.Link
                  href="/downloads"
                  className="text-gray-800 dark:text-white"
                >
                  Downloads
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Provinces" />
              <Footer.LinkGroup col>
                {provinces.map((province) => (
                  <Footer.Link
                    key={province.province_number}
                    href={`/provinces/${province.province_number}`}
                    className="text-gray-800 dark:text-white"
                  >
                    {province.province_name}
                  </Footer.Link>
                ))}
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" className="text-gray-800 dark:text-white">
                  Privacy Policy
                </Footer.Link>
                <Footer.Link href="#" className="text-gray-800 dark:text-white">
                  Terms &amp; Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="Manohar Dahal"
            year={new Date().getFullYear()}
            className="text-gray-800 dark:text-white"
          />
          <div className="flex gap-6 sm:mt-0 mt-4 mr-12 sm:justify-center">
            <Footer.Icon
              href="#"
              icon={BsFacebook}
              className="text-gray-800 dark:text-white"
            />
            <Footer.Icon
              href="#"
              icon={BsInstagram}
              className="text-gray-800 dark:text-white"
            />
            <Footer.Icon
              href="#"
              icon={BsTwitterX}
              className="text-gray-800 dark:text-white"
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}
