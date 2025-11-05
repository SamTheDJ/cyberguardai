import {
  AlertTriangle,
  ShieldOff,
  Crosshair,
  GitCommit,
  Clock,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/stat-card";
import { SectionHeading } from "@/components/section-heading";

const recentEvents = [
  {
    type: "Phishing",
    description: "AI-generated email quarantined",
    severity: "High",
    time: "2m ago",
    status: "Mitigated",
  },
  {
    type: "Vulnerability",
    description: "SQL Injection patch generated",
    severity: "Critical",
    time: "15m ago",
    status: "Pending Review",
  },
  {
    type: "Anomaly",
    description: "Unusual data exfiltration pattern detected",
    severity: "High",
    time: "28m ago",
    status: "Investigating",
  },
  {
    type: "Vulnerability",
    description: "Hard-coded credentials patched in CI/CD",
    severity: "High",
    time: "1h ago",
    status: "Mitigated",
  },
  {
    type: "Phishing",
    description: "CEO deepfake voice call attempt blocked",
    severity: "Critical",
    time: "3h ago",
    status: "Mitigated",
  },
];

const getBadgeVariant = (
  severity: "Critical" | "High" | "Medium" | "Low"
) => {
  switch (severity) {
    case "Critical":
      return "destructive";
    case "High":
      return "destructive";
    case "Medium":
      return "secondary";
    default:
      return "outline";
  }
};

export function DashboardOverview() {
  return (
    <div className="flex flex-col gap-6">
      <SectionHeading
        title="Agent Status"
        description="Live metrics from the Autonomous Cyber Sentinel"
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Threats Neutralized (24h)"
          value="14"
          icon={<ShieldOff className="h-4 w-4" />}
          description="+5 from yesterday"
          variant="accent"
        />
        <StatCard
          title="Active Investigations"
          value="3"
          icon={<Crosshair className="h-4 w-4" />}
          description="AI actively analyzing threats"
        />
        <StatCard
          title="Patches Deployed"
          value="6"
          icon={<GitCommit className="h-4 w-4" />}
          description="2 pending review"
        />
        <StatCard
          title="Avg. Response Time"
          value="7.2s"
          icon={<Clock className="h-4 w-4" />}
          description="98% faster than manual response"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Threat Events</CardTitle>
          <CardDescription>
            Live feed of threats detected and actions taken by the AI agent.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentEvents.map((event, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{event.type}</TableCell>
                  <TableCell>{event.description}</TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(event.severity as any)}>
                      {event.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center">
                      <span
                        className={`mr-2 h-2 w-2 rounded-full ${
                          event.status === "Mitigated"
                            ? "bg-green-500"
                            : event.status === "Pending Review"
                            ? "bg-yellow-500"
                            : "bg-blue-500 animate-pulse"
                        }`}
                      ></span>
                      {event.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {event.time}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
