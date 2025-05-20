import {useEffect, useState} from "react";
import {useAppStore} from "../../../store/useAppStore.ts";
import {Card, Col, Row, Spin} from "antd";
import PurchaseForm from "../../organisms/Forms/PurchaseForm.tsx";
import {useParams} from "react-router-dom";
import {usePurchaseGetOne} from "../../../hooks/Api/tenant/PurchaseHookAPI.ts";

export default function PurchaseCreatePage() {
	const {setSidebar} = useAppStore()
	const {purchase: purchaseId} = useParams()
	const reqPurchaseGetOne = usePurchaseGetOne({
		id: purchaseId
	})
	const [purchase, setPurchase] = useState<PurchaseInterface | undefined>(undefined)
	
	useEffect(() => {
		setSidebar({field: 'title', value: `Mise à jour de l'achat ${purchase ? ` : #${purchase.id}` : ''}`})
	}, [purchase, setSidebar]);
	
	useEffect(() => {
		if (reqPurchaseGetOne.status === 'success') {
			const res = reqPurchaseGetOne.data
			const purchase = res.data
			setPurchase(purchase)
		}
	}, [reqPurchaseGetOne.status]);
	
	return <Spin spinning={reqPurchaseGetOne.isLoading}>
		<Row>
			<Col span={24}>
				<Card>
					{purchase && <PurchaseForm purchase={purchase}/>}
				</Card>
			</Col>
		</Row>
	</Spin>
}