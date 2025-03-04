import Image from "next/image";
import Header from "./components/header";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col ">
     <Header/>
     <Footer/>
    </div>
  );
}
