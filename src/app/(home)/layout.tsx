"use client";
import React, { ReactNode } from "react";

import { useEmployee } from "../_context/EmployeContext";
import Sidebar from "@/components/Sidebar";
type Props = {
  children: ReactNode;
};
const HomeLayout = (props: Props) => {
  const { currentEmploye } = useEmployee();

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-[24px] w-full">
        {currentEmploye ? <Sidebar /> : ""}
        {props.children}
      </div>
    </div>
  );
};

export default HomeLayout;
