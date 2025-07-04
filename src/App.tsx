import { Outlet } from "react-router";
import Navbar from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
