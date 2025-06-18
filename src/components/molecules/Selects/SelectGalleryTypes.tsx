import {Select} from "antd";
import {useEffect, useState} from "react";
import {useFormDataGetTypesGallery} from "../../../hooks/Api/app/FormDataHookAPI.ts";
import {filterOptionSelect} from "../../../utils/formUtils.ts";

export default function SelectGalleryTypes({...props}) {
	const reqGetData = useFormDataGetTypesGallery()
	const [options, setOptions] = useState<BaseOptionType[]>([]);
	
	useEffect(() => {
		if (reqGetData.isSuccess) {
			const res = reqGetData.data
			const data = res.data
			
			const options: BaseOptionType[] = data.map((item) => {
				return {
					label: item === 'products' ? "Produit" : 'Logo',
					value: item
				}
			})
			
			setOptions(options)
		}
	}, [reqGetData.data, reqGetData.isSuccess]);
	
	return <Select
		loading={reqGetData.isLoading}
		options={options}
		showSearch
		filterOption={filterOptionSelect}
		{...props}
	/>
}