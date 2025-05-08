import {Select} from "antd";
import {useEffect, useState} from "react";
import {useFormDataGetCountries} from "../../../hooks/Api/app/FormDataHookAPI.ts";
import {filterOptionSelect} from "../../../utils/formUtils.ts";

export default function SelectCity({filterFn, ...props}: { filterFn?: (country: CountryInterface) => boolean; }) {
	const reqGetData = useFormDataGetCountries()
	const [options, setOptions] = useState<BaseOptionType[]>([]);
	
	useEffect(() => {
		if (reqGetData.isSuccess) {
			const res = reqGetData.data
			let data = res.data
			
			if (filterFn) {
				data = data.filter(filterFn)
			}
			
			const options: BaseOptionType[] = data.flatMap((item) => {
				return item.cities.map((city) => {
					return {
						label: city,
						value: city
					}
				})
			}).sort((a, b) => a.label.localeCompare(b.label))
			
			setOptions(options)
		}
	}, [reqGetData.data, reqGetData.isSuccess, filterFn]);
	
	return <Select
		loading={reqGetData.isLoading}
		options={options}
		showSearch
		filterOption={filterOptionSelect}
		mode="tags"
		{...props}
	/>
}