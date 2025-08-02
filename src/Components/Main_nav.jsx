import { Link } from "react-router-dom"
import React from 'react';

export default function Aksht() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link to="/" className="hidden items-center space-x-2 md:flex">
        <span className="hidden font-bold sm:inline-block">Application / Dashboard</span>
      </Link>
      <nav className="hidden gap-6 md:flex">
        <Link to="/" className="flex items-center text-sm font-medium text-muted-foreground">
          Home
        </Link>
        <Link to="/product" className="flex items-center text-sm font-medium text-muted-foreground">
          Products
        </Link>
        <Link to="/challan" className="flex items-center text-sm font-medium text-muted-foreground">
          Challan Maker 
        </Link>
        <Link to="/machine" className="flex items-center text-sm font-medium text-muted-foreground">
        Machine Maintenance 
        </Link>
        <Link to="/inventory" className="flex items-center text-sm font-medium text-muted-foreground">
        Inventory Management 
        </Link>
        <Link to="/building" className="flex items-center text-sm font-medium text-muted-foreground">
        Building 
        </Link>
        <Link to="/security" className="flex items-center text-sm font-medium text-muted-foreground">
        Security 
        </Link>
        <Link to="/support" className="flex items-center text-sm font-medium text-muted-foreground">
        Support 
        </Link>
        <Link to="/devices" className="flex items-center text-sm font-medium text-muted-foreground">
        Devices 
        </Link>
      </nav>
    </div>
  )
}
