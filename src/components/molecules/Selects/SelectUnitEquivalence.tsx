import {Select} from "antd";
import {useEffect, useState} from "react";
import {filterOptionSelect} from "../../../utils/formUtils.ts";
import {useProductGetAllUnitEquivalence} from "../../../hooks/Api/tenant/ProductHookAPI.ts";

export default function SelectUnitEquivalence({productId, labelInValue = false, unitEquivalences, disabled, ...props}: {
	productId?: number,
	labelInValue?: boolean,
	unitEquivalences?: UnitEquivalenceInterface[],
	disabled?: boolean
}) {
	const [enabled, setEnable] = useState<boolean>(false);
	const reqGetData = useProductGetAllUnitEquivalence({
		id: productId,
		enabled
	})
	const [options, setOptions] = useState<BaseOptionType[]>([]);
	
	useEffect(() => {
		if (reqGetData.isSuccess) {
			const res = reqGetData.data
			const data = res.data
			const options: BaseOptionType[] = data.map((item) => {
				return {
					label: item.unit.name,
					value: item.unit.id
				}
			})
			
			setOptions(options)
		}
	}, [reqGetData.data, reqGetData.isSuccess]);
	
	useEffect(() => {
		if (unitEquivalences) {
			const options: BaseOptionType[] = unitEquivalences.map((item, index) => {
				return {
					key: index,
					label: item.unit.name,
					value: item.unit.id
				}
			})
			setEnable(false)
			setOptions(options)
		} else {
			setEnable(true)
		}
	}, [unitEquivalences]);
	
	return <Select
		loading={reqGetData.isLoading}
		disabled={reqGetData.isLoading || disabled}
		options={options}
		showSearch
		filterOption={filterOptionSelect}
		labelInValue={labelInValue}
		{...props}
	/>
}