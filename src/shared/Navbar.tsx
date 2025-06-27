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
import WifiOffIcon from "@mui/icons-material/WifiOff";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

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
        y: -5,
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
      className="absolute left-0 w-full bg-white shadow-lg border border-gray-200 z-30 px-10 py-6 grid grid-cols-2 md:grid-cols-4 gap-10"
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

// Dropdown Menu Component
interface DropdownMenuProps {
  items: { label: string; action?: () => void }[];
  isActive: boolean;
  position?: "left" | "right";
}

const DropdownMenu = ({
  items,
  isActive,
  position = "right",
}: DropdownMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    if (isActive) {
      gsap.to(menu, {
        opacity: 1,
        y: 0,
        visibility: "visible",
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(menu, {
        opacity: 0,
        y: -10,
        visibility: "hidden",
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [isActive]);

  return (
    <div
      ref={menuRef}
      className={`absolute top-full ${
        position === "right" ? "right-0" : "left-0"
      } mt-2 bg-white shadow-lg border border-gray-200 z-50 py-2 min-w-[200px] rounded-md`}
      style={{
        fontFamily: "Poppins",
        opacity: 0,
        visibility: "hidden",
        transform: "translateY(-10px)",
      }}
    >
      <ul className="space-y-0">
        {items.map((item, index) => (
          <li
            key={index}
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black cursor-pointer transition-colors duration-150"
            onClick={item.action}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Main Navbar Component
const Navbar = () => {
  const [isClient, setIsClient] = useState(false);
  const { searchQuery, setSearchQuery } = useSearch();
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [activeHelpDropdown, setActiveHelpDropdown] = useState(false);
  const [activeProfileDropdown, setActiveProfileDropdown] = useState(false);
  const menuTimeout = useRef<NodeJS.Timeout | null>(null);
  const helpTimeout = useRef<NodeJS.Timeout | null>(null);
  const profileTimeout = useRef<NodeJS.Timeout | null>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  // Auth and Profile using updated context
  const router = useRouter();
  const { user, userProfile, profileLoading, isOnline } = useAuth();

  // Help dropdown items
  const helpItems = [
    { label: "Order Status" },
    { label: "Dispatch and Delivery" },
    { label: "Returns" },
    { label: "Contact Us" },
    { label: "Privacy Policy" },
    { label: "Terms of Sale" },
    { label: "Terms of Use" },
    { label: "Send Us Feedback" },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setActiveProfileDropdown(false);
      router.push("/auth/Login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Profile dropdown items for logged in users
  const profileItems = [
    { label: "Profile", action: () => router.push("/components/profile") },
    { label: "Orders", action: () => router.push("/orders") },
    { label: "Favourites", action: () => router.push("/wishlist") },
    { label: "Inbox" },
    { label: "Experiences" },
    { label: "Account Settings" },
    { label: "Log Out", action: handleLogout },
  ];

  useEffect(() => {
    setIsClient(true);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setActiveMenu(null);
        setActiveHelpDropdown(false);
        setActiveProfileDropdown(false);
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
    setActiveHelpDropdown(false);
    setActiveProfileDropdown(false);
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

  // Help dropdown handlers
  const handleHelpEnter = () => {
    if (helpTimeout.current) {
      clearTimeout(helpTimeout.current);
    }
    setActiveHelpDropdown(true);
    setActiveMenu(null);
    setActiveProfileDropdown(false);
  };

  const handleHelpLeave = () => {
    helpTimeout.current = setTimeout(() => {
      setActiveHelpDropdown(false);
    }, 200);
  };

  const handleHelpDropdownEnter = () => {
    if (helpTimeout.current) {
      clearTimeout(helpTimeout.current);
    }
  };

  const handleHelpDropdownLeave = () => {
    helpTimeout.current = setTimeout(() => {
      setActiveHelpDropdown(false);
    }, 200);
  };

  // Profile dropdown handlers
  const handleProfileEnter = () => {
    if (profileTimeout.current) {
      clearTimeout(profileTimeout.current);
    }
    setActiveProfileDropdown(true);
    setActiveMenu(null);
    setActiveHelpDropdown(false);
  };

  const handleProfileLeave = () => {
    profileTimeout.current = setTimeout(() => {
      setActiveProfileDropdown(false);
    }, 200);
  };

  const handleProfileDropdownEnter = () => {
    if (profileTimeout.current) {
      clearTimeout(profileTimeout.current);
    }
  };

  const handleProfileDropdownLeave = () => {
    profileTimeout.current = setTimeout(() => {
      setActiveProfileDropdown(false);
    }, 200);
  };

  const getUserDisplayName = () => {
    if (profileLoading) return "Loading...";

    if (userProfile?.firstName) {
      return userProfile.firstName;
    }

    if (user?.displayName) {
      return user.displayName.split(" ")[0];
    }

    if (user?.email) {
      return user.email.split("@")[0];
    }

    return "User";
  };

  if (!isClient) return null;

  return (
    <div className="sticky top-0 z-50" ref={navbarRef}>
      {/* Offline Banner */}
      {!isOnline && (
        <div className="bg-red-600 text-white text-center py-1 text-sm flex items-center justify-center gap-2">
          <WifiOffIcon fontSize="small" />
          You're offline. Some features may not work properly.
        </div>
      )}

      {/* Top Bar */}
      <div className="flex justify-between items-center z-50 text-black bg-[#f5f5f5] relative px-10">
        <div className="flex items-center">
          <img
            className="w-[18px]"
            src="/img/air-jordan-logo.png"
            alt="Jordan Logo"
          />
        </div>
        <div>
          <ul
            className="flex flex-row items-center gap-4"
            style={{
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            <li className="hover:text-gray-600 cursor-pointer">Find a Store</li>
            <li className="text-gray-400">|</li>

            {/* Help with Dropdown */}
            <li
              className="relative"
              onMouseEnter={handleHelpEnter}
              onMouseLeave={handleHelpLeave}
            >
              <span className="hover:text-gray-600 cursor-pointer">Help</span>
              <div
                onMouseEnter={handleHelpDropdownEnter}
                onMouseLeave={handleHelpDropdownLeave}
              >
                <DropdownMenu
                  items={helpItems}
                  isActive={activeHelpDropdown}
                  position="right"
                />
              </div>
            </li>
            <li className="text-gray-400">|</li>

            {user ? (
              <>
                {/* Profile with Dropdown */}
                <li
                  className="flex items-center relative"
                  onMouseEnter={handleProfileEnter}
                  onMouseLeave={handleProfileLeave}
                >
                  <span className="mr-1">Hi,</span>
                  <span className="font-semibold hover:text-gray-600 cursor-pointer">
                    {getUserDisplayName()}
                  </span>
                  <PermIdentityOutlinedIcon className="ml-2 mb-[2px]" />
                  {!isOnline && (
                    <WifiOffIcon
                      className="ml-1 text-red-500"
                      fontSize="small"
                    />
                  )}

                  <div
                    onMouseEnter={handleProfileDropdownEnter}
                    onMouseLeave={handleProfileDropdownLeave}
                  >
                    <DropdownMenu
                      items={profileItems}
                      isActive={activeProfileDropdown}
                      position="right"
                    />
                  </div>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/auth/Login"
                    className="hover:text-gray-600 cursor-pointer"
                  >
                    Sign In
                  </Link>
                </li>
                <li className="text-gray-400">|</li>
                <li>
                  <Link
                    href="/auth/Signup"
                    className="hover:text-gray-600 cursor-pointer"
                  >
                    Join Us
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className="flex justify-between items-center z-40 text-black p-2 bg-white relative"
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
            alt="Nike Logo"
            className="cursor-pointer w-[70px] ml-2 hover:opacity-80 transition-opacity"
          />
        </Link>

        {/* Navigation Links with Mega Menu */}
        <div className="flex gap-4">
          <ul
            className="flex gap-6"
            style={{ fontFamily: "Poppins", textUnderlineOffset: "5px" }}
          >
            {navMenus.map((menu, idx) => (
              <li
                key={idx}
                className="relative group"
                onMouseEnter={() => handleMenuEnter(idx)}
                onMouseLeave={handleMenuLeave}
              >
                <span className="hover:underline cursor-pointer font-medium transition-all duration-200">
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

          {/* Add Product - Only show if user is logged in */}
          {user && (
            <li className="cursor-pointer hover:bg-[#e5e5e5] hover:rounded-full transition-colors">
              <Link href="/components/RegistrationForm">
                <AddIcon className="text-3xl m-2 border-2 rounded-2xl" />
              </Link>
            </li>
          )}

          {/* Wishlist */}
          <li className="cursor-pointer hover:bg-[#e5e5e5] hover:rounded-full transition-colors">
            <Link href="/wishlist">
              <FavoriteBorderOutlinedIcon className="text-3xl m-2" />
            </Link>
          </li>

          {/* Cart */}
          <li className="cursor-pointer hover:bg-[#e5e5e5] hover:rounded-full transition-colors">
            <Link href="/cart">
              <ShoppingBagOutlinedIcon className="text-3xl m-2" />
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mega Menu Container */}
      <div
        className="relative w-full"
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
