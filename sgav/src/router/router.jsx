import { lazy, Suspense } from "react";

import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "../views/pages/Home";

const LazyAssistantManagement = lazy(() =>
  import("../views/pages/AssistantManagement")
);
const LazyLogin = lazy(() => import("../views/pages/Login"));
const LazyCreateAssistant = lazy(() =>
  import("../views/pages/CreateAssistant")
);
const LazyEditAssistant = lazy(() =>
  import("../views/pages/EditAssistant")
);
const NotFound = lazy(() => import("../views/pages/NotFound"));

const router = createBrowserRouter([
  {
    path: "",
    element: <Home />,
  },
  {
    path: "gestion-asistentes",
    element: (
      <Suspense fallback={<h1>Loading...</h1>}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: <LazyAssistantManagement />,
      },
      {
        path: "create-assistant",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <LazyCreateAssistant />
          </Suspense>
        ),
      },
      {
        path: "edit-assistant",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <LazyEditAssistant />
          </Suspense>
        ),
      },
      {
        path: "test-assistant",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <LazyCreateAssistant />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "login",
    element: (
      <Suspense fallback={<h1>Loading...</h1>}>
        <LazyLogin />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<h1>Loading...</h1>}>
        <NotFound />
      </Suspense>
    ),
  },
]);

export default router;
