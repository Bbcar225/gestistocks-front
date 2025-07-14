import {Button, notification, Space, Table} from "antd";
import dayjs from "dayjs";
import {formatDate} from "../../../constants/dateConstant.ts";
import useRoutesCustomer from "../../../hooks/routes/CustomerRoutesHook.ts";
import {formatPrice} from "../../../utils/priceUtils.ts";
import {notDefined, successDelete} from "../../../constants/textsConstant.ts";
import useRoutesSale from "../../../hooks/routes/SaleRoutesHook.ts";
import DeleteButton from "../../atoms/DeleteButton.tsx";
import {paymentQueriesClients, usePaymentDelete} from "../../../hooks/Api/tenant/PaymentHookAPI.ts";
import {useQueryClient} from "react-query";
import PaymentFormModal from "../../organisms/Modals/PaymentFormModal.tsx";

export default function PaymentTable({payments, loading, ...props}: {
	payments: PaymentInterface[],
	loading?: boolean
}) {
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
						return <Space direction='horizontal'>
							<PaymentFormModal
								initialValues={{
									amount: row.amount,
								}}
								payment={row}
							/>
							<Delete payment={row}/>
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
			loading={loading}
			{...props}
		/>
	</>
}

const Delete = ({payment}: { payment: PaymentInterface }) => {
	const reqPaymentDelete = usePaymentDelete(payment.id)
	const [api, contextHolder] = notification.useNotification();
	const queryClient = useQueryClient()
	
	return <>
		<DeleteButton
			loading={reqPaymentDelete.isLoading}
			handleConfirm={() => reqPaymentDelete.mutate(undefined, {
				onSuccess: () => {
					api.success({
						message: successDelete
					})
					reqPaymentDelete.reset()
					queryClient.invalidateQueries(paymentQueriesClients.usePaymentGetAll).then()
				}
			})}
		/>
		{contextHolder}
	</>
}