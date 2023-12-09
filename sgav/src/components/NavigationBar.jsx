import React, { useState, useEffect } from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import { Link, useLocation } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { MainLogo } from "../assets/Icons/Logo";

export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation();
  // Actualizar el tamaño de la ventana cuando cambie
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Gestión de Asistentes", path: "/gestion-asistentes" },
    { name: "Iniciar Sesión", path: "/iniciar-sesion" },
    { name: "Registrarse", path: "/registrarse" },
    { name: "Log Out", path: "/logout" },
  ];

  return (
    <Navbar
      maxWidth="full"
      isBordered
      isBlurred
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      {windowWidth <= 640 ? (
        <>
          <NavbarContent className="sm:hidden" justify="start">
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            />
          </NavbarContent>

          <NavbarContent className="sm:hidden pr-3" justify="center">
            <NavbarBrand>
              <MainLogo />
              <p className="font-bold text-inherit">EvoAssist</p>
            </NavbarBrand>
          </NavbarContent>
        </>
      ) : (
        <>
          <NavbarContent
            className="hidden"
            style={{ display: windowWidth > 640 ? "flex" : "none" }}
          >
            <NavbarBrand>
              <MainLogo />
              <p className="font-bold text-inherit">EvoAssist</p>
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent
            className="hidden"
            style={{ display: windowWidth > 640 ? "flex" : "none" }}
            justify="center"
          >
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
      )}

      <NavbarMenu className="items-center">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              to={item.path}
              style={{
                color: location.pathname === item.path ? "#9353d3" : "",
              }}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        <ThemeSwitcher />
      </NavbarMenu>
    </Navbar>
  );
}
