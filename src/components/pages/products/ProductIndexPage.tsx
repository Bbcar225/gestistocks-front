import {useEffect, useState} from "react";
import {useAppStore} from "../../../store/useAppStore.ts";
import {Button, Col, Flex, Row} from "antd";
import {useProductGetAll} from "../../../hooks/Api/tenant/ProductHookAPI.ts";
import {useRoutesProduct} from "../../../routes/productRoutes.ts";
import {IoIosAddCircle} from "react-icons/io";
import {useProductStore} from "../../../store/useProductStore.ts";
import ProductTable from "../../molecules/Tables/ProductTable.tsx";

export default function ProductIndexPage() {
	const {setSidebar} = useAppStore()
	const [products, setProducts] = useState<ProductInterface[]>([])
	const {goToProductCreate} = useRoutesProduct()
	const {queryParams, setFieldPagination} = useProductStore()
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
			<ProductTable
				products={products}
				loading={reqProductGetAll.isLoading}
			/>
		</Col>
	</Row>
}