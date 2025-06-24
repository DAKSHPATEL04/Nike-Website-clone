const newArrival = () => {
  return (
    <div className="flex bg-white justify-center items-center w-full py-10">
      <div className="flex flex-col justify-center w-full  items-center">
        {" "}
        <div className="w-full flex justify-start  px-[59px]">
          {" "}
          <h1
            className="  text-black"
            style={{
              fontFamily: "poppins",
              fontSize: "25px",
              fontWeight: "500",
            }}
          >
            Don't Miss
          </h1>
        </div>
        <div
          className="flex flex-col w-[1400px]  text-black gap-4 justify-center items-center"
          style={{
            fontFamily: "poppins",
          }}
        >
          <div className=" text-center ">
            <img src="/img/new.png" alt="" />
            <div>
              <h3
                className="pt-9
              "
                style={{
                  fontFamily: "poppins",
                  fontWeight: "500",
                }}
              >
                Women's Air Jordan Collection
              </h3>
              <h1
                className=""
                style={{
                  fontFamily: "roboto",
                  fontWeight: "900",
                  fontSize: "60px",
                }}
              >
                SHOW 'EM UP
              </h1>
              <p style={{ fontFamily: "poppins" }}>
                Crafted for your flyest self, the new Air Jordan Collection
                brings iconic prints and elevated cuts.
              </p>
              <div className=" py-4">
                <button className="bg-black text-white py-2 px-4 rounded-3xl">
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

export default newArrival;
