import {ReactNode, useState} from "react";
import {Button, Modal, Tooltip} from "antd";
import {FaEdit, FaMoneyBillWave} from "react-icons/fa";
import PaymentForm from "../Forms/PaymentForm.tsx";

export default function PaymentFormModal({initialValues, childrenBtn, onSuccess, payment, ...props}: {
	initialValues?: PaymentFormDataInterface,
	childrenBtn?: ReactNode,
	onSuccess?: (res?: { data?: PaymentInterface }) => void,
	payment?: PaymentInterface
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
					type={payment ? "default" : "primary"}
					onClick={showModal}
					icon={payment ? <FaEdit/> : <FaMoneyBillWave/>}
					variant={payment ? "solid" : "filled"}
					{...(payment ? {} : {color: "green"})}
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
						onSuccess?.()
					}}
					initialValues={initialValues}
					{...props}
				/>
			</Modal>
		</>
	);
}