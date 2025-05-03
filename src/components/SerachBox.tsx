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
    <div className="w-full flex justify-start items-center ml-12 min-[320px]:ml-6 sm:ml-6 md:ml-6 lg:ml-26">
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
          className="w-full xs:w-[180px] sm:w-[200px] md:w-[220px] lg:w-[250px] px-3 xs:px-4 sm:px-6 py-1 xs:py-1.5 sm:py-2 border-2 border-dashed border-[#03346e] rounded-2xl text-[0.8rem] xs:text-[0.85rem] sm:text-[0.9rem] text-[#03346e] mr-3 xs:mr-4 sm:mr-6"
        />

        {search && (
          <motion.span
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute right-[45px] xs:right-[55px] sm:right-20 top-[8px] xs:top-[10px] sm:top-3.5"
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
              className="w-[12px] h-[12px] xs:w-[14px] xs:h-[14px] sm:w-[16px] sm:h-[16px] md:w-[18px] md:h-[18px] lg:w-[20px] lg:h-[20px] cursor-pointer mr-2"
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
          className="p-2 xs:p-2.5 sm:p-3 md:p-3.5 lg:p-4 bg-[#03346e] text-white border-none rounded-2xl cursor-pointer transition-all duration-100"
        >
          <ImSearch className="w-[12px] h-[12px] xs:w-[14px] xs:h-[14px] sm:w-[16px] sm:h-[16px] md:w-[18px] md:h-[18px] lg:w-[20px] lg:h-[20px]" />
        </motion.button>
      </motion.div>
    </div>
  );
}

export default SearchBox;
