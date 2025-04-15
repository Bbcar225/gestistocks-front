import {useEffect, useState} from "react";
import {useSidebarStore} from "../../../store/useAppStore.ts";
import {Button, Col, Flex, Image, Modal, Pagination, Row, Spin} from "antd";
import {IoIosAddCircle} from "react-icons/io";
import {galleryQueriesClients, useGalleryGetAll} from "../../../hooks/Api/tenant/GalleryHookAPI.ts";
import useGalleryStore from "../../../store/useGalleryStore.ts";
import {tablePagination} from "../../../constants/tableConstant.ts";
import GalleryForm from "../../organisms/forms/GalleryForm.tsx";
import {useQueryClient} from "react-query";

export default function CategoryIndexPage() {
	const {setSidebar} = useSidebarStore()
	const [isModalOpen, setIsModalOpen] = useState(false);
	const reqGalleryGetAll = useGalleryGetAll()
	const [galleries, setGalleries] = useState<GalleryInterface[]>([])
	const {pagination, setFieldPagination, setFieldQueryParams, queryParams} = useGalleryStore()
	
	useEffect(() => {
		setSidebar({field: 'title', value: 'Galeries'})
	}, [setSidebar]);
	
	useEffect(() => {
		if (reqGalleryGetAll.isSuccess) {
			const res = reqGalleryGetAll.data
			const data = res.data
			setFieldPagination({field: 'total', value: data.meta.total})
			const galleries = data.data || []
			setGalleries(galleries)
		}
	}, [reqGalleryGetAll.data, reqGalleryGetAll.isSuccess, setFieldPagination]);
	
	return <Row>
		<Col span={24} className='mb-1'>
			<Flex justify='end'>
				<Button
					type="primary"
					icon={<IoIosAddCircle/>}
					onClick={() => {
						setIsModalOpen(true)
					}}
				>
					Nouvelle
				</Button>
			</Flex>
		</Col>
		
		<Spin spinning={reqGalleryGetAll.isLoading}>
			<Col span={24} className='text-center'>
				<Image.PreviewGroup>
					{galleries.map((gallery, index) => {
						return <Image
							key={index}
							width={170}
							height={170}
							src={gallery.url}
							className='p-1 object-cover'
						/>
					})}
				</Image.PreviewGroup>
			</Col>
			
			<Col span={24} className="my-3">
				<Pagination
					align="center"
					current={queryParams.page}
					defaultCurrent={queryParams.page}
					total={pagination.total}
					showSizeChanger
					pageSizeOptions={tablePagination.pageSizeOptions}
					pageSize={queryParams.per_page}
					onChange={(page, pageSize) => {
						setFieldQueryParams({field: 'page', value: page})
						setFieldQueryParams({field: 'per_page', value: pageSize})
					}}
				/>
			</Col>
		</Spin>
		
		<ModalCreate
			open={isModalOpen}
			close={() => {
				setIsModalOpen(false)
			}}
		/>
	</Row>
}

const ModalCreate = ({open, close}: { open: boolean, close: () => void }) => {
	const queryClient = useQueryClient()
	
	return <Modal
		title="Nouvel"
		open={open}
		onCancel={close}
		footer={null}
	>
		<GalleryForm
			onSuccess={() => queryClient.invalidateQueries(galleryQueriesClients.useGalleryGetAll)}
		/>
	</Modal>
};