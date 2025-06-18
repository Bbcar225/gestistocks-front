interface TenantInterface {
	id: number
	slug: string
	name: string
	address: string
	phoneNumber: string
	email: string
	notice_invoice: string
	created_at: string
	updated_at: string,
	gallery: GalleryInterface
	users: UserInterface[]
}

interface TenantFormDataInterface {
	gallery_id: number
	name: string
	address: string
	phoneNumber: string
	email: string
	notice_invoice: string
}
