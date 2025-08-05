"use client"

import { useState, useEffect, useRef } from "react"
import { Plus, Trash2, Calculator, Printer, Save, FileText, Building2 } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Badge } from "./ui/badge"
import html2pdf from "html2pdf.js"
import Mainnav from "./Main_nav.jsx"
// import Productitems from "./mockProducts_automobile.json"
import { getAutomobileData } from "./mockProducts_automobile.js"
// Mock company data
const myCompany = {
  name: "Ashirwad Enterprises",
  address: "A-1,Ganesh Dham Colony Sec-C,Sanwer Road, Indore",
  phone: "+91 9826048905 ,+91 9109621850",
  email: "ashirwad.2512@gmail.com",
  gstNumber: "23AFJPV3458B1ZH",
  panNumber: "AFJPV3458B",
  cinNumber: "",
}

// Mock customers data
const mockCustomers = [
  {
    id: 1,
    companyName: "ABC Electronics Ltd",
    contactPerson: "Rajesh Kumar",
    address: "456 Industrial Area, Sector 15, Gurgaon - 122001",
    phone: "+91 98765 12345",
    email: "rajesh@abcelectronics.com",
    gstNumber: "06ABCDE5678G1Z2",
    panNumber: "ABCDE5678G",
    stateCode: "06",
    stateName: "Haryana",
  },
  {
    id: 2,
    companyName: "XYZ Manufacturing Co",
    contactPerson: "Priya Sharma",
    address: "789 Factory Road, MIDC, Pune - 411019",
    phone: "+91 87654 32109",
    email: "priya@xyzmanufacturing.com",
    gstNumber: "27FGHIJ9012K3L4",
    panNumber: "FGHIJ9012K",
    stateCode: "27",
    stateName: "Maharashtra",
  },
  {
    id: 3,
    companyName: "Global Traders Pvt Ltd",
    contactPerson: "Amit Patel",
    address: "321 Commerce Street, Ahmedabad - 380001",
    phone: "+91 76543 21098",
    email: "amit@globaltraders.com",
    gstNumber: "24KLMNO3456P7Q8",
    panNumber: "KLMNO3456P",
    stateCode: "24",
    stateName: "Gujarat",
  },
  {
    id: 4,
    companyName: "South India Exports",
    contactPerson: "Lakshmi Nair",
    address: "654 Export House, Kochi - 682001",
    phone: "+91 65432 10987",
    email: "lakshmi@southindiaexports.com",
    gstNumber: "32QRSTU7890V1W2",
    panNumber: "QRSTU7890V",
    stateCode: "32",
    stateName: "Kerala",
  },
  {
    id: 5,
    companyName: "North Tech Solutions",
    contactPerson: "Vikram Singh",
    address: "987 IT Park, Sector 62, Noida - 201301",
    phone: "+91 54321 09876",
    email: "vikram@northtech.com",
    gstNumber: "09WXYZ1234A5B6",
    panNumber: "WXYZ1234A",
    stateCode: "09",
    stateName: "Uttar Pradesh",
  }
]

// Mock products data
// const mockProducts = 
// [
//     {
//         "id": 1,
//         "name": "Mahindra front brake",
//         "category": "Automobile",
//         "price": 328.0,
//         "stock": 40,
//         "status": "In Stock",
//         "sales": 433,
//         "revenue": 45537,
//         "image": "/placeholder.svg?height=40&width=40",
//         "partnumber": "2r62sc3",
//         "gst": 59.04,
//         "hsn": "8708"
//     },
//     {
//         "id": 2,
//         "name": "Ford top engine",
//         "category": "Automobile",
//         "price": 1005.0,
//         "stock": 45,
//         "status": "In Stock",
//         "sales": 30,
//         "revenue": 8129,
//         "image": "/placeholder.svg?height=40&width=40",
//         "partnumber": "ffhg9va",
//         "gst": 180.9,
//         "hsn": "8708"
//     },
//     {
//         "id": 3,
//         "name": "Suzuki right light",
//         "category": "Automobile",
//         "price": 4702.0,
//         "stock": 99,
//         "status": "In Stock",
//         "sales": 306,
//         "revenue": 44242,
//         "image": "/placeholder.svg?height=40&width=40",
//         "partnumber": "n7ra4rl",
//         "gst": 846.36,
//         "hsn": "8708"
//     },
//     {
//         "id": 4,
//         "name": "JCB bottom mirror",
//         "category": "Automobile",
//         "price": 2798.0,
//         "stock": 43,
//         "status": "In Stock",
//         "sales": 341,
//         "revenue": 19747,
//         "image": "/placeholder.svg?height=40&width=40",
//         "partnumber": "jnolswd",
//         "gst": 503.64,
//         "hsn": "8708"
//     },
//     {
//         "id": 5,
//         "name": "Tata front light",
//         "category": "Automobile",
//         "price": 4788.0,
//         "stock": 41,
//         "status": "In Stock",
//         "sales": 473,
//         "revenue": 17513,
//         "image": "/placeholder.svg?height=40&width=40",
//         "partnumber": "sv3m380",
//         "gst": 861.84,
//         "hsn": "8708"
//     },
//     {
//         "id": 6,
//         "name": "Hero top tire",
//         "category": "Automobile",
//         "price": 2249.0,
//         "stock": 96,
//         "status": "In Stock",
//         "sales": 465,
//         "revenue": 2115,
//         "image": "/placeholder.svg?height=40&width=40",
//         "partnumber": "fjh2qrh",
//         "gst": 404.82,
//         "hsn": "8708"
//     },
//     {
//         "id": 7,
//         "name": "Honda top mirror",
//         "category": "Automobile",
//         "price": 4287.0,
//         "stock": 66,
//         "status": "In Stock",
//         "sales": 429,
//         "revenue": 22803,
//         "image": "/placeholder.svg?height=40&width=40",
//         "partnumber": "3u23qsq",
//         "gst": 771.66,
//         "hsn": "8708"
//     },
//     {
//         "id": 8,
//         "name": "Suzuki bottom filter",
//         "category": "Automobile",
//         "price": 621.0,
//         "stock": 53,
//         "status": "In Stock",
//         "sales": 245,
//         "revenue": 45342,
//         "image": "/placeholder.svg?height=40&width=40",
//         "partnumber": "5lzzmho",
//         "gst": 111.78,
//         "hsn": "8708"
//     },
//     {
//         "id": 9,
//         "name": "Mahindra right light",
//         "category": "Automobile",
//         "price": 1847.0,
//         "stock": 67,
//         "status": "In Stock",
//         "sales": 363,
//         "revenue": 48385,
//         "image": "/placeholder.svg?height=40&width=40",
//         "partnumber": "blcmpgj",
//         "gst": 332.46,
//         "hsn": "8708"
//     },
//     {
//         "id": 10,
//         "name": "Bajaj rear tire",
//         "category": "Automobile",
//         "price": 931.0,
//         "stock": 100,
//         "status": "In Stock",
//         "sales": 47,
//         "revenue": 21066,
//         "image": "/placeholder.svg?height=40&width=40",
//         "partnumber": "czhp63q",
//         "gst": 167.58,
//         "hsn": "8708"
//     },
//   ]
// const mockProducts = getAutomobileData.map((item) => ({
//   id: item.id,
//   name: item.name,
//   category: item.category,
//   price: item.price,
//   stock: item.stock,
//   status: item.status,
//   sales: item.sales,
//   revenue: item.revenue || 0,
//   image: item.image,
//   partnumber: item.partNumber,
//   gst: item.gst || 18,
//   hsn: item.hsn || "8708", // Default HSN code if not provided
// }))
const mockProducts = [];

  async function loadData() {
    const data = await getAutomobileData();
    mockProducts = data.map((item) => ({
      id: item.id,
      name: item.name,
      category: item.category,
      price: item.price,
      stock: item.stock,
      status: item.status,
      sales: item.sales,
      revenue: item.revenue || 0,
      image: item.image,
      partnumber: item.partNumber,
      gst: item.gst || 18,
      hsn: item.hsn || "8708",
    }));
  }

  loadData();


export default function BillMakerPage() {
  const printRef = useRef();
  const [billItems, setBillItems] = useState([])
  const [selectedProduct, setSelectedProduct] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [customerInfo, setCustomerInfo] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    gstNumber: "",
    panNumber: "",
    stateCode: "",
    stateName: "",
  })
  const [discount, setDiscount] = useState(0)
  const [billNumber, setBillNumber] = useState("")

  useEffect(() => {
    const generateBillNumber = () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      
      // Get the last used serial number from localStorage or start with 1
      const lastSerialNumber = localStorage.getItem('lastSerialNumber') || 0;
      const newSerialNumber = parseInt(lastSerialNumber) + 1;
      
      // Store the new serial number for next time
      localStorage.setItem('lastSerialNumber', newSerialNumber.toString());
      
      return `INV-${day}${month}${year}-${String(newSerialNumber).padStart(3, "0")}`;
    };
    
    setBillNumber(generateBillNumber());
  }, []);

  const calculateSubtotal = () => {
    return billItems.reduce((sum, item) => sum + item.total, 0)
  }

  const calculateGSTByRate = (rate) => {
    const itemsWithRate = billItems.filter((item) => item.gstRate === rate)
    const subtotalForRate = itemsWithRate.reduce((sum, item) => sum + item.total, 0)
    return (subtotalForRate * rate) / 100
  }

  const calculateTotalGST = () => {
    return billItems.reduce((sum, item) => sum + (item.total * item.gstRate) / 100, 0)
  }

  const calculateDiscount = () => {
    return (calculateSubtotal() * discount) / 100
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTotalGST() - calculateDiscount()
  }

  const getUniqueGSTRates = () => {
    return [...new Set(billItems.map((item) => item.gstRate))].sort()
  }

  const isInterState = () => {
    return customerInfo.stateCode !== "27"
  }

  const handleCustomerSelect = (customerId) => {
    setSelectedCustomer(customerId)
    if (customerId) {
      const customer = mockCustomers.find((c) => c.id === Number.parseInt(customerId))
      if (customer) {
        setCustomerInfo({
          companyName: customer.companyName,
          contactPerson: customer.contactPerson,
          email: customer.email,
          phone: customer.phone,
          address: customer.address,
          gstNumber: customer.gstNumber,
          panNumber: customer.panNumber,
          stateCode: customer.stateCode,
          stateName: customer.stateName,
        })
      }
    } else {
      setCustomerInfo({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        address: "",
        gstNumber: "",
        panNumber: "",
        stateCode: "",
        stateName: "",
      })
    }
  }

  const addProductToBill = () => {
    if (!selectedProduct || quantity <= 0) return

    const product = mockProducts.find((p) => p.id === Number.parseInt(selectedProduct))
    if (!product) return

    const existingItemIndex = billItems.findIndex((item) => item.productId === product.id)

    if (existingItemIndex >= 0) {
      const updatedItems = [...billItems]
      updatedItems[existingItemIndex].quantity += quantity
      updatedItems[existingItemIndex].total = updatedItems[existingItemIndex].quantity * product.price
      setBillItems(updatedItems)
    } else {
      const newItem = {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        total: product.price * quantity,
        gstRate: 18, // Assuming 18% GST for all products
        hsnCode: product.hsn,
      }
      setBillItems([...billItems, newItem])
    }

    setSelectedProduct("")
    setQuantity(1)
  }

  const removeItemFromBill = (productId) => {
    setBillItems(billItems.filter((item) => item.productId !== productId))
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) return

    const updatedItems = billItems.map((item) => {
      if (item.productId === productId) {
        return {
          ...item,
          quantity: newQuantity,
          total: item.price * newQuantity,
        }
      }
      return item
    })
    setBillItems(updatedItems)
  }

  const generateInvoiceHTML = () => {
    const now = new Date();
    const dateStr = now.toLocaleDateString();
    const timeStr = now.toLocaleTimeString();
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Challan ${billNumber}</title>
          <style>
            @page {
              size: A4;
              margin: 0;
            }
            body {
              margin: 2rem;
              padding: 15px;
              font-family: Arial, sans-serif;
            }
            .invoice-header {
              display: flex;
              justify-content: space-between;
              margin-bottom: 20px;
            }
            .company-info, .customer-info {
              margin-bottom: 20px;
            }
            .invoice-title {
              text-align: center;
              margin: 20px 0;
              font-size: 24px;
              font-weight: bold;
            }
            .invoice-details {
              display: flex;
              justify-content: space-between;
              margin-bottom: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
            .totals {
              float: right;
              width: 300px;
              margin-top: 20px;
            }
            .signature {
              margin-top: 50px;
              display: flex;
              justify-content: space-between;
            }
          </style>
        </head>
        <body>
          <div class="invoice-header">
            <div class="company-info">
              <h2>${myCompany.name}</h2>
              <p>${myCompany.address}</p>
              <p>Phone: ${myCompany.phone}</p>
              <p>Email: ${myCompany.email}</p>
              <p>GST: ${myCompany.gstNumber}</p>
            </div>
            <div>
              <h3>Challan</h3>
              <p>No: ${billNumber}</p>
              <p>Date: ${dateStr}</p>
              <p>Time: ${timeStr}</p>
            </div>
          </div>
          
          <div class="customer-info">
            <h3>Bill To:</h3>
            <p>${customerInfo.companyName}</p>
            <p>${customerInfo.address}</p>
            <p>Contact: ${customerInfo.contactPerson}</p>
            <p>Phone: ${customerInfo.phone}</p>
            <p>GST: ${customerInfo.gstNumber}</p>
            <p>State: ${customerInfo.stateName} (${customerInfo.stateCode})</p>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Description</th>
                <th>HSN</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>GST%</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              ${billItems.map((item, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${item.name}</td>
                  <td>${item.hsnCode}</td>
                  <td>${item.quantity}</td>
                  <td>₹${item.price.toFixed(2)}</td>
                  <td>${item.gstRate}%</td>
                  <td>₹${item.total.toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="totals">
            <table>
              <tr>
                <td>Subtotal:</td>
                <td>₹${calculateSubtotal().toFixed(2)}</td>
              </tr>
              ${getUniqueGSTRates().map(rate => `
                <tr>
                  <td>GST ${rate}%:</td>
                  <td>₹${calculateGSTByRate(rate).toFixed(2)}</td>
                </tr>
              `).join('')}
              <tr>
                <td>Discount:</td>
                <td>₹${calculateDiscount().toFixed(2)}</td>
              </tr>
              <tr>
                <td><strong>Total:</strong></td>
                <td><strong>₹${calculateTotal().toFixed(2)}</strong></td>
              </tr>
            </table>
          </div>
          
          <div class="signature">
            <div>
              <p>Customer Signature</p>
            </div>
            <div>
              <p>For ${myCompany.name}</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const printDocument = printWindow.document;
    
    printDocument.write(generateInvoiceHTML());
    printDocument.close();
    
    setTimeout(() => {
      printWindow.print();
    }, 200);
  }

  const handleSave = () => {
    if (billItems.length === 0 || !customerInfo.companyName) {
      alert("Please add items to the bill and select a customer first");
      return;
    }

    // Generate the invoice HTML
    const invoiceHTML = generateInvoiceHTML();
    
    // Create a temporary element to hold our HTML
    const element = document.createElement('div');
    element.innerHTML = invoiceHTML;
    
    // Options for the PDF
    const opt = {
      margin: 10,
      filename: `Invoice_${billNumber}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    // Generate and save the PDF
    html2pdf().set(opt).from(element).save();
    
    // Also save to localStorage for record keeping
    const billData = {
      billNumber,
      customerInfo,
      myCompany,
      items: billItems,
      subtotal: calculateSubtotal(),
      totalGST: calculateTotalGST(),
      discount: calculateDiscount(),
      total: calculateTotal(),
      isInterState: isInterState(),
      date: new Date().toISOString(),
    }

    const savedBills = JSON.parse(localStorage.getItem("bills") || "[]")
    savedBills.push(billData)
    localStorage.setItem("bills", JSON.stringify(savedBills))

    // alert("Invoice saved and downloaded as PDF!");
  }

  const clearBill = () => {
    setBillItems([])
    setSelectedCustomer("")
    setCustomerInfo({
      companyName: "",
      contactPerson: "",
      email: "",
      phone: "",
      address: "",
      gstNumber: "",
      panNumber: "",
      stateCode: "",
      stateName: "",
    })
    setDiscount(0)
    // Generate new bill number
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")
    setBillNumber(`INV-${year}${month}${day}-${random}`)
  }

  return (
    <div className="flex h-screen bg-gray-50">

      <div className="flex-1">
        <br></br>
        <div style={{marginLeft:"1.5rem"}}>
        <Mainnav></Mainnav>
        </div>
        
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Challan</h1>
            <p className="text-gray-600">Ashirwad Enterprises</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Bill Creation */}
            <div className="lg:col-span-2 space-y-6">
              {/* Company Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Company Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                      <div className="text-sm font-semibold">{myCompany.name}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
                      <Badge variant="outline" className="font-mono">
                        {myCompany.gstNumber}
                      </Badge>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <div className="text-sm text-gray-600">{myCompany.address}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <div className="text-sm">{myCompany.phone}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <div className="text-sm">{myCompany.email}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Selection & Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Vendor Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Customer</label>
                    <Select value={selectedCustomer} onValueChange={handleCustomerSelect}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a customer" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockCustomers.map((customer) => (
                          <SelectItem key={customer.id} value={customer.id.toString()}>
                            {customer.companyName} - {customer.contactPerson}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {customerInfo.companyName && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                        <div className="text-sm font-semibold">{customerInfo.companyName}</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                        <div className="text-sm">{customerInfo.contactPerson}</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
                        <Badge variant="outline" className="font-mono">
                          {customerInfo.gstNumber}
                        </Badge>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                        <div className="text-sm">
                          {customerInfo.stateName} ({customerInfo.stateCode})
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <div className="text-sm text-gray-600">{customerInfo.address}</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <div className="text-sm">{customerInfo.phone}</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <div className="text-sm">{customerInfo.email}</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Add Products */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Add Products
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 items-end">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Select Product</label>
                      <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a product" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockProducts.map((product) => (
                            <SelectItem key={product.id} value={product.id.toString()}>
                              {product.partnumber} - {product.name} (₹{product.price.toFixed(2)})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-24">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                      <Input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
                      />
                    </div>
                    <Button onClick={addProductToBill} className="mb-0">
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Bill Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Bill Items</CardTitle>
                </CardHeader>
                <CardContent>
                  {billItems.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">No items added to bill yet</div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>HSN Code</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Qty</TableHead>
                          <TableHead>GST%</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {billItems.map((item) => (
                          <TableRow key={item.productId}>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">{item.hsnCode}</Badge>
                            </TableCell>
                            <TableCell>₹{item.price.toFixed(2)}</TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.productId, Number.parseInt(e.target.value) || 1)}
                                className="w-20"
                              />
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{item.gstRate}%</Badge>
                            </TableCell>
                            <TableCell>₹{item.total.toFixed(2)}</TableCell>
                            <TableCell>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => removeItemFromBill(item.productId)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Bill Summary */}
            <div className="space-y-6">
              {/* Bill Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Bill Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Challan Number:</span>
                      <Badge variant="outline">{billNumber}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Date:</span>
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Time:</span>
                      <span>{new Date().toLocaleTimeString()}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Amount:</span>
                      <span>₹{calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={handleSave}
                    className="w-full"
                    disabled={billItems.length === 0 || !customerInfo.companyName}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Challan (PDF)
                  </Button>
                  <Button
                    onClick={handlePrint}
                    variant="outline"
                    className="w-full bg-transparent"
                    disabled={billItems.length === 0 || !customerInfo.companyName}
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    Print Challan
                  </Button>
                  <Button onClick={clearBill} variant="destructive" className="w-full">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Challan
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}