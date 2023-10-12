import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CourseProgressProps {
  variant?: "default" | "success";
  value: number;
  size?: "default" | "sm";
}

const colorByVariants = {
  default: "text-sky-700",
  success: "text-emerald-700",
};

const sizeByVariants = {
  default: "text-sm",
  sm: "text-xs",
};

const CourseProgress = ({ value, variant, size }: CourseProgressProps) => {
  return (
    <div>
      <Progress className="h-2" value={value} variant={variant} />

      <p
        className={cn(
          "font-medium mt-2 text-sky-700",
          colorByVariants[variant || "default"],
          sizeByVariants[size || "default"]
        )}
      >
        {Math.round(value)}% Complete
      </p>
    </div>
  );
};

export default CourseProgress;
