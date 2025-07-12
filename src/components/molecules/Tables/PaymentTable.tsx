import {Button, Space, Table} from "antd";
import dayjs from "dayjs";
import {formatDate} from "../../../constants/dateConstant.ts";
import useRoutesCustomer from "../../../hooks/routes/CustomerRoutesHook.ts";
import {formatPrice} from "../../../utils/priceUtils.ts";
import {notDefined} from "../../../constants/textsConstant.ts";
import useRoutesSale from "../../../hooks/routes/SaleRoutesHook.ts";

export default function PaymentTable({payments, ...props}: { payments: PaymentInterface[] }) {
	const routesCustomer = useRoutesCustomer()
	const routesSale = useRoutesSale()
	
	return <>
		<Table
			columns={[
				{
					key: 'ID',
					title: 'ID',
					render: (_, row) => {
						return row.id
					}
				},
				{
					key: 'Client',
					title: 'Client',
					render: (_, row) => {
						return <Button
							type='link'
							onClick={() => routesCustomer.goToShow({id: row.payer_id})}
						>
							{row.payer.name}
						</Button>
					}
				},
				{
					key: 'Montant',
					title: 'Montant',
					render: (_, row) => {
						return formatPrice(row.amount)
					}
				},
				{
					key: 'Vente',
					title: 'Vente',
					render: (_, row) => {
						return row?.payable ? <Button
							type='link'
							onClick={() => routesSale.goToShow({id: row.payable_id})}
						>
							{row.payable.reference}
						</Button> : notDefined
					}
				},
				{
					key: 'Date',
					title: 'Date',
					render: (_, row) => {
						return dayjs(row.date).format(formatDate)
					}
				},
				{
					key: 'Options',
					title: 'Option',
					render: (_, row) => {
						console.log(row)
						return <Space>
						</Space>
					}
				},
			]}
			dataSource={payments}
			rowKey={(record) => record.id}
			className='text-nowrap'
			scroll={{
				x: true
			}}
			{...props}
		/>
	</>
}