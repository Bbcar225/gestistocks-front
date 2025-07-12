import {useState} from "react";
import {Button, Modal, Tooltip} from "antd";
import {FaMoneyBillWave} from "react-icons/fa";
import PaymentForm from "../Forms/PaymentForm.tsx";

export default function PaymentFormModal({...props}) {
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
					{...props}
				/>
			</Modal>
		</>
	);
}