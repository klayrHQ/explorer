import {Typography} from "../../atoms/base/typography.tsx";
import {Icon} from "../../atoms/images/icon.tsx";
import {FlexGrid} from "../../atoms/base/flexGrid.tsx";
import {LinkComponent} from "../../../types/types.ts";
import {Link} from "../../atoms/navigation/link.tsx";
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
                  titleSize === "lg" ? "text-heading-4" : "text-heading-6",
                ])}
                icon="ArrowUpRight"
                size={"custom"}
                style={{transform: titleSize === "lg" ? "translateY(6px)" : "translateY(2.5px)",}}
              />
            </FlexGrid>
          </Link>
        ) : (
          <FlexGrid direction="row" gap="xl">
            <Typography
              color="gray-1"
              component="h4"
              fontWeight="bold"
              variant="h4"
            >
              {title}
            </Typography>
            {
              count && (
                <div className={"bg-secondary rounded-sm px-md pb-xs pt-2xs h-max mt-xs"}>
                  <Typography
                    color="onSecondary"
                    variant="paragraph-sm"
                  >
                    {count}
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