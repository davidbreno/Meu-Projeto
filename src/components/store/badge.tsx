import { cn } from "@/lib/utils";

type Props = { label: string; className?: string };

export function Badge({ label, className }: Props) {
  return <span className={cn("inline-flex items-center rounded-full border border-[#8a6546]/50 bg-[#f5e6ce]/70 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-[#5c3d27]", className)}>{label}</span>;
}
