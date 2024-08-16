import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
}

const LoadingButton = ({
  loading,
  disabled,
  className,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button
      disabled={loading || disabled}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {loading ? <LoaderCircle className="animate-spin" /> : null}
      <span>{props.children}</span>
    </Button>
  );
};

export { LoadingButton };
