import React, { useEffect, useState, useRef } from "react";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector, useDispatch } from "react-redux";
import { TiShoppingCart, TiArrowSortedDown } from "react-icons/ti";
import { AiOutlineMenu, AiOutlineClose, AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import logo from '../../assets/Images/logog.png'
import useOnClickOutside from "../../Hooks/useOnClickOutside";
import { logout } from "../../Services/Operations/authApi";
import { categories } from "../../Services/apis";
import { apiConnector } from "../../Services/apiConnector";

const NavBar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sublinks, setSublinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  // Mobile par catalog open karne ke liye state
  const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false);

  const location = useLocation();
  const dropdownRef = useRef(null);

  // Desktop click outside handle logic
  useOnClickOutside(dropdownRef, () => setProfileDropdownOpen(false));

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const fetchSublinks = async () => {
    try {
      setLoading(true);
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      if (result?.data?.data) {
        setSublinks(result.data.data);
      } else if (result?.data) {
        setSublinks(result.data);
      }
    } catch (error) {
      console.error("API Call Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSublinks();
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
    setMobileCatalogOpen(false); // Route change hote hi closed ho jaye
  }, [location.pathname]);

  return (
    <div className="fixed md:relative top-0 left-0 z-[1000] flex h-16 md:h-20 w-full items-center justify-center border-b border-b-[#2C333F] bg-[#000814]/90 backdrop-blur-md">
      <div className="flex w-11/12 max-w-7xl items-center justify-between">
        
        {/* 1. LOGO */}
        <Link to="/" className="z-[1010]">
          {/* ====== EDUVERSE PREMIUM TEXT LOGO ====== */}
          <div className="flex items-center gap-x-2 font-sans tracking-wide select-none">
            {/* Left Side: 'E' Icon inside Circle */}
              <img src={logo} alt="imgLogo" height ={250} width={304}/>
          </div>
        </Link>

        {/* 2. NAVIGATION SIDEBAR MENU */}
       {/* 2. NAVIGATION SIDEBAR MENU */}
<nav
  className={`fixed md:relative top-0 left-0 h-screen md:h-auto w-full md:w-auto bg-[#000814] md:bg-transparent z-[1000] md:z-auto transition-all duration-300 md:opacity-100 md:visible flex flex-col md:flex-row items-center justify-center
  ${mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible md:flex"}`}
>
  <ul className="flex flex-col md:flex-row gap-y-6 md:gap-y-0 md:gap-x-6 text-[#DBDDEA] text-lg md:text-base font-medium items-center w-full md:w-auto px-6 md:px-0 max-h-[85vh] overflow-y-auto md:overflow-visible">
    
    {NavbarLinks.map((link, index) => (
      <li
        key={index}
        className="w-full md:w-auto text-center md:text-left"
      >
        {link.title === "Catalog" ? (
          <>
            {/* ================= DESKTOP CATALOG ================= */}
            <div className="hidden md:flex group relative flex-col cursor-pointer items-center justify-center py-2 md:py-0">
              
              {/* Catalog Header */}
              <span className="flex items-center gap-1 hover:text-yellow-300 transition-colors">
                {link.title}
                <TiArrowSortedDown className="transition-transform duration-200 group-hover:rotate-180" />
              </span>

              {/* Dropdown */}
              <div className="invisible absolute left-1/2 top-[80%] z-[1100] flex w-80 -translate-x-1/2 flex-col rounded-md opacity-0 transition-all duration-200 group-hover:visible group-hover:top-full group-hover:opacity-100 pt-4 pb-5">
                
                <div className="absolute left-1/2 top-2 h-4 w-4 -translate-x-1/2 rotate-45 bg-[#2C333F] z-[-1]" />

                <div className="bg-[#2C333F] p-4 rounded-md shadow-2xl border border-zinc-700/50 w-full">
                  
                  {loading ? (
                    <p className="text-center text-sm text-gray-300 py-2">
                      Loading...
                    </p>
                  ) : sublinks.length > 0 ? (
                    sublinks.map((sublink, i) => (
                      <Link
                        key={i}
                        to={`/catalog/${sublink?.name
                          ?.split(" ")
                          .join("-")
                          .toLowerCase()}`}
                        className="block"
                      >
                        <p className="rounded-md px-4 py-4 text-sm font-semibold text-gray-200 transition-all duration-150 hover:bg-zinc-800 hover:text-yellow-300">
                          {sublink?.name}
                        </p>
                      </Link>
                    ))
                  ) : (
                    <p className="text-center text-sm text-gray-300 py-2">
                      No Categories Found
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ================= MOBILE DIRECT CATEGORIES ================= */}
            <div className="flex md:hidden flex-col w-full items-center">
              
              {/* Catalog Heading */}
              <p className="text-white font-semibold py-2 text-lg">
                Catalog
              </p>

              {/* Categories */}
              <div className="flex flex-col w-full gap-1 mt-2">
                
                {loading ? (
                  <p className="text-sm text-gray-400 text-center">
                    Loading...
                  </p>
                ) : sublinks.length > 0 ? (
                  sublinks.map((sublink, i) => (
                    <Link
                      key={i}
                      to={`/catalog/${sublink?.name
                        ?.split(" ")
                        .join("-")
                        .toLowerCase()}`}
                      className="w-full"
                    >
                      <p className="py-2 text-sm text-gray-300 hover:text-yellow-300 transition-all text-center border-b border-zinc-800">
                        {sublink?.name}
                      </p>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 text-center">
                    No Categories Found
                  </p>
                )}
              </div>
            </div>
          </>
        ) : (
          <Link to={link.path} className="block py-2 md:py-0">
            <p
              className={`transition-colors duration-200 hover:text-yellow-300 ${
                matchRoute(link.path)
                  ? "text-yellow-300 font-bold"
                  : "text-white"
              }`}
            >
              {link.title}
            </p>
          </Link>
        )}
      </li>
    ))}

    {/* ====== SMALL SCREEN INNER SECTION (Auth & Profile) ====== */}
    <li className="flex flex-col gap-3 w-full max-w-[240px] mt-4 border-t border-zinc-800/80 pt-6 md:hidden">
      
      {token === null && (
        <>
          <Link to="/login" className="w-full">
            <button className="w-full rounded-md border border-[#2C333F] bg-[#161D29] py-3.5 text-[#AFB2BF] font-semibold text-sm cursor-pointer">
              Login
            </button>
          </Link>

          <Link to="/signup" className="w-full">
            <button className="w-full rounded-md border border-[#2C333F] bg-[#161D29] py-3.5 text-[#AFB2BF] font-semibold text-sm cursor-pointer">
              Signup
            </button>
          </Link>
        </>
      )}

      {token !== null && user && (
        <div className="flex flex-col gap-2 w-full text-left">
          
          <div className="flex items-center gap-x-3 px-3 py-2.5 bg-zinc-900 rounded-lg mb-2 border border-zinc-800">
            <img
              src={user?.image}
              alt={`profile-${user?.firstName}`}
              className="aspect-square w-8 rounded-full object-cover border border-zinc-700"
            />

            <span className="text-sm font-semibold text-zinc-200 truncate flex-1">
              {user?.firstName} {user?.lastName}
            </span>
          </div>

          <Link
            to="/dashboard/my-profile"
            className="flex items-center gap-x-2 py-2.5 px-3 text-sm text-[#AFB2BF] hover:bg-[#2C333F] rounded-md transition-all"
          >
            <VscDashboard className="text-lg text-yellow-400" />
            Dashboard
          </Link>

          <button
            onClick={() => dispatch(logout(navigate))}
            className="flex items-center gap-x-2 py-2.5 px-3 text-sm text-[#AFB2BF] hover:bg-rose-950/40 hover:text-rose-400 rounded-md transition-all text-left w-full"
          >
            <VscSignOut className="text-lg text-rose-500" />
            Logout
          </button>
        </div>
      )}
    </li>
  </ul>
</nav>

        {/* 3. TOP STICKY CONTROLS AREA */}
        <div className="flex items-center gap-x-3 md:gap-x-4 z-[1010]">
          
          {/* Cart Control */}
          {user && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative p-1.5 group">
              <TiShoppingCart className="h-6 w-6 md:h-7 md:w-7 fill-[#DBDDEA] group-hover:fill-yellow-300 transition-colors" />
              {totalItems > 0 && (
                <span className="absolute top-0.5 right-0.5 transform translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E7C009] h-4 w-4 flex items-center justify-center text-[10px] font-bold text-black shadow-md">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {/* Desktop Only Auth Controls */}
          {token === null && (
            <div className="hidden md:flex items-center gap-x-3">
              <Link to="/login">
                <button className="rounded-md border border-[#2C333F] bg-[#161D29] px-6 py-3.5 text-[#AFB2BF] text-sm font-semibold hover:bg-blue-950 transition-all cursor-pointer">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-md border border-[#2C333F] bg-[#161D29] px-6 py-3.5 text-[#AFB2BF] text-sm font-semibold hover:bg-blue-950 transition-all cursor-pointer">
                  Signup
                </button>
              </Link>
            </div>
          )}

          {/* Desktop Only Profile Dropdown View */}
          {token !== null && user && (
            <div className="hidden md:block relative" ref={dropdownRef}>
              <button 
                className="flex items-center gap-x-1 outline-none focus:outline-none" 
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              >
                <img
                  src={user?.image}
                  alt={`profile-${user?.firstName}`}
                  className="aspect-square w-8 rounded-full object-cover border border-zinc-700 hover:scale-95 transition-transform duration-150"
                />
                <AiOutlineCaretDown className={`text-xs text-[#AFB2BF] transition-transform duration-200 ${profileDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {profileDropdownOpen && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-[125%] right-0 z-[1200] divide-y divide-[#2C333F] overflow-hidden rounded-md border border-[#2C333F] bg-[#161D29] w-44 shadow-2xl"
                >
                  <Link to="/dashboard/my-profile" onClick={() => setProfileDropdownOpen(false)}>
                    <div className="flex w-full items-center gap-x-2 py-2.5 px-3 text-sm text-[#AFB2BF] hover:bg-[#2C333F] hover:text-[#DBDDEA] transition-all">
                      <VscDashboard className="text-lg text-yellow-400" />
                      Dashboard
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      dispatch(logout(navigate));
                      setProfileDropdownOpen(false);
                    }}
                    className="flex w-full items-center gap-x-2 py-2.5 px-3 text-sm text-[#AFB2BF] hover:bg-[#2C333F] hover:text-rose-400 transition-all text-left cursor-pointer"
                  >
                    <VscSignOut className="text-lg text-rose-500 cursor-pointer" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="block md:hidden text-[#DBDDEA] p-1 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <AiOutlineClose size={24} className="cursor-pointer" /> : <AiOutlineMenu size={24} className="cursor-pointer" />}
          </button>

        </div>
      </div>
    </div>
  );
};

export default NavBar;