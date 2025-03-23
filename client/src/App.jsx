import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminProducts from "./routes/AdminProducts/AdminProducts";
import NewProduct from "./routes/NewProduct/NewProduct";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/products/new" element={<NewProduct />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
