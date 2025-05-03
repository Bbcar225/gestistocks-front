import {Button, Col, Flex, Form, Input, notification, Row, Select, UploadFile} from "antd";
import {useEffect} from "react";
import {successCreate} from "../../../constants/messagesConstant.ts";
import {useGalleryCreate} from "../../../hooks/Api/tenant/GalleryHookAPI.ts";
import {galleryTypes} from "../../../constants/formConstant.ts";
import ImageUpload from "../../molecules/ImageUpload.tsx";
import {normFile} from "../../../utils/formUtils.ts";

export default function GalleryForm({onSuccess, ...props}: { onSuccess?: (data: {gallery?: GalleryInterface}) => void; }) {
	const [form] = Form.useForm();
	const [api, contextHolder] = notification.useNotification();
	const reqGalleryCreate = useGalleryCreate()
	
	const handleFinish = (values: GalleryFormDataInterface & { file: UploadFile[] }) => {
		try {
			const formData = new FormData();
			
			formData.append("type", values.type);
			
			if (values.file && values.file.length > 0) {
				const file = values.file[0].originFileObj
				
				if (file) {
					formData.append("file", file);
					formData.append("name", values.name || file.name);
					
					reqGalleryCreate.mutate(formData);
				}
			}
		} catch (e: unknown) {
			console.log(e)
			notification.error({
				message: "Une erreur s'est produite.",
			})
		}
	}
	
	useEffect(() => {
		if (reqGalleryCreate.isSuccess) {
			const res = reqGalleryCreate.data
			api.success({
				message: res.message,
				description: successCreate
			})
			form.resetFields()
			
			onSuccess?.({ gallery: res.data });
		}
	}, [api, form, reqGalleryCreate.data, reqGalleryCreate.isSuccess]);
	
	return <Form
		form={form}
		layout="vertical"
		onFinish={handleFinish}
		disabled={reqGalleryCreate.isLoading}
		initialValues={{
			type: 'products'
		}}
		{...props}
	>
		<Row>
			<Col span={24}>
				<Form.Item<GalleryFormDataInterface>
					label="Type"
					name="type"
					rules={[{required: true}]}
				>
					<Select
						options={galleryTypes}
					/>
				</Form.Item>
			</Col>
			
			<Col span={24}>
				<Form.Item<GalleryFormDataInterface & { file: UploadFile[] }>
					label="Image"
					name="file"
					rules={[{required: true}]}
					valuePropName="fileList"
					getValueFromEvent={normFile}
				>
					<ImageUpload
						accept="image/*"
						maxCount={1}
					/>
				</Form.Item>
			</Col>
			
			<Col span={24}>
				<Form.Item<GalleryFormDataInterface>
					label="Nom de l'image"
					name="name"
				>
					<Input/>
				</Form.Item>
			</Col>
			
			<Flex justify='center' className='w-screen'>
				<Button
					type="primary"
					htmlType="submit"
					className='w-1/2'
					loading={reqGalleryCreate.isLoading}
				>
					Valider
				</Button>
			</Flex>
		</Row>
		{contextHolder}
	</Form>
}