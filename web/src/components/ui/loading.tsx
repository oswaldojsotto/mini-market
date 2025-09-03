import { cn } from "@/lib/utils";

interface LoadingProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Loading({
  className,
  size = "md",
}: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-border border-t-primary",
        sizeClasses[size],
        className
      )}
    />
  );
}

export function LoadingText() {
  return (
    <div className="flex items-center space-x-2">
      <Loading size="sm" />
      <span className="text-muted-foreground">
        Cargando...
      </span>
    </div>
  );
}
