const Footer = () => {
  return (
    <footer
      className=" w-full flex flex-col justify-center items-center p-4 bg-white text-black"
      style={{
        border: "2px solid white",
      }}
    >
      <hr className="flex justify-center items-center w-[1400px] text-[#e5e5e5]" />
      <div>
        <h1>Resources</h1>
        <ul>
          <li>Find A Store</li>
          <li>Become A Member</li>
          <li>Running Shoe Finder</li>
          <li>Product Advice</li>
          <li>Send Us Feedback</li>
        </ul>
      </div>
      <div>
        <h1>Help</h1>
        <ul>
          <li>Get Help</li>
          <li>Order Status</li>
          <li>Delivery</li>
          <li>Returns</li>
          <li>Contact Us On Nike.com Inquiries</li>
          <li>Contact Us On All Other Inquiries</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
