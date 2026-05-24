"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { type Service } from "@/lib/services";
import { useAgentUI } from "@/components/voice-agent/agent-ui-context";
import { cn, formatPrice } from "@/lib/utils";

export function ServiceCard({ service }: { service: Service }) {
  const { state, actions } = useAgentUI();
  const Icon = service.icon;
  const isHighlighted = state.highlightedServiceId === service.id;

  const cardCls = cn(
    "group relative text-left scroll-mt-24 bg-cream p-6 transition-all duration-300 border-2 w-full",
    isHighlighted
      ? "border-accent shadow-[0_0_0_4px_rgba(247,93,69,0.3)] shadow-xl"
      : "border-transparent hover:border-cream/70 hover:shadow-lg"
  );

  const inner = (
    <>
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "h-12 w-12 flex items-center justify-center text-cream transition-colors",
            isHighlighted ? "bg-accent" : "bg-brand group-hover:bg-accent"
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
        <ArrowUpRight
          className={cn(
            "h-5 w-5 transition-colors",
            isHighlighted
              ? "text-accent"
              : "text-brand/30 group-hover:text-accent"
          )}
        />
      </div>
      <h3 className="mt-5 font-display text-xl uppercase text-dark leading-tight">
        {service.title}
      </h3>
      <p className="mt-2 text-sm text-dark/60">{service.tagline}</p>
      <p className="mt-4 text-xs font-semibold text-brand">
        Desde {formatPrice(service.priceFrom)} USD
      </p>
    </>
  );

  if (service.pageUrl) {
    return (
      <motion.div
        id={`servicio-${service.slug}`}
        data-service-id={service.id}
        animate={isHighlighted ? { scale: [1, 1.03, 1] } : { scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Link href={service.pageUrl} className={cn(cardCls, "block")}>
          {inner}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type="button"
      id={`servicio-${service.slug}`}
      data-service-id={service.id}
      onClick={() => actions.openService(service.id)}
      animate={isHighlighted ? { scale: [1, 1.03, 1] } : { scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cardCls}
    >
      {inner}
    </motion.button>
  );
}
