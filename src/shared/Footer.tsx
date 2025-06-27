import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";

const Footer = () => {
  return (
    <footer
      className=" w-full flex flex-col justify-center items-center p-4 bg-white text-black"
      style={{
        border: "2px solid white",
      }}
    >
      <hr
        className="flex justify-center items-center w-[1400px] text-[#e5e5e5]"
        style={{ border: "1px solid #e5e5e5" }}
      />
      <div className="flex justify-between items-center w-[1400px]  pt-10">
        <div className="flex justify-between items-center w-[1000px]  ">
          <div className="flex flex-col pb-10">
            <h1
              className=" py-4 "
              style={{
                fontSize: "15px",
                fontWeight: "500",
              }}
            >
              Resources
            </h1>
            <ul
              className="text-gray-500 gap-4"
              style={{
                fontSize: "15px",
                fontWeight: "500",
              }}
            >
              <li>Find A Store</li>
              <li>Become A Member</li>
              <li>Running Shoe Finder</li>
              <li>Product Advice</li>
              <li>Send Us Feedback</li>
            </ul>
          </div>
          <div className="flex flex-col pb-5">
            <h1
              className=" py-4"
              style={{
                fontSize: "15px",
                fontWeight: "500",
              }}
            >
              Help
            </h1>
            <ul
              className="text-gray-500 gap-4"
              style={{
                fontSize: "15px",
                fontWeight: "500",
              }}
            >
              <li>Get Help</li>
              <li>Order Status</li>
              <li>Delivery</li>
              <li>Returns</li>
              <li>Contact Us On Nike.com Inquiries</li>
              <li>Contact Us On All Other Inquiries</li>
            </ul>
          </div>
          <div>
            <h1
              className=" py-4"
              style={{
                fontSize: "15px",
                fontWeight: "500",
              }}
            >
              Company
            </h1>
            <ul
              className="text-gray-500 gap-4"
              style={{
                fontSize: "15px",
                fontWeight: "500",
              }}
            >
              <li>About Nike</li>
              <li>News</li>
              <li>Careers</li>
              <li>Investors</li>
              <li>Sustainability</li>
              <li>Impact</li>
              <li>Report a Concern</li>
            </ul>
          </div>
        </div>
        <div
          className="text-gray-500 gap-4 mb-38"
          style={{
            fontSize: "15px",
            fontWeight: "500",
          }}
        >
          <LanguageOutlinedIcon />
          India
        </div>
      </div>
      <div className="flex flex-row justify-between items-center w-[1400px] py-10 ">
        <div>
          <ul
            className="flex flex-row justify-center items-center gap-4 text-gray-500"
            style={{
              fontSize: "15px",
              fontWeight: "500",
            }}
          >
            <li className="">© 2025 Nike, Inc. All rights reserved</li>
            <li className=" hover:text-black">Guides</li>
            <li className=" hover:text-black">Terms of Sale</li>
            <li className=" hover:text-black">Terms of Use</li>
            <li className=" hover:text-black">Nike Privacy Policy</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
