import Header_DashBoard from "@/components/Header_DashBoard/Header_DashBoard";
import { ReactNode } from "react";

export default function LayoutMain({children} : { children : ReactNode}){
    return (
        <>
            <Header_DashBoard/>
            {children}
        </>
    )
}