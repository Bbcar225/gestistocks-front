import service from "../../providers/AxiosProvider.ts";

const galleryService = {
	GetAll: (params: RequestApiInterface = {}): Promise<ResponseApiInterface<ResponsePaginateInterface<GalleryInterface[]>>> => {
		return service.get(`/tenant/galleries`, {params})
	},
	Create: (data: FormData): Promise<ResponseApiInterface<GalleryInterface>> => {
		return service.post(`/tenant/galleries`, data, {
			headers: {
				"Content-Type": "multipart/form-data",
			}
		});
	}
}

export default galleryService