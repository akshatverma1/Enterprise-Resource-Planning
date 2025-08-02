"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  Filter,
  Eye,
  FileText,
  Download,
  Info,
  Image as ImageIcon,
} from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card"
import { Badge } from "./ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import Mainnav from "./Main_nav"
import Product from "./mockProducts_automobile.json"

// Enhanced mock products with imageDetailsUrl
const mockProducts = Product.map((product, index) => ({
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
  dxfDesignUrl: "src/Components/des.dxf", // DXF file path
  imageDetailsUrl: "https://i.pinimg.com/736x/eb/da/22/ebda22a972e1caf38e5e2c6fee890c42.jpg" // New image details URL
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
  const [isDownloading, setIsDownloading] = useState(null)

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.partNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesBrand = selectedBrand === "All" || product.brand === selectedBrand
    return matchesSearch && matchesCategory && matchesBrand
  })

  const handleDownloadAndOpenDXF = async (product, actionType) => {
    setIsDownloading(product.id)
    
    try {
      const response = await fetch(product.dxfDesignUrl)
      if (!response.ok) throw new Error("Failed to fetch DXF file")
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      
      // Download the file
      const a = document.createElement('a')
      a.href = url
      a.download = `${product.partNumber}_design.dxf`
      document.body.appendChild(a)
      a.click()
      
      // For "Part Details", also try to open the image details
      if (actionType === 'partDetails') {
        // Open image details in new tab
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
    // Directly open the image details in new tab
    window.open(product.imageDetailsUrl, '_blank')
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1">
        <br />
        <div style={{ marginLeft: "1.5rem", marginBottom: "1.5rem" }}>
          <Mainnav />
        </div>

        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-semibold text-gray-900">Ashirwad Enterprises Products</h1>
              <Badge variant="secondary">{mockProducts.length} total products</Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Button onClick={() => alert("Redirecting to Challan Page...")} className="bg-blue-600 hover:bg-blue-700">
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

        <main className="p-6">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Product Catalog</CardTitle>
              <CardDescription>Browse and manage automotive parts and accessories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                {/* ... (search and filter controls remain the same) ... */}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
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
                                ₹{product.originalPrice.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 pt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full bg-transparent"
                            onClick={() => handleDownloadAndOpenDXF(product, 'view')}
                            disabled={isDownloading === product.id}
                          >
                            {isDownloading === product.id ? (
                              <>
                                <Download className="h-4 w-4 mr-2 animate-pulse" />
                                Downloading...
                              </>
                            ) : (
                              <>
                                <Eye className="h-4 w-4 mr-2" />
                                View DXF Design
                              </>
                            )}
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