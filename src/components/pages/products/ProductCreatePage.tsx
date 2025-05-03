import {useEffect, useState} from "react";
import {useAppStore} from "../../../store/useAppStore.ts";
import {Button, Card, Col, Flex, Row, Steps} from "antd";
import {ProductForm} from "../../organisms/forms/ProductForm.tsx";
import UnitEquivalenceForm from "../../organisms/forms/UnitEquivalenceForm.tsx";

export default function ProductIndexPage() {
	const {setSidebar} = useAppStore()
	const [current, setCurrent] = useState(0);
	const [product, setProduct] = useState<ProductInterface | undefined>(undefined)
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
			title: 'Last',
			content: 'Last-content',
		},
	];
	
	const items = steps.map((item) => ({key: item.title, title: item.title}));
	
	function next() {
		setCurrent(current + 1);
	}
	
	function prev() {
		setCurrent(current - 1);
	}
	
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