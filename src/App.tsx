import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout";
import { Prices } from "./pages/prices";
import { Welcome } from "./pages/welcome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Prices />} />
          <Route path="/test" element={<Welcome person="Mrs Money Penny" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
