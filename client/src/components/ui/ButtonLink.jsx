import { Link } from "react-router-dom";

export const ButtonLink = ({ to, children }) => (
  <Link to={to} className="bg-[#008cdd] text-white  px-4 py-1 rounded-3xl font-medium hover:bg-[#add8e6] hover:shadow-lg hover:shadow-[0px 5px 10px rgba(0, 0, 0, 0.2)] transition duration-300 ease-in-out">
    {children}
  </Link>
);
