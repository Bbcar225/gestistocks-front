import {Col, Image, Pagination, Spin} from "antd";
import {tablePagination} from "../../constants/tableConstant.ts";
import {useEffect, useState} from "react";
import useGalleryStore from "../../store/useGalleryStore.ts";
import {useGalleryGetAll} from "../../hooks/Api/tenant/GalleryHookAPI.ts";
import {useAppStore} from "../../store/useAppStore.ts";

export default function Gallery({preview = true}: {
	preview?: boolean,
}) {
	const [galleries, setGalleries] = useState<GalleryInterface[]>([])
	const {pagination, setFieldPagination, setFieldQueryParams, queryParams} = useGalleryStore()
	const reqGalleryGetAll = useGalleryGetAll()
	const {setGallery} = useGalleryStore()
	const {setOpenModal} = useAppStore()
	
	useEffect(() => {
		if (reqGalleryGetAll.isSuccess) {
			const res = reqGalleryGetAll.data
			const data = res.data
			setFieldPagination({field: 'total', value: data.meta.total})
			const galleries = data.data || []
			setGalleries(galleries)
		}
	}, [reqGalleryGetAll.data, reqGalleryGetAll.isSuccess, setFieldPagination]);
	
	return <Spin spinning={reqGalleryGetAll.isLoading}>
		<Col
			span={24}
			className='text-center'
		>
			<Image.PreviewGroup
			>
				{galleries.map((gallery, index) => {
					return <Image
						key={index}
						width={170}
						height={170}
						src={gallery.url}
						className='p-1.5 object-cover cursor-pointer'
						preview={preview}
						onClick={() => {
							setGallery(gallery)
							setOpenModal(false)
						}}
					/>
				})}
			</Image.PreviewGroup>
		</Col>
		
		<Col span={24} className="my-3">
			<Pagination
				align="end"
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
}