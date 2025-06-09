import Footer from "../components/footer.jsx";
import Header from "../components/header.jsx";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const [showPasswordRegister, setShowPasswordRegister] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginSenha, setLoginSenha] = useState("");

  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerSenha, setRegisterSenha] = useState("");

  const navigate = useNavigate();

  //Função de login 
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          email: loginEmail,
          senha: loginSenha
        })
      });

      const data = await response.json;

      if(response.status === 200){
        console.log("chegamos aqui?");
        const token = data.token;
          if (!token) {
            console.log("Token Vazio?");
          }
        localStorage.setItem("token", token);
        navigate("/gerenciamento")
      } else {
        alert("Erro ao fazer login");
      }
    } catch (error) {
      alert("Erro ao fazer login: " + (error.response?.data?.message || error.message));
    }
  };

  //Função de registro 
  const handleRegister = async (e) => {
    e.preventDefault();
    if(!acceptedTerms) return;

    try{
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          nome: registerName,
          email: registerEmail,
          senha: registerSenha,
        })  
      });

      if (response.status === 201) {
        alert("Cadastro realizado com sucesso");
        //Limpando os campos de login após o login bem-sucedido
        setRegisterName("");
        setRegisterEmail("");
        setRegisterSenha("");
        setAcceptedTerms(false);
      } else {
        alert("Erro no cadastro");
      }
    } catch (error) {
      alert("Erro ao cadastrar: " + (error.response?.data?.message || error.message));
    };
  }

  return (
    <main className="bg-gradient-to-br ">
      <Header />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex items-center justify-center px-4 py-12"
      >
        <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
          {/* Login */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full md:w-1/2 p-8 md:p-10"
          >
            <h2 className="text-3xl font-extrabold text-[#008E9A] mb-8">
             Login
            </h2>

            <form className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-[#008E9A] font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Digite seu email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                />
              </motion.div>

              <motion.div 
                className="relative"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-[#008E9A] font-medium mb-2">
                  Senha
                </label>
                <input
                  type={showPasswordLogin ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={loginSenha}
                  onChange={(e) => setLoginSenha(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                />
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute top-10 right-4 cursor-pointer text-gray-600"
                  onClick={() => setShowPasswordLogin(!showPasswordLogin)}
                >
                  {showPasswordLogin ? <EyeOff size={20} /> : <Eye size={20} />}
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex justify-end"
              >
                <a href="#" className="text-sm text-teal-600 hover:underline hover:text-teal-700 transition-colors">
                  Esqueceu sua senha?
                </a>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogin}
                className="w-full px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                Entrar
              </motion.button>
            </form>
          </motion.div>

          {/* Cadastro */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full md:w-1/2 p-8 md:p-10 bg-gradient-to-br bg-[#008E9A] to-teal-500"
          >
            <h2 className="text-3xl font-extrabold text-white mb-8">
              Cadastre-se
            </h2>

            <form onSubmit={handleRegister} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-white font-medium mb-2">
                  Nome completo
                </label>
                <input
                  type="text"
                  placeholder="Digite seu nome"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/90 border border-white/50 rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all duration-200"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-white font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Digite seu email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/90 border border-white/50 rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all duration-200"
                />
              </motion.div>

              <motion.div 
                className="relative"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-white font-medium mb-2">
                  Senha
                </label>
                <input
                  type={showPasswordRegister ? "text" : "password"}
                  placeholder="Crie uma senha"
                  value={registerSenha}
                  onChange={(e) => setRegisterSenha(e.target.value)}
                  className="w-full px-4 py-3 bg-white/90 border border-white/50 rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all duration-200"
                />
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute top-10 right-4 cursor-pointer text-teal-600"
                  onClick={() => setShowPasswordRegister(!showPasswordRegister)}
                >
                  {showPasswordRegister ? <EyeOff size={20} /> : <Eye size={20} />}
                </motion.div>
              </motion.div>

              {/* Termos de Uso */}
              <motion.div
                className="flex items-start"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptedTerms}
                  onChange={() => setAcceptedTerms(!acceptedTerms)}
                  className="mt-1 h-4 w-4 text-teal-600 bg-white border-gray-300 rounded focus:ring-white"
                />
                <label
                  htmlFor="terms"
                  className="ml-2 text-sm text-white"
                >
                  Eu aceito os{" "}
                  <a
                    href="#"
                    className="underline hover:text-white/80 transition-colors"
                  >
                    Termos de Uso
                  </a>{" "}
                  e a{" "}
                  <a
                    href="#"
                    className="underline hover:text-white/80 transition-colors"
                  >
                    Política de Privacidade
                  </a>
                  .
                </label>
              </motion.div>

              <motion.button
                whileHover={{ scale: acceptedTerms ? 1.02 : 1 }}
                whileTap={{ scale: acceptedTerms ? 0.98 : 1 }}
                type="submit"
                disabled={!acceptedTerms}
                className={`w-full px-6 py-3 ${
                  acceptedTerms
                    ? "bg-white text-teal-600 hover:bg-gray-100"
                    : "bg-white/40 text-teal-300 cursor-not-allowed"
                } font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300`}
              >
                Cadastrar
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
      
      <Footer />
    </main>
  );
}