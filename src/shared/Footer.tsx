import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";

const Footer = () => {
  return (
    <footer className="w-full bg-white text-black border-t border-[#e5e5e5]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top border */}
        <hr className="border-t border-[#e5e5e5] w-full my-0" />

        {/* Main footer content */}
        <div className="flex flex-col lg:flex-row justify-between pt-6 md:pt-10 pb-6 md:pb-10">
          {/* Footer links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full lg:w-[calc(100%-200px)]">
            {/* Resources */}
            <div className="pb-6 md:pb-0">
              <h3 className="text-sm md:text-base font-medium pb-3 md:pb-4">
                Resources
              </h3>
              <ul className="space-y-2 text-gray-500 text-sm md:text-base font-medium">
                <li className="hover:text-black cursor-pointer transition-colors">
                  Find A Store
                </li>
                <li className="hover:text-black cursor-pointer transition-colors">
                  Become A Member
                </li>
                <li className="hover:text-black cursor-pointer transition-colors">
                  Running Shoe Finder
                </li>
                <li className="hover:text-black cursor-pointer transition-colors">
                  Product Advice
                </li>
                <li className="hover:text-black cursor-pointer transition-colors">
                  Send Us Feedback
                </li>
              </ul>
            </div>

            {/* Help */}
            <div className="pb-6 md:pb-0">
              <h3 className="text-sm md:text-base font-medium pb-3 md:pb-4">
                Help
              </h3>
              <ul className="space-y-2 text-gray-500 text-sm md:text-base font-medium">
                <li className="hover:text-black cursor-pointer transition-colors">
                  Get Help
                </li>
                <li className="hover:text-black cursor-pointer transition-colors">
                  Order Status
                </li>
                <li className="hover:text-black cursor-pointer transition-colors">
                  Delivery
                </li>
                <li className="hover:text-black cursor-pointer transition-colors">
                  Returns
                </li>
                <li className="hover:text-black cursor-pointer transition-colors">
                  Contact Us On Nike.com Inquiries
                </li>
                <li className="hover:text-black cursor-pointer transition-colors">
                  Contact Us On All Other Inquiries
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm md:text-base font-medium pb-3 md:pb-4">
                Company
              </h3>
              <ul className="space-y-2 text-gray-500 text-sm md:text-base font-medium">
                <li className="hover:text-black cursor-pointer transition-colors">
                  About Nike
                </li>
                <li className="hover:text-black cursor-pointer transition-colors">
                  News
                </li>
                <li className="hover:text-black cursor-pointer transition-colors">
                  Careers
                </li>
                <li className="hover:text-black cursor-pointer transition-colors">
                  Investors
                </li>
                <li className="hover:text-black cursor-pointer transition-colors">
                  Sustainability
                </li>
                <li className="hover:text-black cursor-pointer transition-colors">
                  Impact
                </li>
                <li className="hover:text-black cursor-pointer transition-colors">
                  Report a Concern
                </li>
              </ul>
            </div>
          </div>

          {/* Language selector */}
          <div className="flex items-start pt-6 lg:pt-0 lg:items-center lg:justify-end lg:w-[200px]">
            <div className="flex items-center text-gray-500 text-sm md:text-base font-medium">
              <LanguageOutlinedIcon className="mr-2" />
              <span>India</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright and links */}
        <div className="flex flex-col sm:flex-row justify-between items-center py-6 md:py-10 border-t border-[#e5e5e5]">
          <div className="text-gray-500 text-sm md:text-base font-medium mb-4 sm:mb-0">
            © 2025 Nike, Inc. All rights reserved
          </div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <span className="text-gray-500 hover:text-black cursor-pointer transition-colors text-sm md:text-base font-medium">
              Guides
            </span>
            <span className="text-gray-500 hover:text-black cursor-pointer transition-colors text-sm md:text-base font-medium">
              Terms of Sale
            </span>
            <span className="text-gray-500 hover:text-black cursor-pointer transition-colors text-sm md:text-base font-medium">
              Terms of Use
            </span>
            <span className="text-gray-500 hover:text-black cursor-pointer transition-colors text-sm md:text-base font-medium">
              Nike Privacy Policy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
