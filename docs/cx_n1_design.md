# Design do Atendimento N1 — Arquitetura de Suporte Corporativo

> **Versão:** 1.0  
> **Empresa:** Porte Médio (200–1000 colaboradores)  
> **Volume estimado:** 500–2000 chamados/mês  
> **Cobertura:** Chat + E-mail + Telefone + Portal Interno

---

## 1. Fluxo Textual de Atendimento N1

```
                    ┌──────────────────────────────────────────────────────┐
                    │                    CANAIS DE ENTRADA                  │
                    │  Chat (web/app) | E-mail (suporte@) | Telefone (PABX)│
                    │  Portal Interno (Service Desk) | Chatbot (24/7)      │
                    └──────────────────────┬───────────────────────────────┘
                                           │
                                           ▼
                     ┌─────────────────────────────────────────┐
                     │        1. TRIAGEM AUTOMATIZADA           │
                     │  Chatbot com RAG + Base de Conhecimento  │
                     │  ┌─────────────────────────────────────┐ │
                     │  │ Resolução automática ≥ 60% confiança │→│→ Saída: Chamado resolvido
                     │  │ Resolução parcial 30-59% confiança   │→│→ Segue para N1 com sugestão
                     │  │ Resolução < 30% confiança            │→│→ Segue para N1 puro
                     │  └─────────────────────────────────────┘ │
                     └──────────────────┬──────────────────────┘
                                        │
                                        ▼ (quando não resolvido automaticamente)
                     ┌─────────────────────────────────────────┐
                     │        2. REGISTRO DO CHAMADO            │
                     │  ● Classificação: tipo (incidente/solicitação) │
                     │  ● Categoria: nível 1 + nível 2         │
                     │  ● Prioridade: crítica/alta/média/baixa │
                     │  ● SLA atribuído automaticamente        │
                     │  ● Usuário notificado (e-mail/Slack)    │
                     └──────────────────┬──────────────────────┘
                                        │
                                        ▼
                     ┌─────────────────────────────────────────┐
                     │        3. FILA DO N1 (AGENTE HUMANO)     │
                     │  ● Agente assume chamado mais antigo     │
                     │  ● Consulta base de conhecimento + RAG   │
                     │  ● Histórico do usuário exibido          │
                     │  ● Sugestão automática de artigos        │
                     └──────────────────┬──────────────────────┘
                                        │
                           ┌────────────┴────────────┐
                           ▼                         ▼
            ┌─────────────────────────┐   ┌─────────────────────────┐
            │  4a. RESOLUÇÃO NO N1    │   │  4b. ESCALONAMENTO      │
            │  ● FAQ / base de conhecimento│  ● Para N2 (suporte técnico)
            │  ● Senhas / reset de acesso │  ● Para N3 (engineering)│
            │  ● Orientação de processo   │  ● Chamado transferido  │
            │  ● Chamado encerrado        │  ● Notificação ao N2/N3 │
            │  ● Pesquisa de satisfação   │  ● SLA ajustado         │
            └───────────┬─────────────┘   └───────────┬─────────────┘
                        │                             │
                        ▼                             ▼
            ┌─────────────────────────┐   ┌─────────────────────────┐
            │  5a. FEEDBACK LOOP      │   │  5b. ACOMPANHAMENTO    │
            │  ● CSAT coletado        │   │  ● N2 resolve ou escala│
            │  ● Base atualizada se   │   │  ● N3 resolve definitivo│
            │    solução inédita      │   │  ● Chamado retorna ao  │
            │  ● Artigo publicado     │   │    usuário como resolv.│
            └─────────────────────────┘   └─────────────────────────┘
```

### Descrição das Etapas

| Etapa | Descrição | Responsável | Tempo alvo |
|-------|-----------|-------------|------------|
| **1. Triagem automatizada** | Chatbot com RAG consulta base de conhecimento. Se confiança ≥ 60%, resolve direto. Caso contrário, gera resumo para o agente N1. | Chatbot / LLM | < 30s |
| **2. Registro** | Ticket criado automaticamente. Categoria e prioridade sugeridas pelo sistema. | Sistema de tickets | < 2 min |
| **3. Fila N1** | Agente visualiza fila com prioridade, tempo de espera e sugestão automática de artigos. | Agente N1 | < 5 min (espera) |
| **4a. Resolução** | Agente resolve usando base + ferramentas. Encerra com solução documentada. | Agente N1 | < 15 min |
| **4b. Escalonamento** | Agente transfere para N2 com resumo do diagnóstico. Chamado mantém histórico completo. | Agente N1 | < 10 min |
| **5a. Feedback** | Pesquisa CSAT enviada após resolução. Base atualizada se nova solução. | Automático + Knowledge Mgr | 24h |
| **5b. Acompanhamento** | N2/N3 atua. Chamado retorna ao N1 para fechar ou é encerrado pelo N2. | N2/N3 | Conforme SLA |

---

## 2. Papéis e Responsabilidades da Equipe

### 2.1 Equipe N1 (Service Desk)

| Papel | Quantidade (sugerida) | Responsabilidades |
|-------|----------------------|-------------------|
| **Agente N1 (Chat)** | 2–4 por turno | Atendimento síncrono via chat; resolução de senhas, acesso, orientações básicas; registro e classificação de chamados |
| **Agente N1 (Telefone)** | 2–3 por turno | Atendimento telefônico; abertura de chamados para usuários sem acesso ao portal |
| **Agente N1 (E-mail / Fila)** | 1–2 por turno | Triagem de chamados abertos por e-mail; resolução assíncrona; monitoramento de SLA |
| **Supervisor N1** | 1 por turno | Gestão de fila; aprovação de escalonamento; coaching de agentes; relatórios de desempenho |

### 2.2 Limites de Atuação do N1

| PODE fazer | NÃO PODE fazer |
|------------|----------------|
| Reset de senha (AD / sistemas internos) | Alterar regras de firewall / rede |
| Orientação sobre processos corporativos | Modificar código ou configuração de sistemas |
| Instalação remota de software autorizado | Acesso a base de dados de produção |
| Consulta a base de conhecimento | Diagnóstico de falhas em servidores/APIs |
| Abertura de chamado em nome do usuário | Executar scripts ou queries em produção |
| Resolução de problemas conhecidos (FAQ) | Tomar decisões que afetem múltiplos usuários sem aprovação |

### 2.3 Estrutura de Turnos

| Turno | Horário | Agentes (Chat) | Agentes (Tel.) | Supervisor |
|-------|---------|---------------|----------------|------------|
| Manhã | 07:00–13:00 | 4 | 3 | 1 |
| Tarde | 13:00–19:00 | 4 | 3 | 1 |
| Noturno | 19:00–07:00 | 2 (plantão) | 0 (chatbot redirect) | 0 (supervisor de plantão) |

---

## 3. Critérios de Classificação, Priorização e Escalonamento

### 3.1 Categorias de Chamado

| Categoria N1 | Subcategoria N2 | Exemplos |
|-------------|-----------------|----------|
| **Acesso e Senha** | Reset de senha, desbloqueio de conta, MFA | "Esqueci minha senha do e-mail" |
| **Sistema Corporativo** | ERP, RH, CRM, Intranet | "Sistema de notas fiscais não abre" |
| **Equipamento** | Notebook, impressora, periférico | "Mouse não funciona", "Impressora offline" |
| **Rede e Conectividade** | VPN, Wi-Fi, cabo de rede | "Não consigo conectar na VPN" |
| **E-mail e Colaboração** | Outlook, Teams, Slack, Zoom | "Não recebo e-mails desde ontem" |
| **Processo / Dúvida** | Regra de negócio, política interna | "Qual o prazo para solicitar férias?" |
| **Solicitação** | Acesso a sistema, compra de equipamento | "Preciso de acesso ao sistema X" |

### 3.2 Matriz de Prioridade

| Urgência \ Impacto | Alto (bloqueante / muitos usuários) | Médio (trabalho parcial / individual) | Baixo (cosmético / sem prazo) |
|--------------------|-------------------------------------|---------------------------------------|-------------------------------|
| **Alta** (impede trabalho agora) | **Crítica** — SLA 2h | **Alta** — SLA 4h | **Média** — SLA 8h |
| **Média** (impede trabalho parcial) | **Alta** — SLA 4h | **Média** — SLA 12h | **Baixa** — SLA 24h |
| **Baixa** (dúvida / solicitação) | **Média** — SLA 8h | **Baixa** — SLA 24h | **Baixa** — SLA 48h |

### 3.3 Regras de SLA

| Prioridade | Tempo de 1ª resposta (N1) | Tempo de resolução (N1) | Tempo de resolução (N2+) |
|------------|---------------------------|------------------------|--------------------------|
| Crítica | 30 min | 2h | 4h |
| Alta | 1h | 4h | 8h |
| Média | 2h | 8h | 24h |
| Baixa | 4h | 24h | 48h |

### 3.4 Critérios de Escalonamento para N2/N3

| Gatilho | Para N2 (Suporte Técnico) | Para N3 (Engineering) |
|---------|--------------------------|-----------------------|
| Tempo de resolução N1 excedido | ✅ | ❌ |
| Problema não documentado na base | ✅ | ❌ |
| Falha em servidor / infraestrutura | ❌ | ✅ |
| Bug confirmado em sistema corporativo | ❌ | ✅ |
| Incidente de segurança | ✅ (contém) | ✅ (imediatamente) |
| Chamado crítico sem solução em 30 min | ✅ | ❌ |
| Necessidade de alteração em código | ❌ | ✅ |
| Problema recorrente (>5 chamados/mês) | ✅ (investigar) | ✅ (corrigir causa raiz) |
| Usuário solicita supervisor (escalação hierárquica) | Supervisor N1 assume | ❌ |

---

## 4. Integração com Automação e Base de Conhecimento

### 4.1 Chatbot com RAG (Triagem Automatizada)

```
Usuário envia pergunta
        │
        ▼
  ┌─────────────────────────────────────┐
  │ 1. Embedding da pergunta            │
  │ 2. Similarity search na base de     │
  │    conhecimento (vector DB)         │
  │ 3. LLM gera resposta contextualizada│
  └────────────────┬────────────────────┘
                   │
         ┌─────────┴──────────┐
         ▼                    ▼
  ┌────────────────┐  ┌──────────────────────┐
  │ Confiança ≥ 60%│  │ Confiança < 60%      │
  │ Responde direto│  │ Gera resumo para N1  │
  │ + oferece      │  │ + sugere artigo      │
  │ artigo da base │  │ + abre chamado       │
  └────────────────┘  │ automaticamente      │
                       └──────────────────────┘
```

**Regras:**
- Opera 24/7 — fora do horário comercial, captura e abre chamado para N1 no próximo turno
- Respostas com confiança ≥ 60% são enviadas diretamente ao usuário
- Usuário pode optar por "Falar com um atendente" a qualquer momento
- Chatbot registra o histórico da conversa no chamado (evita retrabalho)

### 4.2 Base de Conhecimento

| Aspecto | Especificação |
|---------|---------------|
| Conteúdo | Artigos categorizados por sistema, processo e erro |
| Formato | Markdown com frontmatter (tags, categoria, palavra-chave) |
| Versionamento | Git-based (artigos em repositório, revisão via PR) |
| Busca | Vector search (embeddings via LLM) + full-text search (Elasticsearch) |
| Ciclo de vida | Draft → Review → Published → Archived |
| Responsável | Knowledge Manager (líder N1 ou analista de processos) |
| Atualização | Nova solução no N1 → agente propõe artigo → supervisor aprova |

### 4.3 Integração com Sistema de Tickets

| Funcionalidade | Como funciona |
|----------------|---------------|
| Abertura automática | Chatbot (confiança < 60%) ou e-mail (mail-to-ticket) |
| Categoria + prioridade | Sugeridas por ML (histórico de chamados anteriores) |
| Sugestão de solução | Na tela do agente: "Chamados similares encerrados: ..." |
| Histórico do usuário | Exibe chamados anteriores, satisfação, perfil |
| SLA tracking | Automático por prioridade, alertas de violação iminente |
| Fechamento | Solução documentada obrigatoriamente (campo de texto + categoria de resolução) |

---

## 5. Indicadores de Desempenho e Métricas de Qualidade

### 5.1 KPIs do N1

| Métrica | Fórmula | Alvo | Frequência |
|---------|---------|------|------------|
| **TMR — Tempo Médio de Resposta** | Σ(tempo até 1ª resposta) / total chamados | Chat: ≤ 2 min / Tel.: ≤ 30s / E-mail: ≤ 2h | Diário |
| **TMA — Tempo Médio de Atendimento** | Σ(tempo de atendimento) / chamados resolvidos | ≤ 12 min | Semanal |
| **FCR — Resolução no Primeiro Contato** | Chamados resolvidos no 1º contato / total chamados N1 | ≥ 70% | Semanal |
| **Taxa de Resolução no N1** | Chamados resolvidos N1 / total chamados recebidos | ≥ 65% | Mensal |
| **CSAT — Satisfação do Usuário** | Média das notas (1–5) nas pesquisas pós-atendimento | ≥ 4.2 | Mensal |
| **Taxa de Reabertura** | Chamados reabertos em ≤ 72h / chamados resolvidos | ≤ 5% | Semanal |
| **SLA Cumprido** | Chamados respondidos dentro do SLA / total chamados | ≥ 95% | Diário |
| **Abandono de Fila (Chat)** | Chamados de chat abandonados / total iniciados | ≤ 10% | Diário |

### 5.2 Gatilhos de Alerta

| Condição | Ação |
|----------|------|
| Fila N1 > 10 chamados aguardando > 5 min | Notificar supervisor N1 |
| SLA Crítico violado | Notificar supervisor + gerente de TI |
| CSAT < 3.0 no dia | Auditoria dos chamados do dia |
| Abandono de chat > 15% | Aumentar agentes de chat no turno |
| Taxa de resolução N1 < 50% na semana | Revisão de base + treinamento da equipe |

### 5.3 Ciclo de Melhoria Contínua

```
Dados (chamados) → Análise (padrões) → Ação (treinamento/base) → Medição (KPIs) → Dados
```

| Frequência | Atividade | Responsável |
|------------|-----------|-------------|
| **Diária** | Reunião rápida (15 min) — revisão de chamados críticos do dia anterior | Supervisor N1 + equipe |
| **Semanal** | Análise de tendências: top 5 categorias, reincidências, CSAT baixo | Supervisor N1 |
| **Quinzenal** | Revisão e publicação de novos artigos na base de conhecimento | Knowledge Manager |
| **Mensal** | Relatório de desempenho N1 + proposta de ações corretivas | Gerente de Service Desk |
| **Trimestral** | Auditoria de base de conhecimento + atualização de FAQs | Knowledge Manager + N2 |

---

## 6. Tratamento de Erros e Falhas (Contrato de Serviço)

| Cenário | Procedimento | SLA |
|---------|-------------|-----|
| Chatbot não entende pergunta | Redireciona para N1 com resumo da tentativa | Imediato |
| Agente N1 não sabe resolver | Escalona para N2 com diagnóstico documentado | ≤ 10 min |
| Chamado escalonado incorretamente | N2 devolve para N1 com orientação (feedback loop) | ≤ 1h |
| Sistema de tickets fora do ar | Planilha de contingência + registro manual + recuperação posterior | ≤ 30 min para ativar contingência |
| Pico de demanda (>2x média) | Supervisor ativa agentes extras + chatbot assume prioridades baixas | ≤ 15 min |
| Usuário insatisfeito (CSAT < 3) | Supervisor reabre chamado + contato proativo com usuário | ≤ 24h |
| Falha na base de conhecimento | Chatbot opera sem RAG (apenas fallback textual) + agentes usam documentação offline | ≤ 1h para restaurar |
