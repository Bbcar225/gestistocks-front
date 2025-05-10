import {useState} from "react";
import SelectInfiniteScroll from "../../atoms/SelectInfinitScroll.tsx";
import supplierService from "../../../services/tenant/supplierService.ts";

export default function SelectScrollInfiniteSupplier({...props}) {
	const [link, setLink] = useState<string | undefined>(undefined);
	
	async function getData({search, page}: RequestApiInterface) {
		const params = {
			search,
			perPage: 10,
			page,
			sort_by: 'name',
			sort_direction: 'asc',
		};
		
		return supplierService.GetAll(params).then(({data: res}): BaseOptionType[] => {
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
		placeholder="Fournisseur"
		{...props}
	/>;
}