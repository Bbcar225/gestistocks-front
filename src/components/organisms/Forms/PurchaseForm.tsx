import dayjs from "dayjs";
import {Button, Col, Divider, Flex, Form, FormInstance, Input, InputNumber, notification, Row} from "antd";
import {isMobile} from "react-device-detect";
import SelectScrollInfiniteSupplier from "../../molecules/Selects/SelectScrollInfiniteSupplier.tsx";
import {useWatch} from "antd/es/form/Form";
import {useProductGetOne} from "../../../hooks/Api/tenant/ProductHookAPI.ts";
import {useEffect, useState} from "react";
import SelectScrollInfiniteProduct from "../../molecules/Selects/SelectScrollInfiniteProduct.tsx";
import SelectUnitEquivalence from "../../molecules/Selects/SelectUnitEquivalence.tsx";
import {IoIosRemoveCircle} from "react-icons/io";
import {FaCirclePlus} from "react-icons/fa6";
import {usePurchaseCreate} from "../../../hooks/Api/tenant/PurchaseHookAPI.ts";
import {config} from "../../../constants/notifcationConstant.ts";
import {successCreate} from "../../../constants/textsConstant.ts";
import {HiPlusCircle} from "react-icons/hi";

export default function PurchaseForm({onSuccess, purchase, ...props}: {
	onSuccess?: () => void;
	purchase?: PurchaseInterface
}) {
	const [form] = Form.useForm();
	const reqPurchaseCreate = usePurchaseCreate()
	const [notificationInstance, contextHolder] = notification.useNotification(config);
	
	const handleFinish = (values: PurchaseCartInterface) => {
		if (values?.items && values?.items?.length <= 0) {
			return notificationInstance.warning({
				message: "Vous n'avez sélectionné aucun produits."
			})
		}
		
		const formData = {
			date: String(values.date),
			supplier_id: Number(values.supplier?.value),
			reference: String(values.reference),
			items: values?.items?.map(item => {
				return {
					product_id: Number(item?.product?.value),
					unit_id: Number(item?.unit?.value),
					quantity: Number(item?.quantity),
					unit_price: Number(item?.unit_price),
				}
			}) || [],
		}
		
		if (purchase) {
			const purchaseData: Pick<PurchaseFormDataInterface, 'supplier_id' | 'date' | 'reference'> = {
				date: formData.date,
				reference: formData.reference,
				supplier_id: formData.supplier_id
			}
			
			const itemsDeleted = values.items?.filter((item) => item.deleted).map(item => item.id)
			const itemsUpdated = values.items?.filter((item) => !item.deleted).map(item => {
				return {
					id: item.id,
					product_id: Number(item?.product?.value),
					unit_id: Number(item?.unit?.value),
					quantity: Number(item?.quantity),
					unit_price: Number(item?.unit_price),
				}
			})
			const itemsNew = values.items?.filter((item) => !item.id).map(item => {
				return {
					product_id: Number(item?.product?.value),
					unit_id: Number(item?.unit?.value),
					quantity: Number(item?.quantity),
					unit_price: Number(item?.unit_price),
				}
			})
			return
		}
		
		return reqPurchaseCreate.mutate(formData)
	}
	
	useEffect(() => {
		if (reqPurchaseCreate.isSuccess) {
			const res = reqPurchaseCreate.data
			
			notificationInstance.success({
				message: res.message,
				description: successCreate
			})
			
			form.resetFields()
			onSuccess?.()
		}
	}, [notificationInstance, form, reqPurchaseCreate.data, reqPurchaseCreate.isSuccess]);
	
	useEffect(() => {
		if (purchase) {
			form.setFieldsValue({
				date: dayjs(purchase.date).format('YYYY-MM-DD'),
				supplier: {
					label: purchase.supplier.name,
					value: purchase.supplier.id
				},
				reference: purchase.reference,
				items: purchase.items.length ? purchase.items.map((item) => {
					return {
						id: item.id,
						product: {
							label: item.product.name,
							value: item.product.id
						},
						quantity: item.quantity,
						unit: {
							label: item.unit.name,
							value: item.unit.id
						},
						unit_price: item.unit_price,
						deleted: false
					}
				}) : [{
					product: undefined,
					unit: undefined,
					quantity: undefined,
					unit_price: undefined,
				}]
			})
		}
	}, [purchase]);
	
	return <Form
		form={form}
		layout='vertical'
		onFinish={handleFinish}
		initialValues={{
			date: dayjs().format('YYYY-MM-DD'),
			items: [{
				product: undefined,
				unit: undefined,
				quantity: undefined,
				unit_price: undefined,
			}]
		}}
		{...props}
	>
		{contextHolder}
		<Row gutter={isMobile ? 0 : 12}>
			<Col span={isMobile ? 24 : 8}>
				<Form.Item
					label='Date'
					name='date'
					rules={[{required: true}]}
				>
					<Input
						type="date"
						placeholder="Date"
					/>
				</Form.Item>
			</Col>
			
			<Col span={isMobile ? 24 : 8}>
				<Form.Item
					label='Fournisseur'
					name='supplier'
					rules={[{required: true}]}
				>
					<SelectScrollInfiniteSupplier
						className="w-full"
						allowClear={false}
					/>
				</Form.Item>
			</Col>
			
			<Col span={isMobile ? 24 : 8}>
				<Form.Item
					label='Référence'
					name='reference'
					rules={[{required: true}]}
				>
					<Input
						placeholder="Référence"
					/>
				</Form.Item>
			</Col>
			
			<Divider orientation='start'>
				Produits
			</Divider>
			
			<Col span={24}>
				<Form.List
					name="items"
				>
					{(fields, {add, remove}) => (
						<>
							{fields.map(({key, name, ...restField}) => {
								return <PurchaseItemRow
									key={key}
									name={name}
									remove={remove}
									form={form}
									isMobile={isMobile}
									purchase={purchase}
									{...restField}
								/>
							})}
							
							<Row>
								<Col span={24} className='mt-2'>
									<Form.Item>
										<Button
											type="dashed"
											onClick={() => add()}
											block
											icon={<FaCirclePlus/>}
											color='cyan'
										>
											Nouveau produit
										</Button>
									</Form.Item>
								</Col>
							</Row>
						</>
					)}
				</Form.List>
			</Col>
			
			<Flex justify='center' className='w-screen'>
				<Button
					type="primary"
					htmlType="submit"
					className='w-1/2'
					loading={reqPurchaseCreate.isLoading}
				>
					Valider
				</Button>
			</Flex>
		</Row>
	</Form>
}

const PurchaseItemRow = ({name, remove, form, isMobile, purchase, ...props}: {
	name: number,
	remove: (index: number) => void,
	form: FormInstance,
	isMobile: boolean,
	purchase?: PurchaseInterface
}) => {
	const product = useWatch(['items', name, 'product'], form);
	const deleted = useWatch(['items', name, 'deleted'], form);
	const reqProductGetOne = useProductGetOne({
		id: product?.value,
		enabled: !!product
	})
	const [productFormBd, setProductFormBd] = useState<ProductInterface | undefined>(undefined)
	
	useEffect(() => {
		if (reqProductGetOne.status === 'success') {
			const res = reqProductGetOne.data
			const product = res.data
			product.unit_equivalences.push({
				unit: {
					id: product.unit.id,
					name: product.unit.name,
				}
			} as unknown as UnitEquivalenceInterface)
			setProductFormBd(product)
			form.setFieldValue(['items', name, 'unit'], {
				label: product.unit.name,
				value: product.unit.id,
			});
		}
	}, [reqProductGetOne.status, reqProductGetOne.data]);
	
	return (
		<Row gutter={isMobile ? 0 : 12} align='middle'>
			<Col span={isMobile ? 24 : 6}>
				<Form.Item
					{...props}
					name={[name, 'product']}
					rules={[{required: true}]}
					label="Produit"
				>
					<SelectScrollInfiniteProduct allowClear={false} disabled={deleted}/>
				</Form.Item>
			</Col>
			
			<Col span={isMobile ? 24 : 5}>
				<Form.Item
					{...props}
					name={[name, 'quantity']}
					label="Quantité"
					rules={[{required: true}]}
				>
					<InputNumber min={0.000001} className='!w-full' disabled={deleted}/>
				</Form.Item>
			</Col>
			
			<Col span={isMobile ? 24 : 6}>
				<Form.Item
					{...props}
					name={[name, 'unit']}
					label="Unité"
				>
					<SelectUnitEquivalence
						labelInValue={true}
						unitEquivalences={productFormBd?.unit_equivalences || []}
						disabled={deleted}
					/>
				</Form.Item>
			</Col>
			
			<Col span={isMobile ? 24 : 5}>
				<Form.Item
					{...props}
					name={[name, 'unit_price']}
					label="Prix unitaire"
					rules={[{required: true}]}
				>
					<InputNumber min={1} className='!w-full' disabled={deleted}/>
				</Form.Item>
			</Col>
			
			{
				purchase && <>
			<Form.Item name='id' noStyle/>
			<Form.Item name='deleted' noStyle/>
		  </>
			}
			
			<Flex justify='center' className='!m-auto'>
				{
					deleted ? <Button
							icon={<HiPlusCircle/>}
							onClick={() => {
								form.setFieldValue(['items', name, 'deleted'], false)
							}}
							color="green"
							variant="dashed"
							className='!mt-1'
						/> :
						<Button
							icon={<IoIosRemoveCircle/>}
							onClick={() => {
								if (purchase && form.getFieldValue(['items', name, 'id'])) {
									form.setFieldValue(['items', name, 'deleted'], true)
								} else {
									remove(name)
								}
							}}
							color="danger"
							variant="dashed"
							className='!mt-1'
						/>
				}
			</Flex>
		</Row>
	);
}