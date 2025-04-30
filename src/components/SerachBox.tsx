import { ImSearch } from "react-icons/im";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { useProductsStore } from "../stores/productsStore";
import { useEffect } from "react";
import { motion } from "motion/react";

function SearchBox({ search, setSearch, setQuery }: any) {
  const { products, setSearchedProducts } = useProductsStore();
  const searchHandler = () => {
    const searchedProducts = products.filter((p: any) =>
      p.title.toLowerCase().includes(search)
    );
    if (searchedProducts.length > 0) {
      setSearchedProducts(searchedProducts);
    } else {
      enqueueSnackbar("No products found", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "center" },
      });
    }
  };

  useEffect(() => {
    if (!search) {
      setSearchedProducts([]);
    }
  }, [search]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchHandler();
    }
  };

  return (
    <div className="w-full flex justify-start items-center">
      <SnackbarProvider />
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="relative mb-10 flex items-center"
      >
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase().trim())}
          onKeyDown={handleKeyPress}
          className=" w-[250px] px-6 py-2 border-2 border-dashed border-[#03346e] rounded-2xl text-0.9rem text-[#03346e] mr-6"
        />

        {search && (
          <motion.span
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute right-20 top-3.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#03346e"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 cursor-pointer"
              onClick={() => setSearch("")}
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </motion.span>
        )}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.1 }}
          onClick={searchHandler}
          className="p-4 bg-[#03346e] text-white border-none rounded-2xl cursor-pointer transition-all duration-100"
        >
          <ImSearch />
        </motion.button>
      </motion.div>
    </div>
  );
}

export default SearchBox;
