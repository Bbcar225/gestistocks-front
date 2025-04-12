interface ResponseApiInterface<Data> {
	timestamp: string
	status: boolean
	message: string
	data: Data
}

interface RequestApiInterface {
	page?: number
	per_page?: number
}

interface ResponsePaginateInterface<Data> {
  data: Data
  links: Links
  meta: Meta
}

interface Links {
  first: string
  last: string
  prev?: string
  next?: string
}

interface Meta {
  current_page: number
  from: number
  last_page: number
  links: Link[]
  path: string
  per_page: number
  to: number
  total: number
}

interface Link {
  url?: string
  label: string
  active: boolean
}
