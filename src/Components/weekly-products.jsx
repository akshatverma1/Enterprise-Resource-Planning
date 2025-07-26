import { Button } from "./ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { FileDown, FileUp, Edit, Trash2 } from "lucide-react"

export function WeeklyProducts() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Weekly Top Products</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <FileDown className="mr-2 h-4 w-4" />
            Export to Excel
          </Button>
          <Button variant="outline" size="sm">
            <FileUp className="mr-2 h-4 w-4" />
            Export to PDF
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Images</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">
              <div className="flex -space-x-2">
                <div className="h-10 w-10 rounded-full border-2 border-background bg-[url('/placeholder.svg?height=40&width=40')] bg-cover"></div>
                <div className="h-10 w-10 rounded-full border-2 border-background bg-[url('/placeholder.svg?height=40&width=40')] bg-cover"></div>
              </div>
            </TableCell>
            <TableCell>
              <div>
                <div className="font-medium">Nike Tanjun</div>
                <div className="text-xs text-muted-foreground">Sport & Outdoor</div>
              </div>
            </TableCell>
            <TableCell>220</TableCell>
            <TableCell>
              <div className="flex items-center">
                <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                Active
              </div>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 bg-transparent">
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">
              <div className="flex -space-x-2">
                <div className="h-10 w-10 rounded-full border-2 border-background bg-[url('/placeholder.svg?height=40&width=40')] bg-cover"></div>
                <div className="h-10 w-10 rounded-full border-2 border-background bg-[url('/placeholder.svg?height=40&width=40')] bg-cover"></div>
              </div>
            </TableCell>
            <TableCell>
              <div>
                <div className="font-medium">Samsung Galaxy S20 Ultra</div>
                <div className="text-xs text-muted-foreground">Smartphone & Tablet</div>
              </div>
            </TableCell>
            <TableCell>50</TableCell>
            <TableCell>
              <div className="flex items-center">
                <div className="mr-2 h-2 w-2 rounded-full bg-red-500"></div>
                Inactive
              </div>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 bg-transparent">
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">
              <div className="flex -space-x-2">
                <div className="h-10 w-10 rounded-full border-2 border-background bg-[url('/placeholder.svg?height=40&width=40')] bg-cover"></div>
                <div className="h-10 w-10 rounded-full border-2 border-background bg-[url('/placeholder.svg?height=40&width=40')] bg-cover"></div>
              </div>
            </TableCell>
            <TableCell>
              <div>
                <div className="font-medium">Apple MacBook Pro 13</div>
                <div className="text-xs text-muted-foreground">PC & Laptop</div>
              </div>
            </TableCell>
            <TableCell>92</TableCell>
            <TableCell>
              <div className="flex items-center">
                <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                Active
              </div>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 bg-transparent">
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
