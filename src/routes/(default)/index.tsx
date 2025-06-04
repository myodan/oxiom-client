import { createFileRoute } from "@tanstack/react-router";
import { useCurrentUser } from "~/queries/current-user-query";

export const Route = createFileRoute("/(default)/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useCurrentUser();
  console.log("Current User:", data);
  return <div>Index</div>;
}
