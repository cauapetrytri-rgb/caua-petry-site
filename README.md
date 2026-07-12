# Cauã Petry — Site de posicionamento e captação

Site full stack para apresentar uma oferta de marketing e tecnologia, explicar o método de trabalho e transformar visitas em oportunidades comerciais qualificadas.

![Preview do site](docs/preview.png)

## Sobre o projeto

A experiência conecta posicionamento, presença digital, captação e atendimento em uma narrativa única. Além da landing page responsiva, o projeto possui formulário de diagnóstico, persistência de leads e integrações preparadas para uma operação real.

## Recursos

- Landing page responsiva com narrativa orientada à conversão.
- Animações de entrada, microinterações e componentes interativos.
- Diagnóstico comercial em modal com perguntas de qualificação.
- CTA para WhatsApp com mensagem contextual.
- API para captura e persistência de leads.
- Modelagem de dados com Prisma e PostgreSQL.
- Integração preparada para Supabase.
- Scripts de verificação responsiva com Playwright.

## Tecnologias

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion e GSAP
- Prisma e PostgreSQL
- Supabase
- Playwright

## Executar localmente

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abra `http://localhost:3000`.

## Verificação

```bash
npm run lint
npm run build
node scripts/verify-responsive.mjs http://localhost:3000
```

## Variáveis de ambiente

```text
DATABASE_URL
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

O repositório contém apenas valores de exemplo. Credenciais reais devem permanecer fora do controle de versão.

---

Desenvolvido por [Cauã Petry](https://github.com/cauapetrytri-rgb).
