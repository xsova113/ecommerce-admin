import { getSalesCount } from "@/actions/get-sales-count";
import { getStockCount } from "@/actions/get-stock-count";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import CardDashboard from "@/components/CardDashboard";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { formatter } from "@/lib/utils";
import { CreditCard, DollarSign, PackageIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Overview from "@/components/Overview";
import { getGraphRevenue } from "@/actions/get-graph-revenue";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage = async ({ params }: DashboardPageProps) => {
  const totalRevenue = await getTotalRevenue(params.storeId);
  const salesCount = await getSalesCount(params.storeId);
  const stockCount = await getStockCount(params.storeId);
  const graphData = await getGraphRevenue(params.storeId);

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator className="my-4" />
        <div className="grid gap-4 grid-cols-3">
          <CardDashboard
            title={"Total Revenue"}
            content={formatter.format(totalRevenue)}
            icon={<DollarSign className="max-md:h-4 max-md:w-4" />}
          />
          <CardDashboard
            title={"Sale"}
            content={"+" + salesCount}
            icon={<CreditCard className="max-md:h-4 max-md:w-4" />}
          />
          <CardDashboard
            title={"Products In Stock"}
            content={stockCount}
            icon={<PackageIcon className="max-md:h-4 max-md:w-4" />}
          />
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
