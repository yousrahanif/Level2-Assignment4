import Footer from "./components/shared/Footer"
import Navbar from "./components/shared/Navbar"
import { Outlet } from "react-router"



function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <Outlet />
      </div>

    <div className="text-center">
        <Footer  />
    </div>
    </div>
  );
}



export default App
