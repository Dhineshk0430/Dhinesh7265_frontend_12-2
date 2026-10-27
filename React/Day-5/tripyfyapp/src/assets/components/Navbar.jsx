import { Link, NavLink } from "react-router-dom";
import logo from "../TripyfyEmblem.png";

function Navbar() {
  const links = [
    { name: "Home", path: "/" },
    { name: "Book", path: "/book" },
    { name: "About", path: "/about" },
    { name: "Help", path: "/help" },
  ];

  return (
    <nav className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-4 bg-white px-5 py-4 shadow-md md:px-12">
      <Link to="/" className="flex items-center gap-2">
        <img
          src={logo}
          alt="Tripyfy logo"
          className="h-11 w-11 object-contain"
        />
        <span className="text-2xl font-extrabold text-blue-950">
          Tripy<span className="text-teal-500">fy</span>
        </span>
      </Link>

      <div className="flex flex-wrap items-center gap-4 md:gap-7">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/"}
            className={({ isActive }) =>
              `font-semibold transition hover:text-teal-500 ${
                isActive ? "text-teal-600" : "text-slate-700"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>

      <Link
        to="/book"
        className="rounded-full bg-teal-500 px-5 py-3 font-bold text-white transition hover:bg-teal-600"
      >
        Plan a Trip
      </Link>
    </nav>
  );
}

export default Navbar;