import { create } from "zustand";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface SelectedProduct {
  id: number;
  item: Product;
  count: number;
}

interface ProductsStore {
  products: Product[];
  selectedProducts: SelectedProduct[];
  searchedProducts: Product[];
  filteredProducts: Product[];
  selectedCategory: string;
  query: string;
  setProducts: (products: Product[]) => void;
  setSelectedProducts: (products: SelectedProduct[]) => void;
  setSearchedProducts: (products: Product[]) => void;
  setFilteredProducts: (products: Product[]) => void;
  setSelectedCategory: (category: string) => void;
  setQuery: (query: string) => void;
}

export const useProductsStore = create<ProductsStore>((set, get) => ({
  products: [],
  selectedProducts: [],
  searchedProducts: [],
  filteredProducts: [],
  selectedCategory: "",
  query: "",
  setProducts: (products: Product[]) => set({ products }),
  setSelectedProducts: (products: SelectedProduct[]) =>
    set({ selectedProducts: products }),
  setSelectedCategory: (category: string) =>
    set({ selectedCategory: category }),
  setQuery: (query: string) => set({ query }),
  setSearchedProducts: (products: Product[]) =>
    set({ searchedProducts: products }),
  setFilteredProducts: (products: Product[]) =>
    set({ filteredProducts: products }),
}));
