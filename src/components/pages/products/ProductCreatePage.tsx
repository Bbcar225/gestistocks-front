import {useEffect, useState} from "react";
import {useAppStore} from "../../../store/useAppStore.ts";
import {Button, Card, Col, Flex, Row, Steps} from "antd";
import {ProductForm} from "../../organisms/forms/ProductForm.tsx";
import UnitEquivalenceForm from "../../organisms/forms/UnitEquivalenceForm.tsx";
import StockForm from "../../organisms/forms/StockForm.tsx";

export default function ProductIndexPage() {
	const {setSidebar} = useAppStore()
	const [current, setCurrent] = useState(2);
	const [product, setProduct] = useState<ProductInterface | undefined>({
		"id": 2,
		"unit_id": 2,
		"category_id": 1,
		"name": "veniam",
		"sku": "sit",
		"active": true,
		"created_at": "2025-04-14T22:22:04.000000Z",
		"updated_at": "2025-04-14T22:22:04.000000Z",
		"unit": {
			"id": 2,
			"name": "Pièce",
			"sort_name": "pcs",
			"created_at": "2025-04-14T22:22:04.000000Z",
			"updated_at": "2025-04-14T22:22:04.000000Z"
		},
		"category": {
			"id": 1,
			"name": "alias",
			"created_at": "2025-04-14T22:22:04.000000Z",
			"updated_at": "2025-04-14T22:22:04.000000Z"
		},
		"gallery": {
			"id": 9,
			"url": "https://placehold.co/500x500?text=harum nam ea"
		},
		"unit_equivalences": [],
		"stocks": [
			{
				"id": 2,
				"active": true,
				"price": 9001,
				"quantity": 63.18,
				"created_at": "2025-04-14T22:22:05.000000Z",
				"updated_at": "2025-04-14T22:22:05.000000Z",
				"warehouse": {
					"id": 1,
					"name": "quis",
					"location": "8, rue Picard\n19991 Leclerc-sur-Giraud",
					"created_at": "2025-04-14T22:22:05.000000Z",
					"updated_at": "2025-04-14T22:22:05.000000Z"
				}
			}
		],
		"stock": {
			"id": 2,
			"active": true,
			"price": 9001,
			"quantity": 63.18,
			"created_at": "2025-04-14T22:22:05.000000Z",
			"updated_at": "2025-04-14T22:22:05.000000Z"
		}
	})
	const [unitEquivalences, setUnitEquivalences] = useState<UnitEquivalenceInterface[]>([])
	
	const steps = [
		{
			title: 'Infos du produit',
			content: <ProductForm
				onSuccess={({product}) => {
					setProduct(product)
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
							product={product}
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
			title: 'Unité',
			content: product ?
				<Row gutter={[0, 12]}>
					<Col span={24}>
						<StockForm
							product={product}
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
	];
	
	const items = steps.map((item) => ({key: item.title, title: item.title}));
	
	function next() {
		setCurrent(current + 1);
	}
	
	// function prev() {
	// 	setCurrent(current - 1);
	// }
	
	useEffect(() => {
		setSidebar({field: 'title', value: 'Nouveau produit'})
	}, [setSidebar]);
	
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