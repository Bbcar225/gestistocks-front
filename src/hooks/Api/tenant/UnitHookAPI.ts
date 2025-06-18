import {useMutation, useQuery} from "react-query";
import unitService from "../../../services/tenant/unitService.ts";

export const queriesClientsUnit = {
	useUnitGetAll: 'useUnitGetAll',
	useUnitGetOne: 'useUnitGetOne'
}

export const useUnitGetAll = (params?: HookApiInterface) => {
	return useQuery(
		[queriesClientsUnit.useUnitGetAll, params?.queryParams],
		() => unitService.getAll(params?.queryParams),
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