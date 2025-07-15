import {useState} from "react";
import SelectInfiniteScroll from "../../atoms/SelectInfinitScroll.tsx";
import customerService from "../../../services/tenant/customerService.ts";
import {SelectProps} from "rc-select/lib/Select";

export default function SelectScrollInfiniteCustomer({...props}: Partial<SelectProps>) {
	const [link, setLink] = useState<string | undefined>(undefined);
	
	async function getData({search, page}: RequestApiInterface) {
		const params = {
			search,
			per_page: 10,
			page,
			sort_by: 'name',
			sort_direction: 'asc',
		};
		
		return customerService.GetAll(params).then(({data: res}): BaseOptionType[] => {
			const data = res.data
			const links = res.links;
			setLink(links.next);
			return data.map(item => {
				return {
					label: item.name,
					value: item.id
				};
			});
		});
	}
	
	return <SelectInfiniteScroll
		hasMore={link}
		fetchOptions={getData}
		allowClear
		placeholder="Client"
		{...props}
	/>;
}