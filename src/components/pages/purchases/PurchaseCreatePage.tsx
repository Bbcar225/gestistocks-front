import {useEffect} from "react";
import {useAppStore} from "../../../store/useAppStore.ts";
import {Card, Col, Row} from "antd";
import PurchaseForm from "../../organisms/Forms/PurchaseForm.tsx";

export default function PurchaseCreatePage() {
	const {setSidebar} = useAppStore()
	
	useEffect(() => {
		setSidebar({field: 'title', value: 'Nouvel achat'})
	}, [setSidebar]);
	
	return <Row>
		<Col span={24}>
			<Card>
				<PurchaseForm/>
			</Card>
		</Col>
	</Row>
}