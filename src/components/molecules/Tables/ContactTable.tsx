import {Button, Modal, Space, Table} from "antd";
import Link from "antd/es/typography/Link";
import dayjs from "dayjs";
import {formatDate} from "../../../constants/dateConstant.ts";
import {FaEdit} from "react-icons/fa";
import {useState} from "react";
import useContactStore from "../../../store/useContactStore.ts";
import {ContactForm} from "../../organisms/Forms/ContactForm.tsx";
import {useSupplyStore} from "../../../store/useSupplyStore.ts";
import {notDefined} from "../../../constants/textsConstant.ts";

export default function ContactTable({contacts, ...props}: { contacts: ContactInterface[] }) {
	const {setContact} = useContactStore()
	const [isModalOpen, setIsModalOpen] = useState(false);
	const {supply} = useSupplyStore()
	
	return <>
		<Table
			columns={[
				{
					key: 'ID',
					title: 'ID',
					render: (_, row) => {
						return row.id
					}
				},
				{
					key: 'Nom complet',
					title: 'Nom complet',
					render: (_, row) => {
						return row.name
					}
				},
				{
					key: 'Téléphone',
					title: 'Téléphone',
					render: (_, row) => {
						return <Link
							href={`tel:${row.phoneNumber}`}
						>
							{row.phoneNumber}
						</Link>
					}
				},
				{
					key: 'Poste',
					title: 'Poste',
					render: (_, row) => {
						return row?.position?.name || notDefined
					}
				},
				{
					key: 'Date',
					title: 'Date',
					render: (_, row) => {
						return dayjs(row.created_at).format(formatDate)
					}
				},
				{
					key: 'Options',
					title: 'Option',
					render: (_, row) => {
						return <Space>
							<Button
								icon={<FaEdit/>}
								onClick={() => {
									setContact(row)
									setIsModalOpen(true)
								}}
							/>
						</Space>
					}
				},
			]}
			dataSource={contacts}
			rowKey={(record) => record.id}
			className='text-nowrap'
			scroll={{
				x: true
			}}
			{...props}
		/>
		{supply &&
		<ContactFormModal
			openModal={isModalOpen}
			onClose={() => {
							setIsModalOpen(false)
							setContact(undefined)
						}}
		/>}
	</>
}

const ContactFormModal = ({openModal, onClose, ...props}: {
	openModal: boolean,
	onClose: () => void
}) => {
	const {contact} = useContactStore()
	
	return <Modal
		title={contact ? 'Mise à jour' : 'Nouveau contact'}
		open={openModal}
		onCancel={onClose}
		footer={null}
		{...props}
	>
		<ContactForm
			contact={contact}
		/>
	</Modal>
}