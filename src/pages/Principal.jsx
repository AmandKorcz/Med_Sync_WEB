import Header from "../components/header.jsx";
import Crianças from "../assets/image/Crianças.jpg"; 

function Principal() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <img 
        src={Crianças} 
        alt="Logo MedSync Clínica Infantil"
        className="mx-auto max-w-xs md:max-w-md"
      />
      <main className="flex-grow p-4">
        <h1 className="text-2xl font-bold">Bem-vindo à minha página</h1>
        <p className="mt-2">Conteúdo da página aqui...</p>
      </main>
    </div>
  );
}

export default Principal;
