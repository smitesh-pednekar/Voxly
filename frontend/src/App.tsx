import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { AuthProvider } from "./contexts/auth-contexts";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router}/>
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  )
}

export default App