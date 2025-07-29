"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, Calculator, Printer, Save, FileText, Building2 } from "lucide-react"
import Sidebar from "./sidebar"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Badge } from "./ui/badge"

// Mock company data (your company)
const myCompany = {
  name: "TechCorp Solutions Pvt Ltd",
  address: "123 Business Park, Tech City, Mumbai - 400001",
  phone: "+91 98765 43210",
  email: "info@techcorp.com",
  gstNumber: "27ABCDE1234F1Z5",
  panNumber: "ABCDE1234F",
  cinNumber: "U72900MH2020PTC123456",
}

// Mock customers data with GST details
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
  },
]

// Mock products data with GST rates
const mockProducts = [
  { id: 1, name: "Laptop Pro", price: 1299.99, stock: 15, category: "Electronics", gstRate: 18, hsnCode: "8471" },
  { id: 2, name: "Wireless Mouse", price: 29.99, stock: 50, category: "Electronics", gstRate: 18, hsnCode: "8471" },
  { id: 3, name: "Office Chair", price: 199.99, stock: 8, category: "Furniture", gstRate: 12, hsnCode: "9401" },
  { id: 4, name: "Desk Lamp", price: 49.99, stock: 25, category: "Furniture", gstRate: 12, hsnCode: "9405" },
  { id: 5, name: "Notebook Set", price: 15.99, stock: 100, category: "Stationery", gstRate: 12, hsnCode: "4820" },
  { id: 6, name: "Pen Pack", price: 9.99, stock: 200, category: "Stationery", gstRate: 12, hsnCode: "9608" },
  { id: 7, name: 'Monitor 24"', price: 299.99, stock: 12, category: "Electronics", gstRate: 18, hsnCode: "8528" },
  { id: 8, name: "Keyboard", price: 79.99, stock: 30, category: "Electronics", gstRate: 18, hsnCode: "8471" },
]

export default function BillMakerPage() {
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
    // Generate bill number
    const generateBillNumber = () => {
      const date = new Date()
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, "0")
      const day = String(date.getDate()).padStart(2, "0")
      const random = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")
      return `INV-${year}${month}${day}-${random}`
    }
    setBillNumber(generateBillNumber())
  }, [])

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
        gstRate: product.gstRate,
        hsnCode: product.hsnCode,
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
    return customerInfo.stateCode !== "27" // Assuming company is in Maharashtra (27)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleSave = () => {
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

    // Save to localStorage for demo purposes
    const savedBills = JSON.parse(localStorage.getItem("bills") || "[]")
    savedBills.push(billData)
    localStorage.setItem("bills", JSON.stringify(savedBills))

    alert("Bill saved successfully!")
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
      <Sidebar />

      <div className="flex-1 lg:ml-64">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">GST Bill Maker</h1>
            <p className="text-gray-600">Create GST compliant invoices with automatic tax calculations</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Bill Creation */}
            <div className="lg:col-span-2 space-y-6">
              {/* Company Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Your Company Details
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
                    Customer Information
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
                              {product.name} - ₹{product.price} (GST: {product.gstRate}%)
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
                        onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
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
                      <span>Invoice Number:</span>
                      <Badge variant="outline">{billNumber}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Date:</span>
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Transaction Type:</span>
                      <Badge variant={isInterState() ? "destructive" : "default"}>
                        {isInterState() ? "Inter-State" : "Intra-State"}
                      </Badge>
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>₹{calculateSubtotal().toFixed(2)}</span>
                    </div>

                    {/* GST Breakdown */}
                    {getUniqueGSTRates().map((rate) => (
                      <div key={rate} className="flex justify-between text-sm">
                        <span>{isInterState() ? `IGST ${rate}%:` : `CGST+SGST ${rate}%:`}</span>
                        <span>₹{calculateGSTByRate(rate).toFixed(2)}</span>
                      </div>
                    ))}

                    <div className="flex justify-between font-medium">
                      <span>Total GST:</span>
                      <span>₹{calculateTotalGST().toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Discount ({discount}%):</span>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={discount}
                          onChange={(e) => setDiscount(Number.parseFloat(e.target.value) || 0)}
                          className="w-16 h-8 text-xs"
                        />
                        <span>-₹{calculateDiscount().toFixed(2)}</span>
                      </div>
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

              {/* GST Summary */}
              {billItems.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>GST Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {getUniqueGSTRates().map((rate) => {
                      const itemsWithRate = billItems.filter((item) => item.gstRate === rate)
                      const taxableValue = itemsWithRate.reduce((sum, item) => sum + item.total, 0)
                      const gstAmount = calculateGSTByRate(rate)

                      return (
                        <div key={rate} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex justify-between text-sm font-medium">
                            <span>GST Rate: {rate}%</span>
                            <span>{itemsWithRate.length} items</span>
                          </div>
                          <div className="flex justify-between text-xs text-gray-600">
                            <span>Taxable Value:</span>
                            <span>₹{taxableValue.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-xs text-gray-600">
                            <span>{isInterState() ? "IGST:" : "CGST+SGST:"}</span>
                            <span>₹{gstAmount.toFixed(2)}</span>
                          </div>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              )}

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
                    Save Invoice
                  </Button>
                  <Button
                    onClick={handlePrint}
                    variant="outline"
                    className="w-full bg-transparent"
                    disabled={billItems.length === 0 || !customerInfo.companyName}
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    Print Invoice
                  </Button>
                  <Button onClick={clearBill} variant="destructive" className="w-full">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Bill
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Items Count:</span>
                    <Badge>{billItems.length}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Quantity:</span>
                    <Badge>{billItems.reduce((sum, item) => sum + item.quantity, 0)}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>GST Amount:</span>
                    <Badge variant="secondary">₹{calculateTotalGST().toFixed(2)}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Transaction:</span>
                    <Badge variant={isInterState() ? "destructive" : "default"}>
                      {isInterState() ? "Inter-State" : "Intra-State"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
