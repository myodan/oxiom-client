import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { fetcher } from "~/lib/fetcher";
import type { SignUpForm } from "~/schemas/forms/sign-up";
import type { User } from "~/schemas/user";

export const useSignUpMutation = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationKey: ["sign-up"],
		mutationFn: (data: SignUpForm) => {
			return fetcher.post<User>("users", {
				json: data,
			});
		},
		onSuccess: () => {
			toast.success("성공적으로 회원가입되었습니다.");
			navigate({ to: "/sign-in", replace: true });
		},
		onError: (error) => {
			console.error(error);
			toast.error("회원가입 중 오류가 발생했습니다.");
		},
	});
};
