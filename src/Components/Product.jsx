"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Package,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ShoppingCart,
  FileText,
  Wrench,
  Star,
  Heart,
} from "lucide-react"
import Sidebar from "./sidebar"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import Mainnav from "./Main_nav"
import Product from "./mockProducts_automobile.json"
// Mock products data with automotive parts
// const mockProducts = [
//   {
//     id: 1,
//     name: "Premium Car Battery 12V 75Ah",
//     partNumber: "BAT-12V-75AH-001",
//     category: "Batteries",
//     brand: "Exide",
//     price: 8999.99,
//     originalPrice: 9999.99,
//     stock: 15,
//     status: "active",
//     sales: 45,
//     rating: 4.5,
//     reviews: 128,
//     image: "https://i.pinimg.com/736x/eb/da/22/ebda22a972e1caf38e5e2c6fee890c42.jpg",
//     description: "High-performance maintenance-free car battery with 3-year warranty",
//     specifications: ["12V 75Ah", "Maintenance Free", "Cold Cranking Amps: 650", "Dimensions: 278x175x190mm"],
//   },
//   {
//     id: 2,
//     name: "Synthetic Engine Oil 5W-30",
//     partNumber: "OIL-5W30-SYN-004L",
//     category: "Oils",
//     brand: "Castrol",
//     price: 2499.99,
//     originalPrice: 2799.99,
//     stock: 50,
//     status: "active",
//     sales: 120,
//     rating: 4.8,
//     reviews: 256,
//     image: "/placeholder.svg?height=300&width=300&text=Engine+Oil",
//     description: "Premium synthetic engine oil for superior engine protection",
//     specifications: ["5W-30 Grade", "4 Liter Pack", "API SN/CF", "Suitable for Petrol & Diesel"],
//   },
//   {
//     id: 3,
//     name: "Brake Pad Set - Front",
//     partNumber: "BRK-PAD-FRT-Honda-001",
//     category: "Brake Parts",
//     brand: "Bosch",
//     price: 3499.99,
//     originalPrice: 3999.99,
//     stock: 8,
//     status: "low_stock",
//     sales: 23,
//     rating: 4.6,
//     reviews: 89,
//     image: "/placeholder.svg?height=300&width=300&text=Brake+Pads",
//     description: "High-quality ceramic brake pads for Honda vehicles",
//     specifications: ["Ceramic Material", "Low Dust Formula", "Fits Honda Civic/City", "Set of 4 Pads"],
//   },
//   {
//     id: 4,
//     name: "LED Headlight Bulb H4",
//     partNumber: "LED-H4-6000K-002",
//     category: "Lighting",
//     brand: "Philips",
//     price: 1899.99,
//     originalPrice: 2199.99,
//     stock: 25,
//     status: "active",
//     sales: 67,
//     rating: 4.4,
//     reviews: 145,
//     image: "/placeholder.svg?height=300&width=300&text=LED+Headlight",
//     description: "Ultra-bright LED headlight bulbs with 6000K white light",
//     specifications: ["H4 Socket", "6000K Color Temperature", "30W Power", "IP67 Waterproof"],
//   },
//   {
//     id: 5,
//     name: "Air Filter - Engine",
//     partNumber: "AIR-FLT-ENG-Toyota-005",
//     category: "Filters",
//     brand: "Mann",
//     price: 899.99,
//     originalPrice: 1099.99,
//     stock: 100,
//     status: "active",
//     sales: 89,
//     rating: 4.3,
//     reviews: 67,
//     image: "/placeholder.svg?height=300&width=300&text=Air+Filter",
//     description: "High-efficiency engine air filter for Toyota vehicles",
//     specifications: ["Paper Element", "Fits Toyota Innova/Fortuner", "High Filtration", "Easy Installation"],
//   },
//   {
//     id: 6,
//     name: "Spark Plug Set (4 pcs)",
//     partNumber: "SPK-PLG-SET-NGK-006",
//     category: "Engine Parts",
//     brand: "NGK",
//     price: 1599.99,
//     originalPrice: 1799.99,
//     stock: 0,
//     status: "out_of_stock",
//     sales: 156,
//     rating: 4.7,
//     reviews: 234,
//     image: "/placeholder.svg?height=300&width=300&text=Spark+Plugs",
//     description: "Premium iridium spark plugs for enhanced performance",
//     specifications: ["Iridium Electrode", "Set of 4", "Long Life", "Improved Fuel Economy"],
//   },
//   {
//     id: 7,
//     name: "Alloy Wheel 16 inch",
//     partNumber: "WHL-ALY-16-MAG-007",
//     category: "Wheels",
//     brand: "Enkei",
//     price: 12999.99,
//     originalPrice: 14999.99,
//     stock: 12,
//     status: "active",
//     sales: 34,
//     rating: 4.9,
//     reviews: 78,
//     image: "/placeholder.svg?height=300&width=300&text=Alloy+Wheel",
//     description: "Lightweight magnesium alloy wheel with sporty design",
//     specifications: ["16 inch Diameter", "7J Width", "5x114.3 PCD", "ET45 Offset"],
//   },
//   {
//     id: 8,
//     name: "Car Dashboard Camera",
//     partNumber: "CAM-DASH-FHD-008",
//     category: "Electronics",
//     brand: "Garmin",
//     price: 8999.99,
//     originalPrice: 9999.99,
//     stock: 30,
//     status: "active",
//     sales: 78,
//     rating: 4.2,
//     reviews: 156,
//     image: "/placeholder.svg?height=300&width=300&text=Dash+Camera",
//     description: "Full HD dashboard camera with GPS and G-sensor",
//     specifications: ["1080p Full HD", "GPS Tracking", "G-Sensor", "Loop Recording"],
//   },
// ]
const mockProducts = Product.map((product, index) => ({
  id: index + 1, // Generate unique ID based on index
  name: product.name,
  partNumber: product.partNumber,
  category: product.category,
  brand: product.brand,
  price: product.price,
  originalPrice: product.originalPrice,
  stock: product.stock,
  status: product.status,
  sales: product.sales,
  rating: product.rating,
  reviews: product.reviews,
  image: product.image || "/placeholder.svg?height=300&width=300&text=Product+Image",
  description: product.description || "No description available",
  specifications: product.specifications || ["No specifications available"],
}))
const categories = [
  "All",
  "Batteries",
  "Oils",
  "Brake Parts",
  "Lighting",
  "Filters",
  "Engine Parts",
  "Wheels",
  "Electronics",
]
const brands = ["All", "Exide", "Castrol", "Bosch", "Philips", "Mann", "NGK", "Enkei", "Garmin"]

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedBrand, setSelectedBrand] = useState("All")
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState("grid")

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.partNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesBrand = selectedBrand === "All" || product.brand === selectedBrand
    return matchesSearch && matchesCategory && matchesBrand
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">In Stock</Badge>
      case "low_stock":
        return <Badge className="bg-yellow-100 text-yellow-800">Low Stock</Badge>
      case "out_of_stock":
        return <Badge className="bg-red-100 text-red-800">Out of Stock</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const totalProducts = mockProducts.length
  const activeProducts = mockProducts.filter((p) => p.status === "active").length
  const lowStockProducts = mockProducts.filter((p) => p.status === "low_stock").length
  const outOfStockProducts = mockProducts.filter((p) => p.status === "out_of_stock").length

  const handleGoToChallan = () => {
    // Navigate to challan page - you can implement this based on your routing
    alert("Redirecting to Challan Page...")
  }

  const handleViewDFXDesign = (product) => {
    // Open DFX design viewer - you can implement this based on your requirements
    alert(`Opening DFX Design for ${product.name} (${product.partNumber})`)
  }

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating})</span>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* <Sidebar /> */}

      <div className="flex-1">
        <br></br>
                        <div style={{ marginLeft: "1.5rem", marginBottom: "1.5rem" }}>
                            <Mainnav></Mainnav>
                        </div>
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-semibold text-gray-900">Ashirwad Enterprises Products</h1>
              <Badge variant="secondary">{totalProducts} total products</Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Button onClick={handleGoToChallan} className="bg-blue-600 hover:bg-blue-700">
                <FileText className="h-4 w-4 mr-2" />
                Go to Challan Page
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
            {/* <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalProducts}</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +12% from last month
                </p>
              </CardContent>
            </Card> */}

            {/* <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">In Stock</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeProducts}</div>
                <p className="text-xs text-muted-foreground">
                  {((activeProducts / totalProducts) * 100).toFixed(1)}% of total
                </p>
              </CardContent>
            </Card> */}

            {/* <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{lowStockProducts}</div>
                <p className="text-xs text-muted-foreground">Requires attention</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{outOfStockProducts}</div>
                <p className="text-xs text-muted-foreground">Needs restocking</p>
              </CardContent>
            </Card> */}
          </div>

          {/* Filters and Search */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Product Catalog</CardTitle>
              <CardDescription>Browse and manage automotive parts and accessories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search by name, part number, or brand..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="stock">Stock</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="relative">
                      <div className="aspect-square bg-gray-100 overflow-hidden">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      {/* <div className="absolute top-2 right-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-white/80 hover:bg-white">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div> */}
                      {/* {product.originalPrice > product.price && (
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-red-500 text-white">
                            {Math.round(((product.originalPrice )))}% OFF
                          </Badge>
                        </div>
                      )} */}
                    </div>

                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div>
                          <Badge variant="outline" className="text-xs mt-2 mb-2">
                            {product.brand}
                          </Badge>
                          <h3 className="font-semibold text-sm line-clamp-2 mb-1">Part No. - {product.partNumber}</h3>
                          <p className="text-xs text-gray-500 font-mono">{product.name}</p>
                        </div>

                        {/* <div className="space-y-1">
                          {renderStars(product.rating)}
                          <p className="text-xs text-gray-500">{product.reviews} reviews</p>
                        </div> */}

                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold text-green-600">
                                ₹{product.originalPrice.toLocaleString()}
                              </span>
                              {/* {product.originalPrice > product.price && (
                                <span className="text-sm text-gray-500 line-through">
                                  ₹{product.originalPrice.toLocaleString()}
                                </span>
                              )} */}
                            </div>
                          </div>
                          {/* {getStatusBadge(product.status)} */}
                        </div>

                        {/* <div className="text-xs text-gray-600">
                          <p>Stock: {product.stock} units</p>
                          <p>Category: {product.category}</p>
                        </div> */}

                        <div className="space-y-2 pt-2">
                          <div className="flex space-x-2">
                            <Button size="sm" className="flex-1" disabled={product.status === "out_of_stock"}>
                              <ShoppingCart className="h-4 w-4 mr-1" />
                              Add to Cart
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleViewDFXDesign(product)}
                              className="px-3"
                            >
                              <Wrench className="h-4 w-4" />
                            </Button>
                          </div>

                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full bg-transparent"
                            onClick={() => handleViewDFXDesign(product)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View DFX Design
                          </Button>

                          {/* <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="w-full">
                                <MoreHorizontal className="h-4 w-4 mr-2" />
                                More Actions
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Product
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Package className="h-4 w-4 mr-2" />
                                Check Stock
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Product
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu> */}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
