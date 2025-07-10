import {DatePicker, Form} from "antd";
import BaseFilter from "../../molecules/BaseFilter.tsx";
import SearchInput from "../../atoms/SearchInput.tsx";
import {usePurchaseStore} from "../../../store/usePurchaseStore.ts";
import SelectScrollInfiniteSupplier from "../../molecules/Selects/SelectScrollInfiniteSupplier.tsx";

export default function PurchaseFilter() {
	const {setQueryParams, queryParams, resetQueryParams} = usePurchaseStore()
	
	return <BaseFilter<PurchaseQueryParamsInterface>
		title="Filtre"
		formElement={<FilterForm/>}
		handleFinish={(values) => setQueryParams(values)}
		handleReset={() => {
			resetQueryParams()
		}}
		initialValues={queryParams}
	/>
}

const FilterForm = () => {
	return <>
		<Form.Item
			label="Recherche"
			name="reference"
		>
			<SearchInput/>
		</Form.Item>
		
		<Form.Item
			label="Fournisseur"
			name="supplier_id"
		>
			<SelectScrollInfiniteSupplier/>
		</Form.Item>
		
		<Form.Item
			label="Dates"
			name="dates"
		>
			<DatePicker.RangePicker
				className="w-full"
				placement='bottomLeft'
			/>
		</Form.Item>
	</>
};