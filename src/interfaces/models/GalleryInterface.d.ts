interface GalleryInterface {
	id: number
	type: string
	name: string
	url: string
	created_at: string
	updated_at: string
}

interface GalleryFormDataInterface {
	type: TGalleryType,
	name?: string
}

type TGalleryType = "products"