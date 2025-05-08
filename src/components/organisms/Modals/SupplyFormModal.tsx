import {Col, Modal, Row} from "antd";
import {useAppStore} from "../../../store/useAppStore.ts";
import {useQueryClient} from "react-query";
import {useSupplyStore} from "../../../store/useSupplyStore.ts";
import SupplyForm from "../Forms/SupplyForm.tsx";
import {supplyQueriesClients} from "../../../hooks/Api/tenant/SupplyHookAPI.ts";

export default function SupplyFormModal({...props}) {
	const {openModal, setOpenModal} = useAppStore()
	const {supply, setSupply} = useSupplyStore()
	const queryClient = useQueryClient()
	
	return <Modal
		title={supply ? `Mise à jour` : 'Nouveau fournisseur'}
		open={openModal}
		onCancel={() => {
			setOpenModal()
			setSupply(undefined)
		}}
		footer={null}
		width={800}
		{...props}
	>
		<Row gutter={[12, 12]}>
			<Col span={24}>
				<SupplyForm
					onSuccess={() => {
						queryClient.invalidateQueries(supplyQueriesClients.useSupplyGetAll).then()
					}}
				/>
			</Col>
		</Row>
	</Modal>
}