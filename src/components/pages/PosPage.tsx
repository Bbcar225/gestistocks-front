import {
	Button,
	Card,
	Col,
	DatePicker, Divider,
	Drawer,
	Flex,
	FloatButton,
	Form,
	FormInstance,
	notification,
	Row, Space,
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
import React from "react";

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
			...data
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
			
			<Form.Item
				noStyle
				name="items"
				rules={[
					{
						required: true,
						type: 'array',
						min: 1,
						message: 'Au moins un produit est obligatoire.',
					},
				]}
			/>
			
			<ResumeCart form={form}/>
		</Row>
	</Form>
}

const ResumeCart = ({form}: { form: FormInstance }) => {
	const [open, setOpen] = useState(false);
	const {data, intoCart, clearCart} = useCartStore()
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
					<div>Résumé</div>
					
					<div>
						Total : <Tag
						color='green'
						className='!font-bold !text-[17px] !p-1'
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
								onClick={() => form.validateFields().then(() => {
									form.submit()
									// console.log(value)
								}).catch((error) => {
									const firstErrors = error.errorFields
										.map((e: { errors: never[]; }) => e.errors[0])
										.filter(Boolean);
									
									notificationInstance.error({
										message: 'Erreur de validation',
										description: <ul>
											{firstErrors.map((message: string, index: number) => <li key={index}>- {message}</li>)}
										</ul>
									})
								})}
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
								onClick={() => clearCart()}
							>
								Vider le panier
							</Button>
						</Col>
					</Row>
				}
			>
				<Space direction="vertical" size="small">
					{items?.map((item: CartItemInterface, index: number) => {
						const isNotFirst = index !== 0
						
						return (
							<React.Fragment key={index}>
								{isNotFirst && <Divider/>}
								<ProductForm
									product={item.product}
									initialValues={{
										quantity: item.quantity,
										unit_price: item.unit_price || 0,
										product: item.product
									}}
									inToCart={intoCart({
										product: item.product,
										unit_price: item.unit_price,
										quantity: item.quantity
									})}
								/>
							</React.Fragment>
						)
					})}
				</Space>
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