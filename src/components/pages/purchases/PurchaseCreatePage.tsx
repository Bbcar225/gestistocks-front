import {useEffect, useState} from "react";
import {useAppStore} from "../../../store/useAppStore.ts";
import {Button, Card, Col, Divider, Flex, Form, FormInstance, Input, InputNumber, Row, Space} from "antd";
import {isMobile} from "react-device-detect";
import {usePurchaseStore} from "../../../store/usePurchaseStore.ts";
import SelectScrollInfiniteSupplier from "../../molecules/Selects/SelectScrollInfiniteSupplier.tsx";
import {PlusOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import {IoIosRemoveCircle} from "react-icons/io";
import SelectScrollInfiniteProduct from "../../molecules/Selects/SelectScrollInfiniteProduct.tsx";
import SelectUnitEquivalence from "../../molecules/Selects/SelectUnitEquivalence.tsx";
import {useWatch} from "antd/es/form/Form";
import {useProductGetOne} from "../../../hooks/Api/tenant/ProductHookAPI.ts";

export default function PurchaseCreatePage() {
	const {setSidebar} = useAppStore()
	const {cart, setFieldCart} = usePurchaseStore()
	const [form] = Form.useForm();
	
	const handleFinish = (values: PurchaseCartInterface) => {
		console.log(`/Users/boubacarly/Sites/localhost/perso/gestistock2/front/src/components/pages/purchases/PurchaseCreatePage.tsx:18`, `values =>`, values)
	}
	
	useEffect(() => {
		setSidebar({field: 'title', value: 'Nouvel achat'})
	}, [setSidebar]);
	
	return <Row>
		<Col span={24}>
			<Card>
				<Form
					form={form}
					layout='vertical'
					onFinish={handleFinish}
					initialValues={{
						date: dayjs().format('YYYY-MM-DD'),
						items: [{
							product: undefined,
							unit: undefined,
							quantity: undefined,
							unitPrice: undefined,
						}]
					}}
				>
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
							<Form.List name="items">
								{(fields, {add, remove}) => (
									<>
										{fields.map(({key, name, ...restField}) => {
											return <PurchaseItemRow
												key={key}
												name={name}
												restField={restField}
												remove={remove}
												form={form}
												isMobile={isMobile}
											/>
										})}
										
										<Row justify='center'>
											<Col span={12}>
												<Form.Item>
													<Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
														Ajouter une nouvelle ligne de produit
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
							>
								Valider
							</Button>
						</Flex>
					</Row>
				</Form>
			</Card>
		</Col>
	</Row>
}

const PurchaseItemRow = ({name, restField, remove, form, isMobile}: {
	name: number,
	restField: unknown,
	remove: (index: number) => void,
	form: FormInstance,
	isMobile: boolean,
}) => {
	const product = useWatch(['items', name, 'product'], form);
	const reqProductGetOne = useProductGetOne({
		id: product?.value,
		enabled: !!product
	})
	const [productFormBd, setProductFormBd] = useState<ProductInterface | undefined>(undefined)
	
	useEffect(() => {
		if (reqProductGetOne.status === 'success') {
			const res = reqProductGetOne.data
			const product = res.data
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
					{...restField}
					name={[name, 'product']}
					rules={[{required: true}]}
					label="Produit"
				>
					<SelectScrollInfiniteProduct allowClear={false}/>
				</Form.Item>
			</Col>
			
			<Col span={isMobile ? 24 : 5}>
				<Form.Item
					{...restField}
					name={[name, 'quantity']}
					label="Quantité"
					rules={[{required: true}]}
				>
					<InputNumber min={0.000001} className='!w-full'/>
				</Form.Item>
			</Col>
			
			<Col span={isMobile ? 24 : 6}>
				<Form.Item
					{...restField}
					name={[name, 'unit']}
					label="Unité"
				>
					<SelectUnitEquivalence
						labelInValue={true}
						unitEquivalences={productFormBd?.unit_equivalences || []}
					/>
				</Form.Item>
			</Col>
			
			<Col span={isMobile ? 24 : 5}>
				<Form.Item
					{...restField}
					name={[name, 'unit_price']}
					label="Prix unitaire"
					rules={[{required: true}]}
				>
					<InputNumber min={0.000001} className='!w-full'/>
				</Form.Item>
			</Col>
			
			<Flex justify='center' className='!m-auto'>
				<Button
					icon={<IoIosRemoveCircle/>}
					onClick={() => remove(name)}
					color="danger"
					variant="dashed"
					className='!mt-1'
				/>
			</Flex>
		</Row>
	);
}