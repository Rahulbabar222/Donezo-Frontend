
import { useLocation } from "react-router-dom";
import Home from './components/Home'
import { createBrowserRouter, RouterProvider ,Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Pomodoro from './components/Pomodoro/Pomodoro'

const RootLayout = () => {
    const location = useLocation(); // Get the current route
  
    return (
      <>
        {location.pathname !== "/pomodoro" && <Navbar />}
        <Outlet /> {/* Renders the active route's component */}
      </>
    );
  };
  
  function App() {
       
      const router = createBrowserRouter([
          {
            path: "/",
            element: <RootLayout />, // Wrap all routes in a common layout
            children: [
              { path: "/", element: <Home /> },
              {path:"/pomodoro", element:<Pomodoro/>}
            ]
          }
        ])
    return (
      <>
        <RouterProvider router={router}/>
      </>
    )
  }

  export default App

