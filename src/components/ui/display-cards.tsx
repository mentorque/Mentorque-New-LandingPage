"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface DisplayCardProps {
  className?: string;
  activeClassName?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
  isActive?: boolean;
}

function DisplayCard({
  className,
  activeClassName,
  icon = <Sparkles className="size-5 text-emerald-300" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-emerald-500",
  titleClassName = "text-emerald-400",
  isActive = false,
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-44 w-[26rem] -skew-y-[8deg] select-none flex-col justify-between rounded-2xl border-2 border-neutral-600 bg-neutral-800/80 backdrop-blur-sm px-5 py-4 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[24rem] after:rounded-2xl after:bg-gradient-to-l after:from-black/80 after:to-transparent after:content-[''] hover:border-neutral-500 hover:bg-neutral-800 [&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className,
        isActive && activeClassName
      )}
    >
      <div>
        <span className="relative inline-block rounded-full bg-neutral-700 p-1.5">
          {icon}
        </span>
        <p className={cn("text-xl font-semibold", titleClassName)}>{title}</p>
      </div>
      {description ? (
        <p className="text-xl leading-snug text-neutral-200 [white-space:normal]">{description}</p>
      ) : null}
      <p className="text-sm font-medium text-neutral-400">{date}</p>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
  /** Auto-cycle the hover effect every N ms. Omit or 0 to disable. */
  autoCycleIntervalMs?: number;
}

export default function DisplayCards({
  cards,
  autoCycleIntervalMs = 6000,
}: DisplayCardsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const defaultCards: DisplayCardProps[] = [
    {
      className:
        "[grid-area:stack] before:absolute before:w-[100%] before:outline-1 before:rounded-2xl before:outline-neutral-600 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-black/50 grayscale-[100%] before:transition-opacity before:duration-700 before:left-0 before:top-0 hover:before:opacity-0 hover:grayscale-0 hover:-translate-y-10",
      activeClassName:
        "-translate-y-10 before:opacity-0 grayscale-0",
    },
    {
      className:
        "[grid-area:stack] translate-x-20 translate-y-12 before:absolute before:w-[100%] before:outline-1 before:rounded-2xl before:outline-neutral-600 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-black/50 grayscale-[100%] before:transition-opacity before:duration-700 before:left-0 before:top-0 hover:before:opacity-0 hover:grayscale-0 hover:-translate-y-1",
      activeClassName:
        "-translate-y-1 before:opacity-0 grayscale-0",
    },
    {
      className:
        "[grid-area:stack] translate-x-40 translate-y-24 hover:translate-y-12",
      activeClassName: "translate-y-12",
    },
  ];

  const displayCards = cards ?? defaultCards;
  const count = displayCards.length;

  useEffect(() => {
    if (autoCycleIntervalMs <= 0 || count === 0) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % count);
    }, autoCycleIntervalMs);
    return () => clearInterval(id);
  }, [autoCycleIntervalMs, count]);

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
      {displayCards.map((cardProps, index) => (
        <DisplayCard
          key={index}
          {...cardProps}
          isActive={index === activeIndex}
        />
      ))}
    </div>
  );
}