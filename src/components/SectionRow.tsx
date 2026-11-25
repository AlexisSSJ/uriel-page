import type { CSSProperties, ReactNode } from "react";
import { SpotlightHeading } from "./SpotlightHeading";

interface EditorialRuleProps {
  delayMs?: number;
}

export function EditorialRule({ delayMs = 0 }: EditorialRuleProps) {
  const style = { "--delay": `${delayMs}ms` } as CSSProperties;
  return (
    <div
      aria-hidden="true"
      style={style}
      className="h-px w-full bg-[#BDBDBD] dark:bg-[#27272A] animate-swiss-rule"
    />
  );
}

interface SectionRowProps {
  id: string;
  title: string;
  titleAccessory?: ReactNode;
  delayMs?: number;
  children: ReactNode;
}

export function SectionRow({
  id,
  title,
  titleAccessory,
  delayMs = 0,
  children,
}: SectionRowProps) {
  const style = { "--delay": `${delayMs}ms` } as CSSProperties;
  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <EditorialRule delayMs={Math.max(0, delayMs - 40)} />
      <div
        style={style}
        className="animate-swiss-fade grid grid-cols-1 md:grid-cols-12 gap-y-5 md:gap-x-8 pt-6 pb-12 md:pt-7 md:pb-14"
      >
        <div className="md:col-span-4 flex flex-row md:flex-col items-baseline md:items-start justify-between gap-2">
          <SpotlightHeading
            as="h2"
            id={`${id}-heading`}
            radius={150}
            className="text-[19px] md:text-[21px] font-medium leading-[1.25] tracking-[-0.02em]"
          >
            {title}
          </SpotlightHeading>
          {titleAccessory ? <div className="no-print">{titleAccessory}</div> : null}
        </div>
        <div className="md:col-span-8">{children}</div>
      </div>
    </section>
  );
}
