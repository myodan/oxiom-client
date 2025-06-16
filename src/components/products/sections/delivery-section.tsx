export function DeliverySection() {
	return (
		<section className="flex flex-col gap-4 rounded-lg border p-4">
			<h3 className="font-semibold text-lg">배송 정보</h3>
			<div className="grid grid-cols-2 gap-4">
				<div className="grid gap-1 rounded-lg bg-secondary p-4 text-secondary-foreground">
					<h4 className="mb-2 font-semibold">배송 방법</h4>
					<p>안전 배송 (전문 미술품 운송)</p>
				</div>
				<div className="grid gap-1 rounded-lg bg-secondary p-4 text-secondary-foreground">
					<h4 className="mb-2 font-semibold">배송비</h4>
					<p>무료 배송</p>
				</div>
				<div className="grid gap-1 rounded-lg bg-secondary p-4 text-secondary-foreground">
					<h4 className="mb-2 font-semibold">배송 기간</h4>
					<p>결제 완료 후 3~5일 이내</p>
				</div>
				<div className="grid gap-1 rounded-lg bg-secondary p-4 text-secondary-foreground">
					<h4 className="font-semibold">배송 지역</h4>
					<p>전국 (일부 도서 산간 지역 제외)</p>
				</div>
				<div className="col-span-2 grid gap-1 rounded-lg bg-secondary p-4 text-secondary-foreground">
					<h4 className="font-semibold">배송 안내</h4>
					<ul className="flex list-disc flex-col gap-1 pl-6">
						<li>경매 낙찰 후 24시간 이내에 결제를 완료해주셔야 합니다.</li>
						<li>결제 완료 후 전문 포장 과정을 거쳐 안전하게 배송됩니다.</li>
						<li>배송 전 상품 상태 확인 및 포장 상태를 사진으로 제공합니다.</li>
						<li>
							작품의 안전한 배송을 위해 전문 미술품 운송 서비스를 이용합니다.
						</li>
						<li>배송 과정에서 파손이 발생할 경우 전액 보상해 드립니다.</li>
					</ul>
				</div>
			</div>
		</section>
	);
}
