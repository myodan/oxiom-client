import { zodResolver } from "@hookform/resolvers/zod";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
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
import { useSignUpMutation } from "~/mutations/sign-up-mutation";
import { SignUpFormSchema } from "~/schemas/forms/sign-up";

export const Route = createFileRoute("/(unauthorized)/sign-up")({
	component: RouteComponent,
});

function RouteComponent() {
	const form = useForm({
		resolver: zodResolver(SignUpFormSchema),
		defaultValues: {
			username: "",
			password: "",
			passwordConfirm: "",
			email: "",
			displayName: "",
		},
	});

	const { mutate, isPending } = useSignUpMutation();

	const onSubmit = form.handleSubmit((values) => {
		mutate(values);
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-xl">회원가입</CardTitle>
				<CardDescription>Oxiom에 회원가입하세요!</CardDescription>
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
										<Input type="text" placeholder="username" {...field} />
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
										<Input type="password" placeholder="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="passwordConfirm"
							render={({ field }) => (
								<FormItem>
									<FormLabel>암호 재확인</FormLabel>
									<FormControl>
										<Input type="password" placeholder="*****" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>이메일</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder="example@me.com"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="displayName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>이름</FormLabel>
									<FormControl>
										<Input type="text" placeholder="홍길동" {...field} />
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
									"회원가입"
								)}
							</Button>
							<div className="text-center text-sm">
								이미 계정이 있으신가요?{" "}
								<Link
									to="/sign-in"
									className="text-primary underline underline-offset-4"
								>
									로그인
								</Link>
							</div>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
