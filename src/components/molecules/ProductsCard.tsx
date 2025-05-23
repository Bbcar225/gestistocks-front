import {useProductGetAll} from "../../hooks/Api/tenant/ProductHookAPI.ts";
import {useEffect, useState} from "react";
import {
	Button,
	Card,
	Col,
	Flex,
	Form,
	Image,
	InputNumber,
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
import SelectUnitEquivalence from "./Selects/SelectUnitEquivalence.tsx";
import {FaCartPlus} from "react-icons/fa";
import {formatPrice} from "../../utils/priceUtils.ts";
import {useProductStore} from "../../store/useProductStore.ts";
import {tablePagination} from "../../constants/tableConstant.ts";

export default function ProductsCard() {
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
	
	return <Spin spinning={reqProductGetAll.isLoading}>
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
								className='w-5/6'
							>
								Ajouter au panier
							</Button>
						]}
					>
						<Meta
							className='text-center'
							title={`${product.name} - ${product.sku}`}
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

const ProductModal = ({product, onClose, ...props}: { product?: ProductInterface, onClose?: () => void }) => {
	useEffect(() => {
		if (product) {
			const unitEquivalences = product.unit_equivalences
		
		unitEquivalences.push({
			created_at: "",
			id: 0,
			model_id: 0,
			model_type: "App\\Models\\Product",
			tenant_id: 0,
			unit: {
				id: product.unit_id,
				name: product.unit.name,
				created_at: product.unit.created_at,
				updated_at: product.unit.updated_at,
				sort_name: product.unit.sort_name
			},
			unit_id: 0,
			updated_at: "",
			value: 0
		})
		
		product.unit_equivalences = unitEquivalences
		}
	}, [product]);
	
	return <Modal
		title={`${product?.name} - ${product?.sku}`}
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
	}, [form, product]);
	
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