import {useEffect, useState} from "react";
import {useAppStore} from "../../../store/useAppStore.ts";
import {Button, Col, Flex, Image, Row, Space, Table, Tag} from "antd";
import {useProductGetAll} from "../../../hooks/Api/tenant/ProductHookAPI.ts";
import {formatPrice} from "../../../utils/priceUtils.ts";
import {FaEdit, FaEye} from "react-icons/fa";
import {useRoutesProduct} from "../../../routes/productRoutes.ts";
import {IoIosAddCircle} from "react-icons/io";
import {tablePagination} from "../../../constants/tableConstant.ts";
import {useProductStore} from "../../../store/useProductStore.ts";

export default function ProductIndexPage() {
	const {setSidebar} = useAppStore()
	const [products, setProducts] = useState<ProductInterface[]>([])
	const {goToProductShow, goToProductCreate, goToEdit} = useRoutesProduct()
	const {pagination, queryParams, setFieldPagination, setFieldQueryParams, setProduct} = useProductStore()
	const reqProductGetAll = useProductGetAll({queryParams})
	
	useEffect(() => {
		setSidebar({field: 'title', value: 'Produits'})
	}, [setSidebar]);
	
	useEffect(() => {
		if (reqProductGetAll.isSuccess) {
			const res = reqProductGetAll.data
			const data = res.data
			const products = data.data || []
			setFieldPagination({field: 'total', value: data.meta.total})
			setProducts(products)
		}
	}, [reqProductGetAll.data, reqProductGetAll.isSuccess]);
	
	return <Row>
		<Col span={24} className='mb-4'>
			<Flex justify='end'>
				<Button
					type="primary"
					icon={<IoIosAddCircle/>}
					onClick={goToProductCreate}
				>
					Nouveau produit
				</Button>
			</Flex>
		</Col>
		
		<Col span={24}>
			<Table
				className="text-nowrap"
				scroll={{x: true}}
				loading={reqProductGetAll.isLoading}
				rowKey={(row) => row.id}
				dataSource={products}
				columns={[
					{
						key: "id",
						title: "ID",
						render: (_, row) => row.id
					},
					{
						key: "image",
						title: "Image",
						render: (_, row) => <Image
							width={70}
							height={70}
							src={row.gallery.url}
							alt={row.name}
							className="object-cover"
						/>
					},
					{
						key: "name",
						title: "Nom",
						render: (_, row) => `${row.name} - ${row.sku}`
					},
					{
						key: "price",
						title: "Prix",
						render: (_, row) => {
							const stock = row.stock
							return formatPrice(stock?.price || 0)
						}
					},
					{
						key: "quantity",
						title: "Quantité",
						render: (_, row) => {
							const stock = row.stock
							const unit = row.unit
							return <Tag
								color={stock?.quantity > 2 ? 'green' : 'red'}
								className='font-bold'
							>
								{`${stock?.quantity} ${unit.name}`}
							</Tag>
						}
					},
					{
						key: "options",
						title: "Options",
						render: (_, row) => {
							return <Space>
								<Button
									type="primary"
									icon={<FaEye/>}
									onClick={() => goToProductShow(row)}
								/>
								<Button
									type="default"
									icon={<FaEdit/>}
									onClick={() => {
										setProduct(row)
										goToEdit({id: row.id})
									}}
								/>
							</Space>
						}
					}
				]}
				pagination={{
					...tablePagination,
					total: pagination.total,
					current: queryParams.page,
					pageSize: queryParams.per_page,
				}}
				onChange={(pagination) => {
					setFieldQueryParams({field: 'page', value: pagination.current})
					setFieldQueryParams({field: 'per_page', value: pagination.pageSize})
				}}
			/>
		</Col>
	</Row>
}