"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  LineChart,
  MessageCircle,
  Send,
  Sparkles,
  Target,
  Workflow,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const whatsappNumber = "5548999699136";

const navItems = [
  ["Problema", "problema"],
  ["Ecossistema", "ecossistema"],
  ["Método", "metodo"],
  ["Contato", "contato"],
];

const ecosystem = [
  { label: "Posicionamento", description: "clareza de valor", angle: -118 },
  { label: "Site", description: "confiança imediata", angle: -42 },
  { label: "Captação", description: "demanda qualificada", angle: 30 },
  { label: "WhatsApp", description: "conversa com contexto", angle: 112 },
  { label: "Dados", description: "melhoria contínua", angle: 180 },
];

const problemPoints = [
  "A empresa parece menor do que realmente é.",
  "O cliente não entende o valor antes de perguntar preço.",
  "As ações digitais não conversam entre si.",
];

const methodSteps = [
  ["01", "Clareza", "Organizar oferta, público, diferenciais e objeções."],
  ["02", "Presença", "Construir uma experiência digital limpa, rápida e confiável."],
  ["03", "Captação", "Levar pessoas certas para uma jornada pensada para venda."],
  ["04", "Otimização", "Medir sinais reais e melhorar mensagem, página e atendimento."],
];

const proofItems = [
  { value: 5, suffix: "", label: "frentes conectadas" },
  { value: 90, suffix: "d", label: "ciclo de implantação e evolução" },
  { value: 1, suffix: "", label: "jornada comercial única" },
];

const differentiators = [
  {
    icon: Target,
    title: "Estratégia antes de mídia",
    text: "Não é anunciar por anunciar. Primeiro vem a mensagem que faz o cliente entender valor.",
  },
  {
    icon: Workflow,
    title: "Jornada sem improviso",
    text: "Site, captação e WhatsApp seguem a mesma lógica, com um próximo passo óbvio.",
  },
  {
    icon: LineChart,
    title: "Evolução por sinais reais",
    text: "Cada ajuste nasce do comportamento do cliente, não de achismo visual.",
  },
];

type LeadForm = {
  venderMais: string;
  dependeIndicacao: string;
  recebeWhatsApp: string;
  temSite: string;
  querEscalar: string;
};

const initialLeadForm: LeadForm = {
  venderMais: "",
  dependeIndicacao: "",
  recebeWhatsApp: "",
  temSite: "",
  querEscalar: "",
};

const formFields: Array<{ id: keyof LeadForm; question: string }> = [
  { id: "venderMais", question: "Sua empresa quer vender mais nos próximos meses?" },
  { id: "dependeIndicacao", question: "Hoje ela depende muito de indicação?" },
  { id: "recebeWhatsApp", question: "Chegam contatos no WhatsApp que não viram venda?" },
  { id: "temSite", question: "Você já tem site ou página para apresentar sua empresa?" },
  { id: "querEscalar", question: "Você quer uma estrutura mais profissional para crescer?" },
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function EcosystemMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <path d="M25 26c18-21 54-22 72 0" stroke="#D2A019" strokeWidth="5" strokeLinecap="round" />
      <path d="M100 45c7 26-10 55-37 61" stroke="#171715" strokeWidth="5" strokeLinecap="round" />
      <path d="M42 107C18 101 8 72 19 48" stroke="#171715" strokeWidth="5" strokeLinecap="round" />
      <path d="M37 45 60 31l24 14v30L60 90 36 75V45Z" stroke="#171715" strokeWidth="6" strokeLinejoin="round" />
      <path d="M60 54v28" stroke="#D2A019" strokeWidth="5" strokeLinecap="round" strokeDasharray="10 9" />
      <circle cx="60" cy="60" r="14" fill="#D2A019" />
      <circle cx="60" cy="30" r="10" fill="#D2A019" />
      <circle cx="60" cy="91" r="10" fill="#D2A019" />
      <circle cx="36" cy="46" r="10" fill="#171715" />
      <circle cx="84" cy="46" r="10" fill="#171715" />
      <circle cx="36" cy="75" r="10" fill="#171715" />
      <circle cx="84" cy="75" r="10" fill="#171715" />
    </svg>
  );
}

function Reveal({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      variants={reveal}
    >
      {children}
    </motion.section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  text,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  text: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-yellow-600">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-semibold leading-tight text-[#171715] sm:text-5xl lg:text-6xl">{title}</h2>
      <p className="mt-5 text-lg leading-8 text-[#66645d]">{text}</p>
    </div>
  );
}

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame = 0;
    const total = 42;
    const tick = () => {
      frame += 1;
      const progress = 1 - Math.pow(1 - frame / total, 3);
      setDisplay(Math.round(value * progress));
      if (frame < total) requestAnimationFrame(tick);
    };
    tick();
  }, [value]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

function EcosystemMap() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      <div className="absolute inset-8 rounded-full border border-[#ece5c6]" />
      <motion.div
        className="absolute inset-16 rounded-full border border-dashed border-yellow-300/80"
        animate={{ rotate: 360 }}
        transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute left-1/2 top-1/2 grid size-36 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-yellow-200 bg-white shadow-[0_26px_80px_rgba(23,23,21,0.08)]">
        <div className="text-center">
          <EcosystemMark className="mx-auto size-14" />
          <p className="mt-2 text-sm font-semibold text-[#171715]">vendas</p>
        </div>
      </div>

      <svg className="absolute inset-0 size-full" viewBox="0 0 560 560" fill="none" aria-hidden="true">
        {ecosystem.map((item, index) => {
          const radians = (item.angle * Math.PI) / 180;
          const x = 280 + Math.cos(radians) * 182;
          const y = 280 + Math.sin(radians) * 182;
          return (
            <motion.path
              key={item.label}
              d={`M280 280 L${x} ${y}`}
              stroke={index % 2 === 0 ? "#D2A019" : "#D7D3C8"}
              strokeWidth="1.4"
              strokeDasharray="5 9"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: index * 0.08, ease: "easeOut" }}
            />
          );
        })}
      </svg>

      {ecosystem.map((item, index) => {
        const radians = (item.angle * Math.PI) / 180;
        const left = 50 + Math.cos(radians) * 38;
        const top = 50 + Math.sin(radians) * 38;
        return (
          <motion.div
            key={item.label}
            className="absolute w-40 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-yellow-100 bg-white/88 p-4 shadow-[0_18px_50px_rgba(23,23,21,0.08)] backdrop-blur"
            style={{ left: `${left}%`, top: `${top}%` }}
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
            whileHover={{ y: -4 }}
          >
            <p className="text-sm font-semibold text-[#171715]">{item.label}</p>
            <p className="mt-1 text-xs leading-5 text-[#77746a]">{item.description}</p>
          </motion.div>
        );
      })}
    </div>
  );
}

function StrategyPreview() {
  return (
    <motion.div
      className="relative mx-auto w-full max-w-[640px] overflow-hidden rounded-[2rem] border border-white/12 bg-[#171715] shadow-[0_34px_120px_rgba(0,0,0,0.42)]"
      initial={{ opacity: 0, y: 38, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.06] px-5 py-4">
        <span className="size-2.5 rounded-full bg-red-300" />
        <span className="size-2.5 rounded-full bg-yellow-300" />
        <span className="size-2.5 rounded-full bg-emerald-300" />
        <div className="ml-3 h-8 flex-1 rounded-full bg-white/[0.08] px-4 py-2 text-xs font-medium text-white/46">
          cauapetry.com/ecossistema
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-yellow-200">Growth map</p>
          <h3 className="mt-4 text-3xl font-semibold leading-tight text-white">Uma jornada clara antes da mídia.</h3>
          <p className="mt-4 text-sm leading-6 text-white/58">
            Primeiro o cliente entende valor. Depois confia. Só então chama para conversar.
          </p>
          <div className="mt-7 space-y-3">
            {["Valor percebido", "Confiança visual", "Contato com contexto"].map((item, index) => (
              <motion.div
                key={item}
                className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.06] px-4 py-3"
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + index * 0.12 }}
              >
                <span className="text-sm font-semibold text-white/86">{item}</span>
                <span className="size-2 rounded-full bg-yellow-400" />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[360px] overflow-hidden bg-[#11110f] p-6">
          <div className="enterprise-aurora absolute inset-0 opacity-60" />
          <div className="absolute -right-16 -top-16 size-56 rounded-full border-[30px] border-yellow-300/25" />
          <div className="absolute bottom-8 right-8 w-[72%] rounded-[1.5rem] border border-white/10 bg-white/[0.08] p-5 shadow-xl shadow-black/20 backdrop-blur">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-sm font-semibold text-white">Sinais de venda</span>
              <Sparkles className="size-5 text-yellow-500" />
            </div>
            {[
              ["Página", "valor claro", 86],
              ["Captação", "tráfego qualificado", 72],
              ["WhatsApp", "conversa iniciada", 64],
            ].map(([label, text, width]) => (
              <div key={label as string} className="mb-4 last:mb-0">
                <div className="mb-2 flex justify-between text-xs">
                  <span className="font-semibold text-white/88">{label}</span>
                  <span className="text-white/46">{text}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-[#f6c945]"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${width}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function HomeExperience() {
  const [formOpen, setFormOpen] = useState(false);
  const [leadForm, setLeadForm] = useState<LeadForm>(initialLeadForm);
  const answeredCount = Object.values(leadForm).filter(Boolean).length;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 28, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 28, mass: 0.5 });

  const whatsappMessage = useMemo(() => {
    return [
      "Olá, Cauã! Quero uma estrutura digital para vender mais.",
      "",
      "Respostas rápidas:",
      `Quer vender mais?: ${leadForm.venderMais || "Não respondido"}`,
      `Depende muito de indicação?: ${leadForm.dependeIndicacao || "Não respondido"}`,
      `WhatsApp não vira venda?: ${leadForm.recebeWhatsApp || "Não respondido"}`,
      `Já tem site/página?: ${leadForm.temSite || "Não respondido"}`,
      `Quer estrutura para crescer?: ${leadForm.querEscalar || "Não respondido"}`,
    ].join("\n");
  }, [leadForm]);

  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      mouseX.set(event.clientX - 220);
      mouseY.set(event.clientY - 220);
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    document.body.style.overflow = formOpen ? "hidden" : "";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFormOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [formOpen]);

  const updateLeadForm = (field: keyof LeadForm, value: string) => {
    setLeadForm((current) => ({ ...current, [field]: value }));
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fbfaf5] text-[#171715] selection:bg-yellow-300 selection:text-black">
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-10 hidden size-[440px] rounded-full bg-yellow-200/20 blur-3xl lg:block"
        style={{ x: springX, y: springY }}
      />

      <header className="fixed left-1/2 top-4 z-40 w-[min(1120px,calc(100%-24px))] -translate-x-1/2 rounded-2xl border border-white/55 bg-white/82 px-3 py-3 shadow-xl shadow-black/10 backdrop-blur-2xl">
        <nav className="flex items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-3" aria-label="Voltar ao topo">
            <span className="grid size-11 place-items-center rounded-xl bg-[#fbfaf5] shadow-sm">
              <EcosystemMark className="size-9" />
            </span>
            <span className="hidden sm:block">
              <span className="block text-sm font-semibold leading-none">Cauã Petry</span>
              <span className="mt-1 block text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-yellow-600">
                Ecossistema Digital para Empresas
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-1 text-sm font-medium text-[#66645d] md:flex">
            {navItems.map(([item, href]) => (
              <a key={item} href={`#${href}`} className="rounded-xl px-3 py-2 transition hover:bg-[#f6f6f2] hover:text-[#171715]">
                {item}
              </a>
            ))}
          </div>

          <Button className="h-10 rounded-full bg-[#171715] px-4 text-white hover:bg-[#f6c945] hover:text-[#171715]" onClick={() => setFormOpen(true)}>
            Aumentar vendas
            <ArrowRight className="size-4" />
          </Button>
        </nav>
      </header>

      <section id="top" className="relative min-h-screen overflow-hidden bg-[#11110f] px-4 pt-28 text-white sm:px-6 lg:px-8">
        <div className="enterprise-aurora absolute inset-0" />
        <div className="tech-grid absolute inset-0 opacity-55" />
        <div className="noise-layer absolute inset-0 opacity-40" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(180deg,transparent,#fbfaf5)]" />

        <div className="relative z-10 mx-auto grid min-h-[calc(100svh-7rem)] max-w-7xl gap-14 pb-20 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
            <motion.div variants={reveal} className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.08] px-4 py-2 text-sm font-semibold text-yellow-100 shadow-sm backdrop-blur">
              <Sparkles className="size-4 text-yellow-300" />
              Estratégia digital com padrão de empresa grande
            </motion.div>

            <motion.h1 variants={reveal} className="max-w-5xl text-balance bg-[linear-gradient(95deg,#f6c945_0%,#ffe89c_48%,#ffffff_100%)] bg-clip-text text-5xl font-semibold leading-[0.96] tracking-[-0.02em] text-transparent sm:text-6xl lg:text-7xl">
              Ecossistema digital para empresas que pensam grande e querem vender mais.
            </motion.h1>

            <motion.p variants={reveal} className="mt-7 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl">
              Posicionamento, site, captação, WhatsApp e dados trabalhando juntos para gerar mais confiança,
              mais conversas e mais oportunidades de venda.
            </motion.p>

            <motion.div variants={reveal} className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button className="h-14 rounded-full bg-[#f6c945] px-8 text-base font-semibold text-[#171715] shadow-[0_18px_46px_rgba(246,201,69,0.28)] hover:bg-[#ffe071]" onClick={() => setFormOpen(true)}>
                Aumentar minhas vendas
                <ArrowRight className="size-5" />
              </Button>
              <Button asChild variant="outline" className="h-14 rounded-full border-white/16 bg-white/[0.06] px-8 text-base font-semibold text-white hover:bg-white/12 hover:text-white">
                <a href="#problema">
                  Entender a estrutura
                  <ChevronRight className="size-5" />
                </a>
              </Button>
            </motion.div>
          </motion.div>

          <StrategyPreview />
        </div>
      </section>

      <Reveal id="problema" className="scroll-mt-28 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <SectionHeader
              eyebrow="O problema"
              title="Vender fica difícil quando a percepção não acompanha a entrega."
              text="Muitas empresas são boas no que fazem, mas o digital ainda comunica pouco valor. O cliente vê preço antes de enxergar confiança."
            />

            <div className="space-y-4">
              {problemPoints.map((item, index) => (
                <motion.div
                  key={item}
                  className="flex gap-4 border-t border-[#e7dfc2] pt-5"
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                >
                  <span className="font-mono text-sm font-semibold text-yellow-600">0{index + 1}</span>
                  <p className="text-2xl font-semibold leading-tight text-[#171715]">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal id="ecossistema" className="scroll-mt-28 bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="A solução"
            title="Um sistema onde cada peça prepara a próxima."
            text="Nada aparece solto. A marca cria percepção, o site sustenta confiança, a captação traz demanda, o WhatsApp continua a decisão e os dados mostram onde melhorar."
            align="center"
          />
          <div className="mt-14">
            <EcosystemMap />
          </div>
        </div>
      </Reveal>

      <Reveal id="metodo" className="scroll-mt-28 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr]">
            <SectionHeader
              eyebrow="Método"
              title="Uma implementação com começo, meio e evolução."
              text="A estrutura nasce enxuta, clara e pronta para melhorar com dados reais. Sem excesso. Sem improviso."
            />

            <div className="relative">
              <motion.div
                className="absolute left-6 top-6 hidden h-[calc(100%-48px)] w-px bg-yellow-300 md:block"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "top" }}
              />
              <div className="space-y-4">
                {methodSteps.map(([number, title, text], index) => (
                  <motion.article
                    key={number}
                    className="relative grid gap-4 rounded-[1.5rem] border border-[#ece5c6] bg-white p-5 shadow-sm md:grid-cols-[72px_1fr]"
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: index * 0.08 }}
                  >
                    <span className="grid size-12 place-items-center rounded-2xl bg-[#fff5cc] font-mono text-sm font-semibold text-yellow-700">
                      {number}
                    </span>
                    <div>
                      <h3 className="text-2xl font-semibold text-[#171715]">{title}</h3>
                      <p className="mt-2 leading-7 text-[#66645d]">{text}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeader
              eyebrow="Diferenciais"
              title="Mais estratégia. Menos ruído."
              text="O foco não é empilhar recursos. É construir uma presença digital que seja simples de entender e forte o suficiente para vender."
            />
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {differentiators.map(({ icon: Icon, title, text }, index) => (
              <motion.article
                key={title}
                className="rounded-[1.5rem] border border-[#ece5c6] bg-[#fbfaf5] p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-black/5"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <Icon className="size-5 text-yellow-600" />
                <h3 className="mt-8 text-2xl font-semibold">{title}</h3>
                <p className="mt-3 leading-7 text-[#66645d]">{text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <SectionHeader
              eyebrow="Autoridade"
              title="A percepção muda antes do primeiro contato."
              text="Quando o caminho é claro, a empresa parece mais organizada, mais confiável e mais preparada para resolver o problema do cliente."
            />

            <div className="grid gap-4 sm:grid-cols-3">
              {proofItems.map((item) => (
                <div key={item.label} className="rounded-[1.5rem] border border-[#ece5c6] bg-white p-6 shadow-sm">
                  <p className="text-5xl font-semibold text-[#171715]">
                    <AnimatedCounter value={item.value} suffix={item.suffix} />
                  </p>
                  <p className="mt-4 text-sm leading-6 text-[#66645d]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal id="contato" className="scroll-mt-28 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-[#ece5c6] bg-[#171715] text-white shadow-[0_30px_100px_rgba(23,23,21,0.14)]">
          <div className="grid gap-0 lg:grid-cols-[1fr_0.82fr]">
            <div className="p-8 sm:p-12 lg:p-16">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-yellow-200">Próximo passo</p>
              <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">
                Vamos encontrar onde sua venda está escapando?
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">
                A gente não começa por pacote pronto. Começa entendendo o que hoje impede sua empresa de gerar mais conversas boas.
              </p>
              <Button className="mt-9 h-14 rounded-full bg-[#f6c945] px-8 text-base font-semibold text-[#171715] hover:bg-[#ffe071]" onClick={() => setFormOpen(true)}>
                Começar pelo WhatsApp
                <ArrowRight className="size-5" />
              </Button>
            </div>

            <div className="relative min-h-[360px] overflow-hidden border-t border-white/10 bg-white/[0.04] p-8 sm:p-12 lg:border-l lg:border-t-0">
              <div className="enterprise-aurora absolute inset-0 opacity-45" />
              <div className="relative flex h-full flex-col justify-between gap-8">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.08] p-5 backdrop-blur">
                  <div className="flex items-center gap-3">
                    <span className="grid size-12 place-items-center rounded-2xl bg-[#f6c945] text-[#171715]">
                      <MessageCircle className="size-5" />
                    </span>
                    <div>
                      <p className="font-semibold">WhatsApp direto</p>
                      <p className="mt-1 text-sm text-white/58">48 99969-9136</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-200">Como começa</p>
                  <p className="mt-4 text-2xl font-semibold leading-tight">
                    5 respostas rápidas para eu entender seu cenário antes de te chamar pelo nome.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setFormOpen(true)}
                  className="inline-flex h-12 w-fit items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#171715] transition hover:-translate-y-0.5 hover:bg-yellow-100"
                >
                  Abrir perguntas
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {formOpen ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#171715]/48 px-3 py-3 backdrop-blur-xl sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="diagnostico-form-title">
          <button className="absolute inset-0 cursor-default" aria-label="Fechar formulário" onClick={() => setFormOpen(false)} />
          <div className="relative max-h-[92svh] w-full max-w-2xl overflow-y-auto rounded-[1.75rem] border border-[#ece5c6] bg-white p-4 shadow-2xl shadow-black/12 sm:p-6">
            <div className="sticky top-0 z-10 -mx-4 -mt-4 mb-4 flex items-start justify-between gap-4 border-b border-[#ece5c6] bg-white/95 p-4 backdrop-blur sm:-mx-6 sm:-mt-6 sm:mb-6 sm:p-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-yellow-600">Análise comercial</p>
                <h2 id="diagnostico-form-title" className="mt-2 text-2xl font-semibold text-[#171715] sm:text-3xl">
                  Responda 5 perguntas rápidas.
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#66645d]">
                  {answeredCount}/5 respostas marcadas. Depois disso, a mensagem vai pronta para o WhatsApp.
                </p>
              </div>
              <button
                type="button"
                className="grid size-10 shrink-0 place-items-center rounded-full border border-[#ece5c6] bg-[#f6f6f2] text-[#66645d] transition hover:bg-yellow-100 hover:text-[#171715]"
                aria-label="Fechar formulário"
                onClick={() => setFormOpen(false)}
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="grid gap-3">
              {formFields.map((field) => (
                <article key={field.id} className="rounded-2xl border border-[#ece5c6] bg-[#fbfaf5] p-4">
                  <p className="text-base font-semibold leading-6 text-[#171715]">{field.question}</p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {["Sim", "Não"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => updateLeadForm(field.id, option)}
                        className={`h-11 rounded-full border text-sm font-semibold transition ${
                          leadForm[field.id] === option
                            ? "border-yellow-500 bg-[#f6c945] text-[#171715] shadow-lg shadow-yellow-500/20"
                            : "border-[#ece5c6] bg-white text-[#171715] hover:border-yellow-300 hover:bg-yellow-50"
                        }`}
                        aria-pressed={leadForm[field.id] === option}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <Button asChild className="mt-5 h-12 w-full rounded-full bg-[#f6c945] px-6 text-base font-semibold text-[#171715] hover:bg-[#ffe071]">
              <a href={whatsappHref} target="_blank" rel="noreferrer">
                Enviar no WhatsApp
                <Send className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      ) : null}
    </main>
  );
}
