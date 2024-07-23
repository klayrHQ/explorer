import {Blocks} from "../../../components/clientPages/blocks.tsx";
import {Suspense} from "react";


export default function Page() {
  return (
      <Suspense>
        <Blocks />
      </Suspense>
  );
}