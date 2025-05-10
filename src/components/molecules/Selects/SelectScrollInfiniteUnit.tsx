import {useState} from "react";
import SelectInfiniteScroll from "../../atoms/SelectInfinitScroll.tsx";
import unitService from "../../../services/tenant/unitService.ts";

export default function SelectScrollInfiniteUnit({ ...props }) {
	const [link, setLink] = useState<string | undefined>(undefined);
  
  async function getData({ search, page }: RequestApiInterface) {
    const params = {
      search,
      perPage: 10,
      page
    };
    
    return unitService.getAll(params).then(({data: res}): BaseOptionType[] => {
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
    placeholder="Unité"
    {...props}
  />;
}