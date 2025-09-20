"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Filter,
  Download,
  ZoomIn,
  FileText,
  Calendar,
  Award,
  Building,
  X,
  ExternalLink
} from "lucide-react"

const CertificatesPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedCertificate, setSelectedCertificate] = useState(null)
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)

  // Sample data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setCertificates([
        {
          id: 1,
          title: "ISO 9001:2015 Certification",
          category: "Quality Management",
          issuedBy: "International Organization for Standardization",
          issueDate: "2023-05-15",
          expiryDate: "2026-05-15",
          status: "Valid",
          certificateNumber: "CERT-ISO-9001-2023",
          description: "Quality Management Systems Certification demonstrating our commitment to consistent quality and customer satisfaction.",
          image: "/api/placeholder/600/400",
          downloadLink: "#",
          scope: "Design, development, and manufacturing of automotive components"
        },
        {
          id: 2,
          title: "IATF 16949:2016 Certification",
          category: "Automotive Quality",
          issuedBy: "International Automotive Task Force",
          issueDate: "2023-03-10",
          expiryDate: "2026-03-10",
          status: "Valid",
          certificateNumber: "CERT-IATF-16949-2023",
          description: "Automotive Quality Management System certification for the automotive industry.",
          image: "/api/placeholder/600/400",
          downloadLink: "#",
          scope: "Manufacturing of precision automotive parts"
        },
        {
          id: 3,
          title: "ISO 14001:2015 Certification",
          category: "Environmental",
          issuedBy: "International Organization for Standardization",
          issueDate: "2023-07-22",
          expiryDate: "2026-07-22",
          status: "Valid",
          certificateNumber: "CERT-ISO-14001-2023",
          description: "Environmental Management Systems certification demonstrating our environmental responsibility.",
          image: "/api/placeholder/600/400",
          downloadLink: "#",
          scope: "All manufacturing operations and facilities"
        },
        {
          id: 4,
          title: "OHSAS 18001:2007 Certification",
          category: "Health & Safety",
          issuedBy: "British Standards Institution",
          issueDate: "2022-11-30",
          expiryDate: "2025-11-30",
          status: "Valid",
          certificateNumber: "CERT-OHSAS-18001-2022",
          description: "Occupational Health and Safety Management Systems certification.",
          image: "/api/placeholder/600/400",
          downloadLink: "#",
          scope: "All company operations and employee safety protocols"
        },
        {
          id: 5,
          title: "Supplier Excellence Award 2023",
          category: "Award",
          issuedBy: "Global Automotive Group",
          issueDate: "2023-01-20",
          expiryDate: "N/A",
          status: "Award",
          certificateNumber: "AWARD-SUP-2023",
          description: "Award for excellence in supplier performance and quality delivery.",
          image: "/api/placeholder/600/400",
          downloadLink: "#",
          scope: "Supplier performance for the fiscal year 2022"
        },
        {
          id: 6,
          title: "VDA 6.3 Process Audit Certification",
          category: "Quality Audit",
          issuedBy: "German Association of the Automotive Industry",
          issueDate: "2022-09-15",
          expiryDate: "2025-09-15",
          status: "Valid",
          certificateNumber: "CERT-VDA-6.3-2022",
          description: "Certification for process audits in the automotive industry.",
          image: "/api/placeholder/600/400",
          downloadLink: "#",
          scope: "Production process auditing and quality control"
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const categories = ["All", "Quality Management", "Automotive Quality", "Environmental", "Health & Safety", "Award", "Quality Audit"]
  const statusOptions = ["All", "Valid", "Expired", "Award", "Suspended"]

  const filteredCertificates = certificates.filter(certificate => {
    const matchesSearch = 
      certificate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      certificate.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      certificate.issuedBy.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === "All" || certificate.category === selectedCategory
    const matchesStatus = selectedStatus === "All" || certificate.status === selectedStatus
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "Valid":
        return "bg-green-100 text-green-800"
      case "Expired":
        return "bg-red-100 text-red-800"
      case "Award":
        return "bg-blue-100 text-blue-800"
      case "Suspended":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading certificates...</p>
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
              <h1 className="text-2xl font-bold text-gray-900">Company Certificates</h1>
              <p className="text-gray-600">Our accreditations, certifications, and awards</p>
            </div>
            <div className="flex space-x-4">
              <button 
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Download className="h-4 w-4 mr-2" />
                Export List
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Filter Certificates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search certificates..."
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

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No certificates found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            filteredCertificates.map((certificate) => (
              <div key={certificate.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    <img
                      src={certificate.image}
                      alt={certificate.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button 
                    onClick={() => setSelectedCertificate(certificate)}
                    className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-md hover:bg-opacity-70"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </button>
                  <div className="absolute bottom-2 left-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(certificate.status)}`}>
                      {certificate.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1">{certificate.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{certificate.category}</p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Building className="h-4 w-4 mr-1" />
                    <span>{certificate.issuedBy}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Issued: {certificate.issueDate}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => setSelectedCertificate(certificate)}
                      className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      View Details
                    </button>
                    
                    <a
                      href={certificate.downloadLink}
                      className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-800"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Certificate Detail Modal */}
      {selectedCertificate && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedCertificate.title}</h2>
                  <p className="text-gray-500">{selectedCertificate.category}</p>
                </div>
                <button onClick={() => setSelectedCertificate(null)}>
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={selectedCertificate.image}
                      alt={selectedCertificate.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                
                <div>
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Certificate Details</h3>
                    <div className="space-y-2">
                      <div className="flex">
                        <span className="text-gray-500 w-32">Certificate ID:</span>
                        <span className="font-medium">{selectedCertificate.certificateNumber}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-500 w-32">Issued By:</span>
                        <span>{selectedCertificate.issuedBy}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-500 w-32">Issue Date:</span>
                        <span>{selectedCertificate.issueDate}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-500 w-32">Expiry Date:</span>
                        <span>{selectedCertificate.expiryDate}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-500 w-32">Status:</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedCertificate.status)}`}>
                          {selectedCertificate.status}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-500 w-32">Scope:</span>
                        <span>{selectedCertificate.scope}</span>
                      </div>
                    </div>
                  </div>
                  
                  <a
                    href={selectedCertificate.downloadLink}
                    className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Certificate
                  </a>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700">{selectedCertificate.description}</p>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CertificatesPage