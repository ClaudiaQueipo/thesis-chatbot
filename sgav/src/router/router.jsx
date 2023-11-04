import { lazy, Suspense } from "react";

import { createBrowserRouter } from "react-router-dom";
import Home from "../views/pages/Home";

const LazyAssistantManagement = lazy(() =>
  import("../views/pages/AssistantManagement")
);
const LazyLogin = lazy(() => import("../views/pages/Login"));
const LazyCreateAssistant = lazy(() => import("../views/pages/CreateAssistant"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/gestion-asistentes",
    element: (
      <Suspense fallback={<h1>Loading...</h1>}>
        <LazyAssistantManagement />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<h1>Loading...</h1>}>
        <LazyLogin />
      </Suspense>
    ),
  },
  {
    path: "/create-assistant",
    element: (
      <Suspense fallback={<h1>Loading...</h1>}>
        <LazyCreateAssistant />
      </Suspense>
    ),
  },
]);

export default router;
