import service from "../../providers/AxiosProvider.ts";

const productService = {
	GetAll: (params: RequestApiInterface = {}): Promise<ResponseApiInterface<ResponsePaginateInterface<ProductInterface[]>>> => {
		return service.get(`/tenant/products`, {params})
	}
}

export default productService