import { FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full h-[8vh] bg-[#021526] text-white flex justify-center items-center">
      Developed by
      <a
        href="https://linkedin.com/in/khalil-hashemi-049b6b219"
        target="_blank"
        className="group text-white ml-2 text-xl flex items-center gap-2"
      >
        Khalil
        <FaHeart className="text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300" />

      </a>
    </footer>
  );
}
