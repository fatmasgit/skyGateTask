import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppLayout from "@/layout/AppLayout";

import Dashboard from "@/pages/dashboard";
import Wizards from "@/pages/wizards";
import Elixirs from "@/pages/elixirs";
import Archives from "@/pages/archives";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/wizards" element={<Wizards />} />
          <Route path="/elixirs" element={<Elixirs />} />
          <Route path="/archives" element={<Archives />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;