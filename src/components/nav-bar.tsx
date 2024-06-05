"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { Logo } from "./logo";

export const NavBar = () => {
  return (
    <div className="flex w-full flex-col py-8">
      <div className="flex h-full w-full items-center justify-center p-4">
        <Logo />
      </div>
      <NavigationMenu className="hidden w-full max-w-full">
        <NavigationMenuList className="flex w-full items-center justify-center gap-4">
          <NavigationMenuItem>
            <NavigationMenuLink href="/">Blog</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/contact">Contact</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
