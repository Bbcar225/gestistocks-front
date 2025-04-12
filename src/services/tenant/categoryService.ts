import service from "../../providers/AxiosProvider.ts";

const categoryService = {
	getAll: (params: RequestApiInterface = {}): Promise<ResponseApiInterface<ResponsePaginateInterface<CategoryInterface[]>>> => {
		return service.get(`/tenant/categories`, {params})
	},
	create: (data: CategoryFormDataInterface): Promise<ResponseApiInterface<CategoryInterface>> => {
		return service.post(`/tenant/categories`, data)
	},
	update: (id: number, data: CategoryFormDataInterface): Promise<ResponseApiInterface<CategoryInterface>> => {
		return service.put(`/tenant/categories/${id}`, data)
	},
	getOne: (id: number) => {
		return service.get(`/tenant/categories/${id}`)
	}
}

export default categoryService