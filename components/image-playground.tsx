"use client";

import { useState } from "react";
import { ModelSelect } from "@/components/model-select";
import { PromptInput } from "@/components/prompt-input";
import { ModelCardCarousel } from "@/components/model-card-carousel";
import {
  MODEL_CONFIGS,
  PROVIDERS,
  PROVIDER_ORDER,
  ProviderKey,
  ModelMode,
  initializeProviderRecord,
} from "@/lib/provider-config";
import { Suggestion } from "@/lib/suggestions";
import { useImageGeneration } from "@/hooks/use-image-generation";
import { Header } from "./header";

export function ImagePlayground({ suggestions }: { suggestions: Suggestion[] }) {
  const { images, timings, failedProviders, isLoading, startGeneration, activePrompt } =
    useImageGeneration();

  const [showProviders, setShowProviders] = useState(true);
  const [selectedModels, setSelectedModels] = useState<Record<ProviderKey, string>>(
    MODEL_CONFIGS.performance
  );
  // Always enable both providers since we removed the UI selection
  const [enabledProviders, setEnabledProviders] = useState<Record<ProviderKey, boolean>>({
    replicate: true,
    openai: true,
  });
  // Always use performance mode since we removed the UI selection
  const mode: ModelMode = "performance";
  const toggleView = () => {
    setShowProviders((prev) => !prev);
  };

  const handleModelChange = (providerKey: ProviderKey, model: string) => {
    setSelectedModels((prev) => ({ ...prev, [providerKey]: model }));
  };

  const handleProviderToggle = (provider: string, enabled: boolean) => {
    setEnabledProviders((prev) => ({
      ...prev,
      [provider]: enabled,
    }));
  };

  const providerToModel = {
    replicate: selectedModels.replicate,
    openai: selectedModels.openai,
  };

  const handlePromptSubmit = (newPrompt: string) => {
    const activeProviders = PROVIDER_ORDER.filter((p) => enabledProviders[p]);
    if (activeProviders.length > 0) {
      startGeneration(newPrompt, activeProviders, providerToModel);
    }
    setShowProviders(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto">
        <Header />
        <div className="relative border-t-thin">
          {/* Full-height divider */}
          <div className="hidden lg:block full-height-divider left-[20%]"></div>
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              {/* Left Sidebar - Prompt Input */}
              <div className="col-span-5 lg:col-span-1 p-4">
                <div className="space-y-4">
                  <PromptInput
                    onSubmit={handlePromptSubmit}
                    isLoading={isLoading}
                    showProviders={showProviders}
                    onToggleProviders={toggleView}
                    mode={mode}
                    suggestions={suggestions}
                  />
                </div>
              </div>

              {/* Right Content - Generated Images */}
              <div className="col-span-5 lg:col-span-4 p-4">
                {/* Active Prompt Display */}
                {activePrompt && activePrompt.length > 0 && (
                  <div className="mb-6 p-3 bg-muted rounded-md">
                    <h3 className="text-sm font-medium mb-1">Current Prompt:</h3>
                    <p className="text-sm text-muted-foreground">{activePrompt}</p>
                  </div>
                )}
                {(() => {
                  const getModelProps = () =>
                    (Object.keys(PROVIDERS) as ProviderKey[]).map((key) => {
                      const provider = PROVIDERS[key];
                      const imageItem = images.find((img) => img.provider === key);
                      const imageData = imageItem?.image;
                      const modelId = imageItem?.modelId ?? "N/A";
                      const timing = timings[key];

                      return {
                        label: provider.displayName,
                        models: provider.models,
                        value: selectedModels[key],
                        providerKey: key,
                        onChange: (model: string, providerKey: ProviderKey) =>
                          handleModelChange(providerKey, model),
                        iconPath: provider.iconPath,
                        color: provider.color,
                        enabled: enabledProviders[key],
                        onToggle: (enabled: boolean) => handleProviderToggle(key, enabled),
                        image: imageData,
                        modelId,
                        timing,
                        failed: failedProviders.includes(key),
                      };
                    });

                  return (
                    <>
                      <div className="md:hidden">
                        <ModelCardCarousel models={getModelProps()} />
                      </div>
                      <div className="hidden md:grid md:grid-cols-4 gap-4">
                        {getModelProps().map((props) => (
                          <ModelSelect key={props.label} {...props} />
                        ))}
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
