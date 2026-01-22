"use client";
import dynamic from "next/dynamic";
import React from "react";

const RouteModalHandler = dynamic(() => import("./route-modal-handler"), { ssr: false });

export default function RouteModalLoader() {
  return <RouteModalHandler />;
}


