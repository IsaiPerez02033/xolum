'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'motion/react';
import { Check, WhatsappLogo } from '@phosphor-icons/react';
import { bots } from '@/lib/data';
import { Reveal } from './Reveal';

type Msg = { de: string; texto: string };

function ChatWindow({ chat, botName }: { chat: readonly Msg[]; botName: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    setShown(0);
    setTyping(false);
    if (reduce) {
      setShown(chat.length);
      return;
    }
    if (!inView) return;
    let i = 0;
    let alive = true;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const step = () => {
      if (!alive || i >= chat.length) return;
      const isBot = chat[i].de === 'bot';
      const gap = i === 0 ? 350 : 700;
      if (isBot) {
        timers.push(
          setTimeout(() => {
            if (!alive) return;
            setTyping(true);
            timers.push(
              setTimeout(() => {
                if (!alive) return;
                setTyping(false);
                setShown((s) => s + 1);
                i++;
                step();
              }, 950),
            );
          }, gap),
        );
      } else {
        timers.push(
          setTimeout(() => {
            if (!alive) return;
            setShown((s) => s + 1);
            i++;
            step();
          }, gap),
        );
      }
    };
    step();
    return () => {
      alive = false;
      timers.forEach(clearTimeout);
    };
  }, [chat, inView, reduce]);

  return (
    <div ref={ref} className="flex h-full flex-col">
      {/* Encabezado estilo WhatsApp */}
      <div className="flex items-center gap-3 border-b border-[var(--hair)] bg-[var(--surface)] px-4 py-3">
        <div className="grad-surface flex h-9 w-9 items-center justify-center rounded-full text-[#04121a]">
          <WhatsappLogo size={20} weight="fill" />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold">{botName}</p>
          <p className="text-[11px] text-emerald-400">en línea</p>
        </div>
      </div>

      {/* Mensajes */}
      <div className="flex flex-1 flex-col gap-2.5 overflow-hidden px-4 py-5">
        {chat.slice(0, shown).map((m, idx) => (
          <motion.div
            key={idx}
            initial={reduce ? false : { opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-snug ${
              m.de === 'user'
                ? 'self-end rounded-br-md bg-[#0b3b34] text-emerald-50'
                : 'self-start rounded-bl-md border border-[var(--hair)] bg-[var(--surface)] text-[var(--text)]'
            }`}
          >
            {m.texto}
          </motion.div>
        ))}
        <AnimatePresence>
          {typing && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1 self-start rounded-2xl rounded-bl-md border border-[var(--hair)] bg-[var(--surface)] px-3.5 py-3"
            >
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-300"
                  style={{ animationDelay: `${d * 0.15}s` }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function BotsShowcase() {
  const [active, setActive] = useState(0);
  const bot = bots[active];

  return (
    <section id="bots" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute right-0 top-1/4 h-[420px] w-[420px] rounded-full bg-emerald-500/10 blur-[130px]" aria-hidden />
      <div className="shell">
        <Reveal className="max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-brand-300">Automatización con IA</p>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            Bots de WhatsApp que hacen el trabajo aburrido.
          </h2>
          <p className="mt-5 max-w-[60ch] text-lg text-[var(--text-soft)]">
            Cada bot vive en el canal donde ya están tus clientes y tu equipo. Estos ya operan en empresas reales.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          {/* Izquierda: selector + detalle */}
          <div>
            <div className="flex flex-wrap gap-2">
              {bots.map((b, i) => (
                <button
                  key={b.id}
                  onClick={() => setActive(i)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                    i === active
                      ? 'border-brand-400/60 bg-brand-500/10 text-white'
                      : 'border-[var(--hair)] text-[var(--text-muted)] hover:border-[var(--hair-strong)] hover:text-[var(--text)]'
                  }`}
                >
                  {b.nombre}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={bot.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8"
              >
                <p className="grad-text text-sm font-semibold">{bot.tagline}</p>
                <h3 className="mt-2 text-2xl font-bold">{bot.nombre}</h3>
                <p className="mt-4 max-w-[56ch] leading-relaxed text-[var(--text-soft)]">{bot.descripcion}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {bot.capacidades.map((c) => (
                    <li key={c} className="flex items-start gap-2.5 text-sm text-[var(--text-soft)]">
                      <Check size={16} weight="bold" className="mt-0.5 shrink-0 text-emerald-400" />
                      {c}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Derecha: teléfono con chat en vivo */}
          <div className="relative mx-auto w-full max-w-[360px]">
            <div className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-gradient-to-b from-brand-500/20 to-emerald-500/10 blur-2xl" aria-hidden />
            <div className="glass relative overflow-hidden rounded-[2.4rem] border border-[var(--hair-strong)] p-2 shadow-2xl">
              <div className="relative h-[520px] overflow-hidden rounded-[2rem] bg-[#070b10]">
                <ChatWindow chat={bot.chat} botName={bot.nombre} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
