import {useEffect, useState} from "react";
import {useAppStore} from "../../../store/useAppStore.ts";
import {Button, Col, Flex, Modal, Row, Space, Table, Tooltip} from "antd";
import {tablePagination} from "../../../constants/tableConstant.ts";
import {IoIosAddCircle} from "react-icons/io";
import dayjs from 'dayjs';
import {formatDate} from "../../../constants/dateConstant.ts";
import {FaEdit} from "react-icons/fa";
import {useSupplierGetAll, useSupplierGetOne} from "../../../hooks/Api/tenant/SupplierHookAPI.ts";
import {useSupplierStore} from "../../../store/useSupplierStore.ts";
import SupplierFormModal from "../../organisms/Modals/SupplierFormModal.tsx";
import {MdContactPhone} from "react-icons/md";
import ContactTable from "../../molecules/Tables/ContactTable.tsx";
import {RiUserAddFill} from "react-icons/ri";
import ContactFormModal from "../../organisms/Modals/ContactFormModal.tsx";

export default function SupplierIndexPage() {
	const {setSidebar} = useAppStore()
	const [supplies, setSupplies] = useState<SupplierInterface[]>([])
	const {pagination, queryParams, supplier, setFieldPagination, setFieldQueryParams, setSupplier} = useSupplierStore()
	const reqSupplierGetAll = useSupplierGetAll({queryParams})
	const {setOpenModal, setTypeModal, typeModal} = useAppStore()
	const [isModalOpen, setIsModalOpen] = useState(false);
	
	useEffect(() => {
		setSidebar({field: 'title', value: 'Fournisseurs'})
	}, [setSidebar]);
	
	useEffect(() => {
		if (reqSupplierGetAll.isSuccess) {
			const data = reqSupplierGetAll.data?.data
			setFieldPagination({field: 'total', value: data.meta.total})
			setSupplies(data?.data || [])
		}
	}, [reqSupplierGetAll.data, reqSupplierGetAll.isSuccess, setFieldPagination]);
	
	return <Row>
		<Col span={24} className='mb-4'>
			<Flex justify='end'>
				<Button
					type="primary"
					icon={<IoIosAddCircle/>}
					onClick={() => {
						setOpenModal(true)
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
				loading={reqSupplierGetAll.isLoading}
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
										setOpenModal(true)
										setTypeModal('other')
										setSupplier(row)
									}}
								/>
							</Tooltip>
							<Tooltip
								title="Nouveau contact"
							>
								<Button
									type='default'
									icon={<RiUserAddFill/>}
									onClick={() => {
										setSupplier(row)
										setIsModalOpen(true)
									}}
								/>
							</Tooltip>
							<Button
								icon={<FaEdit/>}
								onClick={() => {
									setSupplier(row)
									setOpenModal(true)
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
		
		{supplier && <ContactFormModal openModal={isModalOpen} onClose={() => {
			setIsModalOpen(false)
			setSupplier(undefined)
		}}/>}
		{(typeModal === 'create' || typeModal === 'update') && <SupplierFormModal/>}
		{(typeModal === 'other' && supplier) && <ContactTableModal/>}
	</Row>
}

const ContactTableModal = ({...props}) => {
	const {openModal, setOpenModal, setTypeModal} = useAppStore()
	const {supplier, setSupplier} = useSupplierStore()
	const reqSupplierGetOne = useSupplierGetOne({
		id: supplier?.id,
		enabled: !!supplier
	})
	
	useEffect(() => {
		if (reqSupplierGetOne.status === 'success') {
			const res = reqSupplierGetOne.data
			const supplier = res?.data
			setSupplier(supplier)
		}
	}, [reqSupplierGetOne.status, reqSupplierGetOne.data, setSupplier]);
	
	return <Modal
		title={`Liste de contacts: ${supplier?.name}`}
		open={openModal}
		onCancel={() => {
			setOpenModal(false)
			setSupplier(undefined)
			setTypeModal(undefined)
		}}
		footer={null}
		width={1100}
		loading={reqSupplierGetOne.isLoading}
		{...props}
	>
		<ContactTable contacts={supplier?.contacts || []}/>
	</Modal>
};