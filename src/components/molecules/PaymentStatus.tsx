import {Tag, TagProps} from "antd";
import {formatPrice} from "../../utils/priceUtils.ts";

export default function PaymentStatus({sale_sum, payment_sum, ...props}: Partial<TagProps> & { sale_sum: number, payment_sum: number }) {
	let color = 'warning'
	
	if (sale_sum > payment_sum) {
		color = 'warning'
	} else if (sale_sum < payment_sum) {
		color = 'cyan'
	} else {
		color = 'green'
	}
	
	return <Tag
		{...props}
		color={color}
	>
		{`${formatPrice(payment_sum)} / ${formatPrice(sale_sum)}`}
	</Tag>
}