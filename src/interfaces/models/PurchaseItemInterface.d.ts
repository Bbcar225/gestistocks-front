interface PurchaseItem {
  id: number
  purchase_id: number
  product_id: number
  unit_id: number
  quantity: number
  unit_price: number
  total_price: number
  created_at: string
  updated_at: string
  product: ProductInterface
  unit: UnitInterface
}