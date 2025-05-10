import {Col, Modal, Row} from "antd";
import {useAppStore} from "../../../store/useAppStore.ts";
import {useQueryClient} from "react-query";
import {useSupplierStore} from "../../../store/useSupplierStore.ts";
import SupplierForm from "../Forms/SupplierForm.tsx";
import {supplierQueriesClients} from "../../../hooks/Api/tenant/SupplierHookAPI.ts";

export default function SupplierFormModal({isOpenModal, onClose, ...props}: {
	isOpenModal?: boolean,
	onClose?: () => void
}) {
	const {openModal, setOpenModal} = useAppStore()
	const {supplier, setSupplier} = useSupplierStore()
	const queryClient = useQueryClient()
	
	return <Modal
		title={supplier ? `Mise à jour` : 'Nouveau fournisseur'}
		open={openModal || isOpenModal}
		onCancel={() => {
			setOpenModal(false)
			setSupplier(undefined)
			onClose?.()
		}}
		footer={null}
		width={800}
		{...props}
	>
		<Row gutter={[12, 12]}>
			<Col span={24}>
				<SupplierForm
					onSuccess={() => {
						queryClient.invalidateQueries(supplierQueriesClients.useSupplierGetAll).then()
					}}
				/>
			</Col>
		</Row>
	</Modal>
}