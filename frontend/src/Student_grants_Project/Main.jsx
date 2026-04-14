import { Routing } from "./routing/Routing"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Main = () => {
  return (
    <>
      <Routing />
      <ToastContainer
        position="top-center"
        autoClose={4000}
        rtl={true}
        theme="colored"
      />
    </>
  );
}