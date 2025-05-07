import {useEffect} from "react";
import {useAppStore} from "../../../store/useAppStore.ts";
import {Col, Row} from "antd";
import UnitForm from "../../organisms/Forms/UnitForm.tsx";

export default function PurchaseCreatePage() {
	const {setSidebar} = useAppStore()
	
	useEffect(() => {
		setSidebar({field: 'title', value: 'Nouvelle unité'})
	}, [setSidebar]);
	
	return <Row gutter={[24, 12]}>
		<Col span={24}>
			<UnitForm />
		</Col>
	</Row>
}