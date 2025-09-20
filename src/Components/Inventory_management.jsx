"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import Sidebar from "./sidebar";
import Mainnav from "./Main_nav.jsx";
import {
    Package,
    Plus,
    Search,
    Download,
    Upload,
    AlertTriangle,
    TrendingUp,
    TrendingDown,
    DollarSign,
    ShoppingCart,
    Eye,
    Edit,
    Trash2,
    Bell,
    FileText,
} from "lucide-react";
import axios from "axios";

export default function InventoryManagementPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedBrand, setSelectedBrand] = useState("all");
    const [stockFilter, setStockFilter] = useState("all");
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);
    const [isEditProductOpen, setIsEditProductOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isSupplierOpen, setIsSupplierOpen] = useState(false);
    const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
    const [inventory, setInventory] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const [loadingInventory, setLoadingInventory] = useState(true);
    const [loadingSuppliers, setLoadingSuppliers] = useState(true);
    const [loadingPurchases, setLoadingPurchases] = useState(true);

    useEffect(() => {
        fetchInventory();
        fetchSuppliers();
        fetchPurchases();
    }, []);

    async function fetchInventory() {
        try {
            setLoadingInventory(true);
            const response = await axios.get('https://enterprise-resource-planning-roan.vercel.app/api/products');
            const productss = response.data.map((item) => ({
                id: item._id,
                name: item.name,
                category: item.category,
                company: item.company,
                supplier: item.supplier,
                location: item.location,
                partNumber: item.partNumber,
                price: item.price,
                stock: item.stock,
                image: item.image,
                designImage: item.designImage,
                designDXF: item.designDXF,
                gst: item.gst,
                coating: item.coating,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
            }));
            setInventory(productss);
        } catch (error) {
            console.error("Error fetching inventory:", error);
        } finally {
            setLoadingInventory(false);
        }
    }

    async function fetchSuppliers() {
        try {
            setLoadingSuppliers(true);
            const response = await axios.get('http://localhost:4000/api/suppliers');
            setSuppliers(response.data);
        } catch (error) {
            console.error("Error fetching suppliers:", error);
        } finally {
            setLoadingSuppliers(false);
        }
    }

    async function fetchPurchases() {
        try {
            setLoadingPurchases(true);
            const response = await axios.get('http://localhost:4000/api/purchases');
            setPurchases(response.data);
        } catch (error) {
            console.error("Error fetching purchases:", error);
        } finally {
            setLoadingPurchases(false);
        }
    }

    // Calculate dashboard metrics
    const totalItems = inventory.length;
    const totalStockValue = inventory.reduce((sum, item) => sum + item.stock * item.price, 0);
    const lowStockItems = inventory.filter((item) => item.stock <= 10 && item.stock > 0).length;
    const outOfStockItems = inventory.filter((item) => item.stock === 0).length;
    const fastMovingItems = 0; // Not available in API

    // Filter inventory based on search and filters
    const filteredInventory = inventory.filter((item) => {
        const matchesSearch =
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.company && item.company.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
        const matchesBrand = selectedBrand === "all" || item.company === selectedBrand;

        let matchesStock = true;
        if (stockFilter === "low") matchesStock = item.stock <= 10 && item.stock > 0;
        else if (stockFilter === "out") matchesStock = item.stock === 0;
        else if (stockFilter === "in") matchesStock = item.stock > 10;

        return matchesSearch && matchesCategory && matchesBrand && matchesStock;
    });

    const getStockStatus = (item) => {
        if (item.stock === 0) return { status: "Out of Stock", color: "bg-red-500" };
        if (item.stock <= 10) return { status: "Low Stock", color: "bg-yellow-500" };
        return { status: "In Stock", color: "bg-green-500" };
    };

    const categories = ["all", ...new Set(inventory.map((item) => item.category))];
    const brands = ["all", ...new Set(inventory.map((item) => item.company))];

    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`https://enterprise-resource-planning-roan.vercel.app/api/products/${id}`);
            setInventory((prev) => prev.filter((p) => p.id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const exportToCSV = () => {
        const headers = [
            "ID",
            "Name",
            "Category",
            "Company",
            "Supplier",
            "Location",
            "Part Number",
            "Price",
            "Stock",
            "GST",
            "Coating",
            "Status",
        ];
        const csvContent = [
            headers.join(","),
            ...filteredInventory.map((item) =>
                [
                    item.id,
                    `"${item.name}"`,
                    item.category,
                    item.company,
                    `"${item.supplier}"`,
                    item.location,
                    item.partNumber,
                    item.price,
                    item.stock,
                    item.gst,
                    item.coating,
                    `"${getStockStatus(item).status}"`,
                ].join(",")
            ),
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "inventory_export.csv";
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <div className="flex-1 ">
                <br></br>
                <div style={{ marginLeft: "1.5rem", marginBottom: "1.5rem" }}>
                    <Mainnav></Mainnav>
                </div>
                <div className="p-6">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
                        <p className="text-gray-600">Manage your products inventory</p>
                    </div>

                    {/* Dashboard Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Items</CardTitle>
                                <Package className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                {loadingInventory ? (
                                    <div className="animate-pulse">
                                        <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="text-2xl font-bold">{totalItems}</div>
                                        <p className="text-xs text-muted-foreground">Active products</p>
                                    </>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Stock Value</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                {loadingInventory ? (
                                    <div className="animate-pulse">
                                        <div className="h-8 bg-gray-200 rounded w-24 mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="text-2xl font-bold">₹{totalStockValue.toLocaleString()}</div>
                                        <p className="text-xs text-muted-foreground">Total inventory value</p>
                                    </>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                            </CardHeader>
                            <CardContent>
                                {loadingInventory ? (
                                    <div className="animate-pulse">
                                        <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="text-2xl font-bold text-yellow-600">{lowStockItems}</div>
                                        <p className="text-xs text-muted-foreground">Items need reorder</p>
                                    </>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
                                <TrendingDown className="h-4 w-4 text-red-500" />
                            </CardHeader>
                            <CardContent>
                                {loadingInventory ? (
                                    <div className="animate-pulse">
                                        <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="text-2xl font-bold text-red-600">{outOfStockItems}</div>
                                        <p className="text-xs text-muted-foreground">Items unavailable</p>
                                    </>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Fast Moving</CardTitle>
                                <TrendingUp className="h-4 w-4 text-green-500" />
                            </CardHeader>
                            <CardContent>
                                {loadingInventory ? (
                                    <div className="animate-pulse">
                                        <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="text-2xl font-bold text-green-600">{fastMovingItems}</div>
                                        <p className="text-xs text-muted-foreground">High demand items</p>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <Tabs defaultValue="inventory" className="space-y-4">
                        

                        {/* Inventory Tab */}
                        <TabsContent value="inventory" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div>
                                            <CardTitle>Inventory Items</CardTitle>
                                            <CardDescription>Manage your inventory</CardDescription>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                                                <DialogTrigger asChild>
                                                    <Button>
                                                        <Plus className="h-4 w-4 mr-2" />
                                                        Add Product
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-2xl">
                                                    <DialogHeader>
                                                        <DialogTitle>Add New Product</DialogTitle>
                                                        <DialogDescription>Add a new item to your inventory</DialogDescription>
                                                    </DialogHeader>
                                                    <ProductForm onSubmit={() => {
                                                        setIsAddProductOpen(false);
                                                        fetchInventory();
                                                    }} />
                                                </DialogContent>
                                            </Dialog>
                                            <Button variant="outline" onClick={exportToCSV}>
                                                <Download className="h-4 w-4 mr-2" />
                                                Export CSV
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {/* Search and Filters */}
                                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                        <div className="relative flex-1">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                            <Input
                                                placeholder="Search products, part number, or company..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="pl-10"
                                            />
                                        </div>
                                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                            <SelectTrigger className="w-full sm:w-48">
                                                <SelectValue placeholder="Category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem key={category} value={category}>
                                                        {category === "all" ? "All Categories" : category}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                                            <SelectTrigger className="w-full sm:w-48">
                                                <SelectValue placeholder="Company" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {brands.map((brand) => (
                                                    <SelectItem key={brand} value={brand}>
                                                        {brand === "all" ? "All Companies" : brand}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Select value={stockFilter} onValueChange={setStockFilter}>
                                            <SelectTrigger className="w-full sm:w-48">
                                                <SelectValue placeholder="Stock Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Stock</SelectItem>
                                                <SelectItem value="in">In Stock</SelectItem>
                                                <SelectItem value="low">Low Stock</SelectItem>
                                                <SelectItem value="out">Out of Stock</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Inventory Table */}
                                    <div className="rounded-md border">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Image</TableHead>
                                                    <TableHead>Part No.</TableHead>
                                                    <TableHead>Name</TableHead>
                                                    <TableHead>Category</TableHead>
                                                    <TableHead>Company</TableHead>
                                                    <TableHead>Supplier</TableHead>
                                                    <TableHead>Stock</TableHead>
                                                    <TableHead>Location</TableHead>
                                                    <TableHead>Price</TableHead>
                                                    <TableHead>GST</TableHead>
                                                    <TableHead>Coating</TableHead>
                                                    <TableHead>Design Image</TableHead>
                                                    <TableHead>Design DXF</TableHead>
                                                    <TableHead>Created At</TableHead>
                                                    <TableHead>Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>

                                            <TableBody>
                                                {loadingInventory ? (
                                                    <TableRow>
                                                        <TableCell colSpan={15} className="h-96 text-center">
                                                            <div className="flex flex-col items-center justify-center py-8">
                                                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                                                                <p className="text-gray-600">Loading inventory...</p>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ) : filteredInventory.length === 0 ? (
                                                    <TableRow>
                                                        <TableCell colSpan={15} className="h-24 text-center">
                                                            No products found
                                                        </TableCell>
                                                    </TableRow>
                                                ) : (
                                                    filteredInventory.map((item) => (
                                                        <TableRow key={item.id}>
                                                            {/* Product Image */}
                                                            <TableCell>
                                                                {item.image ? (
                                                                    <img
                                                                        src={item.image}
                                                                        alt={item.name}
                                                                        className="w-12 h-12 rounded object-cover border"
                                                                    />
                                                                ) : (
                                                                    <span className="text-gray-400">No Image</span>
                                                                )}
                                                            </TableCell>

                                                            {/* Part Number */}
                                                            <TableCell className="font-mono text-sm">{item.partNumber}</TableCell>

                                                            {/* Name */}
                                                            <TableCell className="font-medium">{item.name}</TableCell>

                                                            {/* Category */}
                                                            <TableCell>{item.category}</TableCell>

                                                            {/* Company */}
                                                            <TableCell>{item.company}</TableCell>

                                                            {/* Supplier */}
                                                            <TableCell>{item.supplier}</TableCell>

                                                            {/* Stock */}
                                                            <TableCell className="font-mono text-sm">{item.stock}</TableCell>

                                                            {/* Location */}
                                                            <TableCell>A-{item.location}</TableCell>

                                                            {/* Price */}
                                                            <TableCell>₹{item.price?.toLocaleString()}</TableCell>

                                                            {/* GST */}
                                                            <TableCell>{item.gst || "-"}</TableCell>

                                                            {/* Coating */}
                                                            <TableCell>{item.coating || "-"}</TableCell>

                                                            {/* Design Image */}
                                                            <TableCell>
                                                                {item.designImage ? (
                                                                    <a
                                                                        href={item.designImage}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="text-blue-600 underline"
                                                                    >
                                                                        View
                                                                    </a>
                                                                ) : (
                                                                    "-"
                                                                )}
                                                            </TableCell>

                                                            {/* Design DXF */}
                                                            <TableCell>
                                                                {item.designDXF ? (
                                                                    <a
                                                                        href={item.designDXF}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="text-blue-600 underline"
                                                                    >
                                                                        Download
                                                                    </a>
                                                                ) : (
                                                                    "-"
                                                                )}
                                                            </TableCell>

                                                            {/* Created At */}
                                                            <TableCell className="text-sm text-gray-500">
                                                                {new Date(item.createdAt).toLocaleString()}
                                                            </TableCell>

                                                            {/* Actions */}
                                                            <TableCell>
                                                                <div className="flex items-center gap-2">
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        onClick={() => {
                                                                            setSelectedProduct(item);
                                                                            setIsEditProductOpen(true);
                                                                        }}
                                                                    >
                                                                        <Edit className="h-4 w-4" />
                                                                    </Button>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        onClick={() => handleDeleteProduct(item.id)}
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Suppliers Tab */}
                        <TabsContent value="suppliers" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <CardTitle>Suppliers</CardTitle>
                                            <CardDescription>Manage your supplier information</CardDescription>
                                        </div>
                                        <Dialog open={isSupplierOpen} onOpenChange={setIsSupplierOpen}>
                                            <DialogTrigger asChild>
                                                <Button>
                                                    <Plus className="h-4 w-4 mr-2" />
                                                    Add Supplier
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Add New Supplier</DialogTitle>
                                                    <DialogDescription>Add a new supplier to your database</DialogDescription>
                                                </DialogHeader>
                                                <SupplierForm onSuccess={() => {
                                                    setIsSupplierOpen(false);
                                                    fetchSuppliers();
                                                }} />
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="rounded-md border">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Supplier ID</TableHead>
                                                    <TableHead>Name</TableHead>
                                                    <TableHead>Contact</TableHead>
                                                    <TableHead>Email</TableHead>
                                                    <TableHead>Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {loadingSuppliers ? (
                                                    <TableRow>
                                                        <TableCell colSpan={5} className="h-96 text-center">
                                                            <div className="flex flex-col items-center justify-center py-8">
                                                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                                                                <p className="text-gray-600">Loading suppliers...</p>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ) : suppliers.length === 0 ? (
                                                    <TableRow>
                                                        <TableCell colSpan={5} className="h-24 text-center">
                                                            No suppliers found
                                                        </TableCell>
                                                    </TableRow>
                                                ) : (
                                                    suppliers.map((supplier) => (
                                                        <TableRow key={supplier._id}>
                                                            <TableCell className="font-mono">{supplier._id}</TableCell>
                                                            <TableCell className="font-medium">{supplier.name}</TableCell>
                                                            <TableCell>{supplier.contact}</TableCell>
                                                            <TableCell>{supplier.email}</TableCell>
                                                            <TableCell>
                                                                <div className="flex items-center gap-2">
                                                                    <Button variant="ghost" size="sm">
                                                                        <Edit className="h-4 w-4" />
                                                                    </Button>
                                                                    <Button variant="ghost" size="sm">
                                                                        <Eye className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Purchase History Tab */}
                        <TabsContent value="purchases" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <CardTitle>Purchase History</CardTitle>
                                            <CardDescription>Track your purchase orders and deliveries</CardDescription>
                                        </div>
                                        <Dialog open={isPurchaseOpen} onOpenChange={setIsPurchaseOpen}>
                                            <DialogTrigger asChild>
                                                <Button>
                                                    <Plus className="h-4 w-4 mr-2" />
                                                    New Purchase Order
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-2xl">
                                                <DialogHeader>
                                                    <DialogTitle>Create Purchase Order</DialogTitle>
                                                    <DialogDescription>Create a new purchase order</DialogDescription>
                                                </DialogHeader>
                                                <PurchaseOrderForm onSuccess={() => {
                                                    setIsPurchaseOpen(false);
                                                    fetchPurchases();
                                                }} />
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="rounded-md border">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>PO Number</TableHead>
                                                    <TableHead>Supplier</TableHead>
                                                    <TableHead>Date</TableHead>
                                                    <TableHead>Items</TableHead>
                                                    <TableHead>Total</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead>Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {loadingPurchases ? (
                                                    <TableRow>
                                                        <TableCell colSpan={7} className="h-96 text-center">
                                                            <div className="flex flex-col items-center justify-center py-8">
                                                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                                                                <p className="text-gray-600">Loading purchase history...</p>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ) : purchases.length === 0 ? (
                                                    <TableRow>
                                                        <TableCell colSpan={7} className="h-24 text-center">
                                                            No purchase history found
                                                        </TableCell>
                                                    </TableRow>
                                                ) : (
                                                    purchases.map((purchase) => (
                                                        <TableRow key={purchase._id}>
                                                            <TableCell className="font-mono">{purchase._id}</TableCell>
                                                            <TableCell>{purchase.supplier}</TableCell>
                                                            <TableCell>{new Date(purchase.date).toLocaleDateString()}</TableCell>
                                                            <TableCell>{purchase.items.length} items</TableCell>
                                                            <TableCell>₹{purchase.total.toLocaleString()}</TableCell>
                                                            <TableCell>
                                                                <Badge variant={purchase.status === "Delivered" ? "default" : "secondary"}>
                                                                    {purchase.status}
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell>
                                                                <div className="flex items-center gap-2">
                                                                    <Button variant="ghost" size="sm">
                                                                        <Eye className="h-4 w-4" />
                                                                    </Button>
                                                                    <Button variant="ghost" size="sm">
                                                                        <FileText className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Low Stock Alerts Tab */}
                        <TabsContent value="alerts" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Bell className="h-5 w-5 text-yellow-500" />
                                        Low Stock Alerts
                                    </CardTitle>
                                    <CardDescription>Items that need immediate attention</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {loadingInventory ? (
                                        <div className="flex flex-col items-center justify-center py-8">
                                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mb-4"></div>
                                            <p className="text-gray-600">Checking stock levels...</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {inventory
                                                .filter((item) => item.stock <= 10 && item.stock > 0)
                                                .map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className="flex items-center justify-between p-4 border rounded-lg bg-yellow-50"
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <AlertTriangle className="h-5 w-5 text-yellow-500" />
                                                            <div>
                                                                <div className="font-medium">{item.name}</div>
                                                                <div className="text-sm text-gray-500">
                                                                    Current: {item.stock} | Minimum: 10
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Badge variant="outline" className="text-yellow-700 border-yellow-300">
                                                                Low Stock
                                                            </Badge>
                                                            <Button size="sm">
                                                                <ShoppingCart className="h-4 w-4 mr-2" />
                                                                Reorder
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}

                                            {inventory.filter(item => item.stock <= 10 && item.stock > 0).length === 0 && (
                                                <div className="text-center py-8 text-gray-500">
                                                    No low stock items found
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    {/* Edit Product Dialog */}
                    <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
                        <DialogContent className="max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Edit Product</DialogTitle>
                                <DialogDescription>Update product information</DialogDescription>
                            </DialogHeader>
                            {selectedProduct && <ProductForm
                                initialData={selectedProduct}
                                onSubmit={() => {
                                    setIsEditProductOpen(false);
                                    fetchInventory();
                                }}
                            />}
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}

const ProductForm = ({ initialData = {}, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: initialData.name || "",
        category: initialData.category || "",
        company: initialData.company || "",
        supplier: initialData.supplier || "",
        location: initialData.location || 0,
        partNumber: initialData.partNumber || "",
        price: initialData.price || 0,
        stock: initialData.stock || 0,
        image: initialData.image || "",
        designImage: initialData.designImage || "",
        designDXF: initialData.designDXF || "",
        gst: initialData.gst || "",
        coating: initialData.coating || "",
    });

    const handleChange = (field) => (e) => {
        const value = e?.target?.type === "number"
            ? parseInt(e.target.value)
            : e?.target?.value ?? e;
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isEditing = Boolean(initialData.id);

        const url = isEditing
            ? `https://enterprise-resource-planning-roan.vercel.app/api/products/${initialData.id}`
            : "https://enterprise-resource-planning-roan.vercel.app/api/products";

        const method = isEditing ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData?.message || "Request failed");
            }

            alert(isEditing ? "Product updated!" : "Product added!");
            onSubmit?.();
        } catch (err) {
            console.error(err);
            alert("Something went wrong: " + err.message);
        }
    };

    return (
        <div className="p-1">
            <Card className="max-w-4xl mx-auto">
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" value={formData.name} onChange={handleChange("name")} required />
                            </div>
                            <div>
                                <Label htmlFor="category">Category</Label>
                                <Input id="category" value={formData.category} onChange={handleChange("category")} required />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="company">Company</Label>
                                <Input id="company" value={formData.company} onChange={handleChange("company")} required />
                            </div>
                            <div>
                                <Label htmlFor="supplier">Supplier</Label>
                                <Input id="supplier" value="Ashirwad Enterprises" onChange={handleChange("supplier")} required />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="location">Location (Shelf No.)</Label>
                                <Input type="number" id="location" value={formData.location} onChange={handleChange("location")} required />
                            </div>
                            <div>
                                <Label htmlFor="partNumber">Part Number</Label>
                                <Input id="partNumber" value={formData.partNumber} onChange={handleChange("partNumber")} required />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="price">Price (₹)</Label>
                                <Input type="number" id="price" value={formData.price} onChange={handleChange("price")} required />
                            </div>
                            <div>
                                <Label htmlFor="stock">Stock</Label>
                                <Input type="number" id="stock" value={formData.stock} onChange={handleChange("stock")} required />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="image">Image URL</Label>
                                <Input id="image" value={formData.image} onChange={handleChange("image")} />
                            </div>
                            <div>
                                <Label htmlFor="designImage">Design Image URL</Label>
                                <Input id="designImage" value={formData.designImage} onChange={handleChange("designImage")} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="designDXF">Design DXF URL</Label>
                                <Input id="designDXF" value={formData.designDXF} onChange={handleChange("designDXF")} />
                            </div>
                            <div>
                                <Label htmlFor="gst">GST</Label>
                                <Select
                                    value={formData.gst}
                                    onValueChange={(value) => {
                                        if (value === "other") {
                                            // Set to empty so user can type custom GST
                                            setFormData((prev) => ({ ...prev, gst: "" }));
                                        } else {
                                            setFormData((prev) => ({ ...prev, gst: value }));
                                        }
                                    }}
                                >
                                    {/* ✅ Prevents auto-submit */}
                                    <SelectTrigger id="gst" type="button">
                                        <SelectValue placeholder="Select GST" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0%">0%</SelectItem>
                                        <SelectItem value="5%">5%</SelectItem>
                                        <SelectItem value="12%">12%</SelectItem>
                                        <SelectItem value="18%">18%</SelectItem>
                                        <SelectItem value="28%">28%</SelectItem>
                                    </SelectContent>
                                </Select>

                                {/* Show custom GST input if the value is empty (means "Other" was chosen) */}
                                {formData.gst === "" && (
                                    <div className="mt-2">
                                        <Input
                                            type="text"
                                            placeholder="Enter custom GST %"
                                            value={formData.gst}
                                            onChange={(e) =>
                                                setFormData((prev) => ({ ...prev, gst: e.target.value }))
                                            }
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="coating">Coating Info</Label>
                            <Select
                                value={formData.coating}
                                onValueChange={(value) =>
                                    setFormData((prev) => ({ ...prev, coating: value }))
                                }
                            >
                                {/* Force type="button" so it won't submit */}
                                <SelectTrigger id="coating" type="button">
                                    <SelectValue placeholder="Choose a coating type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Powder">Powder</SelectItem>
                                    <SelectItem value="Plating">Plating</SelectItem>
                                    <SelectItem value="Null">Null</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex justify-end mt-6">
                            <Button type="submit">{initialData.id ? "Update" : "Add"} Product</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

const SupplierForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        email: "",
        address: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/suppliers', formData);
            if (response.status === 201) {
                alert("Supplier added successfully!");
                onSuccess();
            }
        } catch (error) {
            console.error("Error adding supplier:", error);
            alert("Failed to add supplier");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="supplierName">Supplier Name</Label>
                <Input
                    id="supplierName"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="contact">Contact Number</Label>
                    <Input
                        id="contact"
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                </div>
            </div>

            <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                />
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <Button type="submit">Add Supplier</Button>
            </div>
        </form>
    );
};

const PurchaseOrderForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        supplier: "",
        date: new Date().toISOString().split('T')[0],
        items: [],
        total: 0,
        status: "Pending"
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/purchases', formData);
            if (response.status === 201) {
                alert("Purchase order created successfully!");
                onSuccess();
            }
        } catch (error) {
            console.error("Error creating purchase order:", error);
            alert("Failed to create purchase order");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="supplier">Supplier</Label>
                    <Input
                        id="supplier"
                        value={formData.supplier}
                        onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="date">Order Date</Label>
                    <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                    />
                </div>
            </div>

            <div>
                <Label>Items</Label>
                <div className="space-y-2 border rounded-lg p-4">
                    {formData.items.map((item, index) => (
                        <div key={index} className="grid grid-cols-3 gap-2">
                            <Input placeholder="Product name" />
                            <Input type="number" placeholder="Quantity" />
                            <Input type="number" placeholder="Unit price" />
                        </div>
                    ))}
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setFormData({
                            ...formData,
                            items: [...formData.items, { product: "", quantity: 0, price: 0 }]
                        })}
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Item
                    </Button>
                </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <Button type="submit">Create Purchase Order</Button>
            </div>
        </form>
    );
};