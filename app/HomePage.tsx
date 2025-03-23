import { NextUIProvider } from "@nextui-org/react";
import "./commons.css";
import "./global.css";
// import { ReactQueryProvider } from './react-query-provider';
// import "react-datepicker/dist/react-datepicker.css";
// import "sweetalert2/src/sweetalert2.scss";
import { ReactQueryProvider } from "./react-query-provider";
import Home from "@/vaquita-ui-submodule/components/home/Home";

export function HomePage() {
  return (
    <NextUIProvider className="h-full">
      <ReactQueryProvider>
        <Home address="0x12"></Home>
      </ReactQueryProvider>
    </NextUIProvider>
  );
}
