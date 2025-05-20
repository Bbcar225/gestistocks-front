import {useProductGetAll} from "../../hooks/Api/tenant/ProductHookAPI.ts";
import {useEffect, useState} from "react";
import {Button, Card, Col, Flex, Form, Image, InputNumber, Modal, Row, Space, Tag, Typography} from "antd";
import Meta from "antd/es/card/Meta";
import {isMobile} from "react-device-detect";
import SelectUnitEquivalence from "./Selects/SelectUnitEquivalence.tsx";
import {FaCartPlus} from "react-icons/fa";
import {formatPrice} from "../../utils/priceUtils.ts";

export default function ProductsCard() {
	const reqProductGetAll = useProductGetAll()
	const [products, setProducts] = useState<ProductInterface[]>([])
	const [product, setProduct] = useState<ProductInterface | undefined>(undefined)
	
	useEffect(() => {
		if (reqProductGetAll.status === 'success') {
			const res = reqProductGetAll.data
			const data = res.data
			const products = data?.data || []
			setProducts(products)
		}
	}, [reqProductGetAll.data, reqProductGetAll.status]);
	
	return <Row gutter={isMobile ? 8 : 24}>
		{products.map((product, index) => {
			return <Col span={isMobile ? 12 : 6} key={index}>
				<Card
					hoverable
					cover={<Image
						alt={product.name}
						src={product.gallery.url}
						className="object-cover !w-full !h-[175px] p-2 rounded-t-md"
						preview={false}
					/>}
					className='!my-2'
					styles={{
						body: {
							padding: '5px'
						}
					}}
					onClick={() => {
						setProduct(product)
					}}
					actions={[
						<Button
							icon={<FaCartPlus/>}
							variant='solid'
							type='primary'
							size='small'
							className='w-5/6'
						>
							Ajouter au panier
						</Button>
					]}
				>
					<Meta
						className='text-center'
						title={product.name}
						description={<Space>
							<Typography.Title
								level={5}
							>
								{formatPrice(product.stock?.price || 0)} /
							</Typography.Title>
							
							<sub>
								<Tag color="green" className='font-bold'>
									{product.unit.name}
								</Tag>
							</sub>
						</Space>}
					/>
				</Card>
			</Col>
		})}
		
		{!!product && <ProductModal product={product} onClose={() => setProduct(undefined)}/>}
	</Row>
}

const ProductModal = ({product, onClose, ...props}: { product?: ProductInterface, onClose?: () => void }) => {
	return <Modal
		title={`Achat du produit: ${product?.name}`}
		closable={{'aria-label': 'Custom Close Button'}}
		open={!!product}
		onCancel={onClose}
		footer={null}
		{...props}
	>
		{product && <ProductForm product={product}/>}
	</Modal>
};

const ProductForm = ({product, ...props}: { product: ProductInterface }) => {
	const [form] = Form.useForm();
	
	const handleFinish = (values: PurchaseItemCartItemInterface) => {
		console.log(`/Users/boubacarly/Sites/localhost/perso/gestistock2/front/src/components/molecules/Products.tsx:71`, `values =>`, values)
	}
	
	useEffect(() => {
		form.setFieldsValue({
			unit: {
				label: product.unit.name,
				value: product.unit.id
			}
		})
	}, [product]);
	
	return <Form
		form={form}
		onFinish={handleFinish}
		layout='vertical'
		{...props}
	>
		<Row gutter={[12, 0]}>
			<Col span={24}>
				<Form.Item
					label="Unité"
					name="unit"
					rules={[{required: true}]}
				>
					<SelectUnitEquivalence
						labelInValue={true}
						productId={product.id}
						unitEquivalences={product.unit_equivalences}
					/>
				</Form.Item>
			</Col>
			
			<Col span={24}>
				<Form.Item
					label="Quantité"
					name="quantity"
					rules={[{required: true}]}
				>
					<InputNumber min={0.00001} className='!w-full'/>
				</Form.Item>
			</Col>
			
			<Col span={24}>
				<Form.Item
					label="Prix unitaire"
					name="unit_price"
					rules={[{required: true}]}
				>
					<InputNumber min={1} className='!w-full'/>
				</Form.Item>
			</Col>
			
			<Flex justify='center' className='!w-full'>
				<Button
					type="primary"
					htmlType="submit"
					className='w-1/2'
				>
					Valider
				</Button>
			</Flex>
		</Row>
	</Form>
}