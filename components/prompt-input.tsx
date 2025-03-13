import { useState } from "react";
import { ArrowUpRight, Sparkles, RefreshCw } from "lucide-react";
import { getRandomSuggestions, Suggestion } from "@/lib/suggestions";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type QualityMode = "performance" | "quality";

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isLoading?: boolean;
  showProviders: boolean;
  onToggleProviders: () => void;
  mode: QualityMode;
  suggestions: Suggestion[];
}

export function PromptInput({
  suggestions: initSuggestions,
  isLoading,
  onSubmit,
}: PromptInputProps) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>(initSuggestions);

  const updateSuggestions = () => {
    setSuggestions(getRandomSuggestions());
  };
  const handleSuggestionSelect = (prompt: string) => {
    setInput(prompt);
    onSubmit(prompt);
  };

  const handleSubmit = () => {
    if (!isLoading && input.trim()) {
      onSubmit(input);
    }
  };

  // const handleRefreshSuggestions = () => {
  //   setCurrentSuggestions(getRandomSuggestions());
  // };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && input.trim()) {
        onSubmit(input);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="bg-muted rounded-lg p-4">
        <div className="flex flex-col gap-3">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter your prompt here..."
            rows={6}
            className="text-base bg-background border resize-none placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring"
          />
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              onClick={updateSuggestions}
              className="flex items-center justify-between px-2 rounded-lg py-1 bg-background text-sm hover:bg-accent group transition-colors duration-200"
            >
              <RefreshCw className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
            </button>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionSelect(suggestion.prompt)}
                className="flex items-center justify-between px-2 rounded-lg py-1 bg-background text-sm hover:bg-accent group transition-colors duration-200"
              >
                <span className="text-foreground text-xs">
                  {suggestion.text.toLowerCase()}
                </span>
                <ArrowUpRight className="ml-1 h-3 w-3 text-muted-foreground group-hover:text-foreground" />
              </button>
            ))}
          </div>
          
          <div className="flex justify-end mt-3">
            <button
              onClick={handleSubmit}
              disabled={isLoading || !input.trim()}
              className="px-4 py-2 rounded-md bg-primary flex items-center justify-center gap-2 disabled:opacity-50 hover:bg-primary/90 transition-colors"
            >
              <span className="text-primary-foreground font-medium">Generate</span>
              {isLoading ? (
                <Spinner className="w-4 h-4 text-primary-foreground" />
              ) : (
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
