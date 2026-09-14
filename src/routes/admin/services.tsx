import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { servicesQuery } from "@/lib/site-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/services")({
  component: AdminServices,
});

function AdminServices() {
  const services = useQuery(servicesQuery);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-navy">Services Management</h1>
        <p className="text-muted-foreground mt-2">View and manage your service offerings.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {services.isLoading ? (
          <p className="text-sm text-muted-foreground">Loading services...</p>
        ) : services.data?.map((service) => (
          <Card key={service.id}>
            <CardHeader>
              <CardTitle>{service.name}</CardTitle>
              <CardDescription>{service.slug}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{service.description}</p>
              <div>
                <h4 className="text-sm font-semibold">Capabilities</h4>
                <ul className="mt-2 list-disc list-inside text-sm text-muted-foreground">
                  {Array.isArray(service.capabilities) 
                    ? service.capabilities.map((cap: any, i) => (
                        <li key={i}>{String(cap)}</li>
                      ))
                    : <li>No specific capabilities listed</li>}
                </ul>
              </div>
              <Button variant="outline" className="w-full" disabled>
                Edit Service (Coming Soon)
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
