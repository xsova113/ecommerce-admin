"use client";

import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { cn } from "@/lib/utils";

const MainNav = ({ className, ...props }: any) => {
  return (
    <nav
      className={cn(
        "flex items-center md:ml-4 lg:ml-6 md:gap-4 lg:gap-6 max-md:hidden",
        className
      )}
    >
      {props.routes.map((route: any) => (
        <Link
          key={route.href}
          as={NextLink}
          href={route.href}
          fontSize={"md"}
          textUnderlineOffset={10}
          fontWeight={"medium"}
          textColor={route.active ? "black" : "gray.500"}
          className={`${route.active ? "dark:text-gray-200" : "dark:text-gray-500"}`}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
