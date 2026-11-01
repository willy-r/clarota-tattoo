# Painel de conteúdo

O conteúdo do site (bio, contato, portfólio, estilos, depoimentos) é editado em **`/keystatic`**.
O painel é o [Keystatic](https://keystatic.com), um CMS que guarda tudo como arquivo no próprio
repositório, sem banco de dados e sem custo:

- os textos ficam em `content/*.json`;
- as fotos do portfólio ficam em `public/portfolio/items/<nome>/image.webp`;
- cada "Save" vira um commit na `main`, e a Vercel publica sozinha em cerca de 1 minuto.

Quem tem permissão de escrita no repositório `willy-r/clarota-tattoo` consegue entrar no painel.

---

## Setup único (GitHub App)

Em produção o painel grava no GitHub. Até este setup ser feito, `/keystatic` em produção mostra
"Painel ainda não configurado" e a API responde 404. O site em si funciona normalmente.

1. Na sua máquina, suba o dev forçando o modo GitHub:

   ```bash
   NEXT_PUBLIC_KEYSTATIC_STORAGE=github npm run dev
   ```

2. Abra `http://127.0.0.1:3000/keystatic` e clique em entrar com GitHub. O Keystatic abre a tela
   de setup:
   - em *Deployed App URL*, informe a URL do site na Vercel (ex: `https://clarota-tattoo.vercel.app`);
   - clique em **Create GitHub App**, dê um nome (ex: `clarota-painel`) e confirme.
3. Instale o app **só** no repositório `willy-r/clarota-tattoo`.
4. O Keystatic grava um `.env` na raiz com quatro variáveis. Esse arquivo já está no `.gitignore`.
   Cadastre as quatro na Vercel (*Settings › Environment Variables*):

   | Variável |
   |---|
   | `KEYSTATIC_GITHUB_CLIENT_ID` |
   | `KEYSTATIC_GITHUB_CLIENT_SECRET` |
   | `KEYSTATIC_SECRET` |
   | `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` |

5. Confira se o callback de produção está no app. Abra `https://github.com/settings/apps/<slug-do-app>`
   e, em *Callback URLs*, deve existir:

   ```
   https://<seu-dominio>/api/keystatic/github/oauth/callback
   ```

   Ao trocar de domínio, adicione o novo callback ali.
6. Faça o redeploy na Vercel e entre em `https://<seu-dominio>/keystatic`.

Depois do setup, apague a linha `NEXT_PUBLIC_KEYSTATIC_STORAGE` (se tiver colocado no `.env`) para
o dev voltar a gravar nos arquivos locais.

---

## Uso no dia a dia

### No site publicado

1. Abra `/keystatic` e entre com o GitHub.
2. Escolha a seção no menu da esquerda:
   - **Sobre a artista**: nome, cidade, bio e especialidades;
   - **Contato**: WhatsApp, mensagem pronta, Instagram e e-mail;
   - **Portfólio**: os trabalhos, na ordem em que aparecem no site e no museu 3D;
   - **Estilos**: os cards da seção "Estilos";
   - **Depoimentos**: a seção está desligada no site; o que for salvo fica guardado.
3. Edite e clique em **Save**. Em cerca de 1 minuto a mudança está no ar.

### Portfólio

- **Adicionar**: *Adicionar* → título, estilo, formato no mosaico e foto → *Concluído* → **Save**.
- **Reordenar**: arraste pelo ícone ⠿ à esquerda. A primeira foto é a primeira do site e a
  primeira obra do museu.
- **Títulos repetidos** (ex: duas "Arte Autoral"): o campo *Nome da pasta da foto* precisa ser
  diferente em cada um. Basta mudar ali, ex: `arte-autoral-2`.
- **Fotos**: JPG ou WebP com até ~1600px no lado maior. Foto direto da câmera (4000px, 5 MB)
  deixa o repositório pesado e o museu lento para carregar.
- **Estilo novo**: o select de estilo vem de `PORTFOLIO_STYLES` em `keystatic.config.tsx`. Se
  criar um estilo novo em *Estilos*, adicione o nome lá também.

### Em dev

`npm run dev` e `http://localhost:3000/keystatic`. Sem login: o painel grava direto em
`content/*.json` e `public/portfolio/`, e a mudança aparece no site local na hora. Depois é só
commitar.
