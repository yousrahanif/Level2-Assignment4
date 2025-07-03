import { Link } from "react-router";
import download from "../../assets/download.png"
export default function Navbar() {
  return (
    <nav className=" h-16 flex justify-between  items-center  px-5">
      <div className="">
        <Link to="/" className="text-xl flex items-center" >
      <img className="w-20 h-20" src={download} alt="" />
    {/* <span className="font-bold ml-2"></span> */}
      </Link>
      </div>
      <div className="flex gap-x-6 items-center">
        <Link className="hover:underline" to="/allBooks">
        Books
      </Link>
      <Link className="hover:underline" to="/addBook">
        Add
      </Link>
      <Link className="hover:underline" to="/borrowSummary">
        Summary
      </Link>
      </div>
  
    </nav>
  );
}
