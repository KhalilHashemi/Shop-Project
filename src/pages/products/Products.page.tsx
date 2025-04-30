"use client";

import SearchBox from "@/src/components/SerachBox";
import { useState } from "react";
import {  useTitle } from "@/src/utils/helpers";
import { useEffect } from "react";
import Loading from "@/src/components/common/Loading";
import { useProductsStore } from "@/src/stores/productsStore";
import Card from "@/src/components/Card";
import Sidebar from "@/src/components/Sidebar";
import api from "@/src/configs/api";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function ProductsPage() {
  const { products, setProducts, filteredProducts,searchedProducts } = useProductsStore();
  useTitle("Products");

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      const response: Product[] = await api.get("/products");

      setProducts(response);
    };
    fetchProducts();
  }, []);

  return (
    <div className="w-[65%] flex flex-col items-center">
      <SearchBox search={search} setSearch={setSearch} setQuery={setQuery} />
      <div className="w-full flex justify-between">
        <div className="w-[70%] flex flex-wrap justify-between">
          {products.length === 0 && <Loading />}
          {filteredProducts.length > 0 && searchedProducts.length > 0 ? (
            filteredProducts
              .filter(p => searchedProducts.some(sp => sp.id === p.id))
              .length > 0 ? (
              filteredProducts
                .filter(p => searchedProducts.some(sp => sp.id === p.id))
                .map((p: Product , index) => <Card key={index} data={p} index={index}/>)
            ) : (
              <p className=" w-full mt-8 text-gray-500">No items found matching both category and search criteria</p>
            )
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((p: Product , index) => <Card key={index} data={p} index={index}/>)
          ) : searchedProducts.length > 0 ? (
            searchedProducts.map((p: Product , index) => <Card key={index} data={p} index={index}/>)
          ) : (
            products.map((p: Product , index) => <Card key={index} data={p} index={index}/>)
          )}
        </div>
        <Sidebar query={query} setQuery={setQuery} />
      </div>
    </div>
  );
}
