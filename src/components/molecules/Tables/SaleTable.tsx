import {Button, Space, Table, Typography} from "antd";
import {formatPrice} from "../../../utils/priceUtils.ts";
import dayjs from "dayjs";
import {formatDate} from "../../../constants/dateConstant.ts";
import {FaEye} from "react-icons/fa";
import {tablePagination} from "../../../constants/tableConstant.ts";
import {SaleInterface} from "../../../interfaces/models/SaleInterface";
import useSaleStore from "../../../store/useSaleStore.ts";
import useRoutesCustomer from "../../../hooks/routes/CustomerRoutesHook.ts";
import useRoutesSale from "../../../hooks/routes/SaleRoutesHook.ts";

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
				render: (_, row) => {
					return formatPrice(row.total_price)
				}
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