import {useEffect, useState} from "react";
import {useSidebarStore} from "../../../store/useAppStore.ts";
import {Button, Col, Flex, Image, Row, Space, Table, Tag} from "antd";
import {useProductGetAll} from "../../../hooks/Api/tenant/ProductHookAPI.ts";
import {formatPrice} from "../../../utils/priceUtils.ts";
import {FaEye} from "react-icons/fa";
import {useRoutesProduct} from "../../../routes/productRoutes.ts";
import {IoIosAddCircle} from "react-icons/io";

export default function ProductIndexPage() {
	const {setSidebar} = useSidebarStore()
	const reqProductGetAll = useProductGetAll()
	const [products, setProducts] = useState<ProductInterface[]>([])
	const {goToProductShow, goToProductCreate} = useRoutesProduct()
	
	useEffect(() => {
		setSidebar({field: 'title', value: 'Produits'})
	}, [setSidebar]);
	
	useEffect(() => {
		if (reqProductGetAll.isSuccess) {
			const res = reqProductGetAll.data
			const data = res.data
			const products = data.data || []
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
							width={80}
							src={row.gallery.url}
							alt={row.name}
						/>
					},
					{
						key: "name",
						title: "Nom",
						render: (_, row) => row.name
					},
					{
						key: "price",
						title: "Prix",
						render: (_, row) => {
							const stock = row.stock
							return formatPrice(stock.price)
						}
					},
					{
						key: "quantity",
						title: "Quantité",
						render: (_, row) => {
							const stock = row.stock
							const unit = row.unit
							return <Tag
								color={stock.quantity > 2 ? 'green' : 'red'}
								className='font-bold'
							>
								{`${stock.quantity} ${unit.name}`}
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
							</Space>
						}
					}
				]}
			/>
		</Col>
	</Row>
}