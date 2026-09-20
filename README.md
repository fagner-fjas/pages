# Landing Pages com Micro CMS

Projeto Vue 3 + Vite + Tailwind CSS para criar landing pages modulares com conteudo salvo em arquivo JSON portatil.

## Rodar localmente

```bash
npm install
cp config/cms.example.json config/cms.json
```

Edite `config/cms.json` e preencha `password` com uma senha exclusiva de pelo menos 12 caracteres. Depois inicie:

```bash
npm run dev:cms
```

Abra a URL exibida pelo Vite. O gestor fica em `/admin`.

Nao existe senha padrao. O servidor exige uma senha valida no arquivo para iniciar. Para trocar a senha, edite o arquivo e reinicie o servidor; isso tambem encerra as sessoes existentes. A variavel `CMS_PASSWORD` nao e mais utilizada.

O arquivo `config/cms.json` e privado, ignorado pelo Git e nao entra no build. O arquivo de exemplo pode ser versionado, sempre sem senha. O login limita cinco tentativas incorretas por IP a cada 15 minutos, e as sessoes expiram apos oito horas.

## Produção

```bash
npm run build
npm run start
```

O servidor `npm run start` entrega o site compilado, a API do micro CMS e os uploads.

Antes de publicar, edite e copie `config/cms.json` para a pasta `config` do servidor, fora de `dist` e `public`. Restrinja a leitura ao usuario que executa o Node (por exemplo, `chmod 600 config/cms.json`). Nunca publique a raiz do projeto como uma pasta estatica; use o servidor Node e HTTPS na hospedagem. Hospedar apenas `dist` nao disponibiliza o login, a edicao nem o upload do CMS.

## Conteudo portatil

O conteudo principal fica em:

```text
content/site.json
```

As imagens enviadas pelo gestor ficam em:

```text
public/uploads
```

Para migrar o site para outro servidor, copie a pasta do projeto com esses arquivos. Nao ha dependencia de banco de dados externo.

## Como adicionar componentes

1. Crie um componente Vue em `src/components/sections`.
2. Registre o componente em `src/data/sectionRegistry.ts`.
3. Defina um objeto `defaults` para ele aparecer no seletor do gestor.

Cada pagina possui `menu` e `sections`. Cada secao aponta para um componente pelo campo `type`.
