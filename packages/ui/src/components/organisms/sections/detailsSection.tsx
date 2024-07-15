import {FlexGrid, Icon, Tooltip, Typography} from "../../atoms";
import {ReactNode} from "react";
import {SectionHeader} from "../layout/sectionHeader.tsx";

interface DetailsSectionsProps {
  title: string
  data: {
    label: {
      label: string,
      tooltip?: string,
    },
    value: ReactNode,
    mobileWidth?: "full" | "half",
  }[]
}

export const DetailsSection = ({ title, data, }: DetailsSectionsProps) => {
  return (
    <FlexGrid className={"w-full"} component={"section"} direction={"column"} gap={"4.5xl"}>
      <SectionHeader title={title} titleSize={"sm"} />
      <FlexGrid
        className={"w-full"}
        direction={"column"}
        gap={"3xl"}
        mobileDirection={"row"}
        wrap
      >
        {
          data.map(({ label, value, mobileWidth, }, index) => (
            <FlexGrid
              className={"w-full"}
              direction={"row"}
              gap={"1.5xl"}
              justify={"between"}
              key={`details-section-${index + 1}`}
              mobileDirection={"column"}
            >
              <FlexGrid
                alignItems={"center"}
                className={"shrink-0"}
                direction={"row"}
                mobileDirection={"row"}
                style={{width: "160px",}}
              >
                <Typography
                  className={"truncate max-w-full"}
                  color={"onBackgroundLow"}
                  fontWeight={"semibold"}
                  variant={"paragraph-lg"}
                >
                  {label.label}
                </Typography>
                {
                  label.tooltip && (
                    <Tooltip placement={"top"} text={label.tooltip}>
                      <Icon color={"onBackgroundLow"} icon={"Info"} size={"small"} style={{fontSize: "19px",}} />
                    </Tooltip>
                  )
                }
              </FlexGrid>
              <div className={"w-full"}>
                <Typography variant={"paragraph-lg"}>{value}</Typography>
              </div>
            </FlexGrid>
          ))
        }
      </FlexGrid>
    </FlexGrid>
  )
}