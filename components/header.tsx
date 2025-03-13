"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "../lib/utils";
import { Settings, User, HelpCircle, Github } from "lucide-react";

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  items?: {
    href: string;
    title: string;
  }[];
}

function MainNav({ className, items, ...props }: MainNavProps) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      {/* Navigation links can be added here if needed */}
    </nav>
  );
}

export const Header = () => {
  return (
    <header>
      <div className="border-b-thin">
        <div className="flex h-16 items-center px-4">
          <Link
            href="https://takin.ai"
            target="_blank"
            className="flex items-center hover:opacity-90 transition-opacity"
          >
            {}
            <img src="/logo/takin_logo.svg" alt="TUMO" className="h-8 mr-2" />
            <span className="font-semibold text-lg">TUMO</span>
          </Link>

          <MainNav className="mx-6" />

          <div className="ml-auto flex items-center space-x-4">
            <Link
              href="https://github.com/datamonet/takin-image-studio"
              target="_blank"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-1"
            >
              <Github className="h-5 w-5" />
              <span>GitHub</span>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Github className="mr-2 h-4 w-4" />
                    <span>GitHub</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};
