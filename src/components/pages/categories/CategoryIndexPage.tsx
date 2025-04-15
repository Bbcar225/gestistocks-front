import {useEffect, useState} from "react";
import {useSidebarStore} from "../../../store/useAppStore.ts";
import {Button, Col, Flex, Modal, Row, Space, Table} from "antd";
import {tablePagination} from "../../../constants/tableConstant.ts";
import {IoIosAddCircle} from "react-icons/io";
import dayjs from 'dayjs';
import {formatDate} from "../../../constants/dateConstant.ts";
import {FaEdit} from "react-icons/fa";
import {categoryQueriesClients, useCategoryGetAll} from "../../../hooks/Api/tenant/CategoryHookAPI.ts";
import {useQueryClient} from "react-query";
import CategoryForm from "../../organisms/forms/CategoryForm.tsx";
import {useCategoryStore} from "../../../store/useCategoryStore.ts";

export default function CategoryIndexPage() {
	const {setSidebar} = useSidebarStore()
	const [isModalOpen, setIsModalOpen] = useState(false);
	const reqCategoryGetAll = useCategoryGetAll()
	const [categories, setCategories] = useState<CategoryInterface[]>([])
	const {setCategory} = useCategoryStore()
	const {pagination, queryParams, setFieldPagination, setFieldQueryParams} = useCategoryStore()
	
	useEffect(() => {
		setSidebar({field: 'title', value: 'Catégories'})
	}, [setSidebar]);
	
	useEffect(() => {
		if (reqCategoryGetAll.isSuccess) {
			const res = reqCategoryGetAll.data
			const data = res.data
			setFieldPagination({field: 'total', value: data.meta.total})
			setCategories(data.data || [])
		}
	}, [reqCategoryGetAll.data, reqCategoryGetAll.isSuccess]);
	
	return <Row>
		<Col span={24}>
			<Flex justify='end'>
				<Button
					type="primary"
					icon={<IoIosAddCircle/>}
					onClick={() => {
						setIsModalOpen(true)
					}}
				>
					Nouvelle catégories
				</Button>
			</Flex>
		</Col>
		
		<Col span={24}>
			<Table
				className="text-nowrap"
				scroll={{x: true}}
				rowKey={(row) => row.id}
				loading={reqCategoryGetAll.isLoading}
				pagination={{
					...tablePagination,
					total: pagination.total,
					current: queryParams.page,
					pageSize: queryParams.per_page,
				}}
				dataSource={categories}
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
									setCategory(row)
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
		
		<ModalCreateCategory
			open={isModalOpen}
			close={() => {
				setCategory(undefined)
				setIsModalOpen(false)
			}}
		/>
	</Row>
}

const ModalCreateCategory = ({open, close}: { open: boolean, close: () => void }) => {
	const {category} = useCategoryStore()
	const queryClient = useQueryClient()
	
	return <Modal
		title={category ? "Mise à jour" : "Nouvelle catégorie"}
		open={open}
		onCancel={close}
		footer={null}
	>
		<CategoryForm
			onSuccess={() => {
				queryClient.invalidateQueries(categoryQueriesClients.useCategoryGetAll).then()
			}}
		/>
	</Modal>
};