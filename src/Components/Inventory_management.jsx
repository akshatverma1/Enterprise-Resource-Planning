"use client"

import { use, useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Textarea } from "./ui/textarea"
import Sidebar from "./sidebar"
// import Item from "./mockProducts_automobile.js"
import { getAutomobileData } from "./mockProducts_automobile.js"
import Mainnav from "./Main_nav.jsx"
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
} from "lucide-react"

export default function InventoryManagementPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [selectedBrand, setSelectedBrand] = useState("all")
    const [stockFilter, setStockFilter] = useState("all")
    const [isAddProductOpen, setIsAddProductOpen] = useState(false)
    const [isEditProductOpen, setIsEditProductOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [isSupplierOpen, setIsSupplierOpen] = useState(false)
    const [isPurchaseOpen, setIsPurchaseOpen] = useState(false)
    // Sample inventory data
    // const [inventory, setInventory] = useState([
    //     {
    //         id: "INV001",
    //         name: "Car Battery 12V 70Ah",
    //         category: "Batteries",
    //         brand: "Exide",
    //         sku: "EXD-12V70",
    //         quantity: 25,
    //         minQuantity: 10,
    //         price: 8500,
    //         costPrice: 7200,
    //         supplier: "Auto Parts Ltd",
    //         location: "A-1-01",
    //         lastUpdated: "2024-01-15",
    //         status: "In Stock",
    //         fastMoving: true,
    //     },
    //     {
    //         id: "INV002",
    //         name: "Engine Oil 5W-30 4L",
    //         category: "Oils",
    //         brand: "Castrol",
    //         sku: "CTL-5W30-4L",
    //         quantity: 5,
    //         minQuantity: 15,
    //         price: 2800,
    //         costPrice: 2200,
    //         supplier: "Oil Distributors",
    //         location: "B-2-05",
    //         lastUpdated: "2024-01-14",
    //         status: "Low Stock",
    //         fastMoving: true,
    //     },
    //     {
    //         id: "INV003",
    //         name: "Brake Pads Set",
    //         category: "Spare Parts",
    //         brand: "Bosch",
    //         sku: "BSH-BP-001",
    //         quantity: 0,
    //         minQuantity: 8,
    //         price: 3200,
    //         costPrice: 2500,
    //         supplier: "Bosch India",
    //         location: "C-1-12",
    //         lastUpdated: "2024-01-13",
    //         status: "Out of Stock",
    //         fastMoving: false,
    //     },
    //     {
    //         id: "INV004",
    //         name: "Air Filter",
    //         category: "Spare Parts",
    //         brand: "Mann",
    //         sku: "MAN-AF-205",
    //         quantity: 45,
    //         minQuantity: 20,
    //         price: 850,
    //         costPrice: 650,
    //         supplier: "Filter Solutions",
    //         location: "C-2-08",
    //         lastUpdated: "2024-01-16",
    //         status: "In Stock",
    //         fastMoving: true,
    //     },
    //     {
    //         id: "INV005",
    //         name: "Transmission Oil ATF",
    //         category: "Oils",
    //         brand: "Mobil",
    //         sku: "MOB-ATF-1L",
    //         quantity: 12,
    //         minQuantity: 10,
    //         price: 1200,
    //         costPrice: 950,
    //         supplier: "Oil Distributors",
    //         location: "B-1-03",
    //         lastUpdated: "2024-01-15",
    //         status: "In Stock",
    //         fastMoving: false,
    //     },
    //     {
    //         id: "INV006",
    //         name: "Spark Plugs Set",
    //         category: "Spare Parts",
    //         brand: "NGK",
    //         sku: "NGK-SP-V4",
    //         quantity: 8,
    //         minQuantity: 12,
    //         price: 1800,
    //         costPrice: 1400,
    //         supplier: "NGK India",
    //         location: "C-3-15",
    //         lastUpdated: "2024-01-14",
    //         status: "Low Stock",
    //         fastMoving: true,
    //     },
    // ])
    const [inventory, setInventory] = useState([])

    useEffect(()=>{
        fetch();
    },[])


    async function fetch(){
        const dats = await getAutomobileData();
        const productss = dats.map((item, index) => ({
            id: item.id,
            name: item.name,
            category: item.category,
            brand: item.brand,
            sku: item.sku,
            quantity: item.quantity,
            minQuantity: item.minQuantity,
            price: item.price,
            costPrice: item.costPrice,
            supplier: item.supplier,
            location: item.location,
            lastUpdated: item.lastUpdated,
            status: item.status,
            fastMoving: item.fastMoving || false, // Default to false if not provided
        }))
        setInventory(productss);
    }
   

    const [suppliers] = useState([
        { id: "SUP001", name: "Auto Parts Ltd", contact: "+91 98765 43210", email: "contact@autoparts.com" },
        { id: "SUP002", name: "Oil Distributors", contact: "+91 87654 32109", email: "sales@oildist.com" },
        { id: "SUP003", name: "Bosch India", contact: "+91 76543 21098", email: "orders@bosch.in" },
        { id: "SUP004", name: "Filter Solutions", contact: "+91 65432 10987", email: "info@filtersol.com" },
        { id: "SUP005", name: "NGK India", contact: "+91 54321 09876", email: "support@ngk.in" },
    ])

    const [purchases] = useState([
        {
            id: "PO001",
            supplier: "Auto Parts Ltd",
            date: "2024-01-10",
            items: 3,
            total: 45000,
            status: "Delivered",
        },
        {
            id: "PO002",
            supplier: "Oil Distributors",
            date: "2024-01-12",
            items: 2,
            total: 28000,
            status: "Pending",
        },
        {
            id: "PO003",
            supplier: "Bosch India",
            date: "2024-01-08",
            items: 1,
            total: 15000,
            status: "Delivered",
        },
    ])

    // Calculate dashboard metrics
    const totalItems = inventory.length
    const totalStockValue = inventory.reduce((sum, item) => sum + item.quantity * item.price, 0)
    const lowStockItems = inventory.filter((item) => item.quantity <= item.minQuantity).length
    const outOfStockItems = inventory.filter((item) => item.quantity === 0).length
    const fastMovingItems = inventory.filter((item) => item.fastMoving).length

    // Filter inventory based on search and filters
    const filteredInventory = inventory.filter((item) => {
        const matchesSearch =
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.brand.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
        const matchesBrand = selectedBrand === "all" || item.brand === selectedBrand

        let matchesStock = true
        if (stockFilter === "low") matchesStock = item.quantity <= item.minQuantity
        else if (stockFilter === "out") matchesStock = item.quantity === 0
        else if (stockFilter === "in") matchesStock = item.quantity > item.minQuantity

        return matchesSearch && matchesCategory && matchesBrand && matchesStock
    })

    const getStockStatus = (item) => {
        if (item.quantity === 0) return { status: "Out of Stock", color: "bg-red-500" }
        if (item.quantity <= item.minQuantity) return { status: "Low Stock", color: "bg-yellow-500" }
        return { status: "In Stock", color: "bg-green-500" }
    }

    const categories = ["all", ...new Set(inventory.map((item) => item.category))]
    const brands = ["all", ...new Set(inventory.map((item) => item.brand))]

    const handleAddProduct = (productData) => {
        const newProduct = {
            id: `INV${String(inventory.length + 1).padStart(3, "0")}`,
            ...productData,
            lastUpdated: new Date().toISOString().split("T")[0],
            fastMoving: false,
        }
        setInventory([...inventory, newProduct])
        setIsAddProductOpen(false)
    }

    const handleEditProduct = (productData) => {
        setInventory(
            inventory.map((item) =>
                item.id === selectedProduct.id
                    ? { ...item, ...productData, lastUpdated: new Date().toISOString().split("T")[0] }
                    : item,
            ),
        )
        setIsEditProductOpen(false)
        setSelectedProduct(null)
    }

    const handleDeleteProduct = (productId) => {
        setInventory(inventory.filter((item) => item.id !== productId))
    }

    const exportToCSV = () => {
        const headers = [
            "ID",
            "Name",
            "Category",
            "Brand",
            "SKU",
            "Quantity",
            "Min Quantity",
            "Price",
            "Cost Price",
            "Supplier",
            "Location",
            "Status",
        ]
        const csvContent = [
            headers.join(","),
            ...filteredInventory.map((item) =>
                [
                    item.id,
                    `"${item.name}"`,
                    item.category,
                    item.brand,
                    item.sku,
                    item.quantity,
                    item.minQuantity,
                    item.price,
                    item.costPrice,
                    `"${item.supplier}"`,
                    item.location,
                    `"${getStockStatus(item).status}"`,
                ].join(","),
            ),
        ].join("\n")

        const blob = new Blob([csvContent], { type: "text/csv" })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "inventory_export.csv"
        a.click()
        window.URL.revokeObjectURL(url)
    }

    return (
        <div className="flex h-screen bg-gray-50">
            {/* <Sidebar /> */}
            <div className="flex-1 ">
                <br></br>
                <div style={{ marginLeft: "1.5rem", marginBottom: "1.5rem" }}>
                    <Mainnav></Mainnav>
                </div>
                <div className="p-6">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Ashirwad Enterprises Inventory Management</h1>
                        <p className="text-gray-600">Manage your automotive parts and supplies inventory</p>
                    </div>

                    {/* Dashboard Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Items</CardTitle>
                                <Package className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{totalItems}</div>
                                <p className="text-xs text-muted-foreground">Active products</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Stock Value</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">₹{totalStockValue.toLocaleString()}</div>
                                <p className="text-xs text-muted-foreground">Total inventory value</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-yellow-600">{lowStockItems}</div>
                                <p className="text-xs text-muted-foreground">Items need reorder</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
                                <TrendingDown className="h-4 w-4 text-red-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-red-600">{outOfStockItems}</div>
                                <p className="text-xs text-muted-foreground">Items unavailable</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Fast Moving</CardTitle>
                                <TrendingUp className="h-4 w-4 text-green-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-600">{fastMovingItems}</div>
                                <p className="text-xs text-muted-foreground">High demand items</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <Tabs defaultValue="inventory" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="inventory">Inventory</TabsTrigger>
                            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
                            <TabsTrigger value="purchases">Purchase History</TabsTrigger>
                            <TabsTrigger value="alerts">Low Stock Alerts</TabsTrigger>
                        </TabsList>

                        {/* Inventory Tab */}
                        <TabsContent value="inventory" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div>
                                            <CardTitle>Inventory Items</CardTitle>
                                            <CardDescription>Manage your automotive parts inventory</CardDescription>
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
                                                    <ProductForm onSubmit={handleAddProduct} />
                                                </DialogContent>
                                            </Dialog>
                                            <Button variant="outline" onClick={exportToCSV}>
                                                <Download className="h-4 w-4 mr-2" />
                                                Export CSV
                                            </Button>
                                            <Button variant="outline">
                                                <Upload className="h-4 w-4 mr-2" />
                                                Import CSV
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
                                                placeholder="Search products, SKU, or brand..."
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
                                                <SelectValue placeholder="Brand" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {brands.map((brand) => (
                                                    <SelectItem key={brand} value={brand}>
                                                        {brand === "all" ? "All Brands" : brand}
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
                                                    <TableHead>Product</TableHead>
                                                    <TableHead>Category</TableHead>
                                                    <TableHead>SKU</TableHead>
                                                    <TableHead>Quantity</TableHead>
                                                    <TableHead>Price</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead>Location</TableHead>
                                                    <TableHead>Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {filteredInventory.map((item) => {
                                                    const stockStatus = getStockStatus(item)
                                                    return (
                                                        <TableRow key={item.id}>
                                                            <TableCell>
                                                                <div>
                                                                    <div className="font-medium">{item.name}</div>
                                                                    <div className="text-sm text-gray-500">{item.brand}</div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>{item.category}</TableCell>
                                                            <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                                                            <TableCell>
                                                                <div className="flex items-center gap-2">
                                                                    <span className={item.quantity <= item.minQuantity ? "text-red-600 font-medium" : ""}>
                                                                        {item.quantity}
                                                                    </span>
                                                                    <span className="text-gray-400">/ {item.minQuantity}</span>
                                                                    {item.fastMoving && (
                                                                        <Badge variant="secondary" className="text-xs">
                                                                            Fast
                                                                        </Badge>
                                                                    )}
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>₹{item.price.toLocaleString()}</TableCell>
                                                            <TableCell>
                                                                <Badge className={`${stockStatus.color} text-white`}>{stockStatus.status}</Badge>
                                                            </TableCell>
                                                            <TableCell className="font-mono text-sm">{item.location}</TableCell>
                                                            <TableCell>
                                                                <div className="flex items-center gap-2">
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        onClick={() => {
                                                                            setSelectedProduct(item)
                                                                            setIsEditProductOpen(true)
                                                                        }}
                                                                    >
                                                                        <Edit className="h-4 w-4" />
                                                                    </Button>
                                                                    <Button variant="ghost" size="sm" onClick={() => handleDeleteProduct(item.id)}>
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                })}
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
                                                <SupplierForm />
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
                                                {suppliers.map((supplier) => (
                                                    <TableRow key={supplier.id}>
                                                        <TableCell className="font-mono">{supplier.id}</TableCell>
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
                                                ))}
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
                                                <PurchaseOrderForm />
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
                                                {purchases.map((purchase) => (
                                                    <TableRow key={purchase.id}>
                                                        <TableCell className="font-mono">{purchase.id}</TableCell>
                                                        <TableCell>{purchase.supplier}</TableCell>
                                                        <TableCell>{purchase.date}</TableCell>
                                                        <TableCell>{purchase.items} items</TableCell>
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
                                                ))}
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
                                    <div className="space-y-4">
                                        {inventory
                                            .filter((item) => item.quantity <= item.minQuantity)
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
                                                                Current: {item.quantity} | Minimum: {item.minQuantity}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="outline" className="text-yellow-700 border-yellow-300">
                                                            {item.quantity === 0 ? "Out of Stock" : "Low Stock"}
                                                        </Badge>
                                                        <Button size="sm">
                                                            <ShoppingCart className="h-4 w-4 mr-2" />
                                                            Reorder
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
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
                            {selectedProduct && <ProductForm initialData={selectedProduct} onSubmit={handleEditProduct} />}
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

// Product Form Component
function ProductForm({ initialData, onSubmit }) {
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        category: initialData?.category || "",
        brand: initialData?.brand || "",
        sku: initialData?.sku || "",
        quantity: initialData?.quantity || 0,
        minQuantity: initialData?.minQuantity || 0,
        price: initialData?.price || 0,
        costPrice: initialData?.costPrice || 0,
        supplier: initialData?.supplier || "",
        location: initialData?.location || "",
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <form  onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        name = "userName"
                    />
                </div>
                <div>
                    <Label htmlFor="sku">SKU</Label>
                    <Input
                        id="sku"
                        value={formData.sku}
                        onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                        required
                        name ="userSku"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="category">Category</Label>
                    <Select name="userCategory" value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Batteries">Batteries</SelectItem>
                            <SelectItem value="Oils">Oils</SelectItem>
                            <SelectItem value="Spare Parts">Spare Parts</SelectItem>
                            <SelectItem value="Filters">Filters</SelectItem>
                            <SelectItem value="Tires">Tires</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="brand">Brand</Label>
                    <Input
                        id="brand"
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        required
                        name ="userBrand"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="quantity">Current Quantity</Label>
                    <Input
                        id="quantity"
                        type="number"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: Number.parseInt(e.target.value) })}
                        required
                        name ="userQuantity"
                    />
                </div>
                <div>
                    <Label htmlFor="minQuantity">Minimum Quantity</Label>
                    <Input
                        id="minQuantity"
                        type="number"
                        value={formData.minQuantity}
                        onChange={(e) => setFormData({ ...formData, minQuantity: Number.parseInt(e.target.value) })}
                        required
                        name = "userMinQuantity"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="costPrice">Cost Price (₹)</Label>
                    <Input
                        id="costPrice"
                        type="number"
                        value={formData.costPrice}
                        onChange={(e) => setFormData({ ...formData, costPrice: Number.parseInt(e.target.value) })}
                        required
                        name = "userCostPrice"
                    />
                </div>
                <div>
                    <Label htmlFor="price">Selling Price (₹)</Label>
                    <Input
                        id="price"
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: Number.parseInt(e.target.value) })}
                        required
                        name = "userPrice"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="location">Storage Location</Label>
                    <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g., A-1-01"
                        required
                        name = "userLocation"
                    />
                </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <Button type="submit">{initialData ? "Update Product" : "Add Product"}</Button>
            </div>
        </form>
    )
}

// Supplier Form Component
function SupplierForm() {
    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        email: "",
        address: "",
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle supplier creation
        console.log("New supplier:", formData)
    }

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
    )
}

// Purchase Order Form Component
function PurchaseOrderForm() {
    const [formData, setFormData] = useState({
        supplier: "",
        expectedDate: "",
        items: [{ product: "", quantity: 0, price: 0 }],
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle purchase order creation
        console.log("New purchase order:", formData)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="supplier">Supplier</Label>
                    <Select value={formData.supplier} onValueChange={(value) => setFormData({ ...formData, supplier: value })}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select supplier" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Auto Parts Ltd">Auto Parts Ltd</SelectItem>
                            <SelectItem value="Oil Distributors">Oil Distributors</SelectItem>
                            <SelectItem value="Bosch India">Bosch India</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="expectedDate">Expected Delivery</Label>
                    <Input
                        id="expectedDate"
                        type="date"
                        value={formData.expectedDate}
                        onChange={(e) => setFormData({ ...formData, expectedDate: e.target.value })}
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
                    <Button type="button" variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Item
                    </Button>
                </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <Button type="submit">Create Purchase Order</Button>
            </div>
        </form>
    )
}
