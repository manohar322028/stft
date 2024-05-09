import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitterX } from "react-icons/bs";
export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-themeBlue">
      <div className="w-full max-w-7xl mx-auto">
        <div className=" w-full justify-between sm:flex ">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white flex flex-row align-middle items-center mb-10"
            >
              <img src="/logo.png" alt="Logo" className="w-12 h-12" />
              <span className="mx-2 text-xl font-bold text-gray-700">
                STFT Nepal
              </span>
            </Link>
          </div>
          <div className=" right-0 top-full grid grid-cols-2 mt-4 sm:grid-cols-3">
            <div>
              <Footer.Title title="Navigate" />
              <Footer.LinkGroup col>
                <Footer.Link href="/">NNTA Bagmati</Footer.Link>
                <Footer.Link href="/news">News</Footer.Link>
                <Footer.Link href="/notices">Notices</Footer.Link>
                <Footer.Link href="/about">About</Footer.Link>
                <Footer.Link href="/downloads">Downloads</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Districts" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Kathmandu</Footer.Link>
                <Footer.Link href="#">Kavre</Footer.Link>
                <Footer.Link href="#">Lalitpur</Footer.Link>
                <Footer.Link href="#">Bhaktapur</Footer.Link>
                <Footer.Link href="#">Dhading</Footer.Link>
                <Footer.Link href="#">Nuwakot</Footer.Link>
                <Footer.Link href="#">Rasuwa</Footer.Link>
                <Footer.Link href="#">Sindhupalchowk</Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
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
          />
          <div className="flex gap-6 sm:mt-0 mt-4 mr-12 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitterX} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
