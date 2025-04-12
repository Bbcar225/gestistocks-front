import {useMutation, useQuery} from "react-query";
import categoryService from "../../../services/tenant/categoryService.ts";
import {useCategoryStore} from "../../../store/useCategoryStore.ts";

export const categoryQueriesClients = {
	useCategoryGetAll: 'useCategoryGetAll',
	useCategoryGetOne: 'useCategoryGetOne'
}

export const useCategoryGetAll = (params?: HookApiInterface) => {
	const {queryParams} = useCategoryStore()
	
	return useQuery(
		[categoryQueriesClients.useCategoryGetAll, queryParams],
		() => categoryService.getAll(queryParams),
		{enabled: params?.enabled}
	)
}

export const useCategoryGetOne = (id: number, params?: HookApiInterface) => {
	return useQuery(
		[categoryQueriesClients.useCategoryGetOne, id],
		() => categoryService.getOne(id),
		{enabled: params?.enabled}
	)
}

export const useCategoryCreate = () => {
	return useMutation<ResponseApiInterface<CategoryInterface>, never, CategoryFormDataInterface>(categoryService.create)
}

export const useCategoryUpdate = (id: number) => {
	return useMutation<ResponseApiInterface<CategoryInterface>, never, CategoryFormDataInterface>((formData) => categoryService.update(id, formData))
}