import { Typography } from "@material-tailwind/react";
import MedSyncBranco from "../assets/image/MedSyncBranco.png";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <header className="fixed top-0 left-0 w-full h-[10vh] bg-[#49BBBD] py-4 shadow-lg z-50">
      <div className="px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src={MedSyncBranco} 
            className="h-10 w-auto mr-4 cursor-pointer" 
            onClick={() => navigateTo("/")}
            alt="Logo MedSync"
          />
        </div>
        
        <div className="hidden md:flex space-x-8">
          <Typography
            as="button"
            className="text-white hover:text-[#A3DDEA] transition-colors cursor-pointer bg-transparent border-none"
            onClick={() => navigateTo("/atendimento")}
          > 
            Atendimentos
          </Typography>
          
            <Typography
            as="button"
            className="text-white hover:text-[#A3DDEA] transition-colors cursor-pointer bg-transparent border-none"
            onClick={() => navigateTo("/Convenio")}
          > 
            Convênio
          </Typography>

             <Typography
            as="button"
            className="text-white hover:text-[#A3DDEA] transition-colors cursor-pointer bg-transparent border-none"
            onClick={() => navigateTo("/Informativo")}
          > 
            Informativo
          </Typography>

          <Typography
            as="button"
            className="text-white hover:text-[#A3DDEA] transition-colors cursor-pointer bg-transparent border-none"
            onClick={() => navigateTo("/sobre-nos")}
          > 
            Sobre Nós
          </Typography>
        </div>
        
        <button className="md:hidden text-white">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Header;