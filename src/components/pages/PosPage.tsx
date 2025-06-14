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
	notification, Result,
	Row, Space, Spin,
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
import {config} from "../../constants/notifcationConstant.ts";
import React from "react";
import dayjs from "dayjs";
import {SaleFormData} from "../../interfaces/models/SaleInterface";
import {useSaleCreate, useSaleUpdate} from "../../hooks/Api/tenant/SaleHookAPI.ts";
import {successCreate} from "../../constants/textsConstant.ts";
import {useLocation} from "react-router-dom";
import {useRoutesSale} from "../../routes/saleRoutes.ts";

export default function PosPage() {
	const {setSidebar} = useAppStore()
	const [form] = Form.useForm<CartInterface>();
	const {data, setFieldData, clearCart, setSale, sale} = useCartStore()
	const formData = Form.useWatch([], form)
	const reqSaleCreate = useSaleCreate()
	const [notificationInstance, contextHolder] = notification.useNotification(config);
	const location = useLocation()
	const reqSaleUpdate = useSaleUpdate(Number(sale?.id))
	const routesSale = useRoutesSale()
	
	const handleFinish = (values: CartInterface) => {
		const formData: SaleFormData = {
			date: dayjs(values.date).format('YYYY-MM-DD'),
			customer_id: Number(values.customer?.value),
			contact_id: Number(values.contact?.value),
			items: values.items?.map((item) => {
				return {
					product_id: item.product.id,
					quantity: item.quantity,
					unit_price: item.unit_price,
					id: item?.id,
					destroy: item?.destroy
				}
			}) || []
		}
		
		if (sale) {
			return reqSaleUpdate.mutate(formData, {
				onSuccess: ({message, data}) => {
					notificationInstance.success({
						message,
						description: successCreate
					})
					clearCart()
					return routesSale.goToShow({id: data.id})
				}
			})
		}
		
		return reqSaleCreate.mutate(formData, {
			onSuccess: ({message, data}) => {
				notificationInstance.success({
					message,
					description: successCreate
				})
				clearCart()
				setSale(data)
			}
		})
	}
	
	useEffect(() => {
		setSidebar({field: 'title', value: 'Système POS'})
	}, [setSidebar]);
	
	useEffect(() => {
		setFieldData({
			field: 'date',
			value: formData?.date
		})
		
		setFieldData({
			field: 'customer',
			value: formData?.customer
		})
		
		setFieldData({
			field: 'contact',
			value: formData?.contact
		})
	}, [formData, setFieldData]);
	
	useEffect(() => {
		form.setFieldsValue({
			...data,
			date: data?.date ? data?.date : dayjs()
		})
	}, [location.pathname]);
	
	useEffect(() => {
		const dataForm = form.getFieldsValue()
		form.setFieldsValue({
			...dataForm,
			items: data?.items || []
		})
	}, [data, form]);
	
	return <>
		{contextHolder}
		<Form
			form={form}
			layout='vertical'
			initialValues={{
				...data,
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
							<SelectScrollInfiniteCustomer
								allowClear={false}
								onChange={() => {
									const data = form.getFieldsValue()
									form.setFieldsValue({
										...data,
										contact: undefined
									})
								}}
							/>
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
				
				<ResumeCart form={form} loading={reqSaleCreate.isLoading}/>
			</Row>
		</Form>
	</>
}

const ResumeCart = ({form, loading}: { form: FormInstance, loading: boolean }) => {
	const [open, setOpen] = useState(false);
	const {data, intoCart, clearCart, totalPrice, countItems} = useCartStore()
	const items = data?.items || []
	const [notificationInstance, contextHolder] = notification.useNotification(config);
	
	const showDrawer = () => {
		setOpen(true);
	};
	
	const onClose = () => {
		setOpen(false);
	};
	
	return (
		<>
			{contextHolder}
			<FloatButton
				icon={<FaShoppingCart className='!w-[25px] !h-[25px] !ml-[-3px]'/>}
				badge={{count: countItems(), color: '#FD7E14', showZero: true}}
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
						{formatPrice(totalPrice())}
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
								onClick={() => form.validateFields().then(() => form.submit()).catch((error) => {
									const firstErrors = error.errorFields
										.map((e: { errors: never[]; }) => e.errors[0])
										.filter(Boolean);
									
									return notificationInstance.error({
										message: 'Erreur de validation',
										description: <ul>
											{firstErrors.map((message: string, index: number) => <li key={index}>- {message}</li>)}
										</ul>
									})
								})}
								loading={loading}
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
								disabled={loading}
							>
								Réinitialiser
							</Button>
						</Col>
					</Row>
				}
			>
				<Spin spinning={loading}>
					<Space direction="vertical" size="small">
						{items.length > 0 ?
							items.filter(item => !item.destroy).map((item: CartItemInterface, index: number) => {
								const isNotFirst = index !== 0
								
								return (
									<React.Fragment key={index}>
										{isNotFirst && <Divider/>}
										<ProductForm
											product={item.product}
											initialValues={{
												quantity: item.quantity,
												unit_price: item.unit_price || 0,
												product: item.product,
												id: item?.id,
											}}
											inToCart={intoCart({
												product: item.product,
												unit_price: item.unit_price,
												quantity: item.quantity
											})}
										/>
									</React.Fragment>
								)
							}) :
							<Result
								status="404"
								title="Aucun produit ajouté"
							/>
						}
					</Space>
				</Spin>
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