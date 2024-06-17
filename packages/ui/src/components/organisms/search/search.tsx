"use client"
import {FlexGrid, Input, Typography} from "../../atoms";
import {Popper} from "@mui/base";
import React, { useState} from "react";

export const Search = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement, Element>, open: boolean) => {
    setAnchorEl(event.target as Element);
    setOpen(open);
  }

  return (
    <div className={"w-full desktop:w-searchBarWidth"}>
      <Input
        icon={"SearchLg"}
        onFocus={(event) => handleFocus(event, true)}
        onBlur={(event) => handleFocus(event,false)}
        placeholder={"Search"}
        type={"text"}
        variant={"onBgPrimary"}
      />
      <Popper
          anchorEl={anchorEl}
          open={open}
          placement={"bottom"}
          popperOptions={{
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, 10],
                },
              },
            ],
          }}
      >
        <FlexGrid className={"rounded-md border-solid border-gray-7 border w-searchBarWidth p-4"} direction={"column"}>
          <Typography>Search Results</Typography>
        </FlexGrid>
      </Popper>
    </div>
  );
};