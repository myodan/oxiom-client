import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Link, createFileRoute } from "@tanstack/react-router";
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
import { useSignIn } from "~/mutations/sign-in-mutation";
import { type SignInForm, SignInFormSchema } from "~/schemas/forms/sign-in";

export const Route = createFileRoute("/(unauthorized)/sign-in")({
	validateSearch: z.object({
		redirect: z.string().optional(),
	}),
	component: RouteComponent,
});

function RouteComponent() {
	const form = useForm<SignInForm>({
		resolver: standardSchemaResolver(SignInFormSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const { mutate, isPending } = useSignIn();

	const onSubmit = form.handleSubmit((values) => {
		mutate(values);
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle className="font-serif text-xl">로그인</CardTitle>
				<CardDescription>Oxiom에 로그인하세요</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={onSubmit} className="flex flex-col gap-8">
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>사용자 이름</FormLabel>
									<FormControl>
										<Input type="text" placeholder="example" {...field} />
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
										<Input type="password" placeholder="*****" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex flex-col gap-4">
							<Button type="submit" loading={isPending}>
								로그인
							</Button>
							<div className="text-center text-sm">
								아직 계정이 없으신가요?{" "}
								<Link
									to="/sign-up"
									className="text-primary underline-offset-4 hover:underline "
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
