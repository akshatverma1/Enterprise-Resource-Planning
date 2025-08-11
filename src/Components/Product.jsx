"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Plus,
  Filter,
  Eye,
  FileText,
  Download,
  Info,
  Image as ImageIcon,
  Package,
  X
} from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card"
import { Badge } from "./ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import Mainnav from "./Main_nav"
import { getAutomobileData } from "./mockProducts_automobile"

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

const priceRanges = [
  { label: "All Prices", value: "all" },
  { label: "Under ₹500", value: "0-500" },
  { label: "₹500 - ₹1,000", value: "500-1000" },
  { label: "₹1,000 - ₹2,000", value: "1000-2000" },
  { label: "₹2,000 - ₹5,000", value: "2000-5000" },
  { label: "Over ₹5,000", value: "5000-100000" }
]

const stockStatuses = [
  { label: "All Statuses", value: "all" },
  { label: "In Stock", value: "In Stock" },
  { label: "Low Stock", value: "Low Stock" },
  { label: "Out of Stock", value: "Out of Stock" }
]

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedBrand, setSelectedBrand] = useState("All")
  const [selectedPriceRange, setSelectedPriceRange] = useState("all")
  const [selectedStockStatus, setSelectedStockStatus] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [isDownloading, setIsDownloading] = useState(null)
  const [showAddProductForm, setShowAddProductForm] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    partNumber: "",
    category: "",
    brand: "",
    price: "",
    originalPrice: "",
    stock: "",
    status: "In Stock",
    image: "",
    description: "",
    specifications: ""
  })

  const [mockProducts, setMockProducts] = useState([])
  const [loading, setLoading] = useState(true) // Add loading state

  useEffect(() => {
    fetchAndFormatProducts();
  },[])

  async function fetchAndFormatProducts() {
    try {
      setLoading(true) // Start loading
      const data = await getAutomobileData();

      const mock = data.map((product, index) => ({
        id: index + 1,
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
        dxfDesignUrl: "https://drive.google.com/file/d/1joQuYYJtDDKNbmxnlSd9F_aY09dtDPv_/view?usp=sharing",
        imageDetailsUrl: "https://i.pinimg.com/736x/e2/cb/c3/e2cbc38520ec8bade8951665ae70baa8.jpg"
      }));

      setMockProducts(mock);
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false) // End loading regardless of success/error
    }
  }

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.partNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesBrand = selectedBrand === "All" || product.brand === selectedBrand

    let matchesPrice = true
    if (selectedPriceRange !== "all") {
      const [min, max] = selectedPriceRange.split('-').map(Number)
      matchesPrice = product.price >= min && (max ? product.price <= max : true)
    }

    const matchesStock = selectedStockStatus === "all" || product.status === selectedStockStatus

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesStock
  })

  const handleDownloadAndOpenDXF = async (product, actionType) => {
    setIsDownloading(product.id)

    try {
      const response = await fetch(product.dxfDesignUrl)
      if (!response.ok) throw new Error("Failed to fetch DXF file")

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = `${product.partNumber}_design.dxf`
      document.body.appendChild(a)
      a.click()

      if (actionType === 'partDetails') {
        window.open(product.imageDetailsUrl, '_blank')
      }

      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

    } catch (error) {
      console.error("Error handling file:", error)
      alert(`Failed to process file for ${product.name}`)
    } finally {
      setIsDownloading(null)
    }
  }

  const handleViewImageDetails = (product) => {
    window.open(product.imageDetailsUrl, '_blank')
  }

  const handleAddProduct = () => {
    console.log("Adding new product:", newProduct)
    // Reset form and close panel
    setNewProduct({
      name: "",
      partNumber: "",
      category: "",
      brand: "",
      price: "",
      originalPrice: "",
      stock: "",
      status: "In Stock",
      image: "",
      description: "",
      specifications: ""
    })
    setShowAddProductForm(false)
    alert("Product added successfully! (This is a demo - in a real app it would be saved to your database)")
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300 ${showAddProductForm ? 'mr-[400px]' : ''}`}>
        <br />
        <div style={{ marginLeft: "1.5rem", marginBottom: "1.5rem" }}>
          <Mainnav />
        </div>

        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-semibold text-gray-900">Ashirwad Enterprises Products</h1>
              <Badge variant="secondary">
                {loading ? "Loading..." : `${mockProducts.length} total products`}
              </Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Button onClick={() => alert("Redirecting to Challan Page...")} className="bg-blue-600 hover:bg-blue-700">
                <FileText className="h-4 w-4 mr-2" />
                Go to Challan Page
              </Button>
              <Button onClick={() => setShowAddProductForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>
          </div>
        </header>

        <main className="p-6">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Product Catalog</CardTitle>
              <CardDescription>Browse and manage automotive parts and accessories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search products by name, part number or brand..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Category Filter */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
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

                {/* Brand Filter */}
                {/* <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select> */}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {/* Price Range Filter */}
                {/* <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Price range" />
                  </SelectTrigger>
                  <SelectContent>
                    {priceRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select> */}

                {/* Stock Status Filter */}
                {/* <Select value={selectedStockStatus} onValueChange={setSelectedStockStatus}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Stock status" />
                  </SelectTrigger>
                  <SelectContent>
                    {stockStatuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select> */}

                {/* Sort By */}
                {/* <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                    <SelectItem value="priceLow">Price (Low to High)</SelectItem>
                    <SelectItem value="priceHigh">Price (High to Low)</SelectItem>
                    <SelectItem value="stock">Stock Level</SelectItem>
                  </SelectContent>
                </Select> */}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {loading ? (
                  // Loading spinner
                  <div className="col-span-full flex flex-col items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    <p className="mt-4 text-gray-500">Loading products...</p>
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="text-center py-12 col-span-full">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                  </div>
                ) : (
                  filteredProducts.map((product) => (
                    <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                      <div className="relative">
                        <div className="aspect-square bg-gray-100 overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
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

                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <span className="text-lg font-bold text-green-600">
                                  ₹{product.price}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2 pt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full bg-transparent"
                              onClick={() => window.open(product.dxfDesignUrl, '_blank')}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View DXF Design
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full bg-transparent"
                              onClick={() => handleViewImageDetails(product)}
                            >
                              <ImageIcon className="h-4 w-4 mr-2" />
                              Part Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Add Product Side Panel */}
      {showAddProductForm && (
        <div className="fixed right-0 top-0 h-full w-[400px] bg-white shadow-lg border-l border-gray-200 overflow-y-auto z-50">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Add New Product</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAddProductForm(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <Label htmlFor="partNumber">Part Number</Label>
                <Input
                  id="partNumber"
                  name="partNumber"
                  value={newProduct.partNumber}
                  onChange={handleInputChange}
                  placeholder="Enter part number"
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  name="category"
                  value={newProduct.category}
                  onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(c => c !== "All").map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="brand">Brand</Label>
                <Select
                  name="brand"
                  value={newProduct.brand}
                  onValueChange={(value) => setNewProduct({ ...newProduct, brand: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.filter(b => b !== "All").map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    placeholder="Enter price"
                  />
                </div>
                <div>
                  <Label htmlFor="originalPrice">Original Price (₹)</Label>
                  <Input
                    id="originalPrice"
                    name="originalPrice"
                    type="number"
                    value={newProduct.originalPrice}
                    onChange={handleInputChange}
                    placeholder="Enter original price"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    value={newProduct.stock}
                    onChange={handleInputChange}
                    placeholder="Enter stock quantity"
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    name="status"
                    value={newProduct.status}
                    onValueChange={(value) => setNewProduct({ ...newProduct, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="In Stock">In Stock</SelectItem>
                      <SelectItem value="Low Stock">Low Stock</SelectItem>
                      <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  value={newProduct.image}
                  onChange={handleInputChange}
                  placeholder="Enter image URL"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  placeholder="Enter product description"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="specifications">Specifications</Label>
                <Textarea
                  id="specifications"
                  name="specifications"
                  value={newProduct.specifications}
                  onChange={handleInputChange}
                  placeholder="Enter specifications (comma separated)"
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowAddProductForm(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddProduct}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}