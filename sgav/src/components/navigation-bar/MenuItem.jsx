import React from "react";
import { NavbarMenuItem } from "@nextui-org/react";
import { Link, useLocation } from "react-router-dom";

export default function MenuItem({ item }) {
  const location = useLocation();

  return (
    <NavbarMenuItem>
      <Link
        to={item.path}
        style={{
          color: location.pathname === item.path ? "#9353d3" : "",
        }}
      >
        {item.name}
      </Link>
    </NavbarMenuItem>
  );
}
