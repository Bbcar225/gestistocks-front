import {useEffect, useState} from "react";
import {useAppStore} from "../../../store/useAppStore.ts";
import {Button, Card, Col, Flex, Row, Steps} from "antd";
import {ProductForm} from "../../organisms/Forms/ProductForm.tsx";
import UnitEquivalenceForm from "../../organisms/Forms/UnitEquivalenceForm.tsx";
import StockForm from "../../organisms/Forms/StockForm.tsx";
import {useRoutesProduct} from "../../../routes/productRoutes.ts";
import useGalleryStore from "../../../store/useGalleryStore.ts";
import {useProductStore} from "../../../store/useProductStore.ts";

export default function ProductIndexPage() {
	const {setSidebar} = useAppStore()
	const [current, setCurrent] = useState(0);
	const [unitEquivalences, setUnitEquivalences] = useState<UnitEquivalenceInterface[]>([])
	const {goToProductShow} = useRoutesProduct()
	const {setGallery} = useGalleryStore()
	const {product, setProduct} = useProductStore()
	
	const steps = [
		{
			title: 'Infos du produit',
			content: <ProductForm
				onSuccess={() => {
					setGallery(undefined)
					next()
				}}
			/>,
		},
		{
			title: 'Unité',
			content: product ?
				<Row gutter={[0, 12]}>
					<Col span={24}>
						<UnitEquivalenceForm
							onSuccess={({unitEquivalence}) => {
								if (unitEquivalence) {
									setUnitEquivalences((prevState) => {
										const unitEquivalences = [...prevState]
										return [...unitEquivalences, unitEquivalence]
									})
								}
							}}
						/>
					</Col>
					
					{unitEquivalences.length > 0 && <Flex justify='center' className='w-screen'>
			<Button
				type="default"
				className='w-1/3'
				loading={false}
				onClick={next}
			>
			  Suivant
			</Button>
		  </Flex>}
				</Row> :
				<></>,
		},
		{
			title: 'Stock',
			content: product ?
				<Row gutter={[0, 12]}>
					<Col span={24}>
						<StockForm
							onSuccess={() => goToProductShow(product)}
							product={product}
						/>
					</Col>
				</Row> :
				<></>,
		},
	];
	
	const items = steps.map((item) => ({key: item.title, title: item.title}));
	
	function next() {
		setCurrent(current + 1);
	}
	
	useEffect(() => {
		setSidebar({field: 'title', value: 'Nouveau produit'})
		setProduct(undefined)
		setGallery(undefined)
	}, [setGallery, setProduct, setSidebar]);
	
	return <Row>
		<Col span={24}>
			<Card
				title={<Steps current={current} items={items}/>}
			>
				<Row>
					<Col span={24}>
						{steps[current].content}
					</Col>
				</Row>
			</Card>
		</Col>
	</Row>
}