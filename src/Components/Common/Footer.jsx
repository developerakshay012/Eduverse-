import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo/Logo-Small-Light.png";
import Logo2 from "../../assets/Logo/Logo-Full-Light.png";
// Images

// Icons
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

{
  /* shipping and delivery not available */
}

const company = ["About", "Careers", "Affiliates"];
const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className="bg-[#161D29] text-gray-400">
      <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-315 leading-6 mx-auto relative py-14">
        <div className="border-b w-full flex flex-col lg:flex-row pb-5 border-gray-200">
          {/* Section 1 */}
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-gray-300 pl-3 lg:pr-5 gap-3">
            <div className="w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0">
              <Link to={"/"}>
                <div className="flex relative">
                  <div className="flex items-center gap-x-2 font-sans tracking-wide select-none">
  
  {/* Left Side: 'E' Icon inside Circle */}
  <div className="flex h-7 w-7 md:h-9 md:w-9 items-center justify-center rounded-full bg-white shadow-[0_0_15px_rgba(255,214,10,0.3)]">
    <span className="text-base md:text-xl font-black text-black">
      E
    </span>
  </div>

  {/* Right Side: 'Eduverse' Text */}
  <span className="text-xl md:text-2xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
    Eduverse
  </span>

</div>
                </div>
              </Link>
              <h1 className="text-gray-500 font-semibold text-[16px]">
                Company
              </h1>
              <div className="flex flex-col gap-2">
                {company.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-black transition-all duration-200"
                    >
                      <Link to={"/about"}>{ele}</Link>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-3 text-lg text-gray-600">
                <FaFacebook className="hover:text-black cursor-pointer transition-all duration-200" />
                <FaGoogle className="hover:text-black cursor-pointer transition-all duration-200" />
                <FaTwitter className="hover:text-black cursor-pointer transition-all duration-200" />
                <FaYoutube className="hover:text-black cursor-pointer transition-all duration-200" />
              </div>
              <p className="text-sm transition-all duration-200 mt-6 text-rose-600 font-medium">
                Shipping & Delivery Not Available
              </p>
            </div>

            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              <h1 className="text-gray-500 font-semibold text-[16px]">
                Resources
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Resources.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-gray-300 transition-all duration-200"
                    >
                      <Link to={"/"}>{ele}</Link>
                    </div>
                  );
                })}
              </div>

              <h1 className="text-gray-400 font-semibold text-[16px] mt-7">
                Support
              </h1>
              <div className="text-[14px] cursor-pointer hover:text-gray-300 transition-all duration-200 mt-2">
                <Link to={"/reach-us"}>Help Center</Link>
              </div>
            </div>

            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              <h1 className="text-gray-400 font-semibold text-[16px]">
                Plans
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Plans.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-gray-300 transition-all duration-200"
                    >
                      <Link to={"/"}>{ele}</Link>
                    </div>
                  );
                })}
              </div>
              <h1 className="text-gray-400 font-semibold text-[16px] mt-7">
                Community
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Community.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-gray-300transition-all duration-200"
                    >
                      <Link to={"/"}>{ele}</Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3">
            {FooterLink2.map((ele, i) => {
              return (
                <div key={i} className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                  <h1 className="text-gray-400 font-semibold text-[16px]">
                    {ele.title}
                  </h1>
                  <div className="flex flex-col gap-2 mt-2">
                    {ele.links.map((link, index) => {
                      return (
                        <div
                          key={index}
                          className="text-[14px] cursor-pointer hover:text-gray-300 transition-all duration-200"
                        >
                          <Link to={"/"}>{link.title}</Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between w-11/12 max-w-315 text-gray-600 mx-auto pb-14 text-sm">
        {/* Section 1 */}
        <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-10 w-full px-6">
          <div className="flex flex-row">
            {BottomFooter.map((ele, index) => {
              return (
                <div
                  key={index}
                  className={` ${
                    BottomFooter.length - 1 === index
                      ? ""
                      : "border-r border-gray-300 cursor-pointer hover:text-gray-300 transition-all duration-200"
                  } px-3 `}
                >
                  <Link to={"/"}>{ele}</Link>
                </div>
              );
            })}
          </div>

          {/* image */}
          <Link to={"/"}>
            <div className="flex relative"></div>
          </Link>

          <div className="text-center text-gray-400">
            Made By <span className="text-pink-600 font-semibold">Akshay </span>
            2026 eduverse.com
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;