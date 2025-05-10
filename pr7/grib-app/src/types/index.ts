export type Item = {
  id: number
  name: string
  description: string
  created_at: string
}

export interface ItemFormProps {
  onSubmit: () => void
  currentItem: Item | null
  onCancel: () => void
} 