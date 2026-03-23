import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CartItem {
  id: number // We now use the actual database design ID
  name: string
  imageUrl: string | null
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: number) => void
  clearCart: () => void
}

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => set((state) => {
        // Prevent adding the exact same hanger twice
        const exists = state.items.find((i) => i.id === item.id)
        if (exists) return state
        
        return { items: [...state.items, item] }
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter((i) => i.id !== id)
      })),
      clearCart: () => set({ items: [] }),
    }),
    { 
      name: "tuzemen-cart" 
    }
  )
)