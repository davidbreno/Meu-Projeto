import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

type AuthUser = {
  email: string;
};

type SignInPayload = {
  email: string;
  password: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  signIn: (payload: SignInPayload) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "finance-dashboard::auth";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const persisted = window.localStorage.getItem(STORAGE_KEY);
      if (persisted) {
        const parsed = JSON.parse(persisted) as AuthUser;
        setUser(parsed);
      }
    } catch (error) {
      console.error("Falha ao restaurar autenticação", error);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !isReady) return;
    if (user) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [user, isReady]);

  const signIn = useCallback(async ({ email, password }: SignInPayload) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (!email || !password) {
      throw new Error("Informe e-mail e senha válidos");
    }

    setUser({ email });
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      signIn,
      signOut
    }),
    [user, signIn, signOut]
  );

  if (!isReady) {
    return <div className="flex h-screen items-center justify-center text-slate-300">Carregando...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser utilizado dentro de AuthProvider");
  }
  return context;
};
