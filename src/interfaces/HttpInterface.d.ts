interface ResponseApiInterface<Data> {
  timestamp: string
  status: boolean
  message: string
  data: Data
}
