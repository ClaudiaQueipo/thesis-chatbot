import { lazy, Suspense } from "react";

import { createBrowserRouter } from "react-router-dom";
import Home from "../views/pages/Home";
const LazyAssistantManagement = lazy(() =>
  import("../views/pages/AssistantManagement")
);
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
]);

export default router;
