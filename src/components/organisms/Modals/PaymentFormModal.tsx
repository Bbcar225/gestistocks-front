import {ReactNode, useState} from "react";
import {Button, Modal, Tooltip} from "antd";
import {FaMoneyBillWave} from "react-icons/fa";
import PaymentForm from "../Forms/PaymentForm.tsx";

export default function PaymentFormModal({initialValues, childrenBtn, ...props}: {
	initialValues?: PaymentFormDataInterface,
	childrenBtn?: ReactNode
}) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	
	const showModal = () => {
		setIsModalOpen(true);
	};
	
	const handleOk = () => {
		setIsModalOpen(false);
	};
	
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	
	return (
		<>
			<Tooltip title="Paiement">
				<Button
					type="primary"
					onClick={showModal}
					icon={<FaMoneyBillWave/>}
					variant="filled"
					color="green"
				>
					{childrenBtn}
				</Button>
			</Tooltip>
			<Modal
				title="Paiement"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={null}
				{...props}
			>
				<PaymentForm
					onSuccess={() => {
						setIsModalOpen(false);
					}}
					initialValues={initialValues}
					{...props}
				/>
			</Modal>
		</>
	);
}