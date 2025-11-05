import {
  BrainCircuit,
  ShieldCheck,
  Network,
  MailWarning,
  Code2,
  SearchCheck,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardOverview } from "@/components/dashboard-overview";
import { NetworkAnalysis } from "@/components/network-analysis";
import { PhishingGuard } from "@/components/phishing-guard";
import { VulnerabilityPatching } from "@/components/vulnerability-patching";
import { SafeSearch } from "@/components/safe-search";
import { Logo } from "@/components/icons";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur-sm sm:px-6">
        <a href="#" className="flex items-center gap-2 font-semibold">
          <Logo className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold tracking-tight">CyberGuard AI</h1>
        </a>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 sm:px-8 sm:py-6">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto">
            <TabsTrigger value="dashboard">
              <ShieldCheck className="mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="network">
              <Network className="mr-2" />
              Network Threats
            </TabsTrigger>
            <TabsTrigger value="phishing">
              <MailWarning className="mr-2" />
              Phishing Guard
            </TabsTrigger>
            <TabsTrigger value="vulnerabilities">
              <Code2 className="mr-2" />
              Code Integrity
            </TabsTrigger>
            <TabsTrigger value="safe-search">
              <SearchCheck className="mr-2" />
              Safe Search
            </TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard" className="mt-4">
            <DashboardOverview />
          </TabsContent>
          <TabsContent value="network" className="mt-4">
            <NetworkAnalysis />
          </TabsContent>
          <TabsContent value="phishing" className="mt-4">
            <PhishingGuard />
          </TabsContent>
          <TabsContent value="vulnerabilities" className="mt-4">
            <VulnerabilityPatching />
          </TabsContent>
          <TabsContent value="safe-search" className="mt-4">
            <SafeSearch />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
