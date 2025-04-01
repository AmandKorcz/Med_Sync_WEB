import { Typography } from "@material-tailwind/react";

function Header() {
  return (
    <footer className="w-full bg-[#49BBBD] p-8">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-[#49BBBD] text-center md:justify-between">
        <img
          src="./src/assets/image/MedSyncBranco.png"
          alt="logo-ct"
          className="w-60"
        />
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-[#A3DDEA] focus: text-white"
            >
              Atendimentos
            </Typography>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Header;
