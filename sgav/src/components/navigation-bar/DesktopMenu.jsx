// DesktopMenu.js
import React from "react";
import {
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { MainLogo } from "../../assets/Icons/Logo";
import ThemeSwitcher from "../ThemeSwitcher";

export default function DesktopMenu() {
  return (
    <>
      <NavbarContent>
        <NavbarBrand>
          <MainLogo />
          <p className="font-bold text-inherit">EvoAssist</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="center">
        <NavbarItem>
          <Link to="/">Home</Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link to="/gestion-asistentes">Gestión de asistentes</Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" style={{ maxWidth: "max-content" }}>
        <NavbarItem>
          <Button as={Link} color="warning" to="/login" variant="shadow">
            Iniciar Sesión
          </Button>
        </NavbarItem>
      </NavbarContent>
      <br />
      <ThemeSwitcher />
    </>
  );
}
