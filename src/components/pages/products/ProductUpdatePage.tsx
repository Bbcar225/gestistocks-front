import {useEffect, useState} from "react";
import {useAppStore} from "../../../store/useAppStore.ts";
import {Button, Card, Col, Flex, Row, Spin, Steps} from "antd";
import {ProductForm} from "../../organisms/forms/ProductForm.tsx";
import UnitEquivalenceForm from "../../organisms/forms/UnitEquivalenceForm.tsx";
import StockForm from "../../organisms/forms/StockForm.tsx";
import {useRoutesProduct} from "../../../routes/productRoutes.ts";
import useGalleryStore from "../../../store/useGalleryStore.ts";
import {useProductGetOne} from "../../../hooks/Api/tenant/ProductHookAPI.ts";
import {useParams} from "react-router-dom";
import {useProductStore} from "../../../store/useProductStore.ts";
import {GrLinkNext} from "react-icons/gr";

export default function ProductUpdatePage() {
	const {product: productId} = useParams()
	const {setSidebar} = useAppStore()
	const [current, setCurrent] = useState(0);
	const [unitEquivalences, setUnitEquivalences] = useState<UnitEquivalenceInterface[]>([])
	const {goToProductShow} = useRoutesProduct()
	const {setGallery} = useGalleryStore()
	const reqProductGetOne = useProductGetOne({
		id: productId
	})
	const {product, setProduct} = useProductStore()
	
	const steps = [
		{
			title: 'Infos du produit',
			content: <ProductForm
				onSuccess={() => {
					setGallery(undefined)
					next()
				}}
				product={product}
			/>,
		},
		{
			title: 'Unités',
			content: product ?
				<Row gutter={[0, 12]}>
					{product.unit_equivalences.map((unitEquivalence, index) => {
						return <Col span={24} key={index}>
							<Card
								title={`Mise de l'équivalence : ${product.unit.name} vers ${unitEquivalence.unit.name}`}
							>
								<UnitEquivalenceForm
									onSuccess={({unitEquivalence}) => {
										if (unitEquivalence) {
											setUnitEquivalences((prevState) => {
												const unitEquivalences = [...prevState]
												return [...unitEquivalences, unitEquivalence]
											})
										}
									}}
									unitEquivalence={unitEquivalence}
								/>
							</Card>
						</Col>
					})}
					<Col span={24} className='mt-3'>
						<Card
							title="Nouvelle équivalence"
						>
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
						</Card>
					</Col>
					
					{unitEquivalences.length > 0 && <Flex justify='center' className='w-screen'>
			<Button
				type="default"
				className='w-1/3'
				loading={false}
				onClick={next}
				icon={<GrLinkNext />}
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
		setSidebar({field: 'title', value: 'Édition de produit'})
	}, [setSidebar]);
	
	useEffect(() => {
		if (reqProductGetOne.status === 'success') {
			const res = reqProductGetOne.data
			const product = res.data
			setUnitEquivalences(product.unit_equivalences || [])
			setProduct(product)
		}
	}, [reqProductGetOne.status, reqProductGetOne.data]);
	
	return <Spin spinning={reqProductGetOne.isLoading}>
		<Row>
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
	</Spin>
}