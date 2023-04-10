import React from "react";
import { Link } from "react-router-dom";

const SidebarTile = ({ to, title }) => {
  return (
    <li className={`items-center hover:bg-gray-100 py-3 pl-2 border`}>
      <Link className="text-xs uppercase py-3 font-bold flex" to={to}>
        {title}
      </Link>
    </li>
  );
};

export default SidebarTile;
