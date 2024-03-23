import { useState } from "react";
import {
  Tabs,
  Tab,
  Input,
  Button,
  Card,
  CardBody,
  Link as LinkNext,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { GoogleIcon } from "../../assets/Icons/GoogleIcon";
import { FacebookIcon } from "../../assets/Icons/FacebookIcon";
import authService from "../../services/auth.service";
import { Toaster, toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { setUser } from "../../utils/auth";

export default function Login() {
  const [selected, setSelected] = useState("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('username', loginEmail);
      formData.append('password', loginPassword);
      const response = await authService.login(formData);
      setUser(loginEmail)
      if (response) navigate('/')
      toast.error(`Sus credenciales son incorrectas`)
    } catch (error) {
      console.error(error);
      toast.error("Ha ocurrido un error en el servidor, intente de nuevo")
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const user = {
        first_name: registerName,
        last_name: registerLastName,
        email: registerEmail,
        password: registerPassword,
      };
      const response = await authService.register(user);
      console.log(response);
      toast.success("Registro exitoso, ahora puedes loggearte")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col" style={{ width: "400px" }}>
        <Link
          style={{ position: "absolute", top: 20, left: 20, color: "#f5a524" }}
          to="/"
        >
          EvoAssist
        </Link>
        <Card className="max-w-full w-[340px] " style={{ height: "500px" }}>
          <CardBody >
            <Tabs
              fullWidth
              size="md"
              aria-label="Tabs form"
              selectedKey={selected}
              onSelectionChange={setSelected}
            >
              <Tab key="login" title="Iniciar sesión">
                <form
                  className="flex flex-col gap-4"
                  style={{ marginTop: "30px" }}
                >
                  <Input
                    isRequired
                    label="Email"
                    placeholder="Escribe tu email"
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                  <Input
                    isRequired
                    label="Contraseña"
                    placeholder="Escribe tu contraseña"
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  <p className="text-center text-small">
                    ¿Necesitas una cuenta?{" "}
                    <LinkNext
                      size="sm"
                      color="warning"
                      onPress={() => setSelected("sign-up")}
                    >
                      <strong>Regístrate</strong>
                    </LinkNext>
                  </p>
                  <div className="flex gap-2 justify-end" style={{ marginTop: "30px" }}>
                    <Button onClick={handleLogin} fullWidth color="secondary" className="text-white">
                      Iniciar Sesión
                    </Button>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Button
                      fullWidth
                      startContent={<GoogleIcon />}
                      color="default"
                      variant="bordered"
                    >
                      Continuar con Google
                    </Button>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button
                      startContent={<FacebookIcon />}
                      fullWidth
                      color="default"
                      variant="bordered"
                    >
                      Continuar con Facebook
                    </Button>
                  </div>
                </form>
              </Tab>
              <Tab key="sign-up" title="Registrarse">
                <form
                  className="flex flex-col gap-4 h-[400px]"
                  style={{ marginTop: "30px" }}
                >
                  <Input
                    isRequired
                    label="Nombre"
                    placeholder="Escribe tu nombre"
                    type="text"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                  />
                  <Input
                    isRequired
                    label="Apellidos"
                    placeholder="Escribe tus apellidos"
                    type="text"
                    value={registerLastName}
                    onChange={(e) => setRegisterLastName(e.target.value)}
                  />
                  <Input
                    isRequired
                    label="Email"
                    placeholder="Escribe tu email"
                    type="email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                  />
                  <Input
                    isRequired
                    label="Contraseña"
                    placeholder="Escribe tu contraseña"
                    type="password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                  />
                  <p className="text-center text-small">
                    ¿Ya tienes una cuenta?{" "}
                    <LinkNext
                      size="sm"
                      color="warning"
                      onPress={() => setSelected("login")}
                    >
                      <strong>Login</strong>
                    </LinkNext>
                  </p>
                  <div className="flex gap-2 justify-end">
                    <Button onClick={handleRegister} fullWidth color="secondary" className="text-white">
                      Registrarse
                    </Button>
                  </div>
                </form>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
      <Toaster duration={3000} position="bottom-center" richColors theme="system" />
    </div>
  );
}
