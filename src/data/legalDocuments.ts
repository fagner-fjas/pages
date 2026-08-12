export type LegalSection = {
  title: string
  paragraphs?: string[]
  items?: string[]
}

export type LegalDocument = {
  slug: string
  eyebrow: string
  title: string
  subtitle: string
  updatedAt: string
  intro: string[]
  sections: LegalSection[]
}

export const legalLinks = [
  { href: '/termos-sgedu-escola', label: 'Termos de uso' },
  { href: '/politica-privacidade-sgedu-escola', label: 'Política de privacidade' },
  { href: '/eula-sgedu-escola', label: 'EULA' },
]

export const legalDocuments: Record<string, LegalDocument> = {
  '/termos-sgedu-escola': {
    slug: 'termos-sgedu-escola',
    eyebrow: 'Termos de uso',
    title: 'Termos de Uso do SGEdu Escola e SGEdu Aluno',
    subtitle:
      'Condições gerais de acesso, uso, suporte e responsabilidades aplicáveis às plataformas SGEdu.',
    updatedAt: '24 de julho de 2026',
    intro: [
      'Estes Termos de Uso regulam o acesso e a utilização do SGEdu Escola, SGEdu Aluno, módulos web, aplicativos móveis, integrações, painéis administrativos, recursos de comunicação, suporte técnico e demais funcionalidades disponibilizadas pela FJAS Tecnologia da Informação, doravante denominada FJAS TI.',
      'Ao acessar, contratar, administrar ou utilizar o SGEdu, a instituição contratante, seus administradores, colaboradores, alunos, pais, responsáveis e demais usuários declaram ter lido, compreendido e aceitado estes Termos, obrigando-se a utilizá-los de forma lícita, adequada, segura e compatível com a legislação aplicável, incluindo a Lei Geral de Proteção de Dados Pessoais, Lei nº 13.709/2018.',
    ],
    sections: [
      {
        title: '1. Natureza do serviço',
        paragraphs: [
          'O SGEdu é uma solução tecnológica de apoio à gestão educacional, comunicação escolar, registro de informações acadêmicas, controle de presença, consulta de dados institucionais e funcionalidades correlatas. A FJAS TI atua como fornecedora de software, manutenção evolutiva, hospedagem quando contratada, integrações técnicas e suporte operacional.',
          'A FJAS TI não é instituição de ensino, secretaria escolar, órgão público, mantenedora, empregadora dos usuários finais, responsável pedagógica, autoridade educacional ou substituta da instituição contratante. As decisões administrativas, pedagógicas, documentais, disciplinares e operacionais tomadas a partir do uso do SGEdu são de responsabilidade exclusiva da instituição contratante e dos usuários por ela autorizados.',
        ],
      },
      {
        title: '2. Cadastro, credenciais e perfis de acesso',
        paragraphs: [
          'O acesso ao SGEdu depende de credenciais, permissões e perfis definidos pela instituição contratante ou por usuários administradores autorizados. Cada usuário é responsável por manter sigilo sobre seu login, senha, dispositivos, e-mails, códigos de autenticação e demais meios de acesso.',
          'A instituição contratante é responsável por cadastrar usuários legítimos, remover acessos de pessoas desligadas, limitar permissões conforme a função exercida, revisar periodicamente perfis administrativos e comunicar imediatamente qualquer uso indevido, suspeita de comprometimento ou acesso não autorizado.',
        ],
        items: [
          'É proibido compartilhar credenciais, permitir acesso por terceiros não autorizados ou usar conta de outra pessoa.',
          'É proibido inserir informações falsas, ofensivas, ilícitas, discriminatórias, abusivas ou que violem direitos de terceiros.',
          'É proibido tentar burlar controles de segurança, engenharia reversa, limitação técnica, autenticação, registro de auditoria ou regras de negócio.',
        ],
      },
      {
        title: '3. Responsabilidade pelos dados inseridos',
        paragraphs: [
          'Os dados inseridos, importados, editados, excluídos, consultados ou compartilhados no SGEdu pertencem ou são administrados pela instituição contratante, que define as finalidades, bases legais, usuários autorizados, prazos de guarda, conteúdo dos cadastros e regras internas de tratamento.',
          'A FJAS TI não responde pela veracidade, completude, atualização, licitude, necessidade, proporcionalidade ou autorização dos dados lançados pela instituição contratante ou por seus usuários. A responsabilidade legal por obter autorizações, informar titulares, manter documentos institucionais, cumprir obrigações educacionais e observar a LGPD recai sobre a instituição contratante, salvo quando houver falha comprovada e diretamente imputável à FJAS TI dentro do escopo técnico contratado.',
        ],
      },
      {
        title: '4. Reconhecimento facial, presença e localização',
        paragraphs: [
          'Quando habilitados pela instituição contratante, recursos de presença, biometria facial, validação por imagem ou verificação contextual destinam-se exclusivamente a apoiar controles internos de identificação e frequência. A FJAS TI disponibiliza a ferramenta técnica; a instituição contratante é responsável por avaliar a base legal, necessidade, proporcionalidade, aviso aos titulares e eventuais consentimentos exigíveis.',
          'A FJAS TI não grava vídeos nem fotos de reconhecimento facial para fins de vigilância, monitoramento contínuo ou formação de banco audiovisual próprio. O processamento técnico poderá utilizar imagens, vetores, metadados ou informações transitórias estritamente necessários ao funcionamento contratado, conforme configuração do sistema e instruções da instituição.',
          'A FJAS TI não realiza rastreamento contínuo de localização dos usuários. Quando alguma funcionalidade utilizar localização, o uso será pontual, dependente de permissão do dispositivo e restrito à finalidade operacional informada, como validação de presença em raio autorizado pela instituição.',
        ],
      },
      {
        title: '5. Segurança e disponibilidade',
        paragraphs: [
          'A FJAS TI adota medidas técnicas e administrativas razoáveis para proteger o SGEdu, incluindo controle de acesso, segregação lógica, manutenção de ambiente, atualizações, rotinas de suporte, correções de falhas e práticas compatíveis com a natureza do serviço. Nenhum sistema conectado à internet, entretanto, é absolutamente imune a falhas, indisponibilidade, erro humano, mau uso de credenciais, ataques, problemas de infraestrutura ou eventos fora do controle razoável da fornecedora.',
          'A FJAS TI não será responsável por incidentes decorrentes de senhas fracas, compartilhamento de acessos, dispositivos comprometidos, redes inseguras, permissões concedidas indevidamente, importação de dados incorretos, atos de usuários autorizados, integrações de terceiros, falhas de operadoras, provedores externos, sistemas governamentais, lojas de aplicativos, serviços de e-mail, serviços de mensagem, caso fortuito, força maior ou descumprimento destes Termos pela contratante ou usuários.',
        ],
      },
      {
        title: '6. Suporte técnico e limites operacionais',
        paragraphs: [
          'O suporte da FJAS TI tem natureza técnica e operacional, voltado ao funcionamento do software, esclarecimento de uso, correção de falhas, orientação sobre configurações e atendimento conforme canais, horários e planos contratados. O suporte não inclui consultoria jurídica, pedagógica, contábil, trabalhista, fiscal, regulatória, de segurança patrimonial ou de gestão escolar.',
          'Solicitações de suporte podem exigir acesso técnico controlado a registros, telas, logs ou dados necessários para diagnóstico. A contratante autoriza esse acesso na medida necessária ao atendimento, sem transferência de responsabilidade sobre o conteúdo, legitimidade ou decisões de tratamento dos dados.',
        ],
      },
      {
        title: '7. Propriedade intelectual',
        paragraphs: [
          'O SGEdu, suas marcas, códigos, telas, fluxos, bancos de dados estruturais, documentação, identidade visual, arquitetura, métodos, integrações e demais elementos de software pertencem à FJAS TI ou a seus licenciantes. A contratação concede apenas licença limitada, revogável, não exclusiva e intransferível de uso, nos termos contratados.',
          'É vedado copiar, revender, sublicenciar, disponibilizar, modificar, desmontar, explorar comercialmente ou permitir que terceiros usem o SGEdu fora do escopo contratado, salvo autorização expressa e escrita da FJAS TI.',
        ],
      },
      {
        title: '8. Suspensão e encerramento',
        paragraphs: [
          'A FJAS TI poderá suspender ou restringir acessos em caso de inadimplência, risco à segurança, uso abusivo, violação destes Termos, ordem legal, tentativa de fraude, dano à infraestrutura, descumprimento contratual ou necessidade de manutenção emergencial.',
          'Encerrada a contratação, a instituição contratante deverá solicitar exportação, guarda ou eliminação de dados dentro dos prazos e condições aplicáveis. A FJAS TI poderá manter registros técnicos, fiscais, contratuais, de auditoria e segurança pelo prazo necessário ao cumprimento de obrigação legal, exercício regular de direitos e proteção contra fraudes.',
        ],
      },
      {
        title: '9. Limitação de responsabilidade',
        paragraphs: [
          'Na extensão permitida pela legislação brasileira, a responsabilidade da FJAS TI limita-se a danos diretos comprovadamente causados por falha técnica própria, dentro do escopo contratado e após demonstração de nexo causal. A FJAS TI não responde por lucros cessantes, perda de receita, dano indireto, dano moral coletivo imputável à contratante, sanções administrativas decorrentes de decisões da instituição, perda de oportunidade, falha de terceiros, indisponibilidade externa ou uso indevido por usuários autorizados.',
          'A instituição contratante compromete-se a indenizar e manter a FJAS TI isenta de reclamações, autuações, perdas, custos, honorários e despesas decorrentes de dados inseridos irregularmente, ausência de base legal, falta de aviso aos titulares, permissões inadequadas, vazamento causado por usuários da contratante, decisões administrativas ou uso do SGEdu em desconformidade com estes Termos.',
        ],
      },
      {
        title: '10. Alterações dos Termos',
        paragraphs: [
          'A FJAS TI poderá atualizar estes Termos para refletir mudanças legais, técnicas, comerciais ou operacionais. A versão vigente será publicada nesta página, com indicação da data de atualização. O uso contínuo do SGEdu após a publicação caracteriza ciência e aceitação da versão atualizada, sem prejuízo de regras contratuais específicas.',
        ],
      },
    ],
  },
  '/politica-privacidade-sgedu-escola': {
    slug: 'politica-privacidade-sgedu-escola',
    eyebrow: 'Política de privacidade',
    title: 'Política de Privacidade do SGEdu Escola e SGEdu Aluno',
    subtitle:
      'Informações sobre tratamento de dados pessoais, segurança, bases legais e papéis da FJAS TI no SGEdu.',
    updatedAt: '24 de julho de 2026',
    intro: [
      'Esta Política de Privacidade descreve como dados pessoais podem ser tratados no contexto do SGEdu Escola, SGEdu Aluno, painéis web, aplicativos móveis, suporte técnico e funcionalidades associadas. O documento observa a Lei Geral de Proteção de Dados Pessoais, Lei nº 13.709/2018, e as orientações públicas da Autoridade Nacional de Proteção de Dados.',
      'Em regra, a instituição contratante é a controladora dos dados pessoais tratados para gestão escolar, comunicação, presença, cadastros e rotinas educacionais. A FJAS TI atua predominantemente como operadora, fornecedora de software e suporte técnico, tratando dados conforme contrato, configuração da plataforma, instruções da instituição contratante e obrigações legais próprias.',
    ],
    sections: [
      {
        title: '1. Papéis sob a LGPD',
        paragraphs: [
          'A LGPD diferencia controlador, operador e titular. O controlador decide as finalidades e meios essenciais do tratamento; o operador realiza o tratamento em nome do controlador; o titular é a pessoa natural a quem os dados se referem. No SGEdu, a escola, rede de ensino, mantenedora ou empresa contratante normalmente define quais dados serão cadastrados, quem acessa, por quanto tempo serão mantidos e para quais finalidades educacionais serão usados.',
          'A FJAS TI não determina a finalidade educacional dos cadastros, avaliações, presenças, mensagens, documentos, turmas, matrículas, registros internos ou dados familiares inseridos pela contratante. A FJAS TI poderá atuar como controladora apenas em dados necessários à sua própria operação empresarial, como dados de contrato, cobrança, suporte, segurança, logs administrativos, comunicações comerciais e cumprimento de obrigações legais.',
        ],
      },
      {
        title: '2. Dados que podem ser tratados',
        paragraphs: [
          'A depender das funcionalidades contratadas e das informações inseridas pela instituição, o SGEdu poderá tratar dados de identificação, contato, matrícula, turma, unidade escolar, responsáveis, informações acadêmicas, frequência, eventos, avisos, documentos, registros de acesso, identificadores de dispositivo, logs técnicos, preferências de comunicação e dados necessários ao suporte.',
          'Algumas funcionalidades podem envolver dados pessoais sensíveis, como dados biométricos para reconhecimento facial ou informações de saúde quando a instituição optar por registrar dados dessa natureza. A instituição contratante deve avaliar previamente necessidade, finalidade, base legal, transparência, controle de acesso, retenção e proporcionalidade desses tratamentos.',
        ],
      },
      {
        title: '3. Reconhecimento facial e dados biométricos',
        paragraphs: [
          'O reconhecimento facial, quando utilizado, tem finalidade operacional de identificação ou marcação de presença. A FJAS TI não usa reconhecimento facial para publicidade, perfilamento comercial, venda de dados, vigilância generalizada ou monitoramento contínuo.',
          'A FJAS TI não grava vídeos nem fotos de reconhecimento facial como banco audiovisual próprio. O funcionamento técnico pode envolver processamento de imagem, comparação biométrica, vetores matemáticos, identificadores, logs de tentativa e resultado de presença, conforme configuração do sistema. O objetivo é reconhecer ou validar presença no contexto escolar definido pela instituição contratante.',
          'A instituição contratante é responsável por informar titulares, pais ou responsáveis, obter consentimentos quando aplicável, disponibilizar alternativas quando exigidas por lei ou política interna, limitar usuários autorizados, revisar necessidade do tratamento e atender direitos dos titulares.',
        ],
      },
      {
        title: '4. Localização',
        paragraphs: [
          'A FJAS TI não rastreia continuamente a localização de usuários. Quando uma funcionalidade exigir localização, o tratamento será pontual, dependente de permissão do sistema operacional e limitado à finalidade informada, como verificar se a marcação de presença ocorre dentro de raio configurado pela instituição.',
          'A instituição contratante deve configurar regras de uso compatíveis com sua política interna, comunicar os usuários e respeitar a legislação aplicável, especialmente quando envolver alunos, crianças, adolescentes, trabalhadores ou terceiros vinculados à comunidade escolar.',
        ],
      },
      {
        title: '5. Finalidades do tratamento',
        items: [
          'Disponibilizar e operar o SGEdu Escola, SGEdu Aluno e módulos associados.',
          'Permitir autenticação, controle de perfis, gestão acadêmica, comunicação, presença e consulta de informações.',
          'Prestar suporte técnico, investigar falhas, melhorar estabilidade, prevenir fraudes e proteger a segurança do ambiente.',
          'Cumprir obrigações legais, regulatórias, fiscais, contratuais e ordens de autoridades competentes.',
          'Registrar evidências técnicas necessárias ao exercício regular de direitos da FJAS TI, da instituição contratante ou de terceiros.',
        ],
      },
      {
        title: '6. Bases legais',
        paragraphs: [
          'As bases legais aplicáveis variam conforme a finalidade e o papel de cada agente de tratamento. A instituição contratante deve definir e documentar as bases legais para dados educacionais, dados de alunos, dados de responsáveis, dados sensíveis, biometria, presença e comunicações institucionais.',
          'A FJAS TI poderá tratar dados com fundamento em execução de contrato, cumprimento de obrigação legal ou regulatória, legítimo interesse quando cabível, exercício regular de direitos, prevenção à fraude e segurança, proteção do crédito, consentimento quando aplicável e demais hipóteses previstas na LGPD.',
        ],
      },
      {
        title: '7. Compartilhamento de dados',
        paragraphs: [
          'Dados poderão ser compartilhados com provedores de infraestrutura, hospedagem, armazenamento, e-mail, autenticação, notificações, análise técnica, suporte, lojas de aplicativos, meios de pagamento, consultores, autoridades públicas ou terceiros necessários à operação do SGEdu, sempre dentro do escopo funcional, contratual ou legal aplicável.',
          'A FJAS TI não vende dados pessoais de usuários do SGEdu. Compartilhamentos realizados pela instituição contratante, por seus administradores ou por usuários autorizados, incluindo exportações, impressões, prints, planilhas, mensagens externas ou repasses a terceiros, são de responsabilidade da própria instituição ou usuário que praticou o ato.',
        ],
      },
      {
        title: '8. Segurança da informação',
        paragraphs: [
          'A FJAS TI emprega medidas razoáveis de segurança técnica e administrativa para preservar confidencialidade, integridade e disponibilidade do SGEdu. Tais medidas podem incluir controles de acesso, logs, segregação de ambientes, atualizações, práticas de desenvolvimento, restrição de acessos administrativos, monitoramento técnico e resposta a incidentes.',
          'Apesar dos esforços de segurança, nenhum ambiente digital é livre de riscos. A FJAS TI não se responsabiliza por vazamentos, exposições ou incidentes causados por credenciais compartilhadas, usuários autorizados, dispositivos infectados, redes inseguras, permissões excessivas concedidas pela contratante, erro operacional da instituição, integrações externas, falhas de terceiros ou condutas fora do controle razoável da FJAS TI.',
        ],
      },
      {
        title: '9. Retenção e eliminação',
        paragraphs: [
          'A retenção de dados educacionais e operacionais é definida principalmente pela instituição contratante, respeitados os requisitos legais, regulatórios, contratuais e técnicos. A FJAS TI poderá manter backups, logs e registros técnicos pelo tempo necessário à continuidade do serviço, segurança, auditoria, prevenção de fraudes, cumprimento legal e exercício regular de direitos.',
          'Pedidos de exclusão, anonimização, bloqueio ou portabilidade devem ser avaliados pela instituição controladora quando envolverem dados sob sua gestão. A FJAS TI poderá apoiar tecnicamente a execução desses pedidos conforme viabilidade, contrato e instruções da controladora.',
        ],
      },
      {
        title: '10. Direitos dos titulares',
        paragraphs: [
          'Titulares podem solicitar confirmação de tratamento, acesso, correção, anonimização, bloqueio, eliminação, portabilidade, informação sobre compartilhamento, revisão de decisões automatizadas quando aplicável e demais direitos previstos na LGPD. Quando o dado estiver sob controle da instituição contratante, o pedido deverá ser direcionado a ela.',
          'Caso a FJAS TI receba solicitação relacionada a dados controlados por uma instituição contratante, poderá encaminhar, orientar o titular a procurar a controladora ou adotar providências técnicas compatíveis com o contrato e com a LGPD.',
        ],
      },
      {
        title: '11. Incidentes de segurança',
        paragraphs: [
          'A FJAS TI avaliará incidentes de segurança sob sua responsabilidade técnica e, quando aplicável, comunicará a instituição contratante para adoção das medidas cabíveis. A decisão sobre comunicação a titulares e à ANPD, quando envolver dados sob controle da instituição, cabe à controladora, sem prejuízo de apoio técnico da FJAS TI.',
          'A instituição contratante deve manter governança própria, controle de acessos, treinamento de usuários, política de senhas, gestão de dispositivos e procedimentos internos para reduzir riscos de exposição indevida.',
        ],
      },
      {
        title: '12. Crianças e adolescentes',
        paragraphs: [
          'O SGEdu pode ser utilizado em contexto educacional envolvendo crianças e adolescentes. A instituição contratante é responsável por observar o melhor interesse do menor, prestar informações adequadas aos responsáveis, definir bases legais apropriadas e limitar o tratamento ao necessário para a finalidade educacional ou de segurança definida.',
        ],
      },
      {
        title: '13. Contato',
        paragraphs: [
          'Dúvidas técnicas ou solicitações relacionadas à operação do SGEdu podem ser encaminhadas para contato@fjas.com.br. Demandas sobre dados controlados pela escola, rede, mantenedora ou instituição contratante devem ser prioritariamente direcionadas ao canal oficial dessa instituição.',
        ],
      },
    ],
  },
  '/eula-sgedu-escola': {
    slug: 'eula-sgedu-escola',
    eyebrow: 'EULA',
    title: 'Contrato de Licença de Usuário Final do SGEdu Escola e SGEdu Aluno',
    subtitle:
      'Licença de uso dos aplicativos, sistemas web, módulos, atualizações e serviços técnicos vinculados ao SGEdu.',
    updatedAt: '24 de julho de 2026',
    intro: [
      'Este Contrato de Licença de Usuário Final, ou EULA, estabelece as condições de licenciamento do SGEdu Escola, SGEdu Aluno, módulos web, aplicativos móveis, componentes, atualizações, APIs, documentação e demais recursos fornecidos pela FJAS TI.',
      'Ao instalar, acessar ou utilizar o SGEdu, o usuário final e a instituição contratante aceitam os termos desta licença. Caso não concordem, deverão interromper o uso e solicitar à instituição responsável a desativação do acesso.',
    ],
    sections: [
      {
        title: '1. Concessão de licença',
        paragraphs: [
          'A FJAS TI concede uma licença limitada, não exclusiva, não transferível, revogável e condicionada ao cumprimento contratual para uso do SGEdu exclusivamente nas finalidades educacionais, administrativas e operacionais autorizadas pela instituição contratante.',
          'Esta licença não transfere propriedade intelectual, código-fonte, tecnologia, marca, metodologia, arquitetura, banco de dados estrutural, documentação ou qualquer outro direito não expressamente concedido.',
        ],
      },
      {
        title: '2. Usuários autorizados',
        paragraphs: [
          'São usuários autorizados aqueles cadastrados pela instituição contratante ou por seus administradores, incluindo colaboradores, gestores, professores, alunos, pais, responsáveis e pessoas vinculadas ao ambiente educacional. O acesso depende do perfil concedido e poderá ser suspenso, limitado ou encerrado a qualquer tempo conforme regras da instituição e da FJAS TI.',
          'A instituição contratante responde pela legitimidade dos usuários criados, pela concessão de permissões e pelo encerramento tempestivo de contas que não devam permanecer ativas.',
        ],
      },
      {
        title: '3. Restrições de uso',
        items: [
          'Não copiar, modificar, adaptar, traduzir, vender, alugar, sublicenciar, distribuir ou explorar comercialmente o SGEdu sem autorização escrita.',
          'Não realizar engenharia reversa, descompilação, tentativa de extração de código-fonte, varredura ofensiva, teste de intrusão não autorizado ou acesso a áreas restritas.',
          'Não usar o SGEdu para violar lei, direitos de terceiros, privacidade, propriedade intelectual, segurança de sistemas ou políticas institucionais.',
          'Não inserir malware, scripts abusivos, conteúdo ilícito, dados falsos, dados excessivos ou informações sem base legal adequada.',
          'Não utilizar automações, robôs, scraping, carga artificial ou integrações não autorizadas que prejudiquem estabilidade, segurança ou desempenho.',
        ],
      },
      {
        title: '4. Atualizações e disponibilidade',
        paragraphs: [
          'A FJAS TI poderá lançar atualizações, correções, melhorias, ajustes de segurança, mudanças visuais, alterações de fluxo e adaptações legais ou técnicas. Algumas funcionalidades podem depender de sistema operacional, modelo de dispositivo, permissões, conectividade, loja de aplicativos, serviços de terceiros ou configuração institucional.',
          'A FJAS TI poderá interromper temporariamente o acesso para manutenção programada, manutenção emergencial, mitigação de riscos, atualização de infraestrutura ou exigência legal. A indisponibilidade causada por terceiros, internet, dispositivos, lojas de aplicativos, provedores, operadoras, serviços externos ou mau uso não caracteriza inadimplemento da licença pela FJAS TI.',
        ],
      },
      {
        title: '5. Dados, conteúdo e responsabilidade institucional',
        paragraphs: [
          'A licença permite que a instituição contratante e usuários autorizados insiram, consultem e processem dados no SGEdu. A FJAS TI não valida previamente a legalidade, exatidão, necessidade ou autorização de cada dado inserido, nem assume responsabilidade por decisões tomadas pela instituição com base no conteúdo registrado.',
          'A instituição contratante é responsável por cumprir a LGPD, normas educacionais, deveres de informação, governança de acessos, retenção documental, atendimento a titulares e quaisquer autorizações relacionadas a dados de alunos, responsáveis, colaboradores e terceiros.',
        ],
      },
      {
        title: '6. Recursos de biometria e presença',
        paragraphs: [
          'Funcionalidades de reconhecimento facial, quando disponíveis, integram a licença apenas como ferramentas de apoio à identificação e presença, não como sistema autônomo de vigilância, segurança pública, monitoramento contínuo ou decisão administrativa sem supervisão humana.',
          'A FJAS TI não grava vídeo nem foto de reconhecimento facial para banco próprio e não rastreia continuamente a localização dos usuários. O uso de biometria ou localização, quando configurado, deve respeitar permissões do dispositivo, finalidade educacional definida, comunicação aos titulares e responsabilidade da instituição contratante.',
        ],
      },
      {
        title: '7. Garantias limitadas',
        paragraphs: [
          'O SGEdu é fornecido no estado técnico compatível com sua documentação, evolução contínua e plano contratado. A FJAS TI empreende esforços razoáveis para manter segurança, funcionamento e suporte, mas não garante operação ininterrupta, ausência absoluta de erros, compatibilidade com todos os dispositivos, atendimento de expectativas específicas não contratadas ou imunidade contra todo tipo de incidente.',
          'Funcionalidades que envolvem câmera, biometria, notificações, localização, internet, serviços de terceiros e sistemas operacionais podem apresentar variação de desempenho conforme ambiente, dispositivo, permissões, iluminação, rede, hardware e políticas externas.',
        ],
      },
      {
        title: '8. Isenção e limitação de responsabilidade',
        paragraphs: [
          'A FJAS TI não será responsável por vazamento, perda, exposição, acesso indevido ou compartilhamento de dados decorrente de conduta de usuário autorizado, falha de gestão da instituição contratante, credenciais compartilhadas, permissões excessivas, dispositivos comprometidos, exportações indevidas, prints, planilhas, integrações externas, redes inseguras ou atos de terceiros fora do controle razoável da FJAS TI.',
          'Na máxima extensão permitida pela lei, eventual responsabilidade da FJAS TI ficará limitada a danos diretos comprovados, resultantes de falha técnica própria e dentro do escopo contratado. Ficam excluídos danos indiretos, lucros cessantes, perda de dados causada por usuário, interrupções externas, sanções decorrentes de decisões da contratante e qualquer obrigação que dependa de base legal, aviso ou governança que caiba à instituição.',
        ],
      },
      {
        title: '9. Rescisão da licença',
        paragraphs: [
          'A licença poderá ser encerrada por término contratual, inadimplência, violação deste EULA, risco de segurança, determinação legal, uso abusivo ou descontinuidade planejada. Encerrada a licença, o usuário deverá cessar o uso do SGEdu e a instituição deverá observar os procedimentos de exportação, retenção ou eliminação de dados aplicáveis.',
        ],
      },
      {
        title: '10. Legislação aplicável',
        paragraphs: [
          'Este EULA é regido pelas leis da República Federativa do Brasil. Controvérsias serão resolvidas conforme contrato principal firmado com a instituição contratante ou, na ausência de previsão específica, pelo foro competente segundo a legislação brasileira aplicável.',
        ],
      },
    ],
  },
}
