"use client"

import { useEffect, useState } from "react"
import API from "@/backend/api.jsx"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Plus, Pencil, Trash2, Search, Database } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type MasterType = "bloodgroup" | "college" | "department" | "year"

interface MasterItem {
  id: number
  name: string
  is_active: string
}

export function MastersManagement() {
  const [selectedMaster, setSelectedMaster] = useState<MasterType>("bloodgroup")
  const [data, setData] = useState<MasterItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const [currentItem, setCurrentItem] = useState<MasterItem | null>(null)
  const [formData, setFormData] = useState({ name: "", isActive: true })

  const masterLabels = {
    bloodgroup: "Blood Groups",
    college: "Colleges",
    department: "Departments",
    year: "Years",
  }

  const fetchMasters = async () => {
    try {
      setLoading(true)
      const res = await API.masterslist(selectedMaster)
      setData(res.data.data)
    } catch {
      toast.error("Failed to load data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMasters()
  }, [selectedMaster])

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAdd = async () => {
    try {
      await API.masteradd({
        table_name: selectedMaster,
        name: formData.name,
      })

      toast.success("Added successfully")
      setIsAddDialogOpen(false)
      setFormData({ name: "", isActive: true })
      fetchMasters()
    } catch {
      toast.error("Failed to add")
    }
  }

  const handleEdit = async () => {
    if (!currentItem) return

    try {
      await API.masteredit({
        table_name: selectedMaster,
        id: currentItem.id,
        name: formData.name,
      })

      toast.success("Updated successfully")
      setIsEditDialogOpen(false)
      setCurrentItem(null)
      fetchMasters()
    } catch {
      toast.error("Failed to update")
    }
  }

  /* ==========================
     DELETE
  ========================== */
  const handleDelete = async () => {
    if (!currentItem) return

    try {
      await API.masterdelete({
        table_name: selectedMaster,
        id: currentItem.id,
      })

      toast.success("Deleted successfully")
      setIsDeleteDialogOpen(false)
      setCurrentItem(null)
      fetchMasters()
    } catch {
      toast.error("Failed to delete")
    }
  }

  const openEditDialog = (item: MasterItem) => {
    setCurrentItem(item)
    setFormData({ name: item.name, isActive: item.is_active === "Y" })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (item: MasterItem) => {
    setCurrentItem(item)
    setIsDeleteDialogOpen(true)
  }

  /* ==========================
     UI (UNCHANGED)
  ========================== */
  return (
    <Card className="border-border/60 shadow-xl">
      <CardHeader className="space-y-1 border-b border-border/60 bg-gradient-to-br from-primary/5 to-transparent">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Database className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">Masters Management</CardTitle>
            <CardDescription>
              Manage blood groups, colleges, departments, and years
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Selector */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <Label className="mb-2 block text-sm font-medium">
              Select Master Type
            </Label>
            <Select
              value={selectedMaster}
              onValueChange={(v) => setSelectedMaster(v as MasterType)}
            >
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bloodgroup">Blood Groups</SelectItem>
                <SelectItem value="college">Colleges</SelectItem>
                <SelectItem value="department">Departments</SelectItem>
                <SelectItem value="year">Years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Add Dialog */}
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add New
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Add New {masterLabels[selectedMaster].slice(0, -1)}
                </DialogTitle>
                <DialogDescription>
                  Create a new entry
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <Label>Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAdd}>Add</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Table */}
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10">
                    No data found
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((item, i) => (
                  <TableRow key={item.id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      {item.is_active === "Y" ? "Active" : "Inactive"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => openEditDialog(item)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDeleteDialog(item)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}> <DialogContent> <DialogHeader> <DialogTitle>Edit {masterLabels[selectedMaster].slice(0, -1)}</DialogTitle> <DialogDescription>Update the details below</DialogDescription> </DialogHeader> <div className="space-y-4 py-4"> <div className="space-y-2"> <Label htmlFor="edit-name">Name</Label> <Input id="edit-name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Enter name" /> </div> <div className="flex items-center space-x-2"> <input type="checkbox" id="edit-isActive" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-primary" /> <Label htmlFor="edit-isActive" className="cursor-pointer"> Active </Label> </div> </div> <DialogFooter> <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}> Cancel </Button> <Button onClick={handleEdit}>Save Changes</Button> </DialogFooter> </DialogContent> </Dialog> {/* Delete Confirmation Dialog */} <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}> <AlertDialogContent> <AlertDialogHeader> <AlertDialogTitle>Are you sure?</AlertDialogTitle> <AlertDialogDescription> This will permanently delete "{currentItem?.name}". This action cannot be undone. </AlertDialogDescription> </AlertDialogHeader> <AlertDialogFooter> <AlertDialogCancel>Cancel</AlertDialogCancel> <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90"> Delete </AlertDialogAction> </AlertDialogFooter> </AlertDialogContent> </AlertDialog>
      </CardContent>
    </Card>
  )
}
