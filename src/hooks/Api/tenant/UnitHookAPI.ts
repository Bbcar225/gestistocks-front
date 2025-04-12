import {useQuery} from "react-query";
import unitService from "../../../services/tenant/unitService.ts";
import {useUnitStore} from "../../../store/useUnitStore.ts";

export const queriesClientsUnit = {
	useUnitGetAll: 'useUnitGetAll'
}

export const useUnitGetAll = (params?: HookApiInterface) => {
	const {queryParams} = useUnitStore()
	
	return useQuery(
		[queriesClientsUnit.useUnitGetAll, queryParams],
		() => unitService.getAll(queryParams),
		{enabled: params?.enabled}
	)
}