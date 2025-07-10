import {Form} from "antd";
import BaseFilter from "../../molecules/BaseFilter.tsx";
import SearchInput from "../../atoms/SearchInput.tsx";
import SelectCountry from "../../molecules/Selects/SelectCountry.tsx";
import {useSupplierStore} from "../../../store/useSupplierStore.ts";

export default function SupplierFilter() {
	const {setQueryParams, queryParams, resetQueryParams} = useSupplierStore()
	
	return <BaseFilter<SupplierQueryParamsInterface>
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