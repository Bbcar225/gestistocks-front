import {Button, Col, Flex, Form, Input, notification, Row} from "antd";
import SelectUnit from "../../molecules/SelectUnit.tsx";
import SelectCategory from "../../molecules/SelectCategory.tsx";
import ImagePreviewWithGallery from "../../molecules/ImagePreviewWithGallery.tsx";
import useGalleryStore from "../../../store/useGalleryStore.ts";
import {useEffect} from "react";
import {config} from "../../../constants/notifcationConstant.ts";
import {useProductCreate} from "../../../hooks/Api/tenant/ProductHookAPI.ts";
import {successCreate} from "../../../constants/messagesConstant.ts";

export function ProductForm({onSuccess, ...props}: { onSuccess?: (data: { product?: ProductInterface }) => void; }) {
	const [form] = Form.useForm();
	const [api, contextHolder] = notification.useNotification(config);
	const {gallery} = useGalleryStore()
	const reqProductCreate = useProductCreate()
	
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
			onSuccess?.({product: reqProductCreate.data?.data})
		}
	}, [reqProductCreate.data, reqProductCreate.status]);
	
	return <Form
		form={form}
		onFinish={handleFinish}
		layout='vertical'
		disabled={reqProductCreate.isLoading}
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
			
			<Col span={12}>
				<Form.Item label="Image" required>
					<ImagePreviewWithGallery/>
				</Form.Item>
			</Col>
			
			<Flex justify='center' className='w-screen'>
				<Button
					type="primary"
					htmlType="submit"
					className='w-1/2'
					loading={reqProductCreate.isLoading}
				>
					Valider
				</Button>
			</Flex>
		</Row>
	</Form>
}