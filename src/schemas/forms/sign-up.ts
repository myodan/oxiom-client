import { z } from "zod/v4";

export const SignUpFormSchema = z
	.object({
		username: z
			.string()
			.regex(
				/^[a-z0-9]+(-[a-z0-9]+)*$/,
				"사용자명은 4~20자의 영문 소문자, 숫자, 대시(-)만 포함할 수 있으며, 대시(-)로 시작하거나 끝날 수 없습니다.",
			),
		password: z
			.string()
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
				"비밀번호는 최소 8자 이상이며, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.",
			),
		passwordConfirm: z.string(),
		email: z.email(),
		displayName: z
			.string()
			.nonempty("표시 이름은 필수 입력 항목입니다.")
			.max(50, "표시 이름은 최대 50자까지 입력할 수 있습니다."),
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: "암호와 암호 확인이 일치하지 않습니다.",
		path: ["passwordConfirm"],
	});

export type SignUpForm = z.infer<typeof SignUpFormSchema>;
