import {useMutation, useQuery} from "react-query";
import supplyService from "../../../services/tenant/supplyService.ts";

export const supplyQueriesClients = {
	useSupplyGetAll: 'useSupplyGetAll',
	useSupplyGetOne: 'useSupplyGetOne'
}

export const useSupplyGetAll = (params?: HookApiInterface) => {
	return useQuery(
		[supplyQueriesClients.useSupplyGetAll, params?.queryParams],
		() => supplyService.GetAll(params?.queryParams),
		{
			enabled: params?.enabled
		}
	)
}

export const useSupplyCreate = () => {
	return useMutation(supplyService.Create)
}

export const useSupplyUpdate = (id: number) => {
	return useMutation<ResponseApiInterface<SupplyInterface>, never, SupplyFormData>((formData) => supplyService.Update(id, formData))
}

export const useSupplyGetOne = (params?: HookApiInterface) => {
	return useQuery(
		[supplyQueriesClients.useSupplyGetOne, params?.queryParams, params?.id],
		() => supplyService.GetOne(Number(params?.id)),
		{
			enabled: params?.enabled
		}
	)
}

export const useSupplyCreateContact = (supplyId: number) => {
	return useMutation<ResponseApiInterface<ContactInterface>, never, ContactFormData>((formData) => supplyService.CreateContact(supplyId, formData))
}

export const useSupplyUpdateContact = (supplyId: number, contactId: number) => {
	return useMutation<ResponseApiInterface<ContactInterface>, never, ContactFormData>((formData) => supplyService.UpdateContact(supplyId, contactId, formData))
}