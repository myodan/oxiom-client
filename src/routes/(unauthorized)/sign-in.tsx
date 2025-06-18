import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useSignInMutation } from "~/mutations/sign-in-mutation";
import { SignInFormSchema } from "~/schemas/forms/sign-in";

export const Route = createFileRoute("/(unauthorized)/sign-in")({
	validateSearch: z.object({
		redirect: z.string().optional(),
	}),
	component: RouteComponent,
});

function RouteComponent() {
	const form = useForm({
		resolver: zodResolver(SignInFormSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const { mutate, isPending } = useSignInMutation();

	const onSubmit = form.handleSubmit((values) => {
		mutate(values);
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-xl">로그인</CardTitle>
				<CardDescription>Oxiom에 로그인하세요!</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form className="flex flex-col gap-8" onSubmit={onSubmit}>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>사용자 이름</FormLabel>
									<FormControl>
										<Input placeholder="username" type="text" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>암호</FormLabel>
									<FormControl>
										<Input placeholder="password" type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex flex-col gap-4">
							<Button type="submit">
								{isPending ? (
									<Loader2Icon className="animate-spin" />
								) : (
									"로그인"
								)}
							</Button>
							<div className="text-center text-sm">
								아직 계정이 없으신가요?{" "}
								<Link
									className="text-primary underline-offset-4 hover:underline "
									to="/sign-up"
								>
									회원가입
								</Link>
							</div>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
