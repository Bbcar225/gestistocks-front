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
import {BsCartX, BsFillCartCheckFill} from "react-icons/bs";

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
			
			{product && <ProductModal product={product} onClose={() => setProduct(undefined)}/>}
		</Row>
	</Spin>
}

export const ProductModal = ({product, onClose, ...props}: { product: ProductInterface, onClose?: () => void }) => {
	return <Modal
		closable={{'aria-label': 'Custom Close Button'}}
		open={!!product}
		onCancel={onClose}
		footer={null}
		{...props}
	>
		<ProductForm
			product={product}
			onClose={onClose}
			initialValues={{
				quantity: 1,
				unit_price: product?.stock?.price || 0,
				product: product
			}}/>
	</Modal>
};

export const ProductForm = ({product, onClose, initialValues, inToCart, ...props}: {
	product: ProductInterface,
	onClose?: () => void,
	initialValues?: CartItemInterface,
	inToCart?: boolean
}) => {
	const [form] = Form.useForm<CartItemInterface>();
	const {addItem, removeItem, updateItem, sale} = useCartStore()
	const quantity = Form.useWatch('quantity', form)
	const routesProduct = useRoutesProduct()
	
	const handleFinish = (values: CartItemInterface) => {
		addItem(values)
		form.resetFields()
		onClose?.()
	}
	
	const handleAddQuantity = () => {
		form?.setFieldsValue({
			...form.getFieldsValue(),
			quantity: Number(form.getFieldValue("quantity") - 1)
		})
	}
	
	const handleRemoveQuantity = () => form?.setFieldsValue({
		...form.getFieldsValue(),
		quantity: Number(quantity + 1)
	})
	
	const handleUpdate = () => form.validateFields().then((value) => updateItem(value))
	
	const handleRemove = () => {
		if (initialValues) {
			if (sale) {
				updateItem({
					...form.getFieldsValue(),
					destroy: true
				})
			} else {
				removeItem(initialValues)
			}
		}
	}
	
	useEffect(() => {
		if (initialValues) {
			form.setFieldsValue(initialValues)
		}
	}, [form, initialValues]);
	
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
							disabled={inToCart}
						/>
					</Form.Item>
					
					<Space className='!w-full !text-center'>
						<Form.Item>
							<Button
								icon={<FaMinus/>}
								onClick={handleAddQuantity}
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
								onClick={handleRemoveQuantity}
								variant='solid'
								color='green'
							/>
						</Form.Item>
					</Space>
					
					<Form.Item noStyle name='product' rules={[{required: true}]}/>
					<Form.Item noStyle name='id'/>
					<Form.Item noStyle name='destroy' rules={[{type: 'boolean'}]}/>
					
					{inToCart ?
						<Flex justify='space-between'>
							<div>
								<Button
									size='large'
									type="primary"
									className='!w-full !text-center'
									icon={<BsFillCartCheckFill className='mx-5 text-[23px]'/>}
									onClick={handleUpdate}
								/>
							</div>
							
							<div>
								<Button
									size='large'
									type="primary"
									className='!w-full !text-center'
									icon={<BsCartX className='mx-5 text-[23px]'/>}
									variant='filled'
									color='danger'
									onClick={handleRemove}
								/>
							</div>
						</Flex> :
						<Button
							type="primary"
							className='!w-full !text-center'
							icon={<FaCartPlus/>}
							htmlType='submit'
						>
							Ajouter au panier
						</Button>}
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