import MainPage from "./components/MainPage";

import HomePage from "./components/Home/page";
import TheLetest from "./theLetest/theLetest";
import Featured from "./Featured/Featured";
import NewArrival from "./NewArrival/newArrival";
import ShopNow from "./shopNow/shopNow";
import TrendingNow from "./TrendingNow/TrendingNow";
import ShopBySport from "./ShopBySport/ShopBySport";
import Footer from "@/shared/Footer";
import Navbar from "@/shared/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

export default function Home() {
  return (
    <div className=" ">
      <ProtectedRoute>
        <Navbar />
        <HomePage />
        <TheLetest />
        <Featured />
        <NewArrival />
        <ShopNow />
        <TrendingNow />
        <ShopBySport />
        <Footer />
        {/* <MainPage /> */}
      </ProtectedRoute>
    </div>
  );
}
