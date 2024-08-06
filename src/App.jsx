import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import HomePage from './pages/homePage/HomePage';
import Error404Page from './pages/error404Page/Error404Page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <Error404Page />,
  },
]);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
