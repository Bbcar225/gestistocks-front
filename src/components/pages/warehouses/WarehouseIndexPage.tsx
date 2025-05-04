import {useEffect, useState} from "react";
import {useAppStore} from "../../../store/useAppStore.ts";
import {Button, Col, Flex, Modal, Row, Space, Table} from "antd";
import {tablePagination} from "../../../constants/tableConstant.ts";
import {IoIosAddCircle} from "react-icons/io";
import {useUnitStore} from "../../../store/useUnitStore.ts";
import dayjs from 'dayjs';
import {formatDate} from "../../../constants/dateConstant.ts";
import {FaEdit} from "react-icons/fa";
import {useQueryClient} from "react-query";
import {useWarehouseGetAll, warehouseQueriesClients} from "../../../hooks/Api/tenant/WarehouseHookAPI.ts";
import {useWarehouseStore} from "../../../store/useWarehouseStore.ts";
import WarehouseForm from "../../organisms/forms/WarehouseForm.tsx";

export default function UnitIndexPage() {
	const {setSidebar} = useAppStore()
	const [warehouses, setWarehouses] = useState<WarehouseInterface[]>([])
	const {pagination, queryParams, setFieldPagination, setFieldQueryParams, setWarehouse} = useWarehouseStore()
	const [isModalOpen, setIsModalOpen] = useState(false);
	const reqWarehouseGetAll = useWarehouseGetAll({queryParams})
	
	useEffect(() => {
		setSidebar({field: 'title', value: 'Dépôts'})
	}, [setSidebar]);
	
	useEffect(() => {
		if (reqWarehouseGetAll.isSuccess) {
			const data = reqWarehouseGetAll.data?.data
			setFieldPagination({field: 'total', value: data.meta.total})
			setWarehouses(data?.data || [])
		}
	}, [reqWarehouseGetAll.data, reqWarehouseGetAll.isSuccess, setFieldPagination]);
	
	return <Row>
		<Col span={24} className='mb-4'>
			<Flex justify='end'>
				<Button
					type="primary"
					icon={<IoIosAddCircle/>}
					onClick={() => {
						setIsModalOpen(true)
					}}
				>
					Nouveau dépôt
				</Button>
			</Flex>
		</Col>
		
		<Col span={24}>
			<Table
				className="text-nowrap"
				scroll={{x: true}}
				rowKey={(row) => row.id}
				loading={reqWarehouseGetAll.isLoading}
				pagination={{
					...tablePagination,
					total: pagination.total,
					current: queryParams.page,
					pageSize: queryParams.per_page,
				}}
				dataSource={warehouses}
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
						key: 'address',
						title: 'Localisation',
						render: (_, row) => row.location
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
									setWarehouse(row)
									setIsModalOpen(true)
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
		
		<ModalCreateUnit
			open={isModalOpen}
			close={() => {
				setIsModalOpen(false);
				setWarehouse(undefined)
			}}
		/>
	</Row>
}

const ModalCreateUnit = ({open, close}: { open: boolean, close: () => void }) => {
	const {unit} = useUnitStore()
	const queryClient = useQueryClient()
	
	return <Modal
		title={unit ? "Mise à jour" : "Nouveau dépôt"}
		open={open}
		onCancel={close}
		footer={null}
	>
		<WarehouseForm
			onSuccess={() => {
				queryClient.invalidateQueries(warehouseQueriesClients.useWarehouseGetAll).then()
			}}
		/>
	</Modal>
};