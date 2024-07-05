"use client";

import { IconLoader } from "@/components/icon-loader";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const NotFound: React.FC = () => {
  const router = useRouter();
  return (
    <div className="prose mx-auto -mt-40 flex h-svh w-full flex-col items-center justify-center">
      <h1 className="font-extrabold tracking-tight">404 Page Not Found</h1>
      <IconLoader />
      <Button
        onClick={() => {
          router.push("/");
        }}
        className="mt-4 hover:bg-black/80"
      >
        Return to home
      </Button>
    </div>
  );
};

export default NotFound;
