import React, { useState } from "react";
import { Navbar, NavbarMenu } from "@nextui-org/react";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import MenuItem from "./MenuItem";
import useWindowSize from "../../hooks/useWindowResize";
import ThemeSwitcher from "../ThemeSwitcher";
import { isAdmin } from "../../utils/auth";
import { useEffect } from "react";

export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const windowSize = useWindowSize();


  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Gestión de Asistentes", path: "/gestion-asistentes" },
    { name: "Iniciar Sesión", path: "/iniciar-sesion" },
    { name: "Registrarse", path: "/registrarse" },
    { name: "Log Out", path: "/logout" },
  ];  
  
  if (isAdmin) {
    menuItems.splice(2, 0, { name: "Administración", path: "/admin" });
  }

  return (
    <Navbar
      maxWidth="full"
      isBordered
      isBlurred
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      {windowSize.width <= 640 ? (
        <MobileMenu onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />
      ) : (
        <DesktopMenu />
      )}

      <NavbarMenu className="items-center">
        {menuItems.map((item, index) => (
          <MenuItem key={`${item.name}-${index}`} item={item} />
        ))}
        <ThemeSwitcher />
      </NavbarMenu>
    </Navbar>
  );
}
