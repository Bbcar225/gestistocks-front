import service from "../../providers/AxiosProvider.ts";

const unitEquivalence = {
	CreateUnitEquivalence: (id: number, data: UnitEquivalenceFormDataInterface): Promise<ResponseApiInterface<UnitEquivalenceInterface>> => {
		return service.post(`/tenant/products/${id}/unit-equivalences`, data)
	}
}

const stock = {
	CreateStock: (productId: number, data: StockFormDataInterface): Promise<ResponseApiInterface<StockInterface>> => {
		return service.post(`/tenant/products/${productId}/stocks`, data)
	}
}

const productService = {
	GetAll: (params: RequestApiInterface = {}): Promise<ResponseApiInterface<ResponsePaginateInterface<ProductInterface[]>>> => {
		return service.get(`/tenant/products`, {params})
	},
	Create: (data: ProductFormDataInterface): Promise<ResponseApiInterface<ProductInterface>> => {
		return service.post(`/tenant/products`, data)
	},
	GetOne: (id: number): Promise<ResponseApiInterface<ProductInterface>> => {
		return service.get(`/tenant/products/${id}`)
	},
	Update: (id: number, data: ProductFormDataInterface): Promise<ResponseApiInterface<ProductInterface>> => {
		return service.put(`/tenant/products/${id}`, data)
	},
	...unitEquivalence,
	...stock
}

export default productService