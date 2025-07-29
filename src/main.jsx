import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/home.jsx';
import ProductsPage from './Components/Product.jsx';
import ChallanMaker from "./Components/Challan_Maker.jsx";
import "./index.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ProductsPage></ProductsPage>} />
        <Route path="/challan" element={<ChallanMaker />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
