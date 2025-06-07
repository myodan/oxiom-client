import Autoplay from "embla-carousel-autoplay";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "~/components/ui/carousel";
import { PROMOTIONS } from "~/constants/promotions";

export function PromotionBanner() {
	return (
		<Carousel opts={{ loop: true }} plugins={[Autoplay({ delay: 10000 })]}>
			<CarouselContent>
				{PROMOTIONS.map((promotion, i) => (
					<CarouselItem key={promotion} className="flex h-72">
						<img
							src={promotion}
							alt={`Promotion banner item ${i + 1}`}
							className="w-full rounded-md object-cover"
						/>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className="hidden xl:flex" />
			<CarouselNext className="hidden xl:flex" />
		</Carousel>
	);
}
