import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import AdminProducts from "./routes/AdminProducts/AdminProducts";
import NewProduct from "./routes/NewProduct/NewProduct";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/new" element={<NewProduct />} />
            <Route index element={<AdminProducts />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
