import useContactStore from "../../../store/useContactStore.ts";
import {useSupplierStore} from "../../../store/useSupplierStore.ts";
import {Modal} from "antd";
import {ContactForm} from "../Forms/ContactForm.tsx";

export default function ContactFormModal({openModal, onClose, ...props}: {
	openModal: boolean,
	onClose: () => void
}) {
	const {contact} = useContactStore()
	const {updateContactOfSupplier, supplier} = useSupplierStore()
	const title = contact ? 'Mise à jour' : 'Nouveau contact'
	
	return <Modal
		title={`${title}: ${supplier?.name}`}
		open={openModal}
		onCancel={onClose}
		footer={null}
		{...props}
	>
		<ContactForm
			contact={contact}
			onSuccess={(data) => {
				if (data?.contact) {
					updateContactOfSupplier(data.contact)
				}
			}}
		/>
	</Modal>
}