import {tablePagination} from "../../../constants/tableConstant.ts";
import dayjs from "dayjs";
import {formatDate} from "../../../constants/dateConstant.ts";
import {Button, Space, Table} from "antd";
import {FaEye} from "react-icons/fa";
import useRoutesCustomer from "../../../hooks/routes/CustomerRoutesHook.ts";
import {useCustomerStore} from "../../../store/useCustomerStore.ts";
import PaymentFormModal from "../../organisms/Modals/PaymentFormModal.tsx";

export default function CustomerTable({loading, customers, ...props}: {
	loading?: boolean,
	customers: CustomerInterface[],
}) {
	const routesCustomer = useRoutesCustomer()
	const {pagination, queryParams, setFieldQueryParams} = useCustomerStore()
	
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
				key: 'date',
				title: 'Date',
				render: (_, row) => dayjs(row.created_at).format(formatDate),
			},
			{
				key: 'options',
				title: 'Options',
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