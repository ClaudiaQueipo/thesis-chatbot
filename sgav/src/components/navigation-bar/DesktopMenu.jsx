// DesktopMenu.js
import { useEffect, useState } from "react";
import {
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  Button,
  User
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { MainLogo } from "../../assets/Icons/Logo";
import ThemeSwitcher from "../ThemeSwitcher";
import { getUser, isAdmin } from "../../utils/auth";
import authService from "../../services/auth.service";

export default function DesktopMenu() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const u = getUser()
    setUser(u)
  }, [user]);

  return (
    <>
      <NavbarContent>
        <NavbarBrand>
          <MainLogo />
          <p className="font-bold text-inherit">EvoAssist</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="start">
        <NavbarItem>
          <Link to="/">Home</Link>
        </NavbarItem>
        {user && <NavbarItem isActive>
          <Link to="/gestion-asistentes">Gestión de asistentes</Link>
        </NavbarItem>}
        {
          user && isAdmin() && <NavbarItem isActive>
            <Link to="/admin">Administración</Link>
          </NavbarItem>
        }
      </NavbarContent>

      <NavbarContent justify="end" style={{ maxWidth: "max-content" }}>
        {user ? (
          <>
            <User name={user} />
            <Button onClick={() => {
              authService.logout()
              setUser(null)
            }
            } color="secondary" style={{ color: "white" }}>Cerrar sesión</Button>
          </>
        ) : (
          <NavbarItem>
            <Button as={Link} color="warning" to="/login" variant="shadow">
              Iniciar Sesión
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
      <br />
      <ThemeSwitcher />
    </>
  );
}
