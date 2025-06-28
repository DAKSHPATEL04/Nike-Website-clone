const NewArrival = () => {
  return (
    <div className="flex bg-white justify-center items-center w-full py-10">
      <div className="flex flex-col justify-center w-full items-center">
        {/* Heading */}
        <div className="w-full flex justify-start px-[59px]">
          <h1 className="text-black text-[25px] font-medium">
            Don&apos;t Miss
          </h1>
        </div>

        {/* Main Content */}
        <div className="flex flex-col w-[1400px] text-black gap-6 justify-center items-center">
          <div className="text-center">
            <img src="/img/new.png" alt="New Arrival" />

            {/* Subheading */}
            <h3 className="pt-9 font-medium text-lg">
              Women&apos;s Air Jordan Collection
            </h3>

            {/* Main Heading with Custom Font */}
            <h1
              style={{
                fontWeight: "900",
                fontSize: "60px",
                margin: "20px 0",
              }}
            >
              SHOW &apos;EM UP
            </h1>

            {/* Description */}
            <p className="font-[poppins] text-base max-w-[600px] mx-auto">
              Crafted for your flyest self, the new Air Jordan Collection brings
              iconic prints and elevated cuts.
            </p>

            {/* CTA Button */}
            <div className="py-5">
              <button className="bg-black text-white py-2 px-6 rounded-3xl text-sm font-medium">
                Shop
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
