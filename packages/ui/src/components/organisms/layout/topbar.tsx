import {FlexGrid, Icon, KeyValueComponent} from "../../atoms";
import {Search} from "../search/search.tsx";
import {ReactNode} from "react";

interface TopbarProps {
  kpis: {
    keyValue: string | ReactNode
    contentValue: string | ReactNode
  }[]
}
export const Topbar = ({kpis}: TopbarProps) => {

  return (
      <FlexGrid
          alignItems={"center"}
          className={"w-full h-topbarHeight bg-gray-8 pr-3xl"}
          component={"header"}
          gap={"8"}
          justify={"between"}
      >
        <Search />
        <FlexGrid gap={"2xl"}>
          {
            kpis.map((item, index) => (
                <KeyValueComponent key={`key-value-${index + 1}`} {...item} />
            ))
          }
          <FlexGrid>
            <Icon icon={"CryptoCurrency"} />
          </FlexGrid>
        </FlexGrid>
      </FlexGrid>
  )
}