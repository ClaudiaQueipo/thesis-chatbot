
import { lazy } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import AdminRoute from './AdminRoute';
import ProtectedRoute from './ProtectedRoute';

const Root = lazy(() => import('../components/Root'));
const Home = lazy(() => import('../views/pages/Home'));
const NotFound = lazy(() => import('../views/pages/NotFound'));
const Login = lazy(() => import('../views/pages/Login'));
const AssistantManagement = lazy(() => import('../views/pages/AssistantManagement'));
const CreateAssistant = lazy(() => import('../views/pages/CreateAssistant'));
const EditAssistant = lazy(() => import('../views/pages/EditAssistant'));
const Admin = lazy(() => import('../views/pages/Admin'))
const Chat = lazy(() => import('../views/pages/Chat'))

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

          }
        ]
      },
      {
        path: 'edit-assistant',
        element: <EditAssistant />
      },
      {
        path: 'create-assistant',
        element: <CreateAssistant />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'admin',
        element: <AdminRoute>
          <Admin />
        </AdminRoute>
      },
      {
        path: 'chat',
        element: <Chat />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);
export default router;
