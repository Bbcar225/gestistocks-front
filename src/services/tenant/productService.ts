import service from "../../providers/AxiosProvider.ts";

const unitEquivalence = {
	CreateUnitEquivalence: (id: number, data: UnitEquivalenceFormDataInterface): Promise<ResponseApiInterface<UnitEquivalenceInterface>> => {
		return service.post(`/tenant/products/${id}/unit-equivalences`, data)
	}
}

const productService = {
	GetAll: (params: RequestApiInterface = {}): Promise<ResponseApiInterface<ResponsePaginateInterface<ProductInterface[]>>> => {
		return service.get(`/tenant/products`, {params})
	},
	Create: (data: ProductFormDataInterface): Promise<ResponseApiInterface<ProductInterface>> => {
		return service.post(`/tenant/products`, data)
	},
	...unitEquivalence
}

export default productService