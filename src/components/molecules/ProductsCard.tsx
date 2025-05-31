import {useProductGetAll} from "../../hooks/Api/tenant/ProductHookAPI.ts";
import {useEffect, useState} from "react";
import {
	Button,
	Card,
	Col,
	Flex,
	Form,
	Image, InputNumber,
	Modal,
	Pagination,
	PaginationProps,
	Row,
	Space, Spin,
	Tag,
	Typography
} from "antd";
import Meta from "antd/es/card/Meta";
import {isMobile} from "react-device-detect";
import {FaCartPlus, FaMinus, FaPlus} from "react-icons/fa";
import {formatPrice} from "../../utils/priceUtils.ts";
import {useProductStore} from "../../store/useProductStore.ts";
import {tablePagination} from "../../constants/tableConstant.ts";
import Link from "antd/es/typography/Link";
import {useRoutesProduct} from "../../routes/productRoutes.ts";
import useCartStore from "../../store/useCartStore.ts";

export default function ProductsCard({...props}) {
	const {setFieldQueryParams, queryParams, setFieldPagination, pagination} = useProductStore()
	const reqProductGetAll = useProductGetAll({
		queryParams
	})
	const [products, setProducts] = useState<ProductInterface[]>([])
	const [product, setProduct] = useState<ProductInterface | undefined>(undefined)
	
	const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
		if (type === 'prev') {
			return <a>Précédent</a>;
		}
		if (type === 'next') {
			return <a>Suivant</a>;
		}
		
		return originalElement;
	};
	
	useEffect(() => {
		if (reqProductGetAll.status === 'success') {
			const res = reqProductGetAll.data
			const data = res.data
			setFieldPagination({
				field: 'total',
				value: data.meta.total || 0
			})
			const products = data?.data || []
			setProducts(products)
		}
	}, [reqProductGetAll.data, reqProductGetAll.status]);
	
	return <Spin spinning={reqProductGetAll.isLoading} {...props}>
		<Row gutter={isMobile ? 8 : 24}>
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
							>
								Ajouter au panier
							</Button>
						]}
					>
						<Meta
							className='text-center'
							title={`${product.name} - ${product.sku}`}
							description={<Price
								price={product.stock?.price}
								unit={product.unit.name}
							/>}
						/>
					</Card>
				</Col>
			})}
			
			<Flex justify='center' className='!mt-5 !w-full'>
				<Pagination
					total={pagination.total}
					itemRender={itemRender}
					current={queryParams.page}
					pageSize={queryParams.per_page}
					pageSizeOptions={tablePagination.pageSizeOptions}
					showSizeChanger={tablePagination.showSizeChanger}
					onChange={(page, pageSize) => {
						setFieldQueryParams({
							field: 'page',
							value: page
						})
						
						setFieldQueryParams({
							field: 'per_page',
							value: pageSize
						})
					}}
				/>
			</Flex>
			
			<ProductModal product={product} onClose={() => setProduct(undefined)}/>
		</Row>
	</Spin>
}

export const ProductModal = ({product, onClose, ...props}: { product?: ProductInterface, onClose?: () => void }) => {
	return <Modal
		closable={{'aria-label': 'Custom Close Button'}}
		open={!!product}
		onCancel={onClose}
		footer={null}
		{...props}
	>
		{product && <ProductForm product={product} onClose={onClose}/>}
	</Modal>
};

export const ProductForm = ({product, onClose, ...props}: { product: ProductInterface, onClose?: () => void }) => {
	const [form] = Form.useForm<CartItemInterface>();
	const {setField, data} = useCartStore()
	const quantity = Form.useWatch('quantity', form)
	const routesProduct = useRoutesProduct()
	
	const handleFinish = (values: CartItemInterface) => {
		const items = data?.items || []
		items.push(values)
		setField({
			field: 'items',
			value: items
		})
		form.resetFields()
		onClose?.()
	}
	
	useEffect(() => {
		form.setFieldsValue({
			quantity: 1,
			unit_price: product?.stock?.price || 0,
			product: product
		})
	}, [form, product]);
	
	return <Form
		form={form}
		onFinish={handleFinish}
		{...props}
	>
		<Row gutter={[12, 0]}>
			<Col span={isMobile ? 24 : 9} className='text-center'>
				<Image
					alt={product.name}
					src={product.gallery.url}
					className='!w-[190px] !h-[220px] !object-cover'
				/>
			</Col>
			
			<Col span={isMobile ? 24 : 15}>
				<Space direction='vertical' className='!w-full !h-full' size='small'>
					<Link onClick={() => routesProduct.goToProductShow(product)}>
						<Typography.Title
							level={4}
						>
							{`${product.name} - ${product.sku}`}
						</Typography.Title>
					</Link>
					
					<Form.Item
						name="unit_price"
						rules={[{required: true}]}
					>
						<InputNumber
							className='!w-full !text-center !font-bold'
							suffix={`Fr / ${product?.unit.name}`}
							variant='underlined'
							min={1}
							formatter={(value) => formatPrice(Number(value), '')}
						/>
					</Form.Item>
					
					<Space className='!w-full !text-center'>
						<Form.Item>
							<Button
								icon={<FaMinus/>}
								onClick={() => {
									form?.setFieldsValue({
										...form.getFieldsValue(),
										quantity: Number(form.getFieldValue("quantity") - 1)
									})
								}}
								disabled={Number(quantity) <= 1}
								variant='solid'
								color='danger'
							/>
						</Form.Item>
						<Form.Item
							name='quantity'
							rules={[{required: true}]}
						>
							<InputNumber
								variant='underlined'
								className='!w-full !text-center !font-bold'
								suffix={product?.unit.name}
								min={0.1}
							/>
						</Form.Item>
						<Form.Item>
							<Button
								icon={<FaPlus/>}
								onClick={() => form?.setFieldsValue({
									...form.getFieldsValue(),
									quantity: Number(quantity + 1)
								})}
								variant='solid'
								color='green'
							/>
						</Form.Item>
					</Space>
					
					<Form.Item noStyle name='product' rules={[{required: true}]}/>
					
					<Button
						type="primary"
						className='!w-full !text-center'
						icon={<FaCartPlus/>}
						htmlType='submit'
					>
						Ajouter au panier
					</Button>
				</Space>
			</Col>
		</Row>
	</Form>
}

const Price = ({price, unit}: { price: number, unit: string }) => {
	return <Space className='mb-2'>
		<Typography.Text
			strong
		>
			{formatPrice(price || 0)} /
		</Typography.Text>
		
		<sub>
			<Tag color="green" className='font-bold'>
				{unit}
			</Tag>
		</sub>
	</Space>
}