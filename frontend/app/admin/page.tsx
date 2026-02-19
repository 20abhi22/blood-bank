import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { StatsCards } from "@/components/admin/stats-cards"
import { DonorsTable } from "@/components/admin/donors-table"
import { RequestsTable } from "@/components/admin/requests-table"
import { MastersManagement } from "@/components/admin/master-management"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, FileText, Settings, Database } from "lucide-react"

export default function AdminPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Admin Dashboard</h1>
            <p className="mt-1 text-muted-foreground">Manage donors, requests, and platform settings.</p>
          </div>

          <StatsCards />

          <div className="mt-8">
            <Tabs defaultValue="donors">
              <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
                <TabsTrigger value="donors" className="gap-2">
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Donors</span>
                </TabsTrigger>
                <TabsTrigger value="requests" className="gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Requests</span>
                </TabsTrigger>
                <TabsTrigger value="masters" className="gap-2">
                  <Database className="h-4 w-4" />
                  <span className="hidden sm:inline">Masters</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="gap-2">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="donors" className="mt-6">
                <DonorsTable />
              </TabsContent>

              <TabsContent value="requests" className="mt-6">
                <RequestsTable />
              </TabsContent>

              <TabsContent value="masters" className="mt-6">
                <MastersManagement />
              </TabsContent>

              <TabsContent value="settings" className="mt-6">
                <div className="rounded-xl border border-border/60 bg-card p-8 text-center">
                  <Settings className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold text-foreground">Platform Settings</h3>
                  <p className="mt-2 text-muted-foreground">
                    Configure notification preferences, eligibility criteria, and other platform settings.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}