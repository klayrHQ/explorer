import {Typography} from "./typography.tsx";
import {Icon} from "../images/icon.tsx";
import {FlexGrid} from "./flexGrid.tsx";
import {LinkComponent} from "../../../types/types.ts";
import {Link} from "../navigation/link.tsx";
import {cls} from "../../../utils/functions.ts";

interface SectionHeaderProps {
  title: string;
  titleSize?: "lg" | "sm";
  subTitle?: string;
  count?: number;
  className?: string;
  href?: string;
  linkComponent?: LinkComponent
  fullWidth?: boolean;
}

export const SectionHeader = ({ title, titleSize = "lg", subTitle, count, className, href, linkComponent, fullWidth, }: SectionHeaderProps) => {
  return (
    <FlexGrid
      className={cls([
        className,
        fullWidth ? "w-full" : "",
      ])}
      direction={"column"}
    >
      {
        href ? (
          <Link component={linkComponent} href={href}>
            <FlexGrid className={"group"} direction="row" gap="2">
              <Typography
                className="group-hover:text-gray-4"
                color="gray-1"
                component={titleSize === "lg" ? "h1" : "h2"}
                fontWeight="bold"
                variant={titleSize === "lg" ? "h4" : "h6"}
              >
                {title}
              </Typography>
              <Icon
                className={cls([
                  "group-hover:text-gray-4",
                  titleSize === "lg" ? "text-heading-3" : "text-heading-5",
                ])}
                icon="ArrowUpRight"
                size={"custom"}
                style={{transform: titleSize === "lg" ? "translateY(4px)" : "translateY(2.5px)",}}
              />
            </FlexGrid>
          </Link>
        ) : (
          <FlexGrid direction="row" gap="2">
            <Typography
              className="hover:text-gray-4"
              color="gray-1"
              component="h4"
              fontWeight="bold"
              variant="h4"
            >
              {title}
            </Typography>
            {
              count && (
                <div className={"bg-secondary rounded-sm p-md"}>
                  <Typography
                    color="onSecondary"
                    variant="paragraph-sm"
                  >
                    ({count})
                  </Typography>
                </div>
              )
            }
          </FlexGrid>
        )
      }
      {
        subTitle && (
          <FlexGrid alignItems="center" gap="3">
            <Typography
              color="gray-5"
              component="p"
              variant="paragraph-md"
            >
              {subTitle}
            </Typography>
          </FlexGrid>
        )
      }
    </FlexGrid>
  )
}