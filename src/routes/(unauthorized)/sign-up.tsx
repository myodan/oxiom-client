import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(unauthorized)/sign-up")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(unauthorized)/sign-up"!</div>;
}
