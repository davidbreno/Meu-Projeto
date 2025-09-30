import { Fragment, PropsWithChildren, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, Cog6ToothIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const navigation = [
  { name: "Dashboard", href: "/" },
  { name: "Contas", href: "#payables" },
  { name: "Relatórios", href: "#analytics" }
];

const classNames = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(" ");

const Layout = ({ children }: PropsWithChildren) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate("/login", { replace: true });
  };

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    month: "long",
    day: "numeric"
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-200 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-200 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-200"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5 text-slate-100"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Fechar menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-slate-900 px-6 pb-4 ring-1 ring-white/10">
                  <div className="flex h-16 shrink-0 items-center">
                    <span className="text-lg font-semibold tracking-tight text-brand-300">
                      Finanças Inteligentes
                    </span>
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <a
                                href={item.href}
                                className="group flex gap-x-3 rounded-md px-3 py-2 text-sm font-semibold leading-6 text-slate-200 hover:bg-slate-800/80 hover:text-white"
                                onClick={() => setSidebarOpen(false)}
                              >
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-8 overflow-y-auto bg-slate-900/60 px-6 pb-8 pt-10 ring-1 ring-white/5">
          <div className="flex h-16 shrink-0 items-center">
            <span className="text-lg font-semibold tracking-tight text-brand-200">
              Finanças Inteligentes
            </span>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="group flex gap-x-3 rounded-md px-3 py-2 text-sm font-semibold leading-6 text-slate-300 hover:bg-slate-800/80 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-white/10 bg-slate-950/70 px-4 shadow-inner backdrop-blur-lg sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-slate-100 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Abrir menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="flex flex-1 items-center gap-x-4 self-stretch lg:gap-x-6">
            <div className="text-sm text-slate-400">{today}</div>
            <div className="relative ml-auto flex items-center gap-x-4">
              <button
                type="button"
                className="rounded-full bg-brand-500/10 p-1 text-brand-300 hover:text-brand-200"
              >
                <span className="sr-only">Ver notificações</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center gap-x-3 rounded-full bg-slate-900/60 px-3 py-1 text-sm font-semibold leading-6 text-slate-200 shadow-glass ring-1 ring-white/10">
                  <span>{user?.email ?? "Usuário"}</span>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl bg-slate-900/95 p-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="button"
                          className={classNames(
                            active ? "bg-slate-800/70" : "",
                            "flex w-full items-center gap-x-2 rounded-lg px-3 py-2 text-sm text-slate-200"
                          )}
                        >
                          <Cog6ToothIcon className="h-5 w-5" />
                          Configurações
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="button"
                          onClick={handleLogout}
                          className={classNames(
                            active ? "bg-red-500/10 text-red-200" : "text-slate-200",
                            "flex w-full items-center gap-x-2 rounded-lg px-3 py-2 text-sm"
                          )}
                        >
                          Sair
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        <main className="px-4 py-10 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
