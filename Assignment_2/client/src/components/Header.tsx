import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex items-center w-full h-[100px] shadow-sm justify-between px-7 md:px-14">
      <Link to="/">
        <h1 className="text-xl">Assignment 2 - DLS</h1>
        <h2>By Andreas & Owais</h2>
      </Link>
      <div className="flex items-center gap-4">
        <Link to="/createticket">
          <div className="hover:scale-105 duration-100 ease-in-out">Create Ticket</div>
        </Link>
        <Link to="/validateticket">
          <div className="hover:scale-105 duration-100 ease-in-out">Validate Ticket</div>
        </Link>
        <Link to="/createjob">
          <div className="hover:scale-105 duration-100 ease-in-out">Create Job</div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
