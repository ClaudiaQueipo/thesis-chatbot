import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { NextUIProvider } from "@nextui-org/react";

function App() {
  return (
    <>
      <NextUIProvider>
        <RouterProvider router={router} />
      </NextUIProvider>
    </>
  );
}

export default App;
