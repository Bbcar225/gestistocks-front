import {useMutation, useQuery} from "react-query";
import unitService from "../../../services/tenant/unitService.ts";
import {useUnitStore} from "../../../store/useUnitStore.ts";

export const queriesClientsUnit = {
	useUnitGetAll: 'useUnitGetAll',
	useUnitGetOne: 'useUnitGetOne'
}

export const useUnitGetAll = (params?: HookApiInterface) => {
	const {queryParams} = useUnitStore()
	
	return useQuery(
		[queriesClientsUnit.useUnitGetAll, queryParams],
		() => unitService.getAll(queryParams),
		{enabled: params?.enabled}
	)
}

export const useUnitCreate = () => {
	return useMutation<ResponseApiInterface<UnitInterface>, unknown, UnitFormDataInterface>(unitService.create)
}

export const useUnitGetOne = (id: number, params?: HookApiInterface) => {
	return useQuery<ResponseApiInterface<UnitInterface>>(
		[queriesClientsUnit.useUnitGetOne, id],
		() => unitService.getOne(id),
		{
			enabled: params?.enabled
		}
	)
}

export const useUnitUpdate = (id: number) => {
	return useMutation<ResponseApiInterface<UnitInterface>, unknown, UnitFormDataInterface>((formFormData) => unitService.update(id, formFormData))
}