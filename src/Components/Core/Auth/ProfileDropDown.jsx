import { useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import useOnClickOutside from "../../../Hooks/useOnClickOutside";
import { logout } from "../../../Services/Operations/authAPI";

function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Bahar click karne par dropdown close karne ka hook
  useOnClickOutside(ref, () => setOpen(false));

  if (!user) return null;

  return (
    // FIX 1: Parent element ko button se badalkar 'relative div' kiya taaki buttons nest na hon
    <div className="relative select-none" ref={ref}>
      
      {/* Trigger Button - Profile Avatar and Arrow */}
      <button
        className="flex items-center gap-x-1 outline-none focus:outline-none cursor-pointer"
        onClick={() => setOpen(!open)} // FIX 2: setOpen(true) ko setOpen(!open) kiya taaki dobara click par close ho ske
        aria-expanded={open}
        aria-haspopup="true"
      >
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-8 rounded-full object-cover border border-zinc-700 hover:scale-95 transition-transform duration-150"
        />
        {/* Dropdown open hone par arrow rotate hoga */}
        <AiOutlineCaretDown 
          className={`text-xs text-[#AFB2BF] transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`} 
        />
      </button>

      {/* Dropdown Menu Overlay */}
      {open && (
        <div
          onClick={(e) => e.stopPropagation()} // Stop event bubbling
          className="absolute top-[125%] right-0 z-[1000] divide-y divide-[#2C333F]
          overflow-hidden rounded-md border border-[#2C333F] bg-[#161D29] w-44 shadow-2xl
          animate-in fade-in slide-in-from-top-2 duration-150"
        >
          {/* Dashboard Link */}
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)} className="block">
            <div className="flex w-full items-center gap-x-2 py-2.5 px-3 text-sm 
            text-[#AFB2BF] hover:bg-[#2C333F] hover:text-[#DBDDEA] transition-all">
              <VscDashboard className="text-lg text-yellow-400" />
              <span>Dashboard</span>
            </div>
          </Link>

          {/* Logout Action Button */}
          <button
            onClick={() => {
              dispatch(logout(navigate));
              setOpen(false);
            }}
            className="flex w-full items-center gap-x-2 py-2.5 px-3 text-sm 
            text-[#AFB2BF] hover:bg-[#2C333F] hover:text-rose-400 transition-all text-left border-none outline-none cursor-pointer"
          >
            <VscSignOut className="text-lg text-rose-500  cursor-pointer" />
            <span className=" cursor-pointer">Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;