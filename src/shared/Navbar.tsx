"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { alpha, InputBase, styled } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Link from "next/link";
import { useSearch } from "@/context/searchContex";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { navMenus } from "@/app/data/navMenus";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";

// Styled Search Bar Components
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 100,
  backgroundColor: theme.palette.grey[200],
  "&:hover": {
    backgroundColor: theme.palette.grey[300],
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

// Mega Menu Component
interface MegaMenuProps {
  sections: { heading: string; items: string[] }[];
  isActive: boolean;
}

const MegaMenu = ({ sections, isActive }: MegaMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    if (isActive) {
      gsap.to(menu, {
        opacity: 1,
        y: -10,
        visibility: "visible",
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(menu, {
        opacity: 0,
        y: -20,
        visibility: "hidden",
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [isActive]);

  return (
    <div
      ref={menuRef}
      className="absolute left-0 w-full ite bg-white shadow-lg border border-gray-200 z-40 px-10 py-6 grid grid-cols-2 md:grid-cols-4 gap-10"
      style={{
        fontFamily: "Poppins",
        opacity: 0,
        visibility: "hidden",
        transform: "translateY(-20px)",
      }}
    >
      {sections.map((section, index) => (
        <div key={index}>
          <h3 className="font-semibold text-gray-900 text-sm text-center mb-2">
            {section.heading}
          </h3>
          <ul className="space-y-2">
            {section.items.map((item, i) => (
              <li
                key={i}
                className="text-sm text-gray-600 hover:text-black cursor-pointer transition-colors duration-150 text-center"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

// Main Navbar Component
const Navbar = () => {
  const [isClient, setIsClient] = useState(false);
  const { searchQuery, setSearchQuery } = useSearch();
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const menuTimeout = useRef<NodeJS.Timeout | null>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuEnter = (index: number) => {
    if (menuTimeout.current) {
      clearTimeout(menuTimeout.current);
    }
    setActiveMenu(index);
  };

  const handleMenuLeave = () => {
    menuTimeout.current = setTimeout(() => {
      setActiveMenu(null);
    }, 200);
  };

  const handleMegaMenuEnter = () => {
    if (menuTimeout.current) {
      clearTimeout(menuTimeout.current);
    }
  };

  const handleMegaMenuLeave = () => {
    menuTimeout.current = setTimeout(() => {
      setActiveMenu(null);
    }, 200);
  };

  if (!isClient) return null;

  return (
    <div className="sticky top-0 z-50" ref={navbarRef}>
      <div className="flex justify-between items-center z-50 text-black  bg-[#f5f5f5] relative px-10 ">
        <div className="flex items-center">
          <img className="w-[18px]" src="/img/air-jordan-logo.png" alt="" />
        </div>
        <div>
          <ul
            className="flex flex-row items-center gap-4"
            style={{
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            <li>Find a Store</li> |{" "}
            <li>
              Help
              {/* <select
                className="cursor-pointer w-[70px] rounded-md px-3 py-2        "
                name="help"
                id="help"
                style={{
                  fontFamily: "Poppins",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                <option value="" disabled selected>
                  Help
                </option>
                <option value="order" className="py-2 ">
                  Order Status
                </option>
                <option value="delivery" className="py-2 ">
                  Dispatch and Delivery
                </option>
                <option value="returns" className="py-2 ">
                  Returns
                </option>
                <option value="contact" className="py-2 ">
                  Contact Us
                </option>
                <option value="terms-sale" className="py-2 ">
                  Terms of Sale
                </option>
                <option value="privacy" className="py-2 ">
                  Privacy Policy
                </option>
                <option value="terms-use" className="py-2 ">
                  Terms of Use
                </option>
                <option value="feedback" className="py-2 ">
                  Send Us Feedback
                </option>
              </select> */}
            </li>{" "}
            |
            <li>
              Hi, Daksh <PermIdentityOutlinedIcon className="ml-2 mb-[2px]" />
            </li>
          </ul>
        </div>
      </div>
      <nav
        className="flex justify-between items-center z-50 text-black p-2 bg-white relative"
        style={{
          border: "2px solid white",
          borderTop: "none",
        }}
        role="navigation"
      >
        {/* Brand logo */}
        <Link href="/">
          <img
            src="/img/logo.png"
            alt="Logo"
            className="cursor-pointer w-[70px] ml-2"
          />
        </Link>

        {/* Navigation Links with Mega Menu */}
        <div className="flex  gap-4">
          <ul
            className="flex  gap-6"
            style={{ fontFamily: "Poppins", textUnderlineOffset: "5px" }}
          >
            {navMenus.map((menu, idx) => (
              <li
                key={idx}
                className="relative group  "
                onMouseEnter={() => handleMenuEnter(idx)}
                onMouseLeave={handleMenuLeave}
              >
                <span className="hover:underline cursor-pointer">
                  {menu.title}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Search & Icons */}
        <ul className="flex gap-4 items-center">
          {/* Search Box */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          {/* Add Product */}
          <li className="cursor-pointer hover:bg-[#e5e5e5] hover:rounded-full">
            <Link href="/components/RegistrationForm">
              <AddIcon className="text-3xl m-2 border-2 rounded-2xl " />
            </Link>
          </li>

          {/* Wishlist */}
          <li className="cursor-pointer hover:bg-[#e5e5e5] hover:rounded-full">
            <Link href="/">
              <FavoriteBorderOutlinedIcon className="text-3xl m-2 " />
            </Link>
          </li>

          {/* Cart */}
          <li className="cursor-pointer hover:bg-[#e5e5e5] hover:rounded-full">
            <Link href="/">
              <ShoppingBagOutlinedIcon className="text-3xl m-2 " />
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mega Menu Container - Now only renders the active menu */}
      <div
        className="relative w-full "
        onMouseEnter={handleMegaMenuEnter}
        onMouseLeave={handleMegaMenuLeave}
      >
        {activeMenu !== null && (
          <MegaMenu
            sections={navMenus[activeMenu].sections}
            isActive={activeMenu !== null}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
