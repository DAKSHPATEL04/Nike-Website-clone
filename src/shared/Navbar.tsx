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
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

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

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  images: string[];
  gender?: string;
  description?: string;
  rating?: number;
  is_new?: boolean;
}

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
      className="absolute left-0 w-full bg-white shadow-lg border border-gray-200 z-30 px-4 md:px-10 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-10"
      style={{
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

// Mobile Dropdown Menu Component
const MobileDropdownMenu = ({
  items,
  isActive,
}: {
  items: { label: string; action?: () => void }[];
  isActive: boolean;
}) => {
  return (
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isActive ? "max-h-[1000px]" : "max-h-0"
      }`}
    >
      <ul className="space-y-0">
        {items.map((item, index) => (
          <li
            key={index}
            className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-black cursor-pointer transition-colors duration-150 border-t border-gray-100"
            onClick={item.action}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Search Suggestions Component
const SearchSuggestions = ({
  isActive,
  searchQuery,
  onClose,
  products,
}: {
  isActive: boolean;
  searchQuery: string;
  onClose: () => void;
  products: Product[];
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Get top 4 popular products for suggestions
  const topSuggestions = products
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 4)
    .map((product) => product.name);

  // Filter products safely
  const filteredProducts = Array.isArray(products)
    ? products.filter((product) => {
        if (!product || !product.name) return false;
        return product.name.toLowerCase().includes(searchQuery.toLowerCase());
      })
    : [];

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    if (isActive) {
      gsap.fromTo(
        menu,
        { opacity: 0, y: -20, x: -20 },
        {
          opacity: 1,
          y: 0,
          x: 0,
          visibility: "visible",
          duration: 0.3,
          ease: "power2.out",
        }
      );
    } else {
      gsap.to(menu, {
        opacity: 0,
        y: -10,
        x: 20,
        visibility: "hidden",
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [isActive]);

  const handleSuggestionClick = (suggestion: string) => {
    const suggestedProduct = products.find(
      (p) => p.name.toLowerCase() === suggestion.toLowerCase()
    );
    if (suggestedProduct) {
      router.push(`/components/MainPage?id=${suggestedProduct.id}`);
      onClose();
    }
  };

  return (
    <div
      ref={menuRef}
      className="absolute right-0 mt-2 w-full sm:w-[400px] md:w-[500px] bg-white shadow-lg border border-gray-200 z-50 rounded-lg overflow-hidden"
      style={{
        opacity: 0,
        visibility: "hidden",
        transform: "translateY(-10px)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Top Suggestions */}
      {searchQuery === "" && (
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 text-sm mb-2">
            Top Suggestions
          </h3>
          <div className="flex flex-wrap gap-2">
            {topSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm cursor-pointer hover:bg-gray-200"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Products */}
      <div className="max-h-[500px] overflow-y-auto">
        {filteredProducts.length > 0 ? (
          <div className="space-y-2 p-4">
            {filteredProducts.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200 cursor-pointer"
                onClick={() => {
                  router.push(`/components/MainPage?id=${product.id}`);
                  onClose();
                }}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={product.images?.[0] || "/img/placeholder-product.jpg"}
                    alt={product.name || "Product"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/img/placeholder-product.jpg";
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">
                    {product.name || "Unknown Product"}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    {product.category || "Uncategorized"}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-sm font-semibold">
                      ₹ {product.price?.toLocaleString() || "N/A"}
                    </p>
                    {product.is_new && (
                      <span className="bg-black text-white text-xs px-2 py-1 rounded">
                        New
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : searchQuery ? (
          <div className="p-4 text-center text-gray-500">
            No products found for "{searchQuery}"
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500">
            Start typing to search products
          </div>
        )}
      </div>

      {/* View all results */}
      {filteredProducts.length > 0 && (
        <div className="p-4 text-center bg-gray-50 border-t border-gray-200">
          <Link
            href={`/search?q=${encodeURIComponent(searchQuery)}`}
            onClick={onClose}
            className="text-sm font-medium text-gray-700 hover:text-black"
          >
            View all results for "{searchQuery}"
          </Link>
        </div>
      )}
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
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const menuTimeout = useRef<NodeJS.Timeout | null>(null);
  const helpTimeout = useRef<NodeJS.Timeout | null>(null);
  const profileTimeout = useRef<NodeJS.Timeout | null>(null);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  // Auth and Profile using updated context
  const router = useRouter();
  const { user, userProfile, profileLoading, isOnline } = useAuth();

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://react-trainee-api.onrender.com/get/products"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        // Transform the API data to match our Product interface
        const transformedProducts =
          data.products?.map((product: any) => ({
            id: product.id || product._id,
            name: product.product_name || product.name,
            category: product.category || "Shoes",
            price: product.product_data?.prize || product.price || 0,
            images: [product.product_image || "/img/placeholder-product.jpg"],
            description: product.product_data?.description || "",
            rating: product.product_data?.rating || 0,
            is_new: product.product_data?.is_new || false,
          })) || [];
        setProducts(transformedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
        setShowSearchSuggestions(false);
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
    setShowSearchSuggestions(false);
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
    setShowSearchSuggestions(false);
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
    setShowSearchSuggestions(false);
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

  // Search handlers
  const handleSearchFocus = () => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    setShowSearchSuggestions(true);
    setActiveMenu(null);
    setActiveHelpDropdown(false);
    setActiveProfileDropdown(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSearchSuggestions(true);
  };

  const closeSearchSuggestions = () => {
    searchTimeout.current = setTimeout(() => {
      setShowSearchSuggestions(false);
    }, 200);
  };

  const keepSuggestionsOpen = () => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (mobileSearchOpen) setMobileSearchOpen(false);
  };

  const toggleMobileSearch = () => {
    setMobileSearchOpen(!mobileSearchOpen);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  if (!isClient) return null;

  return (
    <div className="sticky top-0 text-black  z-50" ref={navbarRef}>
      {/* Offline Banner */}
      {!isOnline && (
        <div className="bg-red-600 text-white text-center py-1 text-sm flex items-center justify-center gap-2">
          <WifiOffIcon fontSize="small" />
          You're offline. Some features may not work properly.
        </div>
      )}

      {/* Top Bar */}
      <div className="flex justify-between items-center z-50 text-black bg-[#f5f5f5] relative px-4 sm:px-6 md:px-10">
        <div className="flex items-center">
          <img
            className="w-[18px]"
            src="/img/air-jordan-logo.png"
            alt="Jordan Logo"
          />
        </div>
        <div className="hidden sm:block">
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
        {/* Mobile menu button */}
        <div className="flex items-center sm:hidden">
          <button
            onClick={toggleMobileMenu}
            className="p-2 mr-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <CloseIcon className="text-2xl" />
            ) : (
              <MenuIcon className="text-2xl" />
            )}
          </button>
        </div>

        {/* Brand logo */}
        <Link href="/" className="flex-shrink-0">
          <img
            src="/img/logo.png"
            alt="Nike Logo"
            className="cursor-pointer w-[60px] sm:w-[70px] ml-2 hover:opacity-80 transition-opacity"
          />
        </Link>

        {/* Navigation Links with Mega Menu - Desktop */}
        <div className="hidden sm:flex gap-4">
          <ul className="flex gap-6" style={{ textUnderlineOffset: "5px" }}>
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
        <ul className="flex gap-2 sm:gap-4 items-center">
          {/* Mobile search button */}
          <li className="sm:hidden">
            <button
              onClick={toggleMobileSearch}
              className="p-2"
              aria-label="Toggle search"
            >
              {mobileSearchOpen ? (
                <CloseIcon className="text-2xl" />
              ) : (
                <SearchIcon className="text-2xl" />
              )}
            </button>
          </li>

          {/* Search Box with Suggestions - Desktop */}
          <li className="hidden sm:block relative">
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                onBlur={closeSearchSuggestions}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>

            <div
              onMouseEnter={keepSuggestionsOpen}
              onMouseLeave={closeSearchSuggestions}
            >
              <SearchSuggestions
                isActive={showSearchSuggestions}
                searchQuery={searchQuery}
                onClose={() => setShowSearchSuggestions(false)}
                products={products}
              />
            </div>
          </li>

          {/* Add Product - Only show if user is logged in */}
          {user && (
            <li className="hidden sm:block cursor-pointer hover:bg-[#e5e5e5] hover:rounded-full transition-colors">
              <Link href="/components/RegistrationForm">
                <AddIcon className="text-3xl m-2 border-2 rounded-2xl" />
              </Link>
            </li>
          )}

          {/* Wishlist */}
          <li className="cursor-pointer hover:bg-[#e5e5e5] hover:rounded-full transition-colors">
            <Link href="/wishlist">
              <FavoriteBorderOutlinedIcon className="text-2xl sm:text-3xl m-2" />
            </Link>
          </li>

          {/* Cart */}
          <li className="cursor-pointer hover:bg-[#e5e5e5] hover:rounded-full transition-colors">
            <Link href="/cart">
              <ShoppingBagOutlinedIcon className="text-2xl sm:text-3xl m-2" />
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mobile Search - Only visible when toggled */}
      {mobileSearchOpen && (
        <div className="sm:hidden bg-white p-4 border-t border-gray-200">
          <div className="relative w-full">
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                onBlur={closeSearchSuggestions}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            {showSearchSuggestions && (
              <SearchSuggestions
                isActive={showSearchSuggestions}
                searchQuery={searchQuery}
                onClose={() => setShowSearchSuggestions(false)}
                products={products}
              />
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu - Only visible when toggled */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-200">
          {/* Navigation Links */}
          <ul className="py-2">
            {navMenus.map((menu, idx) => (
              <li key={idx} className="border-b border-gray-100">
                <div
                  className="px-4 py-3 font-medium flex justify-between items-center"
                  onClick={() => setActiveMenu(activeMenu === idx ? null : idx)}
                >
                  <span>{menu.title}</span>
                  <AddIcon
                    className={`transform transition-transform ${
                      activeMenu === idx ? "rotate-45" : "rotate-0"
                    }`}
                  />
                </div>
                {activeMenu === idx && (
                  <div className="px-4 py-2 bg-gray-50">
                    {menu.sections.map((section, sectionIdx) => (
                      <div key={sectionIdx} className="mb-4">
                        <h3 className="font-semibold text-gray-900 text-sm mb-2">
                          {section.heading}
                        </h3>
                        <ul className="space-y-1">
                          {section.items.map((item, itemIdx) => (
                            <li
                              key={itemIdx}
                              className="text-sm text-gray-600 hover:text-black cursor-pointer transition-colors duration-150"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile Help Section */}
          <div className="border-t border-gray-200 px-4 py-3">
            <div
              className="font-medium flex justify-between items-center"
              onClick={() => setActiveHelpDropdown(!activeHelpDropdown)}
            >
              <span>Help</span>
              <AddIcon
                className={`transform transition-transform ${
                  activeHelpDropdown ? "rotate-45" : "rotate-0"
                }`}
              />
            </div>
            <MobileDropdownMenu
              items={helpItems}
              isActive={activeHelpDropdown}
            />
          </div>

          {/* Mobile Profile Section */}
          <div className="border-t border-gray-200 px-4 py-3">
            {user ? (
              <>
                <div
                  className="font-medium flex justify-between items-center"
                  onClick={() =>
                    setActiveProfileDropdown(!activeProfileDropdown)
                  }
                >
                  <span>Hi, {getUserDisplayName()}</span>
                  <AddIcon
                    className={`transform transition-transform ${
                      activeProfileDropdown ? "rotate-45" : "rotate-0"
                    }`}
                  />
                </div>
                <MobileDropdownMenu
                  items={profileItems}
                  isActive={activeProfileDropdown}
                />
              </>
            ) : (
              <div className="flex justify-between">
                <Link
                  href="/auth/Login"
                  className="text-sm font-medium hover:text-gray-600"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/Signup"
                  className="text-sm font-medium hover:text-gray-600"
                >
                  Join Us
                </Link>
              </div>
            )}
          </div>

          {/* Add Product Button for Mobile */}
          {user && (
            <div className="border-t border-gray-200 px-4 py-3">
              <Link
                href="/components/RegistrationForm"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <AddIcon className="text-lg" />
                <span>Add Product</span>
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Mega Menu Container - Desktop */}
      <div
        className="relative w-full hidden sm:block"
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
