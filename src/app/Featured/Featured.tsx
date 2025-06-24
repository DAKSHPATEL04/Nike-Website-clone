const Featured = () => {
  return (
    <div className="flex bg-white justify-center items-center w-full py-10">
      <div className="flex flex-col justify-center w-full  items-center">
        {" "}
        <div className="w-full flex justify-start py-2 px-[110px]">
          {" "}
          <h1
            className="  text-black"
            style={{
              fontFamily: "poppins",
              fontSize: "25px",
              fontWeight: "500",
            }}
          >
            Featured
          </h1>
        </div>
        <div
          className="flex w-[1300px]  text-black gap-4 justify-center items-center"
          style={{
            fontFamily: "poppins",
          }}
        >
          <div className="  ">
            <img src="/img/summer.png" alt="" />
            <div
              className="py-9 "
              style={{
                fontFamily: "poppins",
                fontSize: "20px",
                fontWeight: "400",
              }}
            >
              <button className="cursor-pointer">Cool For The Summer</button>
            </div>
          </div>
          <div className="">
            <img src="/img/runing.png" alt="" />
            <div
              className="py-9 "
              style={{
                fontFamily: "poppins",
                fontSize: "20px",
                fontWeight: "400",
              }}
            >
              <button className="cursor-pointer">Retro Running</button>
            </div>
          </div>
          <div className="">
            <img src="/img/genral.png" alt="" />
            <div
              className="py-9 "
              style={{
                fontFamily: "poppins",
                fontSize: "20px",
                fontWeight: "400",
              }}
            >
              <button className="cursor-pointer">Field General</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
