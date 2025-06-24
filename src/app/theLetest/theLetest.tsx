const TheLetest = () => {
  return (
    <div className="flex bg-white justify-center items-center w-full py-32">
      <div className="flex flex-col justify-center w-full  items-center">
        {" "}
        <div className="w-full flex justify-start py-2 px-12">
          {" "}
          <h1
            className="  text-black"
            style={{
              fontFamily: "poppins",
              fontSize: "25px",
              fontWeight: "500",
            }}
          >
            The Latest
          </h1>
        </div>
        <div
          className="flex text-white   gap-4 justify-center items-center"
          style={{
            fontFamily: "poppins",
          }}
        >
          <div className="relative flex w-[700px]  ">
            <img src="/img/the-letest-one.png" alt="" />
            <div
              className="absolute  flex flex-col justify-start items-start"
              style={{
                marginLeft: "50px",
                marginTop: "290px",
              }}
            >
              <h3 className="font-bold mb-2" style={{ fontWeight: "500" }}>
                Breaking4
              </h3>
              <h2
                className="w-[390px]"
                style={{ fontSize: "20px", fontWeight: "400" }}
              >
                Faith Kipyegon vs. The 4-Minute Mile On June 26th
              </h2>
              <div className="py-4">
                <button
                  className=" bg-white text-black rounded-3xl px-4 py-[7px]"
                  style={{ fontWeight: "500", fontSize: "16px" }}
                >
                  Mart Your Calendar
                </button>
              </div>
            </div>
          </div>
          <div className="relative flex w-[700px]">
            <img src="/img/the-letest-two.png" alt="" />
            <div
              className="absolute  flex flex-col justify-start items-start"
              style={{
                marginLeft: "50px",
                marginTop: "350px",
              }}
            >
              <h2
                className="w-[390px]"
                style={{ fontSize: "20px", fontWeight: "400" }}
              >
                Nike X NorBlack NorWhite
              </h2>
              <div className="py-4">
                <button
                  className=" bg-white text-black rounded-3xl px-4 py-[7px]"
                  style={{ fontWeight: "500", fontSize: "16px" }}
                >
                  Shop
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheLetest;
