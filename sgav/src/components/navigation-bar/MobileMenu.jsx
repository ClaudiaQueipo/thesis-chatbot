// MobileMenu.js
import React from "react";
import {
  NavbarContent,
  NavbarBrand,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { MainLogo } from "../../assets/Icons/Logo";
export default function MobileMenu({ onMenuToggle }) {
  return (
    <>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label="Toggle menu"
          onTouchStart={onMenuToggle}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <MainLogo />
          <p className="font-bold text-inherit">EvoAssist</p>
        </NavbarBrand>
      </NavbarContent>
    </>
  );
}
