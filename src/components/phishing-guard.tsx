"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Mail,
  ShieldAlert,
  Loader2,
  Sparkles,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/section-heading";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { communications, type Communication } from "@/lib/data";
import { summarizePhishingEmail } from "@/app/actions";
import type { SummarizePhishingReportOutput } from "@/ai/flows/summarize-phishing-report";

export function PhishingGuard() {
  const [comms, setComms] = useState<Communication[]>(communications);
  const [selectedComm, setSelectedComm] = useState<Communication | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<SummarizePhishingReportOutput | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!selectedComm) return;
    setIsAnalyzing(true);
    setAnalysisResult(null);
    try {
      const result = await summarizePhishingEmail(selectedComm.content);
      setAnalysisResult(result);
      setComms(comms.map(c => c.id === selectedComm.id ? {...c, status: "Analyzed"} : c));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Could not process the communication.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleQuarantine = () => {
    if (!selectedComm) return;
    setComms(comms.map(c => c.id === selectedComm.id ? {...c, status: "Quarantined"} : c));
    setSelectedComm(null);
    toast({
      title: "Threat Quarantined",
      description: "The suspicious communication has been isolated.",
    });
  };

  const threatLevelBadge = (level: Communication["threatLevel"]) => {
    switch (level) {
      case "High":
        return "destructive";
      case "Medium":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <SectionHeading
        title="Generative Phishing & Deepfake Defense"
        description="Incoming communications are scanned for AI-generated scam markers."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {comms.map((comm) => (
          <Card
            key={comm.id}
            className="flex flex-col cursor-pointer transition-all hover:border-primary/50"
            onClick={() => {
              setSelectedComm(comm);
              setAnalysisResult(null);
            }}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">{comm.subject}</CardTitle>
                  <CardDescription>From: {comm.sender}</CardDescription>
                </div>
                {comm.threatLevel !== "None" && (
                  <Badge variant={threatLevelBadge(comm.threatLevel)}>
                    <AlertTriangle className="mr-1 h-3 w-3" />
                    {comm.threatLevel}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">{comm.snippet}</p>
            </CardContent>
            <CardFooter>
              <Badge variant={comm.status === "Quarantined" ? "destructive" : "outline"}>
                {comm.status}
              </Badge>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedComm && (
        <Dialog open={!!selectedComm} onOpenChange={() => setSelectedComm(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedComm.subject}</DialogTitle>
              <DialogDescription>
                From: {selectedComm.sender}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="max-h-[200px] overflow-y-auto rounded-md border bg-background/50 p-4 text-sm">
                <p className="whitespace-pre-wrap">{selectedComm.content}</p>
              </div>

              {analysisResult && (
                <div className="space-y-2 rounded-md border border-primary/50 bg-primary/10 p-4">
                  <h3 className="flex items-center gap-2 font-semibold text-foreground">
                    <Sparkles className="h-4 w-4 text-primary" />
                    AI Summary Report
                  </h3>
                  <p className="text-sm text-primary-foreground/80">
                    {analysisResult.summary}
                  </p>
                </div>
              )}

              {isAnalyzing && (
                <div className="flex items-center justify-center p-6">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  <span>AI Agent is analyzing...</span>
                </div>
              )}
            </div>
            <DialogFooter>
              {selectedComm.status !== "Quarantined" && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedComm(null)}
                  >
                    Close
                  </Button>
                  {analysisResult ? (
                    <Button onClick={handleQuarantine} variant="destructive">
                      <ShieldAlert className="mr-2 h-4 w-4" />
                      Quarantine
                    </Button>
                  ) : (
                    <Button onClick={handleAnalyze} disabled={isAnalyzing}>
                      <Mail className="mr-2 h-4 w-4" />
                      Analyze with AI
                    </Button>
                  )}
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
