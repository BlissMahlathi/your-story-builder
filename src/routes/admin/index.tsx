import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Images, Newspaper, Settings, Inbox } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-navy">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to the Shammah Innovation Holdings admin portal.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link to="/admin/gallery" className="transition-transform hover:scale-[1.02]">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gallery</CardTitle>
              <Images className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Manage</div>
              <p className="text-xs text-muted-foreground">Upload and organize project photos.</p>
            </CardContent>
          </Card>
        </Link>
        <Link to="/admin/enquiries" className="transition-transform hover:scale-[1.02]">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Enquiries</CardTitle>
              <Inbox className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Review</div>
              <p className="text-xs text-muted-foreground">
                Respond to quote and contact requests.
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link to="/admin/news" className="transition-transform hover:scale-[1.02]">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">News</CardTitle>
              <Newspaper className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Manage</div>
              <p className="text-xs text-muted-foreground">Create and publish news articles.</p>
            </CardContent>
          </Card>
        </Link>
        <Link to="/admin/services" className="transition-transform hover:scale-[1.02]">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Services</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Manage</div>
              <p className="text-xs text-muted-foreground">
                Update service capabilities and details.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
