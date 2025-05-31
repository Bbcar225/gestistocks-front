import {
	Button,
	Card,
	Col,
	DatePicker,
	Drawer,
	Flex,
	FloatButton,
	Form,
	FormInstance,
	notification,
	Row,
	Tag
} from "antd";
import {isMobile} from "react-device-detect";
import {useEffect, useState} from "react";
import {useAppStore} from "../../store/useAppStore.ts";
import SelectScrollInfiniteCustomer from "../molecules/Selects/SelectScrollInfiniteCustomer.tsx";
import SelectContact from "../molecules/Selects/SelectContact.tsx";
import ProductsCard, {ProductForm} from "../molecules/ProductsCard.tsx";
import SearchInput from "../atoms/SearchInput.tsx";
import SelectCategory from "../molecules/Selects/SelectCategory.tsx";
import {FaShoppingCart} from "react-icons/fa";
import {BsCartCheckFill, BsCartXFill} from "react-icons/bs";
import {useProductStore} from "../../store/useProductStore.ts";
import useCartStore from "../../store/useCartStore.ts";
import {formatPrice} from "../../utils/priceUtils.ts";
import dayjs from "dayjs";
import {config} from "../../constants/notifcationConstant.ts";

export default function PosPage() {
	const {setSidebar} = useAppStore()
	const [form] = Form.useForm<CartInterface>();
	const {data, setField} = useCartStore()
	const formData = Form.useWatch([], form)
	const customer = Form.useWatch('customer', form)
	
	const handleFinish = (values: CartInterface) => {
		console.log(`/Users/boubacarly/Sites/localhost/perso/gestistock2/front/src/components/pages/PosPage.tsx:26`, `values =>`, values)
	}
	
	useEffect(() => {
		setSidebar({field: 'title', value: 'Système POS'})
	}, [setSidebar]);
	
	useEffect(() => {
		setField({
			field: 'date',
			value: formData?.date
		})
		
		setField({
			field: 'customer',
			value: formData?.customer
		})
		
		setField({
			field: 'contact',
			value: formData?.contact
		})
	}, [formData, setField]);
	
	useEffect(() => {
		const data = form.getFieldsValue()
		form.setFieldsValue({
			...data,
			contact: undefined
		})
	}, [customer, form]);
	
	useEffect(() => {
		const dataForm = form.getFieldsValue()
		form.setFieldsValue({
			...dataForm,
			items: data?.items || []
		})
	}, [data, form]);
	
	return <Form
		form={form}
		layout='vertical'
		initialValues={{
			...data,
			date: dayjs()
		}}
		onFinish={handleFinish}
	>
		<Row gutter={[12, 12]}>
			<Col span={isMobile ? 24 : 8}>
				<Card>
					<Form.Item
						label="Date"
						name='date'
						rules={[{required: true}]}
					>
						<DatePicker className='w-full' allowClear={false}/>
					</Form.Item>
					
					<Form.Item
						label="Client"
						rules={[{required: true}]}
						name='customer'
					>
						<SelectScrollInfiniteCustomer allowClear={false}/>
					</Form.Item>
					
					<Form.Item
						label="Contact"
						rules={[{required: true}]}
						name='contact'
					>
						<SelectContact
							customerId={Number(data?.customer?.value)}
							enabled={!!data?.customer}
							disabled={!data?.customer}
							labelInValue={true}
						/>
					</Form.Item>
				</Card>
			</Col>
			
			<Col span={isMobile ? 24 : 16}>
				<Row gutter={[12, 12]}>
					<Col span={24}>
						<FilterProductsCart/>
					</Col>
					
					<Col span={24}>
						<Card
							styles={{
								body: {
									padding: '10px'
								}
							}}
						>
							<ProductsCard/>
						</Card>
					</Col>
				</Row>
			</Col>
			
			<Form.Item noStyle name='items' rules={[{required: true, type: 'array', min: 1}]}/>
			
			<ResumeCart form={form}/>
		</Row>
	</Form>
}

const ResumeCart = ({form}: { form: FormInstance }) => {
	const [open, setOpen] = useState(false);
	const {data} = useCartStore()
	const items = data?.items || []
	const [notificationInstance, contextHolder] = notification.useNotification(config);
	
	const showDrawer = () => {
		setOpen(true);
	};
	
	const onClose = () => {
		setOpen(false);
	};
	
	const getTotalPrice = () => {
		return items?.reduce((sum: number, item: CartItemInterface) => {
			return sum + (item.unit_price * item.quantity);
		}, 0)
	}
	
	const getCountItem = () => {
		return items?.length || 0
	}
	
	return (
		<>
			{contextHolder}
			<FloatButton
				icon={<FaShoppingCart className='!w-[25px] !h-[25px] !ml-[-3px]'/>}
				badge={{count: getCountItem(), color: '#FD7E14', showZero: true}}
				type='primary'
				className='!w-[55px] !h-[55px]'
				onClick={showDrawer}
			/>
			<Drawer
				title={<Flex justify='space-between'>
					<div>Panier</div>
					
					<div>
						Total : <Tag
						color='green'
					>
						{formatPrice(Number(getTotalPrice()))}
					</Tag>
					</div>
				</Flex>}
				closable={{'aria-label': 'Close Button'}}
				onClose={onClose}
				open={open}
				footer={
					<Row gutter={[12, 12]}>
						<Col span={12}>
							<Button
								type='primary'
								className='w-full'
								icon={<BsCartCheckFill/>}
								onClick={() => form.submit()}
							>
								Valider
							</Button>
						</Col>
						
						<Col span={12}>
							<Button
								className='w-full'
								icon={<BsCartXFill/>}
								variant='outlined'
								color='danger'
							>
								Vider le panier
							</Button>
						</Col>
					</Row>
				}
			>
				{items?.map((item: CartItemInterface, index: number) => {
					return <ProductForm product={item.product} key={index}/>
				})}
			</Drawer>
		</>
	);
};

const FilterProductsCart = () => {
	const {setFieldQueryParams, queryParams} = useProductStore()
	
	return <Card>
		<Row gutter={[12, 12]} className='!w-full'>
			<Col span={isMobile ? 24 : 12}>
				<SearchInput
					defaultValue={queryParams.search}
					handleChange={(value) => setFieldQueryParams({
						field: 'search',
						value,
					})}
				/>
			</Col>
			
			<Col span={isMobile ? 24 : 12}>
				<SelectCategory
					className='w-full'
					allowClear={true}
					onChange={(value: string | number | undefined) => {
						setFieldQueryParams({
							field: 'category_id',
							value
						});
					}}
					defaultValue={queryParams.category_id}
				/>
			</Col>
		</Row>
	</Card>
}