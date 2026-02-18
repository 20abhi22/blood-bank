"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search, Filter, X } from "lucide-react"
import { useEffect, useState } from "react"
import API from '../../backend/api.jsx'

const bloodGroups = ["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
const availabilityOptions = ["All", "Available", "Unavailable"]

// interface DonorFiltersProps {
//   searchQuery: string
//   setSearchQuery: (query: string) => void
//   bloodGroupFilter: string
//   setBloodGroupFilter: (filter: string) => void
//   availabilityFilter: string
//   setAvailabilityFilter: (filter: string) => void
//   onClearFilters: () => void
// }

interface DonorFiltersProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  bloodGroupFilter: string
  setBloodGroupFilter: (filter: string) => void
  availabilityFilter: string
  setAvailabilityFilter: (filter: string) => void
  onClearFilters: () => void
}

export function DonorFilters({
  searchQuery,
  setSearchQuery,
  bloodGroupFilter,
  setBloodGroupFilter,
  availabilityFilter,
  setAvailabilityFilter,
  onClearFilters,
}: DonorFiltersProps) {

  const hasActiveFilters = searchQuery || bloodGroupFilter !== "All" || availabilityFilter !== "All"






  return (
    <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search donors by name..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Filters:</span>
          </div>

          <Select value={bloodGroupFilter} onValueChange={setBloodGroupFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Blood Group" />
            </SelectTrigger>
            <SelectContent>
              {bloodGroups.map((group) => (
                <SelectItem key={group} value={group}>
                  {group === "All" ? "All Groups" : group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              {availabilityOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button variant="ghost" size="sm" className="gap-1" onClick={onClearFilters}>
              <X className="h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
      </div>
      
    </div>
  )
}
