import {DatePicker, Form} from "antd";
import BaseFilter from "./BaseFilter.tsx";
import {SaleQueryParamsInterface} from "../../interfaces/models/SaleInterface";
import SearchInput from "../atoms/SearchInput.tsx";
import SelectScrollInfiniteCustomer from "./Selects/SelectScrollInfiniteCustomer.tsx";
import useSaleStore from "../../store/useSaleStore.ts";

export default function SaleFilter() {
	const {setQueryParams, queryParams, resetQueryParams} = useSaleStore()
	
	return <BaseFilter<SaleQueryParamsInterface>
		title="Filtre des ventes"
		formElement={<SaleFilterForm/>}
		handleFinish={(values) => setQueryParams(values)}
		handleReset={() => {
			resetQueryParams()
		}}
		initialValues={queryParams}
	/>
}

const SaleFilterForm = () => {
	return <>
		<Form.Item
			label="Recherche"
			name="search"
		>
			<SearchInput/>
		</Form.Item>
		
		<Form.Item
			label="Client"
			name="customer_id"
		>
			<SelectScrollInfiniteCustomer/>
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