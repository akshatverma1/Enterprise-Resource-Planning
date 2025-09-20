"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Filter,
  Plus,
  Download,
  ZoomIn,
  Info,
  Gauge,
  Settings,
  X,
  FileText,
  ImageIcon,Wrench
} from "lucide-react"

const GaugePage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedPart, setSelectedPart] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [showAddItem, setShowAddItem] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  // Sample data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setItems([
        {
          id: 1,
          name: "Thread Plug Gauge",
          type: "Gauge",
          partNumber: "TPG-M10-1.5",
          associatedPart: "Bolt M10",
          status: "Available",
          location: "Quality Lab A",
          lastCalibration: "2024-03-15",
          nextCalibration: "2024-09-15",
          image: "/api/placeholder/300/300",
          description: "M10 x 1.5 thread plug gauge for bolt inspection",
          specifications: "Class: 2B, Tolerance: ±0.003mm"
        },
        {
          id: 2,
          name: "CNC Fixture Plate",
          type: "Fixture",
          partNumber: "FIX-CNC-102",
          associatedPart: "Engine Bracket",
          status: "In Use",
          location: "CNC Station 3",
          lastCalibration: "2024-01-20",
          nextCalibration: "2025-01-20",
          image: "/api/placeholder/300/300",
          description: "Custom fixture for engine bracket machining",
          specifications: "Material: Aluminum, Size: 300x200mm"
        },
        {
          id: 3,
          name: "Dial Caliper",
          type: "Tooling",
          partNumber: "DC-150",
          associatedPart: "Multiple Parts",
          status: "Available",
          location: "Bench 5",
          lastCalibration: "2024-02-10",
          nextCalibration: "2024-08-10",
          image: "/api/placeholder/300/300",
          description: "150mm digital dial caliper for precision measurement",
          specifications: "Range: 0-150mm, Accuracy: 0.02mm"
        },
        {
          id: 4,
          name: "Ring Gauge Set",
          type: "Gauge",
          partNumber: "RG-SET-25",
          associatedPart: "Shaft 25mm",
          status: "Calibration Due",
          location: "Quality Lab B",
          lastCalibration: "2023-12-01",
          nextCalibration: "2024-06-01",
          image: "/api/placeholder/300/300",
          description: "Set of ring gauges for 25mm shaft inspection",
          specifications: "Includes GO/NO-GO gauges, Tolerance: H7"
        },
        {
          id: 5,
          name: "Welding Jig",
          type: "Fixture",
          partNumber: "WJ-205",
          associatedPart: "Frame Assembly",
          status: "In Use",
          location: "Welding Station 2",
          lastCalibration: "2024-02-28",
          nextCalibration: "2024-08-28",
          image: "/api/placeholder/300/300",
          description: "Jig for frame assembly welding",
          specifications: "Material: Steel, Weight: 15kg"
        },
        {
          id: 6,
          name: "Torque Wrench",
          type: "Tooling",
          partNumber: "TW-50Nm",
          associatedPart: "Assembly Components",
          status: "Available",
          location: "Assembly Line",
          lastCalibration: "2024-03-01",
          nextCalibration: "2024-09-01",
          image: "/api/placeholder/300/300",
          description: "Digital torque wrench for precision fastening",
          specifications: "Range: 5-50Nm, Accuracy: ±2%"
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const categories = ["All", "Gauge", "Fixture", "Tooling"]
  const parts = ["All", "Bolt M10", "Engine Bracket", "Shaft 25mm", "Frame Assembly", "Assembly Components", "Multiple Parts"]
  const statusOptions = ["All", "Available", "In Use", "Calibration Due", "Maintenance"]

  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.partNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === "All" || item.type === selectedCategory
    const matchesPart = selectedPart === "All" || item.associatedPart === selectedPart
    const matchesStatus = selectedStatus === "All" || item.status === selectedStatus
    
    return matchesSearch && matchesCategory && matchesPart && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800"
      case "In Use":
        return "bg-blue-100 text-blue-800"
      case "Calibration Due":
        return "bg-yellow-100 text-yellow-800"
      case "Maintenance":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case "Gauge":
        return <Gauge className="h-5 w-5 text-purple-500" />
      case "Fixture":
        return <Settings className="h-5 w-5 text-indigo-500" />
      case "Tooling":
        return <Wrench className="h-5 w-5 text-blue-500" />
      default:
        return <Wrench className="h-5 w-5 text-gray-500" />
    }
  }

  const exportToCSV = () => {
    const headers = [
      "ID",
      "Name",
      "Type",
      "Part Number",
      "Associated Part",
      "Status",
      "Location",
      "Last Calibration",
      "Next Calibration",
      "Description"
    ]
    
    const csvContent = [
      headers.join(","),
      ...filteredItems.map(item => 
        [
          item.id,
          `"${item.name}"`,
          item.type,
          item.partNumber,
          `"${item.associatedPart}"`,
          item.status,
          `"${item.location}"`,
          item.lastCalibration,
          item.nextCalibration,
          `"${item.description}"`
        ].join(",")
      )
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "gauge_fixture_tooling_export.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading gauge and tooling data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gauge, Fixture & Tooling Management</h1>
              <p className="text-gray-600">Inventory tracking for measurement tools and production aids</p>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={exportToCSV}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </button>
              <button 
                onClick={() => setShowAddItem(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search by name or part number..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Associated Part</label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedPart}
                onChange={(e) => setSelectedPart(e.target.value)}
              >
                {parts.map(part => (
                  <option key={part} value={part}>{part}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Tool className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button 
                    onClick={() => setSelectedItem(item)}
                    className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-md hover:bg-opacity-70"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.partNumber}</p>
                    </div>
                    <div className="flex-shrink-0">
                      {getTypeIcon(item.type)}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                  
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center">
                      <span className="text-gray-500">For:</span>
                      <span className="ml-2 font-medium">{item.associatedPart}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-500">Location:</span>
                      <span className="ml-2">{item.location}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-500">Calibration:</span>
                      <span className="ml-2">{item.nextCalibration}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Info className="h-4 w-4 mr-2" />
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedItem.name}</h2>
                  <p className="text-gray-500">{selectedItem.partNumber}</p>
                </div>
                <button onClick={() => setSelectedItem(null)}>
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="h-64 bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div>
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Details</h3>
                    <div className="space-y-2">
                      <div className="flex">
                        <span className="text-gray-500 w-32">Type:</span>
                        <span className="font-medium">{selectedItem.type}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-500 w-32">Associated Part:</span>
                        <span>{selectedItem.associatedPart}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-500 w-32">Status:</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedItem.status)}`}>
                          {selectedItem.status}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-500 w-32">Location:</span>
                        <span>{selectedItem.location}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-500 w-32">Last Calibration:</span>
                        <span>{selectedItem.lastCalibration}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-500 w-32">Next Calibration:</span>
                        <span>{selectedItem.nextCalibration}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-700">{selectedItem.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Specifications</h3>
                    <p className="text-gray-700">{selectedItem.specifications}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {showAddItem && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Add New Gauge, Fixture or Tooling</h2>
                <button onClick={() => setShowAddItem(false)}>
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select Type</option>
                    <option value="Gauge">Gauge</option>
                    <option value="Fixture">Fixture</option>
                    <option value="Tooling">Tooling</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Part Number</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter part number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Associated Part</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select Associated Part</option>
                    {parts.filter(p => p !== "All").map(part => (
                      <option key={part} value={part}>{part}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select Status</option>
                    {statusOptions.filter(s => s !== "All").map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter location"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Calibration</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Next Calibration</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter description"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specifications</label>
                  <textarea
                    rows={2}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter specifications"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <ImageIcon className="w-8 h-8 mb-4 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500">SVG, PNG, JPG (MAX. 800x400px)</p>
                      </div>
                      <input type="file" className="hidden" />
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddItem(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GaugePage