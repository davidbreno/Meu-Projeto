import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, isAuthenticated } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  useEffect(() => {
    if (isAuthenticated) {
      const redirectTo = (location.state as { from?: { pathname: string } } | undefined)?.from?.pathname ?? "/";
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, navigate, location.state]);

  const onSubmit = handleSubmit(async (data) => {
    await signIn(data);
    const redirectTo = (location.state as { from?: { pathname: string } } | undefined)?.from?.pathname ?? "/";
    navigate(redirectTo, { replace: true });
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="glass-card w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-white">Bem-vindo de volta</h1>
          <p className="text-sm text-slate-400">
            Acesse o painel financeiro usando as credenciais provisórias. Integração com SSO em breve.
          </p>
        </div>

        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="space-y-4">
            <label className="block text-left text-sm font-medium text-slate-200" htmlFor="email">
              E-mail corporativo
            </label>
            <input
              id="email"
              type="email"
              placeholder="financeiro@empresa.com"
              className="w-full rounded-2xl border border-white/10 px-4 py-3 shadow-inner focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
              {...register("email", {
                required: "Informe seu e-mail",
                pattern: { value: /\S+@\S+\.\S+/, message: "E-mail inválido" }
              })}
            />
            {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}
          </div>

          <div className="space-y-4">
            <label className="block text-left text-sm font-medium text-slate-200" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full rounded-2xl border border-white/10 px-4 py-3 shadow-inner focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
              {...register("password", {
                required: "Informe sua senha",
                minLength: { value: 6, message: "Utilize ao menos 6 caracteres" }
              })}
            />
            {errors.password && <p className="text-sm text-red-400">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-brand-500/20 transition hover:from-brand-500 hover:via-brand-400 hover:to-brand-300 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Validando acesso..." : "Entrar"}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500">
          Ainda sem conta? Em breve integraremos com o diretório corporativo para provisionamento automático.
        </p>
      </div>
    </div>
  );
};

export default Login;
