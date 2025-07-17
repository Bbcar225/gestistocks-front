import {tablePagination} from "../../../constants/tableConstant.ts";
import dayjs from "dayjs";
import {formatDate} from "../../../constants/dateConstant.ts";
import {Button, Space, Table} from "antd";
import {FaEye} from "react-icons/fa";
import useRoutesCustomer from "../../../hooks/routes/CustomerRoutesHook.ts";
import {useCustomerStore} from "../../../store/useCustomerStore.ts";
import PaymentFormModal from "../../organisms/Modals/PaymentFormModal.tsx";
import PaymentStatus from "../PaymentStatus.tsx";
import {useQueryClient} from "react-query";
import {customerQueriesClients} from "../../../hooks/Api/tenant/CustomerHookAPI.ts";

export default function CustomerTable({loading, customers, ...props}: {
	loading?: boolean,
	customers: CustomerInterface[],
}) {
	const routesCustomer = useRoutesCustomer()
	const {pagination, queryParams, setFieldQueryParams} = useCustomerStore()
	const queryClient = useQueryClient()
	
	return <Table
		className="text-nowrap"
		scroll={{x: true}}
		rowKey={(row) => row.id}
		loading={loading}
		pagination={{
			...tablePagination,
			total: pagination.total,
			current: queryParams.page,
			pageSize: queryParams.per_page,
		}}
		dataSource={customers}
		columns={[
			{
				key: 'id',
				title: 'ID',
				render: (_, row) => row.id
			},
			{
				key: 'name',
				title: 'Nom',
				render: (_, row) => row.name
			},
			{
				key: 'Pays',
				title: 'Pays',
				render: (_, row) => row.country
			},
			{
				key: 'Ville',
				title: 'Ville',
				render: (_, row) => row.city
			},
			{
				key: 'Adresse',
				title: 'Adresse',
				render: (_, row) => row.address
			},
			{
				key: 'Paiement',
				title: 'Statut paiements',
				render: (_, row) => <PaymentStatus
					payment_sum={row.payment_sum}
					sale_sum={row.sale_sum}
					className='!p-1 !font-bold'
				/>
			},
			{
				key: 'date',
				title: 'Date',
				render: (_, row) => dayjs(row.created_at).format(formatDate),
			},
			{
				key: 'options',
				title: 'Options',
				fixed: 'right',
				render: (_, row) => <Space
					direction='horizontal'
				>
					<Space
						direction='horizontal'
					>
						<Button
							type="primary"
							icon={<FaEye/>}
							onClick={() => routesCustomer.goToShow({id: row.id})}
						/>
						
						<PaymentFormModal
							initialValues={{
								customer_id: {
									label: row.name,
									value: row.id
								}
							}}
							onSuccess={() => queryClient.invalidateQueries(customerQueriesClients.useCustomerGetAll).then()}
						/>
					</Space>
				</Space>
			},
		]}
		onChange={(pagination) => {
			setFieldQueryParams({field: 'page', value: pagination.current})
			setFieldQueryParams({field: 'per_page', value: pagination.pageSize})
		}}
		{...props}
	/>
}