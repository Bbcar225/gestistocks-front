import {useEffect, useState} from "react";
import {useAppStore} from "../../../store/useAppStore.ts";
import {Button, Col, Flex, Row, Space, Table} from "antd";
import {tablePagination} from "../../../constants/tableConstant.ts";
import {IoIosAddCircle} from "react-icons/io";
import dayjs from 'dayjs';
import {formatDate} from "../../../constants/dateConstant.ts";
import {FaEdit} from "react-icons/fa";
import {useSupplyGetAll} from "../../../hooks/Api/tenant/SupplyHookAPI.ts";
import {useSupplyStore} from "../../../store/useSupplyStore.ts";
import SupplyFormModal from "../../organisms/Modals/SupplyFormModal.tsx";

export default function UnitIndexPage() {
	const {setSidebar} = useAppStore()
	const [supplies, setSupplies] = useState<SupplyInterface[]>([])
	const {pagination, queryParams, setFieldPagination, setFieldQueryParams, setSupply} = useSupplyStore()
	const reqSupplyGetAll = useSupplyGetAll({queryParams})
	const {setOpenModal} = useAppStore()
	
	useEffect(() => {
		setSidebar({field: 'title', value: 'Fournisseurs'})
	}, [setSidebar]);
	
	useEffect(() => {
		if (reqSupplyGetAll.isSuccess) {
			const data = reqSupplyGetAll.data?.data
			setFieldPagination({field: 'total', value: data.meta.total})
			setSupplies(data?.data || [])
		}
	}, [reqSupplyGetAll.data, reqSupplyGetAll.isSuccess, setFieldPagination]);
	
	return <Row>
		<Col span={24} className='mb-4'>
			<Flex justify='end'>
				<Button
					type="primary"
					icon={<IoIosAddCircle/>}
					onClick={() => {
						setOpenModal()
					}}
				>
					Nouveau fournisseur
				</Button>
			</Flex>
		</Col>
		
		<Col span={24}>
			<Table
				className="text-nowrap"
				scroll={{x: true}}
				rowKey={(row) => row.id}
				loading={reqSupplyGetAll.isLoading}
				pagination={{
					...tablePagination,
					total: pagination.total,
					current: queryParams.page,
					pageSize: queryParams.per_page,
				}}
				dataSource={supplies}
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
								icon={<FaEdit/>}
								onClick={() => {
									setSupply(row)
									setOpenModal()
								}}
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
		
		<SupplyFormModal/>
	</Row>
}