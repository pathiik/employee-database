import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/homePage/HomePage';
import Error404Page from './pages/error404Page/Error404Page';
import AddUserPage from './pages/addUserPage/AddUserPage';
import UserAddedPage from './pages/addUserPage/UserAddedPage';
import ProfilesPage from './pages/profiles/ProfilesPage';
import AllUsersPage from './pages/allUsersPage/AllUsersPage';


// Update the title of the page
const updatePageTitle = (title) => {
  return () => {
    document.title = title;
    return null;
  }
}

// Title update for the error page
function ErrorPage() {
  document.title = 'Page Not Found';
  return <Error404Page />;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    loader: updatePageTitle('Employee Database'),
    errorElement: <ErrorPage />,
  },
  {
    path: '/profiles',
    element: <ProfilesPage />,
    loader: updatePageTitle('Profiles - Employee Database'),
  },
  {
    path: '/add-user',
    element: <AddUserPage />,
    loader: updatePageTitle('Add User - Employee Database'),
  },
  {
    path: '/user-added',
    element: <UserAddedPage />,
    loader: updatePageTitle('Add User - Employee Database'),
  },
  {
    path: '/all-users',
    element: <AllUsersPage />,
    loader: updatePageTitle('All Users - Employee Database'),
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
