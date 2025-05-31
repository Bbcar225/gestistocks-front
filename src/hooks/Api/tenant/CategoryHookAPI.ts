import {useMutation, useQuery} from "react-query";
import categoryService from "../../../services/tenant/categoryService.ts";

export const categoryQueriesClients = {
	useCategoryGetAll: 'useCategoryGetAll',
	useCategoryGetOne: 'useCategoryGetOne'
}

export const useCategoryGetAll = (params?: HookApiInterface) => {
	return useQuery(
		[categoryQueriesClients.useCategoryGetAll, params?.queryParams],
		() => categoryService.getAll(params?.queryParams),
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