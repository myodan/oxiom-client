import { Link } from "@tanstack/react-router";
import { Logo } from "~/components/logo";
import { ThemeSelector } from "~/components/theme-selector";
import { useCurrentUser } from "~/queries/current-user-query";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { UserMenu } from "./user-menu";

export function Header() {
  const { data: currentUser } = useCurrentUser();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-background **:data-[slot=separator]:h-4">
      <div className="container mx-auto flex justify-between gap-8 px-4">
        <Logo />
        <ul className="flex items-center gap-4">
          <li>
            <Link
              to="/products"
              className="font-serif text-foreground/75 hover:text-foreground [&.active]:font-bold [&.active]:text-foreground"
            >
              Products
            </Link>
          </li>
        </ul>
        <div className="flex items-center gap-4">
          {currentUser ? (
            <UserMenu />
          ) : (
            <Link to="/sign-in">
              <Button variant="ghost" className="font-serif">
                로그인
              </Button>
            </Link>
          )}
          <Separator orientation="vertical" />
          <ThemeSelector />
        </div>
      </div>
    </header>
  );
}
