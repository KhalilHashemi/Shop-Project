import { useEffect } from "react";

const shortenText = (text: string) => {
  return text.split(" ").slice(0, 3).join("");
};

const searchProducts = (products: any, search: any) => {
  if (!search) return products;
  const searchedProducts = products.filter((p: any) =>
    p.title.toLowerCase().includes(search)
  );
  // if (searchProducts) {
  //     return searchProducts;
  // } else {
  //     return null
  // }
  return searchedProducts;
};

const filterProducts = (products: any, category: any) => {
  if (!category) return products;
  const filteredProducts = products.filter((p: any) => p.category === category);
  return filteredProducts;
};

const createQueryObject = (currentQuery: any, newQuery: any) => {
  if (newQuery.category === "all") {
    const { category, ...rest } = currentQuery;
    return rest;
  }
  if (newQuery.search === "") {
    const { search, ...rest } = currentQuery;
    return rest;
  }
  return { ...currentQuery, ...newQuery };
};

const getInitialQuery = (searchParams: any) => {
  const query: any = {};
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  if (category) query.category = category;
  if (search) query.search = search;
  return query;
};

const sumProducts = (products: any) => {
  const itemsCounter = products.reduce(
    (counter: any, product: any) => counter + product.quantity,
    0
  );
  const total = products
    .reduce((total: any, product: any) => total + product.price * product.quantity, 0)
    .toFixed(2);
  return { itemsCounter, total };
};

const productQuantity = (state: any, id: any) => {
  const index = state.selectedItems.findIndex((item: any) => item.id === id);
  if (index === -1) {
    return 0;
  } else {
    return state.selectedItems[index].quantity;
  }
};

const useTitle = (title: any) => {
  useEffect(() => {
    document.title = title;
  }, []);
};

export {
  shortenText,
  searchProducts,
  filterProducts,
  createQueryObject,
  getInitialQuery,
  sumProducts,
  productQuantity,
  useTitle,
};
