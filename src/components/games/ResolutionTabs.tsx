"use client";

import { useEffect, useMemo, useState } from "react";
import { TierCard } from "@/components/games/TierCard";
import { adjustTierConfig } from "@/lib/game-pages/hardware-templates";
import {
  defaultUpscalingQuality,
  getUpscalingQualityOptions,
  getUpscalingSelectionLabel,
  getUpscalingTechOptions,
} from "@/lib/game-pages/upscaling";
import type {
  FpsTarget,
  PerformanceTier,
  QualityPreset,
  UpscalingQualityMode,
  UpscalingTech,
} from "@/lib/game-pages/types";
import { FPS_TARGETS, QUALITY_PRESETS } from "@/lib/game-pages/types";

type ResolutionTabsProps = {
  tiers: PerformanceTier[];
  supportsRayTracing?: boolean;
  upscalingSupport: string[];
};

const tabButtonClass = (isActive: boolean) =>
  `rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
    isActive
      ? "border-brand-500 bg-brand-600/20 text-white"
      : "border-surface-800 bg-surface-900 text-surface-200 hover:border-brand-500/40 hover:text-white"
  }`;

const PRESET_LABELS: Record<QualityPreset, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  ultra: "Ultra",
};

export default function ResolutionTabs({
  tiers,
  supportsRayTracing = true,
  upscalingSupport,
}: ResolutionTabsProps) {
  const [activeId, setActiveId] = useState(tiers[0]?.id ?? "");
  const [rayTracing, setRayTracing] = useState(false);
  const [qualityPreset, setQualityPreset] = useState<QualityPreset>("high");
  const [targetFps, setTargetFps] = useState<FpsTarget>(60);
  const [upscalingTech, setUpscalingTech] = useState<UpscalingTech>("native");
  const [upscalingQuality, setUpscalingQuality] = useState<UpscalingQualityMode>("quality");

  const upscalingTechOptions = useMemo(
    () => getUpscalingTechOptions(upscalingSupport),
    [upscalingSupport],
  );

  const upscalingQualityOptions = useMemo(
    () => getUpscalingQualityOptions(upscalingTech, upscalingSupport),
    [upscalingTech, upscalingSupport],
  );

  useEffect(() => {
    if (upscalingTech === "native") {
      return;
    }
    const valid = upscalingQualityOptions.some((o) => o.id === upscalingQuality);
    if (!valid) {
      setUpscalingQuality(defaultUpscalingQuality(upscalingTech));
    }
  }, [upscalingTech, upscalingQuality, upscalingQualityOptions]);

  const activeTier = tiers.find((tier) => tier.id === activeId) ?? tiers[0];

  const activeUpscalingLabel = useMemo(
    () => getUpscalingSelectionLabel(upscalingTech, upscalingQuality, upscalingSupport),
    [upscalingTech, upscalingQuality, upscalingSupport],
  );

  const activeConfig = useMemo(() => {
    if (!activeTier) return null;
    const base =
      supportsRayTracing && rayTracing ? activeTier.rtOn : activeTier.rtOff;
    return adjustTierConfig(base, {
      qualityPreset,
      upscalingTech,
      upscalingQuality,
      targetFps,
      rayTracing: supportsRayTracing && rayTracing,
      resolution: activeTier.resolution,
      upscalingSupport,
    });
  }, [
    activeTier,
    supportsRayTracing,
    rayTracing,
    qualityPreset,
    targetFps,
    upscalingTech,
    upscalingQuality,
    upscalingSupport,
  ]);

  if (!activeTier || !activeConfig) return null;

  const showUpscalingTechRow = upscalingTechOptions.length > 1;

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div role="tablist" aria-label="Select resolution" className="flex flex-wrap gap-2">
            {tiers.map((tier) => {
              const isActive = tier.id === activeTier.id;
              return (
                <button
                  key={tier.id}
                  type="button"
                  role="tab"
                  id={`tab-${tier.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${tier.id}`}
                  onClick={() => setActiveId(tier.id)}
                  className={tabButtonClass(isActive)}
                >
                  {tier.resolution}
                </button>
              );
            })}
          </div>

          {supportsRayTracing ? (
            <div
              role="group"
              aria-label="Ray tracing"
              className="inline-flex rounded-full border border-surface-800 bg-surface-900 p-1"
            >
              <button
                type="button"
                aria-pressed={!rayTracing}
                onClick={() => setRayTracing(false)}
                className={tabButtonClass(!rayTracing)}
              >
                RT off
              </button>
              <button
                type="button"
                aria-pressed={rayTracing}
                onClick={() => setRayTracing(true)}
                className={tabButtonClass(rayTracing)}
              >
                RT on
              </button>
            </div>
          ) : (
            <p className="text-sm text-surface-200/50">Ray tracing not supported</p>
          )}
        </div>

        <div role="group" aria-label="Target frame rate" className="flex flex-wrap gap-2">
          {FPS_TARGETS.map((fps) => {
            const isActive = fps === targetFps;
            return (
              <button
                key={fps}
                type="button"
                aria-pressed={isActive}
                onClick={() => setTargetFps(fps)}
                className={tabButtonClass(isActive)}
              >
                {fps} FPS
              </button>
            );
          })}
        </div>

        <div role="group" aria-label="Graphics quality preset" className="flex flex-wrap gap-2">
          {QUALITY_PRESETS.map((preset) => {
            const isActive = preset === qualityPreset;
            return (
              <button
                key={preset}
                type="button"
                aria-pressed={isActive}
                onClick={() => setQualityPreset(preset)}
                className={tabButtonClass(isActive)}
              >
                {PRESET_LABELS[preset]}
              </button>
            );
          })}
        </div>

        {showUpscalingTechRow && (
          <div role="group" aria-label="Upscaling technology" className="flex flex-wrap gap-2">
            {upscalingTechOptions.map((option) => {
              const isActive = option.id === upscalingTech;
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => {
                    setUpscalingTech(option.id);
                    if (option.id !== "native") {
                      setUpscalingQuality(defaultUpscalingQuality(option.id));
                    }
                  }}
                  className={tabButtonClass(isActive)}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        )}

        {upscalingTech !== "native" && upscalingQualityOptions.length > 0 && (
          <div role="group" aria-label="Upscaling quality mode" className="flex flex-wrap gap-2">
            {upscalingQualityOptions.map((option) => {
              const isActive = option.id === upscalingQuality;
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setUpscalingQuality(option.id)}
                  className={tabButtonClass(isActive)}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div
        role="tabpanel"
        id={`panel-${activeTier.id}`}
        aria-labelledby={`tab-${activeTier.id}`}
        className="mt-6 min-h-[32rem]"
      >
        <TierCard
          resolution={activeTier.resolution}
          targetFps={targetFps}
          qualityPreset={qualityPreset}
          upscalingLabel={activeUpscalingLabel}
          rayTracing={supportsRayTracing && rayTracing}
          config={activeConfig}
        />
      </div>
    </div>
  );
}
