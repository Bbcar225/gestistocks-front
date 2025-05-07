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
import {warehouseQueriesClients} from "../../../hooks/Api/tenant/WarehouseHookAPI.ts";
import WarehouseForm from "../../organisms/forms/WarehouseForm.tsx";
import {useSupplyGetAll} from "../../../hooks/Api/tenant/SupplyHookAPI.ts";
import {useSupplyStore} from "../../../store/useSupplyStore.ts";

export default function UnitIndexPage() {
	const {setSidebar} = useAppStore()
	const [supplies, setSupplies] = useState<SupplyInterface[]>([])
	const {pagination, queryParams, setFieldPagination, setFieldQueryParams, setSupply} = useSupplyStore()
	const [isModalOpen, setIsModalOpen] = useState(false);
	const reqSupplyGetAll = useSupplyGetAll({queryParams})
	
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
						setIsModalOpen(true)
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
				setSupply(undefined)
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