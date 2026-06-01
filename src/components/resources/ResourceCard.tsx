"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, FileText, BookOpen, Music } from "lucide-react";
import Image from "next/image";

import { Card } from "@/components/ui/card";

type ResourceCardProps = {
  title: string;
  description: string;
  index: number;
  iconIndex: number;
  imageSrc: string;
};

export default function ResourceCard({
  title,
  description,
  index,
  iconIndex,
  imageSrc,
}: ResourceCardProps) {
  const icons = [FileText, BookOpen, Music];
  const Icon = icons[iconIndex] ?? FileText;

  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);
  const [collapsedHeight, setCollapsedHeight] = useState<number>(0);
  const [expandedHeight, setExpandedHeight] = useState<number>(0);

  const descriptionStyles = useMemo(() => {
    if (!collapsedHeight || !expandedHeight) {
      return undefined;
    }

    return {
      maxHeight: `${canExpand && !isExpanded ? collapsedHeight : expandedHeight}px`,
    };
  }, [canExpand, collapsedHeight, expandedHeight, isExpanded]);

  useEffect(() => {
    const element = descriptionRef.current;
    if (!element) {
      return;
    }

    const measure = () => {
      const computed = window.getComputedStyle(element);
      const lineHeight = Number.parseFloat(computed.lineHeight);
      if (!lineHeight) {
        return;
      }

      const totalHeight = element.scrollHeight;
      const threeLineHeight = lineHeight * 3;
      const hasThreeOrMoreLines = totalHeight + 1 >= threeLineHeight;
      const overThreshold = totalHeight - threeLineHeight > 1;

      setCollapsedHeight(threeLineHeight);
      setExpandedHeight(totalHeight);
      setCanExpand(hasThreeOrMoreLines && overThreshold);
    };

    measure();

    const resizeObserver = new ResizeObserver(() => {
      measure();
    });

    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, [description]);

  return (
    <Card
      onClick={() => setIsExpanded((prev) => !prev)}
      className="p-6 cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-white"
      data-testid={`card-resource-${index}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-none w-24 h-24 relative overflow-hidden ">
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(max-width: 640px) 80px, 96px"
            className="object-cover"
            data-testid={`image-resource-${index}`}
          />
        </div>

        <div className="flex-1">
          <div className="flex items-start gap-2 mb-1">
            <h2
              className="font-serif text-xl text-black"
              data-testid={`text-resource-title-${index}`}
            >
              {title}
            </h2>
          </div>

          <p
            ref={descriptionRef}
            className="font-sans text-gray-600 text-sm overflow-hidden transition-[max-height] duration-300 ease-in-out"
            style={descriptionStyles}
            data-testid={`text-resource-desc-${index}`}
          >
            {description}
          </p>

          {canExpand ? (
            <button
              type="button"
              className="mt-3 inline-flex items-center gap-1 text-xs font-sans text-gold hover:text-black transition-colors"
              aria-expanded={isExpanded}
              data-testid={`button-resource-toggle-${index}`}
            >
              <span>{isExpanded ? "Show less" : "Show more"}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
