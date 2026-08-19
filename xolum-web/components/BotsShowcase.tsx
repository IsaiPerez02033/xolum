'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'motion/react';
import { Check, WhatsappLogo, ArrowRight } from '@phosphor-icons/react';
import { bots, waLink } from '@/lib/data';
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
              }, 900),
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
    <div ref={ref} className="flex h-full flex-col font-sans">
      {/* Telemetría y Encabezado de la Demo estilo Software Empresarial */}
      <div className="flex flex-col border-b border-[var(--hair-strong)] bg-[#090e17]">
        <div className="flex items-center justify-between px-3.5 py-1.5 font-mono text-[9px] text-[#22d3ee]/80 border-b border-[var(--hair)]">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#10b981] animate-pulse" />
            META CLOUD API // ENGINE OK
          </span>
          <span className="text-[var(--text-muted)]">LATENCY: 14ms</span>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 bg-[var(--surface-2)]">
          <div className="grad-surface flex h-9 w-9 items-center justify-center rounded-full text-[#04121a] shadow-[0_0_15px_rgba(16,185,129,0.4)]">
            <WhatsappLogo size={20} weight="fill" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-bold text-white">{botName}</p>
            <p className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <span>● OPERACIONAL</span>
              <span className="text-[var(--text-muted)]">// 24/7</span>
            </p>
          </div>
        </div>
      </div>

      {/* Flujo de Mensajes */}
      <div className="flex flex-1 flex-col gap-3 overflow-hidden px-4 py-5 bg-[#05080e]">
        {chat.slice(0, shown).map((m, idx) => (
          <motion.div
            key={idx}
            initial={reduce ? false : { opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`max-w-[84%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed ${
              m.de === 'user'
                ? 'self-end rounded-br-xs bg-[#0a3832] text-emerald-100 border border-emerald-500/20 shadow-md'
                : 'self-start rounded-bl-xs border border-[#22d3ee]/20 bg-[#0d1522] text-[#f3f6fb] shadow-md'
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
              className="flex items-center gap-1.5 self-start rounded-2xl rounded-bl-xs border border-[#22d3ee]/25 bg-[#0d1522] px-4 py-3"
            >
              <span className="font-mono text-[10px] text-[#22d3ee]/80 mr-1">IA PROCESANDO</span>
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#22d3ee]"
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
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-[450px] w-[450px] rounded-full bg-emerald-500/10 blur-[140px]"
        aria-hidden
      />
      <div className="shell relative z-10">
        <Reveal className="max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-brand-300">
            Automatización Inteligente
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            Bots de WhatsApp conectados a la operación de tu empresa.
          </h2>
          <p className="mt-5 max-w-[62ch] text-lg text-[var(--text-soft)] leading-relaxed">
            Sin aplicaciones extrañas ni capacitaciones complejas. Tu personal y tus clientes interactúan por WhatsApp mientras el sistema procesa datos, valida documentos y actualiza la base de datos en tiempo real.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_0.88fr] lg:items-center">
          {/* Izquierda: selector + detalle de solución */}
          <div>
            <div className="flex flex-wrap gap-2.5">
              {bots.map((b, i) => (
                <button
                  key={b.id}
                  onClick={() => setActive(i)}
                  className={`rounded-full border px-4 py-2.5 text-xs font-semibold tracking-wide transition-all ${
                    i === active
                      ? 'border-brand-400 bg-brand-500/15 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                      : 'border-[var(--hair-strong)] text-[var(--text-soft)] hover:border-brand-400/40 hover:text-white'
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
                className="mt-8 glass rounded-3xl p-7 sm:p-8"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <p className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-400">
                    {bot.tagline}
                  </p>
                </div>
                <h3 className="text-2xl font-extrabold tracking-tight text-white">{bot.nombre}</h3>
                <p className="mt-4 max-w-[56ch] leading-relaxed text-[15px] text-[var(--text-soft)]">
                  {bot.descripcion}
                </p>

                <div className="mt-6 border-t border-[var(--hair)] pt-6">
                  <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] mb-4">
                    Capacidades Principales
                  </p>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {bot.capacidades.map((c) => (
                      <li key={c} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-soft)] font-medium">
                        <Check size={16} weight="bold" className="mt-0.5 shrink-0 text-emerald-400" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <a
                    href={waLink(`Hola XOLUM, quiero implementar el ${bot.nombre} en mi empresa.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-brand text-xs inline-flex items-center gap-2"
                  >
                    <span>Probar demo de {bot.nombre}</span>
                    <ArrowRight size={16} weight="bold" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Derecha: Smartphone Demo Frame con live chat */}
          <div className="relative mx-auto w-full max-w-[380px]">
            <div
              className="pointer-events-none absolute -inset-6 rounded-[3.2rem] bg-gradient-to-b from-brand-500/20 to-emerald-500/10 blur-2xl"
              aria-hidden
            />
            <div className="glass relative overflow-hidden rounded-[2.6rem] border border-[var(--hair-strong)] p-2.5 shadow-2xl">
              <div className="stage-dark relative h-[530px] overflow-hidden rounded-[2.1rem] bg-[#05080e] border border-[#22d3ee]/20">
                <ChatWindow chat={bot.chat} botName={bot.nombre} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
