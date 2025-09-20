"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Plus,
  Download,
  Filter,
  Calendar,
  Gauge,
  Settings,
  BarChart3,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Edit,
  Trash2,
  FileText,
  X,Wrench
} from "lucide-react"
import Navbar from "./Main_nav"
const ToolManagement = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [showAddRecord, setShowAddRecord] = useState(false)
  const [tools, setTools] = useState([])
  const [loading, setLoading] = useState(true)
  const [newRecord, setNewRecord] = useState({
    name: "",
    category: "",
    serialNumber: "",
    location: "",
    lastInspectionDate: "",
    nextInspectionDate: "",
    lastCalibrationDate: "",
    nextCalibrationDate: "",
    status: "Active",
    inspectionResult: "Pass",
    calibrationCertificate: "",
    notes: ""
  })

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setTools([
        {
          id: 1,
          name: "Digital Caliper",
          category: "Measuring Instrument",
          serialNumber: "MC-001",
          location: "Quality Lab A",
          lastInspectionDate: "2024-01-15",
          nextInspectionDate: "2024-07-15",
          lastCalibrationDate: "2024-01-10",
          nextCalibrationDate: "2024-07-10",
          status: "Active",
          inspectionResult: "Pass",
          calibrationCertificate: "CAL-2024-001",
          notes: "Accuracy within 0.02mm"
        },
        {
          id: 2,
          name: "Torque Wrench",
          category: "Tool",
          serialNumber: "TW-045",
          location: "Assembly Line B",
          lastInspectionDate: "2024-02-20",
          nextInspectionDate: "2024-08-20",
          lastCalibrationDate: "2024-02-15",
          nextCalibrationDate: "2024-08-15",
          status: "Active",
          inspectionResult: "Pass",
          calibrationCertificate: "CAL-2024-045",
          notes: "Calibrated to 5Nm standard"
        },
        {
          id: 3,
          name: "Thread Gauge",
          category: "Gauge",
          serialNumber: "TG-M6-01",
          location: "Quality Lab A",
          lastInspectionDate: "2024-03-10",
          nextInspectionDate: "2024-09-10",
          lastCalibrationDate: "2024-03-05",
          nextCalibrationDate: "2024-09-05",
          status: "Active",
          inspectionResult: "Pass",
          calibrationCertificate: "CAL-2024-078",
          notes: "M6x1.0 thread standard"
        },
        {
          id: 4,
          name: "Fixture Jig #5",
          category: "Fixture",
          serialNumber: "FJ-005",
          location: "Welding Station",
          lastInspectionDate: "2024-01-30",
          nextInspectionDate: "2024-07-30",
          lastCalibrationDate: "N/A",
          nextCalibrationDate: "N/A",
          status: "Needs Attention",
          inspectionResult: "Fail",
          calibrationCertificate: "N/A",
          notes: "Wear detected on locating pins. Needs replacement."
        },
        {
          id: 5,
          name: "Surface Plate",
          category: "Measuring Instrument",
          serialNumber: "SP-102",
          location: "Quality Lab B",
          lastInspectionDate: "2023-12-15",
          nextInspectionDate: "2024-06-15",
          lastCalibrationDate: "2023-12-10",
          nextCalibrationDate: "2024-06-10",
          status: "Due Soon",
          inspectionResult: "Pass",
          calibrationCertificate: "CAL-2023-456",
          notes: "Grade A granite surface plate"
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const categories = ["All", "Tool", "Gauge", "Fixture", "Measuring Instrument"]
  const statusOptions = ["All", "Active", "Due Soon", "Needs Attention", "Out of Service"]
  const inspectionResults = ["Pass", "Fail", "Conditional"]

  const filteredTools = tools.filter(tool => {
    const matchesSearch = 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.location.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory
    const matchesStatus = selectedStatus === "All" || tool.status === selectedStatus
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleAddRecord = () => {
    const newId = tools.length > 0 ? Math.max(...tools.map(t => t.id)) + 1 : 1
    setTools([...tools, { id: newId, ...newRecord }])
    setNewRecord({
      name: "",
      category: "",
      serialNumber: "",
      location: "",
      lastInspectionDate: "",
      nextInspectionDate: "",
      lastCalibrationDate: "",
      nextCalibrationDate: "",
      status: "Active",
      inspectionResult: "Pass",
      calibrationCertificate: "",
      notes: ""
    })
    setShowAddRecord(false)
    alert("Record added successfully!")
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewRecord(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleDeleteRecord = (id) => {
    if (!confirm("Are you sure you want to delete this record?")) return
    setTools(tools.filter(tool => tool.id !== id))
    alert("Record deleted successfully!")
  }

  const exportToCSV = () => {
    const headers = [
      "ID",
      "Name",
      "Category",
      "Serial Number",
      "Location",
      "Last Inspection",
      "Next Inspection",
      "Last Calibration",
      "Next Calibration",
      "Status",
      "Inspection Result",
      "Calibration Certificate",
      "Notes"
    ]
    
    const csvContent = [
      headers.join(","),
      ...filteredTools.map(tool => 
        [
          tool.id,
          `"${tool.name}"`,
          tool.category,
          tool.serialNumber,
          `"${tool.location}"`,
          tool.lastInspectionDate,
          tool.nextInspectionDate,
          tool.lastCalibrationDate,
          tool.nextCalibrationDate,
          tool.status,
          tool.inspectionResult,
          tool.calibrationCertificate,
          `"${tool.notes}"`
        ].join(",")
      )
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "tool_management_export.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "Due Soon":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "Needs Attention":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />
      case "Out of Service":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <CheckCircle className="h-5 w-5 text-gray-500" />
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Tool":
        return <Wrench className="h-5 w-5 text-blue-500" />
      case "Gauge":
        return <Gauge className="h-5 w-5 text-purple-500" />
      case "Fixture":
        return <Settings className="h-5 w-5 text-indigo-500" />
      case "Measuring Instrument":
        return <BarChart3 className="h-5 w-5 text-teal-500" />
      default:
        return <Tool className="h-5 w-5 text-gray-500" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tool data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
        <div style={{marginTop:"2rem" , marginLeft:"2rem"  , backgroundColor:"white"}}>
                <Navbar />
              </div>
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tool Management</h1>
              <p className="text-gray-600">Inspection reports and calibration records</p>
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
                onClick={() => setShowAddRecord(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Record
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Tool & Instrument Registry</h2>
            
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search by name, serial number, or location..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Tools Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tool/Instrument
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Serial No.
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Inspection
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Next Inspection
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Calibration
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTools.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-6 py-4 text-center text-gray-500">
                      No tools or instruments found
                    </td>
                  </tr>
                ) : (
                  filteredTools.map((tool) => (
                    <tr key={tool.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            {getCategoryIcon(tool.category)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{tool.name}</div>
                            <div className="text-sm text-gray-500">{tool.inspectionResult === "Pass" ? 
                              <span className="text-green-600">Pass</span> : 
                              <span className="text-red-600">Fail</span>}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{tool.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {tool.serialNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {tool.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {tool.lastInspectionDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {tool.nextInspectionDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {tool.lastCalibrationDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(tool.status)}
                          <span className="ml-2 text-sm text-gray-900">{tool.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleDeleteRecord(tool.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add Record Modal */}
      {showAddRecord && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Add New Tool/Instrument Record</h3>
                <button onClick={() => setShowAddRecord(false)}>
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newRecord.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    name="category"
                    value={newRecord.category}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.filter(c => c !== "All").map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Serial Number</label>
                  <input
                    type="text"
                    name="serialNumber"
                    value={newRecord.serialNumber}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={newRecord.location}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Inspection Date</label>
                  <input
                    type="date"
                    name="lastInspectionDate"
                    value={newRecord.lastInspectionDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Next Inspection Date</label>
                  <input
                    type="date"
                    name="nextInspectionDate"
                    value={newRecord.nextInspectionDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Calibration Date</label>
                  <input
                    type="date"
                    name="lastCalibrationDate"
                    value={newRecord.lastCalibrationDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Next Calibration Date</label>
                  <input
                    type="date"
                    name="nextCalibrationDate"
                    value={newRecord.nextCalibrationDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    name="status"
                    value={newRecord.status}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    {statusOptions.filter(s => s !== "All").map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Inspection Result</label>
                  <select
                    name="inspectionResult"
                    value={newRecord.inspectionResult}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    {inspectionResults.map(result => (
                      <option key={result} value={result}>{result}</option>
                    ))}
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Calibration Certificate</label>
                  <input
                    type="text"
                    name="calibrationCertificate"
                    value={newRecord.calibrationCertificate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Notes</label>
                  <textarea
                    name="notes"
                    value={newRecord.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddRecord(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddRecord}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Add Record
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ToolManagement