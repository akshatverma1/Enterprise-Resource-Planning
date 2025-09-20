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
  X,
  Calendar,
  MapPin,
  Building,
  Truck,
  Percent,
  Layers
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
  const [selectedProduct, setSelectedProduct] = useState(null)
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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAndFormatProducts();
  },[])

  async function fetchAndFormatProducts() {
    try {
      setLoading(true)
      const data = await getAutomobileData();

      const mock = data.map((product, index) => ({
        id: index + 1,
        name: product.name,
        partNumber: product.partNumber,
        category: product.category,
        company: product.company || "Ashirwad Enterprises",
        supplier: product.supplier || "Primary Supplier",
        location: product.location || "Main Warehouse",
        price: product.price,
        originalPrice: product.originalPrice,
        stock: product.stock,
        status: product.status,
        sales: product.sales,
        rating: product.rating,
        reviews: product.reviews,
        image: product.image || "/placeholder.svg?height=300&width=300&text=Product+Image",
        designImage: product.designImage || "https://i.pinimg.com/736x/e2/cb/c3/e2cbc38520ec8bade8951665ae70baa8.jpg",
        designDXF: product.designDXF || "https://drive.google.com/file/d/1joQuYYJtDDKNbmxnlSd9F_aY09dtDPv_/view?usp=sharing",
        gst: product.gst || "18%",
        coating: product.coating || "Standard",
        description: product.description || "No description available",
        specifications: product.specifications || ["No specifications available"],
        createdAt: product.createdAt || new Date().toISOString(),
        updatedAt: product.updatedAt || new Date().toISOString()
      }));

      setMockProducts(mock);
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = mockProducts.filter((product) => {
    const name = product.name || "";
    const partNumber = product.partNumber || "";
    const brand = product.brand || "";
    const category = product.category || "";
    
    const matchesSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "All" || category === selectedCategory
    const matchesBrand = selectedBrand === "All" || brand === selectedBrand

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
      const response = await fetch(product.designDXF)
      if (!response.ok) throw new Error("Failed to fetch DXF file")

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = `${product.partNumber}_design.dxf`
      document.body.appendChild(a)
      a.click()

      if (actionType === 'partDetails') {
        window.open(product.designImage, '_blank')
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
    window.open(product.designImage, '_blank')
  }

  const handleAddProduct = () => {
    console.log("Adding new product:", newProduct)
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {loading ? (
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
                              onClick={() => window.open(product.designDXF, '_blank')}
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
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full bg-transparent"
                              onClick={() => setSelectedProduct(product)}
                            >
                              <Info className="h-4 w-4 mr-2" />
                              More Details
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

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Product Details</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedProduct(null)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                
                <div className="space-y-2">
                  <Button
                    className="w-full"
                    onClick={() => window.open(selectedProduct.designDXF, '_blank')}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View DXF Design
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleViewImageDetails(selectedProduct)}
                  >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    View Design Image
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">{selectedProduct.name}</h3>
                  <p className="text-gray-500">Part No: {selectedProduct.partNumber}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 flex items-center">
                      <Building className="h-4 w-4 mr-1" /> Company
                    </p>
                    <p className="font-medium">{selectedProduct.company}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 flex items-center">
                      <Truck className="h-4 w-4 mr-1" /> Supplier
                    </p>
                    <p className="font-medium">{selectedProduct.supplier}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" /> Location
                    </p>
                    <p className="font-medium">{selectedProduct.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 flex items-center">
                      <Percent className="h-4 w-4 mr-1" /> GST
                    </p>
                    <p className="font-medium">{selectedProduct.gst}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 flex items-center">
                      <Layers className="h-4 w-4 mr-1" /> Coating
                    </p>
                    <p className="font-medium">{selectedProduct.coating}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" /> Created
                    </p>
                    <p className="font-medium">{formatDate(selectedProduct.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" /> Updated
                    </p>
                    <p className="font-medium">{formatDate(selectedProduct.updatedAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Brand</p>
                    <p className="font-medium">{selectedProduct.brand}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium">{selectedProduct.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="font-medium text-green-600">₹{selectedProduct.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Original Price</p>
                    <p className="font-medium text-gray-500 line-through">₹{selectedProduct.originalPrice}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Stock Status</p>
                  <Badge
                    className={
                      selectedProduct.status === "In Stock" ? "bg-green-100 text-green-800" :
                      selectedProduct.status === "Low Stock" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }
                  >
                    {selectedProduct.status}
                  </Badge>
                  <p className="mt-1 text-sm">{selectedProduct.stock} units available</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="text-sm">{selectedProduct.description}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Specifications</p>
                  <ul className="text-sm list-disc pl-5">
                    {Array.isArray(selectedProduct.specifications) ? (
                      selectedProduct.specifications.map((spec, index) => (
                        <li key={index}>{spec}</li>
                      ))
                    ) : (
                      <li>{selectedProduct.specifications}</li>
                    )}
                  </ul>
                </div>

                {selectedProduct.rating && (
                  <div>
                    <p className="text-sm text-gray-500">Rating</p>
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(selectedProduct.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-500">
                        {selectedProduct.rating} ({selectedProduct.reviews} reviews)
                      </span>
                    </div>
                  </div>
                )}

                {selectedProduct.sales && (
                  <div>
                    <p className="text-sm text-gray-500">Sales</p>
                    <p className="text-sm">{selectedProduct.sales} units sold</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}