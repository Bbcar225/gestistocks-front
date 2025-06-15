import {Select} from "antd";
import {useEffect, useState} from "react";
import {filterOptionSelect} from "../../../utils/formUtils.ts";
import {useSupplierGetOne} from "../../../hooks/Api/tenant/SupplierHookAPI.ts";

export default function SelectContactSupplier({supplierId, enabled, disabled, labelInValue, ...props}: {
	supplierId: number,
	enabled: boolean,
	disabled?: boolean,
	labelInValue?: boolean
}) {
	const reqGetData = useSupplierGetOne({
		id: supplierId,
		enabled
	})
	const [options, setOptions] = useState<BaseOptionType[]>([])
	
	useEffect(() => {
		if (reqGetData.status === 'success') {
			const res = reqGetData.data
			const data = res?.data?.contacts || []
			setOptions(data.map((item) => {
				return {
					label: item.name,
					value: item.id
				}
			}))
		}
	}, [reqGetData.data, reqGetData.status]);
	
	return <Select
		loading={reqGetData.isLoading}
		disabled={reqGetData.isLoading || disabled}
		options={options}
		showSearch
		filterOption={filterOptionSelect}
		labelInValue={labelInValue}
		placeholder='Contacts'
		{...props}
	/>
}