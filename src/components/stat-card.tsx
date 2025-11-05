import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  description?: string;
  variant?: "default" | "accent";
};

export function StatCard({
  title,
  value,
  icon,
  description,
  variant = "default",
}: StatCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg",
        variant === "accent" && "border-primary/50"
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
      {variant === "accent" && (
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary via-accent to-primary animate-pulse-glow opacity-50"></div>
      )}
    </Card>
  );
}
