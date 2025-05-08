import {useEffect, useState} from "react";
import {useAppStore} from "../../../store/useAppStore.ts";
import {Button, Col, Flex, Modal, Row, Space, Table, Tooltip} from "antd";
import {tablePagination} from "../../../constants/tableConstant.ts";
import {IoIosAddCircle} from "react-icons/io";
import dayjs from 'dayjs';
import {formatDate} from "../../../constants/dateConstant.ts";
import {FaEdit} from "react-icons/fa";
import {useSupplyGetAll, useSupplyGetOne} from "../../../hooks/Api/tenant/SupplyHookAPI.ts";
import {useSupplyStore} from "../../../store/useSupplyStore.ts";
import SupplyFormModal from "../../organisms/Modals/SupplyFormModal.tsx";
import {MdContactPhone} from "react-icons/md";
import ContactTable from "../../molecules/Tables/ContactTable.tsx";

export default function UnitIndexPage() {
	const {setSidebar} = useAppStore()
	const [supplies, setSupplies] = useState<SupplyInterface[]>([])
	const {pagination, queryParams, supply, setFieldPagination, setFieldQueryParams, setSupply} = useSupplyStore()
	const reqSupplyGetAll = useSupplyGetAll({queryParams})
	const {setOpenModal, setTypeModal, typeModal} = useAppStore()
	
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
						setTypeModal('create')
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
							<Tooltip
								title="Contacts"
							>
								<Button
									type='primary'
									icon={<MdContactPhone/>}
									onClick={() => {
										setOpenModal()
										setTypeModal('other')
										setSupply(row)
									}}
								/>
							</Tooltip>
							<Button
								icon={<FaEdit/>}
								onClick={() => {
									setSupply(row)
									setOpenModal()
									setTypeModal('update')
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
		
		{(typeModal === 'create' || typeModal === 'update') && <SupplyFormModal/>}
		{(typeModal === 'other' && supply) && <ContactTableModal/>}
	</Row>
}

const ContactTableModal = ({...props}) => {
	const {openModal, setOpenModal} = useAppStore()
	const {supply, setSupply} = useSupplyStore()
	const reqSupplyGetOne = useSupplyGetOne({
		id: supply?.id,
		enabled: !!supply
	})
	
	useEffect(() => {
		if (reqSupplyGetOne.status === 'success') {
			const res = reqSupplyGetOne.data
			const supply = res?.data
			setSupply(supply)
		}
	}, [reqSupplyGetOne.status, reqSupplyGetOne.data]);
	
	return <Modal
		title={`Liste de contacts: ${supply?.name}`}
		open={openModal}
		onCancel={() => {
			setOpenModal()
			setSupply(undefined)
		}}
		footer={null}
		width={1100}
		loading={reqSupplyGetOne.isLoading}
		{...props}
	>
		<ContactTable contacts={supply?.contacts || []}/>
	</Modal>
};