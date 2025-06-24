"use client";

const HomePage = () => {
  return (
    <div className="flex pt-40 bg-white justify-center items-center w-full h-screen">
      <div className="flex flex-col  justify-center items-center w-[80%] ">
        <img src="/img/nike-just-do-it.png" alt="home image" />
        <div className="text-black flex flex-col justify-center items-center">
          <h3 className="font-bold mt-4 ">Breaking4</h3>
          <h1
            className="text-6xl font-bold w-[800px] flex justify-center items-center "
            style={{
              fontFamily: "Roboto",
              fontWeight: "bold",
              fontSize: "70px",
            }}
          >
            FAITH KIPYEGON
          </h1>
          <h1
            className="text-6xl  w-[800px] flex justify-center items-center "
            style={{
              fontFamily: "Roboto",
              fontWeight: "bold",
              fontSize: "70px",
            }}
          >
            COLLECTION
          </h1>
          <p className="w-[500px] text-center ">
            inspired by the woman daring to break the 4-minute mile barrier, her
            collection features running shoes and apparel buil for speed.
          </p>
          <button className="bg-black text-white px-4 py-2 mt-4 rounded-3xl">
            Shop
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
