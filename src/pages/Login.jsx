import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [credenciais, setCredenciais] = useState({
        email: "",
        senha: ""
    });
    const [erro, setErro] = useState(""); // Mensagens de erro (validação/inicio de teste )

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredenciais(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault(); 

        try{
            const response = await fetch('http://localhost:3000/login',{
                method: POST, 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credenciais),
            });

            const data = await response.json();
            if(!responde.ok){
                setErro(data.mensagem || "Erro no login");
                return;
            }

            //em caso de login bem-sucedido 
            console.log("Usuário logado", data.secretaria);
            setErro('');
            navigate('/gerenciamento');
        }catch(error){
            console.error('Erro na requisição: ', erro);
            setErro('Erro ao conectar com o servidor');
        }
    };

    return (
        <div className="min-h-screen flex flex-col"> 
            <Header />
            <main className="flex-grow flex items-center justify-center p-4 min-h-[calc(100vh-160px)]">
                <div className="w-full max-w-md mx-auto">
                    <form 
                        onSubmit={handleLogin} 
                        className="bg-white rounded-lg shadow-md p-8 space-y-6">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-[#49BBBD] mb-2">MedSync</h1>
                            <p className="text-sm text-gray-600 mb-4">CLINICA INFANTIL</p>
                            <p className="text-sm mb-4">Faça login em sua conta</p>
                        </div>
                        
                        {erro && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                                {erro}
                            </div>
                        )}
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm mb-1 text-gray-700">Email</label>
                                <input
                                    type="text"
                                    email="email"
                                    placeholder="Digite seu email"
                                    className="w-full border border-[#49BBBD] rounded-full px-4 py-2 text-sm outline-none placeholder:text-gray-400"
                                    value={credenciais.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1 text-gray-700">Senha</label>
                                <div className="relative">
                                    <input
                                        type={mostrarSenha ? "text" : "password"}
                                        name="senha"
                                        placeholder="Digite sua senha"
                                        className="w-full border border-[#49BBBD] rounded-full px-4 py-2 text-sm outline-none placeholder:text-gray-400 pr-10"
                                        value={credenciais.senha}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-2.5 text-gray-500"
                                        onClick={() => setMostrarSenha(!mostrarSenha)}
                                    >
                                        {mostrarSenha ? (
                                            <EyeSlashIcon className="h-5 w-5" />
                                        ) : (
                                            <EyeIcon className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button 
                            type="submit"
                            className="w-full bg-[#49BBBD] text-white px-10 py-2 rounded-full hover:bg-[#3aa9ab] transition"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    ); 
}

export default Login;