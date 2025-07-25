import {Form} from "antd";
import BaseFilter from "../../molecules/BaseFilter.tsx";
import SearchInput from "../../atoms/SearchInput.tsx";
import {useCustomerStore} from "../../../store/useCustomerStore.ts";
import SelectCountry from "../../molecules/Selects/SelectCountry.tsx";

export default function CustomerFilter() {
	const {setQueryParams, queryParams, resetQueryParams} = useCustomerStore()
	
	return <BaseFilter<CustomerQueryParamsInterface>
		title="Filtre"
		formElement={<CustomerFilterForm/>}
		handleFinish={(values) => setQueryParams(values)}
		handleReset={() => {
			resetQueryParams()
		}}
		initialValues={queryParams}
	/>
}

const CustomerFilterForm = () => {
	return <>
		<Form.Item
			label="Recherche"
			name="search"
		>
			<SearchInput/>
		</Form.Item>
		
		<Form.Item
			label="Pays"
			name="country"
		>
			<SelectCountry
				withoutCity={true}
			/>
		</Form.Item>
	</>
};