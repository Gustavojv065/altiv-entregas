# ALTIV Entregas — protótipo de conferência logística

Aplicativo independente para entregadores que **possuem autorização para acessar e exportar a lista de BRs de suas ATs**. Não é um aplicativo oficial da Shopee.

## Funcionalidades da Fase 1
- Importa BRs de AT por texto/CSV/TXT, conta pacotes únicos e alerta duplicidades.
- Confere QR / código de barras e impede contar a mesma BR mais de uma vez, inclusive entre ATs.
- Lista BRs ainda não bipadas, pacotes extras e divergências entre DOE-03 e DOE-04.
- Registra a proposta de mudança de rota por BR, rua (sem número) e bairro.
- Exporta relatórios CSV e PDF para apreciação do responsável pela roteirização.
- Guarda registros no dispositivo, sem servidor. Funciona offline após carregar os recursos.
- Leitura por câmera depende do suporte a `BarcodeDetector` do WebView; use entrada manual se não funcionar. Não afirmar leitura de QR genérico como se fosse BR: primeiro vincular o QR à BR.

## Como testar
1. Abra o app, importe uma AT de DOE-04 e cole uma lista de BRs às quais tem acesso autorizado.
2. Em **Bipar pacotes**, selecione a AT e leia ou digite uma BR.
3. Bipe novamente a mesma BR: a segunda tentativa deve ser marcada como duplicada, sem aumentar a contagem.
4. Registre uma correção da rota DOE-04 para DOE-03 com rua e bairro sem dados pessoais.
5. Exporte CSV/PDF no menu **Relatórios**. Confira os códigos com o responsável.

**Importante:** a correção registrada é somente uma **solicitação local**; não altera a atribuição no sistema da Shopee nem garante ajuste das próximas ATs. Um pacote não bipado significa não conferido, não necessariamente perdido. As regras por rua devem ser revisadas manualmente, pois uma mesma rua pode cruzar rotas.

## Desenvolvimento e validação
Requer Node 22+. Não precisa de chave de API nem de serviços pagos.

```bash
npm install
npm test
npm run build
```

Para visualizar no navegador: `python3 -m http.server 8080`. A primeira versão está em um único `index.html`, sem dependências externas na interface, para reduzir riscos de tela preta e facilitar o funcionamento offline.

## APK de teste pelo GitHub Actions
O workflow `.github/workflows/android-debug.yml` é executado no PR e em pushes de branches `feat/**` / `fix/**`:
1. Instala Node 22, Java 21 e Android SDK.
2. Executa testes e prepara `www/`.
3. Executa `npx cap add android`, sincroniza os recursos e compila `assembleDebug`.
4. Se a compilação passar, publica o artefato **ALTIV-Entregas-APK-debug**, contendo `ALTIV-Entregas-debug.apk`.

Abra **Actions > Build Android APK (teste) > execução > Artifacts**. Um artefato só existe depois de uma execução bem-sucedida. Não faz merge nem publica na Play Store.

## Segurança
- Não compartilhar nomes, telefones, CPFs ou endereços completos de destinatários nos relatórios.
- QR sem BR explícita exige associação manual, nunca inferência não verificada.
- Dados gravados no armazenamento local do Android/browser não são sincronizados nem criptografados nesta versão.
- Para uso multiusuário será necessário autenticação, controle de acesso e regras de isolamento por operação.
- Não acessa nem modifica APIs ou sistemas oficiais da Shopee.

## Próximos PRs
- Leitor nativo ML Kit/ZXing com testes em QR/BR reais e deduplicação pela mesma identidade.
- Reconhecimento OCR das etiquetas e sugestões de rota condicionadas à validação.
- Melhorias de backup, auditoria de aprovação e sincronização opcional autorizada.
