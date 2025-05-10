import {useEffect} from "react";
import {useAppStore} from "../../../store/useAppStore.ts";
import {Card, Col, Input, Row} from "antd";
import {isMobile} from "react-device-detect";
import {usePurchaseStore} from "../../../store/usePurchaseStore.ts";
import SelectScrollInfiniteSupplier from "../../molecules/Selects/SelectScrollInfiniteSupplier.tsx";
import Products from "../../molecules/Products.tsx";

export default function PurchaseCreatePage() {
	const {setSidebar} = useAppStore()
	const {cart, setFieldCart} = usePurchaseStore()
	
	console.log(`/Users/boubacarly/Sites/localhost/perso/gestistock2/front/src/components/pages/purchases/PurchaseCreatePage.tsx:12`, `cart =>`, cart)
	
	useEffect(() => {
		setSidebar({field: 'title', value: 'Nouvel achat'})
	}, [setSidebar]);
	
	return <Row gutter={[12, 12]}>
		<Col span={isMobile ? 24 : 8}>
			<Card
				title="Informations"
			>
				<Row
					gutter={[12, 24]}
				>
					<Col span={24}>
						<SelectScrollInfiniteSupplier
							className="w-full"
							allowClear={false}
							onChange={(value: BaseOptionType) => setFieldCart({
								field: 'supplier',
								value,
							})}
						/>
					</Col>
					
					<Col span={24}>
						<Input
							placeholder="Référence"
							onChange={(value) => setFieldCart({
								field: 'reference',
								value: value.target.value,
							})}
						/>
					</Col>
					
					<Col span={24}>
						<Input
							type="date"
							placeholder="Date"
							defaultValue={cart?.date}
							onChange={(value) => setFieldCart({
								field: 'reference',
								value: value.target.value,
							})}
						/>
					</Col>
				</Row>
			</Card>
		</Col>
		
		<Col span={isMobile ? 24 : 16}>
			<Card
				title="Produits"
				styles={{
					body: {
						padding: isMobile ? '5px' : '20px'
					}
				}}
			>
				<Products/>
			</Card>
		</Col>
	</Row>
}