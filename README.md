# Landing Pages com Micro CMS

Projeto Vue 3 + Vite + Tailwind CSS para criar landing pages modulares com conteudo salvo em arquivo JSON portatil.

## Rodar localmente

```bash
npm install
npm run dev:cms
```

Abra a URL exibida pelo Vite. O gestor fica em `/admin`.

Senha local padrao:

```text
admin123
```

Para trocar a senha:

```bash
CMS_PASSWORD="sua-senha" npm run dev:cms
```

## Produção

```bash
npm run build
CMS_PASSWORD="sua-senha" npm run start
```

O servidor `npm run start` entrega o site compilado, a API do micro CMS e os uploads.

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
