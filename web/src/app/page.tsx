"use client";

import { useEffect, useState } from "react";
import { Bell, House, LogIn, LogOut, Sparkles, Users, X } from "lucide-react";
import VillageScene from "@/components/VillageScene";
import { createClient } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export default function Home() {
  const [exploreMode, setExploreMode] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "linkedin_oidc",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setExploreMode(false);
  };

  const displayName =
    user?.user_metadata?.full_name ??
    user?.user_metadata?.name ??
    user?.email ??
    "Utilisateur";
  const avatarUrl =
    user?.user_metadata?.avatar_url ?? user?.user_metadata?.picture ?? null;
  const headline = user?.user_metadata?.headline ?? user?.email ?? "";

  return (
    <main className="relative h-screen w-full overflow-hidden">
      <VillageScene className="absolute inset-0" exploreMode={exploreMode} />

      <div
        className={`pointer-events-none absolute inset-0 ${
          exploreMode
            ? "bg-[linear-gradient(180deg,rgba(4,11,22,0.25),rgba(4,11,22,0.05)_35%,rgba(4,11,22,0.3))]"
            : "bg-[linear-gradient(180deg,rgba(4,11,22,0.8),rgba(4,11,22,0.3)_35%,rgba(4,11,22,0.78))]"
        }`}
      />

      <section className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 md:p-8">
        {exploreMode ? (
          <div className="pointer-events-auto max-w-xl rounded-2xl border border-[#2A4D77] bg-[#061427]/70 p-4 shadow-[0_12px_36px_rgba(0,0,0,0.42)] backdrop-blur-sm">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setExploreMode(false)}
                className="inline-flex items-center gap-2 rounded-xl border border-[#3D6EA0] bg-[#0A1D38] px-4 py-2 text-sm font-semibold text-[#D8EDFF] transition hover:bg-[#102848]"
              >
                <X size={16} />
                Quitter l exploration
              </button>
              <p className="rounded-xl border border-[#2A4D77] bg-[#0A1C35]/70 px-3 py-2 text-xs text-[#B6D8FF]">
                Vol: clic + souris, ZQSD/WASD pour avancer, Shift pour accelerer.
              </p>
            </div>
          </div>
        ) : (
          <>
            <header className="pointer-events-auto max-w-4xl rounded-3xl border border-[#2A4D77] bg-[#071327]/72 p-6 shadow-[0_20px_54px_rgba(0,0,0,0.5)] backdrop-blur-md md:p-8">
              <p className="inline-flex items-center gap-2 rounded-full border border-[#2F5A87] bg-[#0A66C2]/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#8BC9FF]">
                <Sparkles size={14} />
                Overlay Demo
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#F3F9FF] md:text-6xl">
                LinkedIn Village
              </h1>
              <p className="mt-3 max-w-3xl text-sm text-[#C3E0FF] md:text-lg">
                Ville en plein ecran + interface superposee. Ton reseau alimente la
                progression de ta skyline en direct.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setExploreMode(true)}
                  disabled={!user}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#3D6EA0] bg-[#0A66C2] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0C76E3] disabled:cursor-not-allowed disabled:border-[#38506B] disabled:bg-[#203045] disabled:text-[#9AB6D3]"
                >
                  Entrer dans la ville
                </button>

                <p className="rounded-xl border border-[#2A4D77] bg-[#0A1C35]/70 px-3 py-2 text-xs text-[#B6D8FF]">
                  Vol: clic + souris, ZQSD/WASD pour avancer, Shift pour accelerer.
                </p>
                {!user && (
                  <p className="rounded-xl border border-[#72521E] bg-[#2C1F0D]/70 px-3 py-2 text-xs text-[#FFD89C]">
                    Connecte-toi avec LinkedIn pour entrer dans la ville.
                  </p>
                )}
              </div>
            </header>

            <div className="pointer-events-auto grid max-w-5xl gap-3 md:grid-cols-4 md:gap-4">
              <article className="rounded-2xl border border-[#2A4D77] bg-[#0A1C35]/70 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm">
                <div className="flex items-center gap-2 text-[#5BB8FF]">
                  <House size={18} />
                  <p className="text-xs font-medium uppercase tracking-wide">Maison</p>
                </div>
                <p className="mt-2 text-2xl font-bold text-[#F3F9FF]">Niveau 3</p>
              </article>

              <article className="rounded-2xl border border-[#2A4D77] bg-[#0A1C35]/70 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm">
                <div className="flex items-center gap-2 text-[#5BB8FF]">
                  <Users size={18} />
                  <p className="text-xs font-medium uppercase tracking-wide">Reseau</p>
                </div>
                <p className="mt-2 text-2xl font-bold text-[#F3F9FF]">12 actifs</p>
              </article>

              <article className="rounded-2xl border border-[#2A4D77] bg-[#0A1C35]/70 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm">
                <div className="flex items-center gap-2 text-[#5BB8FF]">
                  <Bell size={18} />
                  <p className="text-xs font-medium uppercase tracking-wide">Notifs</p>
                </div>
                <p className="mt-2 text-2xl font-bold text-[#F3F9FF]">5 nouvelles</p>
              </article>

              <article className="rounded-2xl border border-[#2A4D77] bg-[#0A66C2]/30 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#C7E5FF]">
                  Mission du jour
                </p>
                <p className="mt-2 text-xl font-bold text-[#F3F9FF]">+120 XP restants</p>
              </article>
            </div>
          </>
        )}
      </section>

      {!exploreMode && (
        <aside className="pointer-events-auto absolute right-4 top-4 w-[320px] rounded-2xl border border-[#2A4D77] bg-[#061427]/80 p-4 shadow-[0_14px_42px_rgba(0,0,0,0.45)] backdrop-blur-md md:right-8 md:top-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#8BC9FF]">
            Profil LinkedIn
          </h2>

          {loading ? (
            <p className="mt-3 text-xs text-[#B6D8FF]">Chargement...</p>
          ) : user ? (
            <div className="mt-3 space-y-3">
              <div className="flex items-center gap-3 rounded-xl border border-[#2B527A] bg-[#0A1D38]/80 p-3">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={displayName}
                    className="h-10 w-10 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0A66C2] font-bold text-white">
                    {displayName.slice(0, 1).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="truncate font-semibold text-[#F3F9FF]">{displayName}</p>
                  <p className="truncate text-xs text-[#B6D8FF]">{headline}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={signOut}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#2F5A87] bg-[#0A1C35] px-3 py-2 text-sm font-semibold text-[#D8EDFF] transition hover:bg-[#102848]"
              >
                <LogOut size={15} />
                Se déconnecter
              </button>
            </div>
          ) : (
            <div className="mt-3 space-y-3">
              <p className="text-xs text-[#B6D8FF]">
                Connecte ton compte LinkedIn pour débloquer l&apos;exploration et la progression.
              </p>
              <button
                type="button"
                onClick={signIn}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#3D6EA0] bg-[#0A66C2] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#0C76E3]"
              >
                <LogIn size={15} />
                Se connecter avec LinkedIn
              </button>
            </div>
          )}
        </aside>
      )}
    </main>
  );
}
