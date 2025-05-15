import {useEffect, useState} from "react";
import {useAppStore} from "../../../store/useAppStore.ts";
import {Card, Col, Row, Steps} from "antd";
import PurchaseForm from "../../organisms/Forms/PurchaseForm.tsx";
import StockForm from "../../organisms/Forms/StockForm.tsx";
import {usePurchaseGetOne} from "../../../hooks/Api/tenant/PurchaseHookAPI.ts";
import {useRoutesPurchase} from "../../../routes/purchaseRoutes.ts";

export default function PurchaseCreatePage() {
	const {setSidebar} = useAppStore()
	const [current, setCurrent] = useState(0);
	const [purchase, setPurchase] = useState<PurchaseInterface | undefined>(undefined)
	const reqPurchaseGetOne = usePurchaseGetOne({
		id: purchase?.id,
		enabled: !!purchase?.id
	})
	
	const steps = [
		{
			title: 'Achats',
			content: <PurchaseForm
				onSuccess={(data) => {
					const purchase = data?.purchase
					
					if (purchase) {
						setPurchase(purchase)
						next()
					}
				}}
			/>,
		},
		{
			title: 'Stocks',
			content: (purchase && purchase?.items?.length > 0) && <StockPurchase purchase={purchase}/>,
		},
	];
	
	function next() {
		setCurrent(current + 1);
	}
	
	const items = steps.map((item) => ({key: item.title, title: item.title}));
	
	useEffect(() => {
		setSidebar({field: 'title', value: 'Nouvel achat'})
	}, [setSidebar]);
	
	useEffect(() => {
		if (reqPurchaseGetOne.status === 'success') {
			const res = reqPurchaseGetOne.data
			const purchase = res.data
			setPurchase(purchase)
		}
	}, [reqPurchaseGetOne.data, reqPurchaseGetOne.status]);
	
	return <Row>
		<Col span={24}>
			<Card
				title={<Steps className='!mt-2' current={current} items={items}/>}
			>
				{steps[current].content}
			</Card>
		</Col>
	</Row>
}

export const StockPurchase = ({purchase}: { purchase: PurchaseInterface }) => {
	const [items, setItems] = useState(purchase.items);
	const routesPurchase = useRoutesPurchase()
	
	const handleSuccess = (indexToRemove: number) => {
		setItems(prevItems => prevItems.filter((_, index) => index !== indexToRemove));
	};
	
	useEffect(() => {
		if (items.length <= 0) {
			routesPurchase.goToShow({id: purchase.id})
		}
	}, [items]);
	
	return (
		<Row gutter={[12, 12]}>
			{items.map((item, index) => (
				<Col span={24} key={item.id || index}>
					<Card title={`Ajout du produit ${item.product.name} dans le stock`} hoverable>
						<StockForm
							product={item.product}
							onSuccess={() => handleSuccess(index)}
							initialValues={{
								active: true,
								quantity: item.quantity,
								purchase_price: item.unit_price
							}}
						/>
					</Card>
				</Col>
			))}
		</Row>
	);
};
