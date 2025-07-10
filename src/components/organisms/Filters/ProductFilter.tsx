import {Form, Select} from "antd";
import BaseFilter from "../../molecules/BaseFilter.tsx";
import SearchInput from "../../atoms/SearchInput.tsx";
import {useProductStore} from "../../../store/useProductStore.ts";
import SelectCategory from "../../molecules/Selects/SelectCategory.tsx";

export default function ProductFilter() {
	const {setQueryParams, queryParams, resetQueryParams} = useProductStore()
	
	return <BaseFilter<ProductQueryParamsInterface>
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
			label="Active ?"
			name="active"
		>
			<Select
				options={[
					{
						label: "Oui",
						value: 'yes'
					},
					{
						label: "Non",
						value: "no"
					}
				]}
				placeholder="Active"
				allowClear
			/>
		</Form.Item>
		
		<Form.Item
			label="En stock ?"
			name="salable"
		>
			<Select
				options={[
					{
						label: "Oui",
						value: 'yes'
					},
					{
						label: "Non",
						value: "no"
					}
				]}
				placeholder="En stock"
				allowClear
			/>
		</Form.Item>
		
		<Form.Item
			label="Catégorie"
			name="category_id"
		>
			<SelectCategory
				allowClear
			/>
		</Form.Item>
	</>
};