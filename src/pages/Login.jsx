import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import { useState } from "react";
import {EyeIcon,EyeSlashIcon} from "@heroicons/react/24/outline"
import { setActive } from "@material-tailwind/react/components/Tabs/TabsContext.js";

function Login() {

    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [activeTab, setActive] = useState("login");

    return(
        <div className="flex-grow flex items-center justify-center"> 
            <Header/>
                <main className="flex-grow flex items-center justify-center">
                    <div className="flex flex-col items-center space-y-10">
                        <div className="text-center">
                            <p className="text-sm mb-2">Faça login em sua conta</p>
                            <div className="bg-[#A3DDEA] rouded-full flex w-48">
                                <button
                                    onClick={() => setActiveTab("login")}
                                    className={`w-1/2 py-1.5 rounded-full transition ${
                                        activeTab === "login" ? "bg-[#49BBBD] text-white" : "text-gray-700"
                                      }`}
                                >Login</button>
                                <button
                                    onClick={() => setActiveTab("register")}
                                    className={`w-1/2 py-1.5 rounded-full transition ${
                                        activeTab === "register" ? "bg-[#49BBBD] text-white" : "text-gray-700"
                                    }`}
                                >Register</button>
                            </div>
                        </div>

                        {/*Formulário*/}
                        <div className="w-[400px] space-y-6">
                            <div>
                                <label className="block text-sm mb-1">Nome</label>
                                <input
                                    type="text"
                                    placeholder="nome"
                                    className="w-full border border-[#49BBBD] rounded-full px-4 py-2 text-sm outline-none placeholder:text-gray-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Senha</label>
                                <div className="relative">
                                    <input
                                        type={mostrarSenha ? "text" : "password"}
                                        placeholder="senha"
                                        className="w-full border border-[#49BBBD] rouded-full px-4 py-2 text-sm outline-none placeholder:text-gray-400 pr-10"
                                    />
                                    <span
                                        className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                                        onClick={() => setMostrarSenha(!mostrarSenha)}
                                    >
                                        {mostrarSenha ? (
                                            <EyeSlashIcon className="h-5 w-5" />
                                        ) : (
                                            <EyeIcon className="h-5 w-5"/>
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Botão Login */}
                        <button className="bg-[#49BBBD] text-white px-10 py-2 rouded-full">Login</button>
                    </div>
                </main>

            <Footer/>
        </div>

    ); 
}

export default Login; 