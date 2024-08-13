import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/homePage/HomePage';
import Error404Page from './pages/error404Page/Error404Page';
import AddUserPage from './pages/addUserPage/AddUserPage';
import UserAddedPage from './pages/addUserPage/UserAddedPage';
import ProfilesPage from './pages/profiles/ProfilesPage';
import AllUsersPage from './pages/allUsersPage/AllUsersPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <Error404Page />,
  },
  {
    path: '/profiles',
    element: <ProfilesPage />,
  },
  {
    path: '/add-user',
    element: <AddUserPage />,
  },
  {
    path: '/user-added',
    element: <UserAddedPage />,
  },
  {
    path: '/all-users',
    element: <AllUsersPage />,
  }
]);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
