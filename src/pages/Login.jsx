import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

function Login() {
    const [mostrarSenha, setMostrarSenha] = useState(false);

    return (
        <div className="min-h-screen flex flex-col"> 
            <Header />
            <main className="flex-grow flex items-center justify-center p-4">
                <div className="w-full max-w-md mx-auto">
                    <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-[#49BBBD] mb-2">MedSync</h1>
                            <p className="text-sm text-gray-600 mb-4">CLINICA INFANTIL</p>
                            <p className="text-sm mb-4">Faça login em sua conta</p>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm mb-1 text-gray-700">Nome</label>
                                <input
                                    type="text"
                                    placeholder="Digite seu nome"
                                    className="w-full border border-[#49BBBD] rounded-full px-4 py-2 text-sm outline-none placeholder:text-gray-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1 text-gray-700">Senha</label>
                                <div className="relative">
                                    <input
                                        type={mostrarSenha ? "text" : "password"}
                                        placeholder="Digite sua senha"
                                        className="w-full border border-[#49BBBD] rounded-full px-4 py-2 text-sm outline-none placeholder:text-gray-400 pr-10"
                                    />
                                    <span
                                        className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                                        onClick={() => setMostrarSenha(!mostrarSenha)}
                                    >
                                        {mostrarSenha ? (
                                            <EyeSlashIcon className="h-5 w-5" />
                                        ) : (
                                            <EyeIcon className="h-5 w-5" />
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button className="w-full bg-[#49BBBD] text-white px-10 py-2 rounded-full hover:bg-[#3aa9ab] transition">
                            Login
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    ); 
}

export default Login;