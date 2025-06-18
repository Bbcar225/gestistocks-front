import {Button, Col, Flex, Form, Input, notification, Row, Switch} from "antd";
import SelectUnit from "../../molecules/Selects/SelectUnit.tsx";
import SelectCategory from "../../molecules/Selects/SelectCategory.tsx";
import ImagePreviewWithGallery from "../Modals/ImagePreviewWithGallery.tsx";
import useGalleryStore from "../../../store/useGalleryStore.ts";
import {useEffect} from "react";
import {config} from "../../../constants/notifcationConstant.ts";
import {useProductCreate, useProductUpdate} from "../../../hooks/Api/tenant/ProductHookAPI.ts";
import {successCreate, successUpdate} from "../../../constants/textsConstant.ts";
import {useProductStore} from "../../../store/useProductStore.ts";

export function ProductForm({onSuccess, product, ...props}: {
	onSuccess?: () => void;
	product?: ProductInterface
}) {
	const [form] = Form.useForm();
	const [api, contextHolder] = notification.useNotification(config);
	const {gallery, setGallery} = useGalleryStore()
	const {setProduct} = useProductStore()
	const reqProductCreate = useProductCreate()
	const reqProductUpdate = useProductUpdate(Number(product?.id))
	const isLoading = reqProductCreate.isLoading || reqProductUpdate.isLoading
	const {setFieldQueryParams} = useGalleryStore()
	
	const handleFinish = (values: ProductFormDataInterface) => {
		if (!gallery) {
			return api.error({
				message: "L'image est obligatoire.",
				showProgress: true,
			})
		}
		
		const formData = {
			...values,
			gallery_id: gallery.id,
		}
		
		if (product) {
			return reqProductUpdate.mutate(formData)
		}
		
		return reqProductCreate.mutate(formData)
	}
	
	useEffect(() => {
		if (gallery) {
			form.setFieldValue("gallery_id", gallery?.id)
		}
	}, [form, gallery]);
	
	useEffect(() => {
		if (reqProductCreate.status === 'success') {
			form.resetFields()
			api.success({
				message: successCreate
			})
			setProduct({
				...product,
				...reqProductCreate.data?.data
			})
			onSuccess?.()
		}
	}, [reqProductCreate.data, reqProductCreate.status]);
	
	useEffect(() => {
		if (reqProductUpdate.status === 'success') {
			form.resetFields()
			api.success({
				message: successUpdate
			})
			setProduct({
				...product,
				...reqProductUpdate.data?.data
			})
			onSuccess?.()
		}
	}, [reqProductUpdate.data, reqProductUpdate.status]);
	
	useEffect(() => {
		if (product) {
			form.setFieldsValue({
				name: product.name,
				sku: product.sku,
				unit_id: product.unit_id,
				category_id: product.category_id,
				active: product.active
			})
			setGallery(product.gallery)
		} else {
			form.resetFields()
		}
		
		setFieldQueryParams({field: 'type', value: 'products'})
		
		return () => {
			setFieldQueryParams({field: 'type', value: undefined})
		}
	}, [form, product, setFieldQueryParams, setGallery]);
	
	return <Form
		form={form}
		onFinish={handleFinish}
		layout='vertical'
		{...props}
	>
		{contextHolder}
		<Row
			gutter={[12, 12]}
		>
			<Col span={12}>
				<Form.Item<ProductFormDataInterface>
					label="Nom"
					name="name"
					rules={[{required: true}]}
				>
					<Input/>
				</Form.Item>
			</Col>
			
			<Col span={12}>
				<Form.Item<ProductFormDataInterface>
					label="SKU"
					name="sku"
					rules={[{required: true}]}
				>
					<Input/>
				</Form.Item>
			</Col>
			
			<Col span={12}>
				<Form.Item<ProductFormDataInterface>
					label="Unité de base"
					name="unit_id"
					rules={[{required: true}]}
				>
					<SelectUnit/>
				</Form.Item>
			</Col>
			
			<Col span={12}>
				<Form.Item<ProductFormDataInterface>
					label="Catégorie"
					name="category_id"
					rules={[{required: true}]}
				>
					<SelectCategory/>
				</Form.Item>
			</Col>
			
			{product && <Col span={12}>
		<Form.Item<StockFormDataInterface>
			label="Active ?"
			name="active"
		>
		  <Switch defaultChecked/>
		</Form.Item>
	  </Col>}
			
			<Col span={12}>
				<Form.Item label="Image" required>
					<ImagePreviewWithGallery
						initialValues={{
							type: 'products'
						}}
					/>
				</Form.Item>
			</Col>
			
			<Flex justify='center' className='w-screen'>
				<Button
					type="primary"
					htmlType="submit"
					className='w-1/2'
					loading={isLoading}
				>
					Valider
				</Button>
			</Flex>
		</Row>
	</Form>
}