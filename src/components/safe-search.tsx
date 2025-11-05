"use client";

import { useState } from "react";
import { Loader2, Search, ShieldCheck, ShieldOff, Sparkles } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { handleSafeSearch } from "@/app/actions";
import type { SafeSearchOutput } from "@/ai/flows/safe-search";

export function SafeSearch() {
  const { toast } = useToast();
  const [inputValue, setInputValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<SafeSearchOutput | null>(null);

  const onSearch = async () => {
    if (!inputValue.trim()) {
        toast({
            variant: "destructive",
            title: "Input required",
            description: "Please enter text or a link to analyze.",
        });
        return;
    }
    setIsSearching(true);
    setSearchResult(null);
    try {
      const result = await handleSafeSearch(inputValue);
      setSearchResult(result);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Search Failed",
        description: "Could not perform the safety analysis.",
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <SectionHeading
        title="Safe Search"
        description="Analyze any text or link to determine if it's safe from threats like phishing or malware."
      />
      <Card>
        <CardHeader>
            <CardTitle>Analyze Content</CardTitle>
            <CardDescription>Enter text or a URL below and the AI agent will assess its safety.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex gap-2">
                <Input 
                    placeholder="Enter text or a link, e.g., http://example.com"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={isSearching}
                />
                <Button onClick={onSearch} disabled={isSearching}>
                    {isSearching ? <Loader2 className="mr-2 animate-spin" /> : <Search className="mr-2" />}
                    {isSearching ? "Analyzing..." : "Analyze"}
                </Button>
            </div>
            {isSearching && (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    <p className="ml-4 text-muted-foreground">AI agent is analyzing content...</p>
                </div>
            )}
            {searchResult && (
                <div className={`space-y-4 rounded-lg border p-4 ${searchResult.isSafe ? 'border-green-500/30 bg-green-500/10' : 'border-destructive/30 bg-destructive/10'}`}>
                    <div className="flex items-center gap-4">
                        {searchResult.isSafe ? <ShieldCheck className={`h-8 w-8 text-green-500`} /> : <ShieldOff className={`h-8 w-8 text-destructive`} />}
                        <div>
                            <h4 className={`font-bold text-lg ${searchResult.isSafe ? 'text-green-400' : 'text-destructive'}`}>{searchResult.isSafe ? "Content is Safe" : "Potential Threat Detected"}</h4>
                            <p className="text-sm text-muted-foreground">The AI agent has completed its analysis.</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2 flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" />Agent's Reasoning</h3>
                        <p className="text-sm text-muted-foreground bg-background/50 p-3 rounded-md border">{searchResult.reasoning}</p>
                    </div>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
