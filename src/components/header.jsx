import { Typography } from "@material-tailwind/react";
import MedSyncBranco from "../assets/image/MedSyncBranco.png";

function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-[#49BBBD] py-4 shadow-lg z-50">
      {/* Container com padding responsivo (Tailwind) */}
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={MedSyncBranco}
              className="h-10 w-auto mr-4" 
            />
          </div>
          <nav className="hidden md:flex space-x-8">
            <Typography
              as="a"
              href="#"
              className="text-white hover:text-[#A3DDEA] transition-colors"
            >
              Atendimentos
            </Typography>
          </nav>
          <button className="md:hidden text-white">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
