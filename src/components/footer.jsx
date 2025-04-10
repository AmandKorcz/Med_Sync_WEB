import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full bg-[#008E9A] p-10 pb-10 pt-12 h-50">
    <div className="max-w-screen-xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <img
            src="./src/assets/image/MedSyncBranco.png"
            alt="Logo MedSync"
            className="w-40 md:w-60"
          />
          <ul className="flex flex-wrap justify-center gap-6 md:gap-8">
            <li>
              <Typography
                as="a"
                href="#"
                className="font-normal text-white hover:text-[#A3DDEA] transition-colors"
              >
                Atendimentos
              </Typography>
            </li>
            <li>
              <Typography
                as="a"
                href="#"
                className="font-normal text-white hover:text-[#A3DDEA] transition-colors"
              >
                Contato
              </Typography>
            </li>
            <li>
              <Typography
               as={Link}
               to="/login" 
                className="font-normal text-white hover:text-[#A3DDEA] transition-colors"
              >
                Administração 
              </Typography>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-white" />
        <Typography className="text-center text-white font-normal">
          © 2025 MedSync.
        </Typography>
      </div>
    </footer>
  );
}

export default Footer;
