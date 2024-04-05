// import { lazy, Suspense } from "react";

// import { createBrowserRouter, Outlet } from "react-router-dom";
// import Home from "../views/pages/Home";

// const LazyAssistantManagement = lazy(() =>
//   import("../views/pages/AssistantManagement")
// );
// const LazyLogin = lazy(() => import("../views/pages/Login"));
// const LazyCreateAssistant = lazy(() =>
//   import("../views/pages/CreateAssistant")
// );
// const LazyEditAssistant = lazy(() =>
//   import("../views/pages/EditAssistant")
// );
// const NotFound = lazy(() => import("../views/pages/NotFound"));

// const router = createBrowserRouter([
//   {
//     path: "",
//     element: <Home />,
//   },
//   {
//     path: "gestion-asistentes",
//     element: (
//       <Suspense fallback={<h1>Loading...</h1>}>
//         <Outlet />
//       </Suspense>
//     ),
//     children: [
//       {
//         path: "",
//         element: <LazyAssistantManagement />,
//       },
//       {
//         path: "create-assistant",
//         element: (
//           <Suspense fallback={<h1>Loading...</h1>}>
//             <LazyCreateAssistant />
//           </Suspense>
//         ),
//       },
//       {
//         path: "edit-assistant",
//         element: (
//           <Suspense fallback={<h1>Loading...</h1>}>
//             <LazyEditAssistant />
//           </Suspense>
//         ),
//       },
//       {
//         path: "test-assistant",
//         element: (
//           <Suspense fallback={<h1>Loading...</h1>}>
//             <LazyCreateAssistant />
//           </Suspense>
//         ),
//       },
//     ],
//   },
//   {
//     path: "login",
//     element: (
//       <Suspense fallback={<h1>Loading...</h1>}>
//         <LazyLogin />
//       </Suspense>
//     ),
//   },
//   {
//     path: "*",
//     element: (
//       <Suspense fallback={<h1>Loading...</h1>}>
//         <NotFound />
//       </Suspense>
//     ),
//   },
// ]);

// export default router;



import { lazy } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

const Root = lazy(() => import('../components/Root'));
const Home = lazy(() => import('../views/pages/Home'));
const NotFound = lazy(() => import('../views/pages/NotFound'));
const Login = lazy(() => import('../views/pages/Login'));
const AssistantManagement = lazy(() => import('../views/pages/AssistantManagement'));
const CreateAssistant = lazy(() => import('../views/pages/CreateAssistant'));
const EditAssistant = lazy(() => import('../views/pages/EditAssistant'));
const Admin = lazy(() => import('../views/pages/Admin'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Home />
          },
          {
            path: 'gestion-asistentes',
            element: <AssistantManagement />,
            children: [
              {
                path: 'create-assistant',
                element: <CreateAssistant />
              },
              {
                path: 'edit-assistant',
                element: <EditAssistant />
              }
            ]
          }
        ]
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'admin',
        element: <Admin />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);
export default router;
