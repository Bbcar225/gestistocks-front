import {useEffect, useState} from "react";
import {useSidebarStore} from "../../../store/useAppStore.ts";
import {Button, Col, Flex, Modal, Row, Space, Table} from "antd";
import {queriesClientsUnit, useUnitGetAll} from "../../../hooks/Api/tenant/UnitHookAPI.ts";
import {tablePagination} from "../../../constants/tableConstant.ts";
import {IoIosAddCircle} from "react-icons/io";
import {useUnitStore} from "../../../store/useUnitStore.ts";
import UnitForm from "../../organisms/forms/UnitForm.tsx";
import dayjs from 'dayjs';
import {formatDate} from "../../../constants/dateConstant.ts";
import {FaEdit} from "react-icons/fa";
import {useQueryClient} from "react-query";

export default function UnitIndexPage() {
	const {setSidebar} = useSidebarStore()
	const reqUnitGetAll = useUnitGetAll()
	const [units, setUnits] = useState<UnitInterface[]>([])
	const {pagination, queryParams, setFieldPagination, setFieldQueryParams, setUnit} = useUnitStore()
	const [isModalOpen, setIsModalOpen] = useState(false);
	
	useEffect(() => {
		setSidebar({field: 'title', value: 'Unités'})
	}, [setSidebar]);
	
	useEffect(() => {
		if (reqUnitGetAll.isSuccess) {
			const data = reqUnitGetAll.data.data
			setFieldPagination({field: 'total', value: data.meta.total})
			setUnits(data.data || [])
		}
	}, [reqUnitGetAll.data, reqUnitGetAll.isSuccess, setFieldPagination]);
	
	return <Row gutter={[24, 12]}>
		<Col span={24}>
			<Flex justify='end'>
				<Button
					type="primary"
					icon={<IoIosAddCircle/>}
					onClick={() => {
						setIsModalOpen(true)
					}}
				>
					Nouvelle unité
				</Button>
			</Flex>
		</Col>
		
		<Col span={24}>
			<Table
				className="text-nowrap"
				scroll={{x: true}}
				rowKey={(row) => row.id}
				loading={reqUnitGetAll.isLoading}
				pagination={{
					...tablePagination,
					total: pagination.total,
					current: queryParams.page,
					pageSize: queryParams.per_page,
				}}
				dataSource={units}
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
						key: 'sort_name',
						title: 'Nom court',
						render: (_, row) => row.sort_name
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
									setUnit(row)
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
				setUnit(undefined)
			}}
		/>
	</Row>
}

const ModalCreateUnit = ({open, close}: { open: boolean, close: () => void }) => {
	const {unit} = useUnitStore()
	const queryClient = useQueryClient()
	
	return <Modal
		title={unit ? "Mise à jour" : "Nouvelle unité"}
		open={open}
		onCancel={close}
		footer={null}
	>
		<UnitForm
			onSuccess={() => {
				queryClient.invalidateQueries(queriesClientsUnit.useUnitGetAll).then()
			}}
		/>
	</Modal>
};