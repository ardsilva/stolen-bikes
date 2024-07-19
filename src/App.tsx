import { Route, Routes } from "react-router-dom";
import Example from "@/pages/Example";
import CaseDetails from "./pages/CaseDetails";


export default function App() {

  return (
    <Routes>
      <Route path="/" element={<Example />} />
      <Route path="/cases/:id" element={<CaseDetails />} />
    </Routes>
  )
}
