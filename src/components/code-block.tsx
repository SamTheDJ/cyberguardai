"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type CodeBlockProps = {
  code: string;
  className?: string;
};

export function CodeBlock({ code, className }: CodeBlockProps) {
  const [hasCopied, setHasCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setHasCopied(true);
    toast({
      title: "Copied to clipboard!",
      description: "The code snippet has been copied.",
    });
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "relative rounded-md border bg-background/50 p-4 font-code text-sm",
        className
      )}
    >
      <pre>
        <code>{code}</code>
      </pre>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 h-7 w-7 text-muted-foreground hover:bg-muted"
        onClick={handleCopy}
      >
        {hasCopied ? (
          <Check className="h-4 w-4 text-accent" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
        <span className="sr-only">Copy code</span>
      </Button>
    </div>
  );
}
