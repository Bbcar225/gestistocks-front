import {Button, Drawer, Flex, FloatButton, Form, FormInstance} from "antd";
import {FaFilter} from "react-icons/fa";
import {ReactNode, useState} from "react";
import {Store} from "rc-field-form/lib/interface";

type RecursivePartial<T> = {
	[P in keyof T]?: T[P] extends object ? RecursivePartial<T[P]> : T[P];
};


export default function BaseFilter<T>({
	                                      formElement,
	                                      title,
	                                      handleFinish,
	                                      handleReset,
	                                      initialValues
                                      }: BaseFilterProps<T, ReactNode>) {
	const [open, setOpen] = useState(false);
	const [form] = Form.useForm<T>();
	
	const showDrawer = () => setOpen(true);
	const onClose = () => setOpen(false);
	
	const clearFormFields = (form: FormInstance) => {
		const currentValues = form.getFieldsValue();
		
		const clearedValues = Object.keys(currentValues).reduce((acc, key) => {
			acc[key as keyof T] = undefined;
			return acc;
		}, {} as RecursivePartial<T>);
		
		form.setFieldsValue(clearedValues);
	}
	
	return (
		<>
			<FloatButton icon={<FaFilter/>} type="primary" onClick={showDrawer}/>
			<Drawer
				title={title}
				closable={{'aria-label': 'Close Button'}}
				onClose={onClose}
				open={open}
				footer={
					<Flex gap="small">
						<Button className="w-full" type="primary" onClick={() => {
							onClose()
							form.submit()
						}}>
							Appliquer
						</Button>
						<Button
							className="w-full"
							type="default"
							onClick={() => {
								handleReset?.();
								onClose()
								clearFormFields(form);
							}}
						>
							Réinitialiser
						</Button>
					</Flex>
				}
			>
				<Form<T>
					form={form}
					layout="vertical"
					onFinish={handleFinish}
					initialValues={initialValues as Store}
				>
					{formElement}
				</Form>
			</Drawer>
		</>
	);
}
