import {cls} from "../../../utils/functions.ts";
import {FlexGrid} from "../../atoms";
import {Table, TableProps} from "../../molecules";

interface TableContainerProps extends TableProps {
  pagination?: boolean;
  filters?: boolean;
  tableClassName?: string;
}

export const TableContainer = ({ className, pagination, filters, tableClassName, ...props }: TableContainerProps) => {
  return (
    <FlexGrid
      className={cls([
        className,
        "w-full border-collapse border-solid border-borderLow border-1 rounded-xl",
      ])}
      direction={"column"}
      gap={"0"}
    >
      {
        filters && (
          <FlexGrid className={"p-3xl border-b-1 border-borderLow"}>
            {"Filters"}
          </FlexGrid>
        )
      }
      <Table className={tableClassName} {...props}/>
      {
        pagination && (
          <FlexGrid className={"px-3xl py-lg border-t-1 border-borderLow"}>
            {"Pagination"}
          </FlexGrid>
        )
      }
    </FlexGrid>
  );
}