import {Button, Space, Table, Typography} from "antd";
import dayjs from "dayjs";
import {formatDate} from "../../../constants/dateConstant.ts";
import {FaEye} from "react-icons/fa";
import {tablePagination} from "../../../constants/tableConstant.ts";
import useSaleStore from "../../../store/useSaleStore.ts";
import useRoutesCustomer from "../../../hooks/routes/CustomerRoutesHook.ts";
import useRoutesSale from "../../../hooks/routes/SaleRoutesHook.ts";
import ButtonDownloadInvoiceSale from "../../atoms/ButtonDownloadInvoiceSale.tsx";
import PaymentFormModal from "../../organisms/Modals/PaymentFormModal.tsx";
import PaymentStatus from "../PaymentStatus.tsx";

export default function SaleTable({sales, loading = false, ...props}: { sales: SaleInterface[], loading?: boolean }) {
	const {setFieldQueryParams, pagination, queryParams} = useSaleStore()
	const routesCustomer = useRoutesCustomer()
	const routesSale = useRoutesSale()
	
	return <Table
		columns={[
			{
				key: "ID",
				title: "ID",
				render: (_, row) => {
					return row.id
				}
			},
			{
				key: "Référence",
				title: "Référence",
				render: (_, row) => {
					return row.reference
				}
			},
			{
				key: "Client",
				title: "Client",
				render: (_, row) => {
					return <Typography.Link
						onClick={() => routesCustomer.goToShow({id: row.customer.id})}
					>
						{`${row.customer.name} - ${row.contact.name}`}
					</Typography.Link>
				}
			},
			{
				key: "Nombre de produit",
				title: "Nombre de produit",
				render: (_, row) => {
					return `${row.items_count} produit(s)`
				}
			},
			{
				key: "Montant total",
				title: "Montant total",
				render: (_, row) => <PaymentStatus
					sale_sum={row.total_price}
					payment_sum={row.payment_sum}
					className='!font-bold'
				/>
			},
			{
				key: "Date",
				title: "Date",
				render: (_, row) => {
					return dayjs(row.date).format(formatDate)
				}
			},
			{
				key: "Options",
				title: "Options",
				render: (_, row) => {
					return <Space>
						<Button
							icon={<FaEye/>}
							type="primary"
							onClick={() => routesSale.goToShow({id: row.id})}
						/>
						
						<ButtonDownloadInvoiceSale
							id={row.id}
							text={null}
						/>
						
						<PaymentFormModal
							initialValues={{
								customer_id: {
									label: row?.customer?.name,
									value: row.customer_id
								},
								sale_id: {
									label: row.reference,
									value: row.id
								},
								amount: row.total_price
							}}
						/>
					</Space>
				}
			},
		]}
		dataSource={sales}
		rowKey={(record) => record.id}
		className='text-nowrap'
		scroll={{
			x: true
		}}
		pagination={{
			...tablePagination,
			total: pagination.total,
			current: queryParams.page,
			pageSize: queryParams.per_page,
		}}
		onChange={(pagination) => {
			setFieldQueryParams({field: 'page', value: pagination.current})
			setFieldQueryParams({field: 'per_page', value: pagination.pageSize})
		}}
		loading={loading}
		{...props}
	/>
}