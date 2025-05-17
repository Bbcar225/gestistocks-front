import useContactStore from "../../../store/useContactStore.ts";
import {useSupplierStore} from "../../../store/useSupplierStore.ts";
import {Modal} from "antd";
import {ContactForm} from "../Forms/ContactForm.tsx";
import {useCustomerStore} from "../../../store/useCustomerStore.ts";

export default function ContactFormModal({openModal, onClose, onSuccess, ...props}: {
	openModal: boolean,
	onClose: () => void,
	onSuccess?: () => void
}) {
	const {contact} = useContactStore()
	const {updateContactOfSupplier, supplier} = useSupplierStore()
	const title = contact ? 'Mise à jour' : 'Nouveau contact'
	const {customer} = useCustomerStore()
	
	return <Modal
		title={`${title}: ${supplier?.name || customer?.name}`}
		open={openModal}
		onCancel={onClose}
		footer={null}
		{...props}
	>
		<ContactForm
			contact={contact}
			onSuccess={(data) => {
				if (data?.contact) {
					if (supplier) {
						updateContactOfSupplier(data.contact)
					}
				}
				
				onSuccess?.()
			}}
		/>
	</Modal>
}