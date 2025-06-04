import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Logo } from "~/components/logo";

export const Route = createFileRoute("/(unauthorized)")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-lvh flex-col items-center justify-center p-4">
      <div className="flex w-full max-w-md flex-col gap-8">
        <div className="flex justify-center">
          <Logo />
        </div>
        <Outlet />
      </div>
    </div>
  );
}
