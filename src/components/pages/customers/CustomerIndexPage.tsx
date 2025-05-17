import {useEffect, useState} from "react";
import {useAppStore} from "../../../store/useAppStore.ts";
import {Button, Col, Flex, Row, Space, Table} from "antd";
import {tablePagination} from "../../../constants/tableConstant.ts";
import {IoIosAddCircle} from "react-icons/io";
import dayjs from 'dayjs';
import {formatDate} from "../../../constants/dateConstant.ts";
import {FaEdit, FaEye} from "react-icons/fa";
import {useCustomerStore} from "../../../store/useCustomerStore.ts";
import {useCustomerGetAll} from "../../../hooks/Api/tenant/CustomerHookAPI.ts";
import {useRoutesCustomer} from "../../../routes/customerRoutes.ts";

export default function CustomerIndexPage() {
	const {setSidebar} = useAppStore()
	const [customers, setCustomers] = useState<CustomerInterface[]>([])
	const {pagination, queryParams, setFieldPagination, setFieldQueryParams, setCustomer} = useCustomerStore()
	const reqCustomerGetAll = useCustomerGetAll({queryParams})
	const routesCustomer = useRoutesCustomer()
	
	useEffect(() => {
		setSidebar({field: 'title', value: 'Clients'})
		setCustomer(undefined)
	}, [setCustomer, setSidebar]);
	
	useEffect(() => {
		if (reqCustomerGetAll.isSuccess) {
			const data = reqCustomerGetAll.data?.data
			setFieldPagination({field: 'total', value: data.meta.total})
			setCustomers(data?.data || [])
		}
	}, [reqCustomerGetAll.data, reqCustomerGetAll.isSuccess, setFieldPagination]);
	
	return <Row>
		<Col span={24} className='mb-4'>
			<Flex justify='end'>
				<Button
					type="primary"
					icon={<IoIosAddCircle/>}
					onClick={() => routesCustomer.goToCreate()}
				>
					Nouveau client
				</Button>
			</Flex>
		</Col>
		
		<Col span={24}>
			<Table
				className="text-nowrap"
				scroll={{x: true}}
				rowKey={(row) => row.id}
				loading={reqCustomerGetAll.isLoading}
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
							<Button
								type="primary"
								icon={<FaEye/>}
								onClick={() => routesCustomer.goToShow({id: row.id})}
							/>
							<Button
								icon={<FaEdit/>}
								onClick={() => routesCustomer.goToEdit({id: row.id})}
							/>
						</Space>
					},
				]}
				onChange={(pagination) => {
					setFieldQueryParams({field: 'page', value: pagination.current})
					setFieldQueryParams({field: 'per_page', value: pagination.pageSize})
				}}
			/>
		</Col>
	</Row>
}

