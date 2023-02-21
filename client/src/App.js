import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import ItemsPage from "./pages/ItemsPage";
import ProductTypesPage from "./pages/ProductTypesPage";

import './styling.css'

const Layout = () => {
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <ProductTypesPage/>
      },
      {
        path: '/items/:id',
        element: <ItemsPage/>
      }
    ]
  },

]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
