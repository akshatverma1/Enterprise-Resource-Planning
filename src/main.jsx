import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/home.jsx';
import ProductsPage from './Components/Product.jsx';
import ChallanMaker from "./Components/Challan_Maker.jsx";
import "./index.css"
import MachineMaintenancePage from './Components/Machine.jsx';
import BuildingPage from './Components/Building.jsx';
import SecurityPage from './Components/SecurityPage.jsx';
import SupportPage from './Components/SupportPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ProductsPage></ProductsPage>} />
        <Route path="/challan" element={<ChallanMaker />} />
        <Route path="/machine" element={<MachineMaintenancePage />} />
        <Route path="/building" element={<BuildingPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
