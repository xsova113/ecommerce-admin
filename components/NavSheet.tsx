import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";

const NavSheet = ({ routes }: any) => {
  return (
    <div className="mt-2 md:hidden">
      <Sheet>
        <SheetTrigger>
          <Menu className="dark:text-white" />
        </SheetTrigger>
        <SheetContent side={"left"} className="pt-20">
          {routes.map((item: any) => (
            <SheetTitle
              key={item.href}
              className="hover:bg-gray-100 dark:hover:text-gray-600 transition py-2"
            >
              <SheetClose asChild>
                <Link
                  href={item.href}
                  className="w-full flex gap-4 items-center font-mono"
                >
                  {item.icon}
                  {item.label}
                </Link>
              </SheetClose>
            </SheetTitle>
          ))}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavSheet;
