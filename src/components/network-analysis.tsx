"use client";
import { useState } from "react";
import { Bot, Hexagon, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { handleNetworkAnalysis, getDeceptionReasoning } from "@/app/actions";
import type { AnalyzeNetworkTrafficOutput } from "@/ai/flows/analyze-network-anomalies";
import type { ReasoningForDeceptionOutput } from "@/ai/flows/reasoning-for-deception";
import { Progress } from "./ui/progress";

export function NetworkAnalysis() {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [isReasoning, setIsReasoning] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeNetworkTrafficOutput | null>(null);
  const [reasoningResult, setReasoningResult] = useState<ReasoningForDeceptionOutput | null>(null);
  const [selectedAnomaly, setSelectedAnomaly] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onScan = async () => {
    setIsScanning(true);
    setAnalysisResult(null);
    try {
      const result = await handleNetworkAnalysis();
      setAnalysisResult(result);
      toast({
        title: "Scan Complete",
        description: `${result.anomalies.length} anomalies detected.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Scan Failed",
        description: "Could not analyze network traffic.",
      });
    } finally {
      setIsScanning(false);
    }
  };
  
  const onDeployDeception = async (anomaly: string) => {
    setSelectedAnomaly(anomaly);
    setIsDialogOpen(true);
    setIsReasoning(true);
    setReasoningResult(null);
    try {
      const result = await getDeceptionReasoning(anomaly);
      setReasoningResult(result);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Reasoning Failed",
        description: "AI agent could not evaluate the deception tactic.",
      });
      setIsDialogOpen(false);
    } finally {
      setIsReasoning(false);
    }
  };

  const onConfirmDeploy = () => {
    setIsDialogOpen(false);
    toast({
      title: "Honeypot Deployed!",
      description: `Deception tactic for "${selectedAnomaly}" is now active.`,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <SectionHeading
        title="Autonomous Threat Hunting"
        description="AI agent actively monitoring network traffic for behavioral anomalies."
      >
        <Button onClick={onScan} disabled={isScanning}>
          {isScanning ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Bot className="mr-2 h-4 w-4" />
          )}
          {isScanning ? "Scanning..." : "Initiate Deep Scan"}
        </Button>
      </SectionHeading>

      <Card>
        <CardHeader>
          <CardTitle>Analysis Results</CardTitle>
          <CardDescription>
            Anomalies detected by the AI agent. High-severity threats can be countered with autonomous deception.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isScanning && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <p className="ml-4 text-muted-foreground">AI agent is analyzing traffic...</p>
            </div>
          )}
          {!isScanning && !analysisResult && (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted bg-background/50 py-12 text-center">
              <p className="text-muted-foreground">No scan has been initiated yet.</p>
              <p className="text-sm text-muted-foreground">Click 'Initiate Deep Scan' to begin.</p>
            </div>
          )}
          {analysisResult && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Anomaly</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Recommendation</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analysisResult.anomalies.map((anomaly, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{anomaly}</TableCell>
                    <TableCell>
                      <Badge variant={analysisResult.severityLevels[index] === "High" ? "destructive" : "secondary"}>
                        {analysisResult.severityLevels[index]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{analysisResult.recommendations[index]}</TableCell>
                    <TableCell className="text-right">
                      {analysisResult.severityLevels[index] === "High" && (
                        <Button variant="outline" size="sm" onClick={() => onDeployDeception(anomaly)}>
                          <Hexagon className="mr-2 h-4 w-4" />
                          Deploy Honeypot
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Deception Strategy
            </DialogTitle>
            <DialogDescription>
              The AI agent has evaluated the deception tactic for: <span className="font-semibold text-foreground">"{selectedAnomaly}"</span>
            </DialogDescription>
          </DialogHeader>
          {isReasoning && (
             <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <p className="ml-4 text-muted-foreground">Agent is reasoning...</p>
            </div>
          )}
          {reasoningResult && (
             <div className="space-y-4 py-4">
                <div>
                  <h3 className="font-semibold mb-2">Likelihood of Success</h3>
                  <div className="flex items-center gap-2">
                    <Progress value={reasoningResult.likelihoodOfSuccess * 100} className="w-full" />
                    <span className="font-bold text-lg text-accent">{(reasoningResult.likelihoodOfSuccess * 100).toFixed(0)}%</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Agent's Reasoning</h3>
                  <p className="text-sm text-muted-foreground bg-background/50 p-3 rounded-md border">{reasoningResult.reasoning}</p>
                </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={onConfirmDeploy} disabled={isReasoning || !reasoningResult}>
              <Hexagon className="mr-2 h-4 w-4" />
              Confirm Deployment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
