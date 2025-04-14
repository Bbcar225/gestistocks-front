import service from "../../providers/AxiosProvider.ts";

const galleryService = {
	GetAll: (params: RequestApiInterface = {}): Promise<ResponseApiInterface<ResponsePaginateInterface<GalleryInterface[]>>> => {
		return service.get(`/tenant/galleries`, {params})
	}
}

export default galleryService