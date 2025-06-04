export function RefundPolicySecion() {
	return (
		<div className="flex flex-col gap-4 rounded-lg border p-4">
			<h3 className="font-semibold text-lg">교환/환불 정책</h3>
			<p>
				OXIOM은 구매자의 만족을 최우선으로 생각합니다. 하지만 경매 특성 상
				특별한 교환/환불 정책이 적용됩니다.
			</p>
			<div className="flex flex-col gap-2 rounded-lg bg-secondary p-4 text-secondary-foreground">
				<h4 className="font-semibold">경매 특성에 따른 안내</h4>
				<p>
					경매로 낙찰된 상품은 원칙적으로 교환/환불이 불가합니다. 단, 상품에
					명백한 하자가 있는 경우에 한하여 교환/환불이 가능합니다.
				</p>
			</div>
			<div className="flex flex-col gap-2 rounded-lg bg-secondary p-4 text-secondary-foreground">
				<h4 className="font-semibold">교환/환불 가능 사유</h4>
				<ul className="flex list-disc flex-col gap-1 pl-6">
					<li>상품 설명과 현저히 다른 상품이 배송된 경우</li>
					<li>배송 과정에서 파손된 경우</li>
					<li>상품에 숨겨진 하자가 있는 경우</li>
				</ul>
			</div>
			<div className="flex flex-col gap-2 rounded-lg bg-secondary p-4 text-secondary-foreground">
				<h4 className="font-semibold">교환/환불 절차</h4>
				<ol className="flex list-decimal flex-col gap-1 pl-6">
					<li>상품 수령 후 24시간 이내에 OXIOM 고객센터로 연락</li>
					<li>상품의 하자 부분 사진 제출</li>
					<li>검토 후 교환/환불 승인</li>
					<li>반품 배송 진행 (배송비 OXIOM 부담)</li>
					<li>환불 처리 (최대 3영업일 소요)</li>
				</ol>
			</div>
		</div>
	);
}
