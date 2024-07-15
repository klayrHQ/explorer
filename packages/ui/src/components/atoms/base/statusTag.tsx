import {Badge} from "../badges/badge.tsx";
import {TypographyVariant} from "../../../types/types.ts";

interface StatusTagProps {
  status: "success" | "pending" | "failed" | string;
  variant?: TypographyVariant;
}

export const StatusTag = ({ status, variant, }: StatusTagProps) => {
  const statusVariants: Record<string, {label: string, variant: string, backgroundColor: string, borderColor: string,}> = {
    successful: {
      label: "Successful",
      variant: "success",
      backgroundColor: "successBg",
      borderColor: "success",
    },
    pending: {
      label: "Pending",
      variant: "warning",
      backgroundColor: "warningBg",
      borderColor: "warning",
    },
    failed: {
      label: "Failed",
      variant: "error",
      backgroundColor: "errorBg",
      borderColor: "error",
    },
  }

  return (
    <Badge
      backgroundColor={statusVariants[status].backgroundColor}
      borderColor={statusVariants[status].borderColor}
      colorVariant={statusVariants[status].variant}
      label={statusVariants[status].label}
      typographyVariant={variant}
    />
  )
}