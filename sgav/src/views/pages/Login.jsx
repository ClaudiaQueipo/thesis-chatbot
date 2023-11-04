import React from "react";
import { Tabs, Tab, Input, Button, Card, CardBody, Link as LinkNext } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { GoogleIcon } from "../../assets/Icons/GoogleIcon";
import { FacebookIcon } from "../../assets/Icons/FacebookIcon";
export default function Login() {
  const [selected, setSelected] = React.useState("login");

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col" style={{ width: "400px" }}>
        <Link
          style={{ position: "absolute", top: 20, left: 20, color: "#f5a524" }}
          to="/"
        >
          SGAV
        </Link>
        <Card className="max-w-full w-[340px]" style={{ height: "450px" }}>
          <CardBody className="overflow-hidden">
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
                  />
                  <Input
                    isRequired
                    label="Contraseña"
                    placeholder="Escribe tu contraseña"
                    type="password"
                  />
                  <p className="text-center text-small">
                    ¿Necesitas una cuenta?{" "}
                    <LinkNext
                      size="sm"
                      color="warning"
                      onPress={() => setSelected("sign-up")}
                    >
                      Regístrate
                    </LinkNext>
                  </p>
                  <div className="flex gap-2 justify-end">
                    <Button fullWidth color="secondary">
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
                  className="flex flex-col gap-4 h-[300px]"
                  style={{ marginTop: "30px" }}
                >
                  <Input
                    isRequired
                    label="Nombre"
                    placeholder="Escribe tu nombre"
                    type="password"
                  />
                  <Input
                    isRequired
                    label="Email"
                    placeholder="Escribe tu email"
                    type="email"
                  />
                  <Input
                    isRequired
                    label="Contraseña"
                    placeholder="Escribe tu contraseña"
                    type="password"
                  />
                  <p className="text-center text-small">
                    ¿Ya tienes una cuenta?{" "}
                    <LinkNext
                      size="sm"
                      color="warning"
                      onPress={() => setSelected("login")}
                    >
                      Login
                    </LinkNext>
                  </p>
                  <div className="flex gap-2 justify-end">
                    <Button fullWidth color="secondary">
                      Registrarse
                    </Button>
                  </div>
                </form>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
