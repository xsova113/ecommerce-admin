import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardDashboardProps {
  title: string;
  content: string | number;
  icon: any;
}

const CardDashboard = ({ title, content, icon }: CardDashboardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm md:text-lg lg:text:xl font-medium">
          {title}
        </CardTitle>
        <CardDescription>{icon}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="lg:text-2xl md:text-xl text-base font-bold ">{content}</div>
      </CardContent>
    </Card>
  );
};

export default CardDashboard;
