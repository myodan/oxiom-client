import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import ky from "ky";
import { toast } from "sonner";
import { fetcher } from "~/lib/fetcher";
import type { ProductForm } from "~/schemas/forms/product";
import {
	type PreSignedUrl,
	PreSignedUrlSchema,
} from "~/schemas/pre-signed-url";
import type { Product } from "~/schemas/product";

export const useCreateProductMutation = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationKey: ["create-product"],
		mutationFn: async (data: ProductForm) => {
			const uploadedObjectKeys = await Promise.all(
				data.images.map(async (file) => {
					const preSignedUrl = await fetcher
						.post<PreSignedUrl>("uploads/pre-signed-url")
						.then(async (response) => {
							return PreSignedUrlSchema.parse(await response.json());
						});

					await ky.put(preSignedUrl.url, {
						body: file,
					});

					return preSignedUrl.key;
				}),
			);

			return fetcher.post<Product>("products", {
				json: {
					...data,
					images: uploadedObjectKeys.map((objectKey, index) => ({
						order: index,
						objectKey,
					})),
					category: {
						id: data.categoryId,
					},
				},
			});
		},
		onSuccess: async (response) => {
			const product = await response.json();
			toast.success("상품이 성공적으로 등록되었습니다.");
			navigate({
				to: "/products/$id",
				params: { id: product.id.toString() },
				replace: true,
			});
		},
		onError: (error) => {
			console.error(error);
			toast.error("상품 등록 중 오류가 발생했습니다.");
		},
	});
};
