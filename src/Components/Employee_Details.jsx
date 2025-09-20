"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Plus,
  Download,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Building,
  Users,
  Shield,
  BookUser,
  ChevronDown,
  ChevronRight,
  Edit,
  Trash2,
  X,
  FileText,
  Filter,
  MoreVertical,
  Star,
  TrendingUp,
  TrendingDown
} from "lucide-react"
import Navbar from "../Components/Main_nav"

const EmployeeManagement = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedSkillLevel, setSelectedSkillLevel] = useState("All")
  const [showAddEmployee, setShowAddEmployee] = useState(false)
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    salary: "",
    joiningDate: "",
    address: "",
    status: "Active",
    skillLevel: "Moderate", // New field with default value
    reportsTo: null
  })

  const API_BASE_URL = "http://localhost:3000"

  // Fetch employees from API
  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/api/employees`)
      if (!response.ok) throw new Error('Failed to fetch employees')
      const data = await response.json()
      setEmployees(data)
      setError(null)
    } catch (error) {
      console.error('Error fetching employees:', error)
      setError('Failed to load employees. Please check if the server is running.')
    } finally {
      setLoading(false)
    }
  }

  const departments = ["All", "Management", "Finance", "IT", "HR", "Sales", "Marketing", "Operations"]
  const statusOptions = ["All", "Active", "Inactive", "On Leave"]
  const skillLevels = ["All", "High", "Moderate", "Low"] // New skill level options

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.position?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesDepartment = selectedDepartment === "All" || employee.department === selectedDepartment
    const matchesStatus = selectedStatus === "All" || employee.status === selectedStatus
    const matchesSkillLevel = selectedSkillLevel === "All" || employee.skillLevel === selectedSkillLevel
    
    return matchesSearch && matchesDepartment && matchesStatus && matchesSkillLevel
  })

  const exportToCSV = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/employees/export/csv`)
      if (!response.ok) throw new Error('Failed to export CSV')
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'ashirwad_employees.csv'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error exporting CSV:', error)
      alert('Failed to export employee data.')
    }
  }

  const handleAddEmployee = async () => {
    try {
      // Format the data correctly for the backend
      const employeeData = {
        ...newEmployee,
        // Ensure reportsTo is either null or a valid ObjectId
        reportsTo: newEmployee.reportsTo || null,
        // Convert salary to string if it's a number
        salary: typeof newEmployee.salary === 'number' ? `₹${newEmployee.salary}` : newEmployee.salary
      }

      const response = await fetch(`${API_BASE_URL}/api/employees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData)
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to add employee')
      }
      
      const addedEmployee = await response.json()
      setEmployees([...employees, addedEmployee])
      setNewEmployee({
        name: "",
        email: "",
        phone: "",
        department: "",
        position: "",
        salary: "",
        joiningDate: "",
        address: "",
        status: "Active",
        skillLevel: "Moderate", // Reset to default
        reportsTo: null
      })
      setShowAddEmployee(false)
      alert("Employee added successfully!")
    } catch (error) {
      console.error('Error adding employee:', error)
      alert(error.message || 'Failed to add employee. Please try again.')
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewEmployee(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleDeleteEmployee = async (id) => {
    if (!confirm("Are you sure you want to delete this employee?")) return
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/employees/${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) throw new Error('Failed to delete employee')
      
      setEmployees(employees.filter(emp => emp._id !== id))
      alert("Employee deleted successfully!")
    } catch (error) {
      console.error('Error deleting employee:', error)
      alert('Failed to delete employee. Please try again.')
    }
  }

  const getSkillLevelIcon = (skillLevel) => {
    switch (skillLevel) {
      case "High":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "Moderate":
        return <Star className="h-4 w-4 text-yellow-500" />
      case "Low":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Star className="h-4 w-4 text-gray-500" />
    }
  }

  const getSkillLevelColor = (skillLevel) => {
    switch (skillLevel) {
      case "High":
        return "bg-green-100 text-green-800"
      case "Moderate":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const buildHierarchy = () => {
    const hierarchy = {}
    
    // Find top level employees (those who don't report to anyone)
    const topLevel = employees.filter(emp => !emp.reportsTo)
    
    // Recursive function to build tree
    const buildTree = (parentId) => {
      return employees
        .filter(emp => emp.reportsTo && emp.reportsTo._id === parentId)
        .map(emp => ({
          ...emp,
          subordinates: buildTree(emp._id)
        }))
    }
    
    // Build tree for each top level employee
    topLevel.forEach(emp => {
      hierarchy[emp._id] = {
        ...emp,
        subordinates: buildTree(emp._id)
      }
    })
    
    return hierarchy
  }

  const renderHierarchy = (employees, level = 0) => {
    return Object.values(employees).map(emp => (
      <div key={emp._id} className="ml-4 my-2">
        <div className="flex items-center p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex-shrink-0 mr-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{emp.name}</p>
            <p className="text-sm text-gray-500 truncate">{emp.position}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              {emp.department}
            </span>
            <span className={`px-2 py-1 text-xs rounded-full ${getSkillLevelColor(emp.skillLevel || "Moderate")}`}>
              {emp.skillLevel || "Moderate"}
            </span>
          </div>
        </div>
        {emp.subordinates && emp.subordinates.length > 0 && (
          <div className="mt-2 border-l-2 border-gray-200 pl-4">
            {renderHierarchy(emp.subordinates, level + 1)}
          </div>
        )}
      </div>
    ))
  }

  const hierarchy = buildHierarchy()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading employee data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
          <div className="text-red-500 mb-4">
            <Shield className="h-12 w-12 mx-auto" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Connection Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500 mb-4">
            Make sure your backend server is running on http://localhost:3000
          </p>
          <button
            onClick={fetchEmployees}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
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
              <h1 style={{marginTop:"2rem"}} className="text-2xl font-bold text-gray-900 ">Employee Management</h1>
              <p className="text-gray-600">Manage your organization's staff and hierarchy</p>
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
                onClick={() => setShowAddEmployee(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Employee
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Organization Hierarchy */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Building className="h-5 w-5 mr-2 text-blue-600" />
                Organization Structure
              </h2>
              <div className="h-96 overflow-y-auto">
                {Object.keys(hierarchy).length > 0 ? (
                  renderHierarchy(hierarchy)
                ) : (
                  <p className="text-gray-500 text-center py-8">No hierarchy data available</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Employee List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Employee Directory</h2>
                
                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search employees..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <select
                    className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
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

                  <select
                    className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    value={selectedSkillLevel}
                    onChange={(e) => setSelectedSkillLevel(e.target.value)}
                  >
                    {skillLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Employee Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Employee
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Department
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Position
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Skill Level
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
                    {filteredEmployees.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                          No employees found
                        </td>
                      </tr>
                    ) : (
                      filteredEmployees.map((employee) => (
                        <tr key={employee._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                  <User className="h-5 w-5 text-blue-600" />
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                                <div className="text-sm text-gray-500">{employee.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{employee.department}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{employee.position}</div>
                            <div className="text-sm text-gray-500">{employee.salary}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {getSkillLevelIcon(employee.skillLevel || "Moderate")}
                              <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getSkillLevelColor(employee.skillLevel || "Moderate")}`}>
                                {employee.skillLevel || "Moderate"}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              employee.status === "Active" ? "bg-green-100 text-green-800" :
                              employee.status === "On Leave" ? "bg-yellow-100 text-yellow-800" :
                              "bg-red-100 text-red-800"
                            }`}>
                              {employee.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button 
                                className="text-red-600 hover:text-red-900"
                                onClick={() => handleDeleteEmployee(employee._id)}
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
          </div>
        </div>
      </main>

      {/* Add Employee Modal */}
      {showAddEmployee && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Add New Employee</h3>
                <button onClick={() => setShowAddEmployee(false)}>
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newEmployee.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={newEmployee.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={newEmployee.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Department</label>
                    <select
                      name="department"
                      value={newEmployee.department}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select Department</option>
                      {departments.filter(d => d !== "All").map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Position</label>
                    <input
                      type="text"
                      name="position"
                      value={newEmployee.position}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Salary</label>
                    <input
                      type="text"
                      name="salary"
                      value={newEmployee.salary}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                      placeholder="e.g., ₹50000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Skill Level</label>
                    <select
                      name="skillLevel"
                      value={newEmployee.skillLevel}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="High">High</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Joining Date</label>
                  <input
                    type="date"
                    name="joiningDate"
                    value={newEmployee.joiningDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <textarea
                    name="address"
                    value={newEmployee.address}
                    onChange={handleInputChange}
                    rows={2}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    name="status"
                    value={newEmployee.status}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="On Leave">On Leave</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddEmployee(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddEmployee}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Add Employee
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EmployeeManagement