import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store"; 
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import eyeIcon from '../assets/eye-slash-visibility-visible-hide-hidden-show-watch-svgrepo-com.svg';

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .regex(/[^a-zA-Z0-9]/, "A senha deve conter pelo menos um caractere especial"),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    dispatch(loginUser(data.email, data.password));
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <div>
            <input
              type="email"
              {...register("email")}
              className="w-full p-3 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <label className="block text-sm font-medium text-gray-700">Senha</label>
          <div className="relative">
                        <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="w-full p-3 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black pr-10"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <img
                src={eyeIcon}
                alt="Toggle visibility"
                onClick={togglePasswordVisibility}
                className="h-5 w-5 cursor-pointer"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Carregando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
