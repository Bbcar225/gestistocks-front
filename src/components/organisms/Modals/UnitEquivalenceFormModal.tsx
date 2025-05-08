import {Col, Modal, Row} from "antd";
import {useAppStore} from "../../../store/useAppStore.ts";
import useUnitEquivalenceStore from "../../../store/useUnitEquivalenceStore.ts";
import UnitEquivalenceForm from "../Forms/UnitEquivalenceForm.tsx";
import {useQueryClient} from "react-query";
import {productQueriesClients} from "../../../hooks/Api/tenant/ProductHookAPI.ts";

export default function UnitEquivalenceFormModal({...props}) {
	const {openModal, setOpenModal} = useAppStore()
	const {unitEquivalence, setUnitEquivalence} = useUnitEquivalenceStore()
	const queryClient = useQueryClient()
	
	return <Modal
		title={unitEquivalence ? `Mise à jour` : 'Nouvel équivalence'}
		open={openModal}
		onCancel={() => {
			setOpenModal()
			setUnitEquivalence(undefined)
		}}
		footer={null}
		width={800}
		{...props}
	>
		<Row gutter={[12, 12]}>
			<Col span={24}>
				<UnitEquivalenceForm
					unitEquivalence={unitEquivalence}
					onSuccess={() => {
						queryClient.invalidateQueries(productQueriesClients.useProductGetOne).then()
					}}
				/>
			</Col>
		</Row>
	</Modal>
}