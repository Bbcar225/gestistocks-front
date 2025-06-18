import {useAppStore} from "../../../store/useAppStore.ts";
import {useEffect} from "react";
import {useUserStore} from "../../../store/useUserStore.ts";
import {Button, Card, Col, Flex, Form, Input, notification, Row} from "antd";
import {isMobile} from "react-device-detect";
import ImagePreviewWithGallery from "../../organisms/Modals/ImagePreviewWithGallery.tsx";
import useGalleryStore from "../../../store/useGalleryStore.ts";
import {useAuthUpdateAccount} from "../../../hooks/Api/tenant/AuthHookAPI.ts";
import {successUpdate} from "../../../constants/textsConstant.ts";
import useRoutesAccount from "../../../hooks/routes/AccountRoutesHook.ts";

export default function AccountUpdatePage() {
	const {setSidebar} = useAppStore()
	const {tenant, setTenant} = useUserStore()
	const [form] = Form.useForm<TenantFormDataInterface>();
	const [notificationInstance, contextHolder] = notification.useNotification();
	const {setGallery, gallery} = useGalleryStore()
	const reqAuthUpdateAccount = useAuthUpdateAccount()
	const routesAccount = useRoutesAccount()
	const {setFieldQueryParams} = useGalleryStore()
	
	const handleFinish = (values: TenantFormDataInterface) => {
		if (!gallery) {
			return notificationInstance.error({
				message: "L'image est obligatoire.",
				showProgress: true,
			})
		}
		
		const formData = {
			...values,
			gallery_id: gallery.id,
		}
		
		return reqAuthUpdateAccount.mutate(formData, {
			onSuccess: ({data, message}) => {
				notificationInstance.success({
					message: message,
					description: successUpdate
				})
				setTenant(data)
				return routesAccount.goToAccount()
			}
		})
	}
	
	useEffect(() => {
		setSidebar({field: 'title', value: 'Mise à jour du compte'})
		setFieldQueryParams({field: 'type', value: 'tenants'})
		
		return () => {
			return setFieldQueryParams({field: 'type', value: undefined})
		}
	}, [setFieldQueryParams, setSidebar]);
	
	useEffect(() => {
		if (tenant) {
			form.setFieldsValue({
				name: tenant.name,
				phoneNumber: tenant.phoneNumber,
				email: tenant.email,
				address: tenant.address,
				notice_invoice: tenant.notice_invoice
			})
			
			setGallery(tenant.gallery)
		}
	}, [tenant]);
	
	useEffect(() => {
		if (gallery) {
			form.setFieldValue("gallery_id", gallery?.id)
		}
	}, [form, gallery]);
	
	return <Row gutter={[12, 12]}>
		<Col span={24}>
			<Card>
				<Form
					form={form}
					layout='vertical'
					onFinish={handleFinish}
				>
					<Row gutter={[12, 24]}>
						<Col span={isMobile ? 24 : 8}>
							<Form.Item
								label="Nom de l'entreprise"
								name="name"
								rules={[{required: true}]}
							>
								<Input/>
							</Form.Item>
						</Col>
						
						<Col span={isMobile ? 24 : 8}>
							<Form.Item
								label="Numéro de téléphone"
								name="phoneNumber"
								rules={[{required: true}]}
							>
								<Input/>
							</Form.Item>
						</Col>
						
						<Col span={isMobile ? 24 : 8}>
							<Form.Item
								label="Email"
								name="email"
								rules={[{required: true}]}
							>
								<Input/>
							</Form.Item>
						</Col>
					</Row>
					
					<Row gutter={[12, 12]}>
						<Col span={isMobile ? 24 : 12}>
							<Form.Item
								label="Adresse"
								name="address"
								rules={[{required: true}]}
							>
								<Input.TextArea/>
							</Form.Item>
						</Col>
						
						<Col span={isMobile ? 24 : 12}>
							<Form.Item
								label="Texte bas de facture"
								name="notice_invoice"
								rules={[{required: true}]}
							>
								<Input.TextArea/>
							</Form.Item>
						</Col>
						
						<Col span={12}>
							<Form.Item label="Image" required>
								<ImagePreviewWithGallery
									initialValues={{
										type: 'tenants'
									}}
								/>
							</Form.Item>
						</Col>
					</Row>
					
					<Flex justify='center' className='w-full'>
						<Button
							type="primary"
							htmlType="submit"
							className='w-1/2'
							loading={reqAuthUpdateAccount.isLoading}
						>
							Valider
						</Button>
					</Flex>
				</Form>
			</Card>
		</Col>
		{contextHolder}
	</Row>;
}