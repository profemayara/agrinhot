let estadoHistoria = 0; // Controla qual parte da história estamos (0-8 para história, 9+ para quiz)
let textosHistoria = []; // Array para armazenar os textos de cada parte
let imagensHistoria = []; // Array para armazenar os objetos de imagem carregados
let musicaFundo;          // Variável para armazenar o objeto de áudio

// Texto da instrução "Pressione ENTER"
const instrucaoEnter = "(Pressione ENTER)";
const instrucaoRecomecar = "(Pressione ENTER para recomeçar)";

// --- Variáveis para o Quiz ---
let estadoQuiz = 0; // 0: Introdução do quiz, 1: Pergunta 1, 2: Pergunta 2, 3: Pergunta 3, 4: Resultado
let perguntasQuiz = []; // Armazena as perguntas
let alternativasQuiz = []; // Armazena as alternativas para cada pergunta
let respostasCorretasQuiz = []; // Armazena o índice da resposta correta para cada pergunta
let acertos = 0; // Contador de respostas corretas
let ultimaRespostaNumerica = -1; // Nova variável para guardar a última alternativa numérica digitada

function preload() {
  // --- Carregamento das Imagens ---
  imagensHistoria.push(loadImage('img0.png')); 
  imagensHistoria.push(loadImage('img1.png')); 
  imagensHistoria.push(loadImage('img2.png')); 
  imagensHistoria.push(loadImage('img3.png')); 
  imagensHistoria.push(loadImage('img4.png')); 
  imagensHistoria.push(loadImage('img5.png')); 
  imagensHistoria.push(loadImage('img6.png')); 
  imagensHistoria.push(loadImage('img7.png')); 
  imagensHistoria.push(loadImage('img8.png')); 

  // --- Carregamento da Música ---
  musicaFundo = loadSound('musica_fundo.mp3'); 
}

function setup() {
  createCanvas(800, 600); 
  textSize(24); 
  textAlign(LEFT, TOP); 
  
  // Populando o array com os textos revisados da história
  textosHistoria.push("Bem-vindo à história dos rios: Vamos entender um pouco mais sobre essa incrível conecção entre campo e cidade!"); 
  textosHistoria.push("No alto das montanhas, longe da agitação, pequenas gotas de chuva se juntam. Elas formam filetes que, pouco a pouco, dão vida a um riacho cristalino que desce suavemente.");
  textosHistoria.push("À medida que o riacho serpenteia pelo campo, ele encontra a terra fértil. Suas águas puras regam as plantações, saciam a sede dos animais e sustentam a vida rural, em harmonia com a natureza.");
  textosHistoria.push("Mas a jornada do rio continua. Ele se torna mais largo e forte, e suas margens começam a ver as primeiras construções. É o rio se aproximando da cidade, um elo vital entre o campo e o ambiente urbano.");
  textosHistoria.push("Na cidade, o rio se torna parte do cotidiano. Ele pode ser uma fonte de lazer, transporte ou até mesmo de água para as casas. No entanto, a vida urbana também traz grandes desafios...");
  textosHistoria.push("O crescimento da cidade pode trazer poluição. Lixo, esgoto e resíduos industriais, se não forem tratados, transformam as águas cristalinas em um leito de problemas, afetando toda a sua bacia.");
  textosHistoria.push("Isso prejudica os animais, as plantas e até mesmo a nós, que dependemos da água limpa.");
  textosHistoria.push("Para que o rio continue seu ciclo de vida, limpo e abundante, precisamos da colaboração de todos. No campo, com a agricultura consciente. Na cidade, com tratamento de esgoto e descarte correto de lixo.");
  textosHistoria.push("Nossas escolhas, no campo ou na cidade, afetam diretamente a saúde dos rios. Proteger um é cuidar do outro, garantindo a água para as futuras gerações.\n\nFim da história."); 

  // --- Populando as Perguntas, Alternativas e Respostas do Quiz ---
  perguntasQuiz.push("Vamos salvar os rios! Responda às perguntas para mostrar seu conhecimento:"); // Introdução ao quiz
  alternativasQuiz.push([]); // Sem alternativas para a introdução
  respostasCorretasQuiz.push(-1); // Sem resposta para a introdução

  perguntasQuiz.push("1. Qual é a principal fonte de água doce no planeta, usada por grande parte da população para consumo e agricultura?");
  alternativasQuiz.push(["1. Oceanos", "2. Geleiras e calotas polares", "3. Rios e lagos", "4. Lençóis freáticos"]);
  respostasCorretasQuiz.push(2); // Índice 2 (ou seja, 3ª alternativa: Rios e lagos)

  perguntasQuiz.push("2. Qual destas ações é considerada a MAIOR causadora de poluição nos rios das áreas urbanas?");
  alternativasQuiz.push(["1. Chuveiros com longa duração", "2. Descarte incorreto de lixo e esgoto doméstico", "3. Lavar o carro na rua", "4. Uso excessivo de copos descartáveis"]);
  respostasCorretasQuiz.push(1); // Índice 1 (ou seja, 2ª alternativa: Descarte incorreto de lixo e esgoto doméstico)

  perguntasQuiz.push("3. Além de fornecer água, qual outro benefício importante os rios oferecem para a vida selvagem e o equilíbrio ambiental?");
  alternativasQuiz.push(["1. Aumentam a umidade do ar apenas", "2. Servem como habitat para diversas espécies", "3. Criam barreiras naturais para o tráfego", "4. São apenas caminhos para o transporte de barcos"]);
  respostasCorretasQuiz.push(1); // Índice 1 (ou seja, 2ª alternativa: Servem como habitat para diversas espécies)

  // Início da Reprodução da Música
  if (musicaFundo.isLoaded()) {
    musicaFundo.loop(); 
    musicaFundo.setVolume(0.5); 
  } else {
    console.error("Erro ao carregar a música de fundo."); 
  }
}

function draw() {
  // Desenha a imagem de fundo
  if (estadoHistoria < textosHistoria.length) { // Se estiver na história, usa a imagem correspondente
    if (imagensHistoria[estadoHistoria]) {
      image(imagensHistoria[estadoHistoria], 0, 0, width, height); 
    } else {
      background(135, 206, 235); 
    }
  } else { // Se já está no quiz, usa sempre a img0.png como fundo
    if (imagensHistoria[0]) { // img0.png
      image(imagensHistoria[0], 0, 0, width, height); 
    } else {
      background(135, 206, 235);
    }
  }
  
  // --- Lógica para desenhar a História ou o Quiz ---
  if (estadoHistoria < textosHistoria.length) { // Se ainda estiver na história
    drawHistoria();
  } else { // Se já terminou a história, exibe o Quiz
    drawQuiz();
  }
}

// --- Funções separadas para desenhar História e Quiz ---

function drawHistoria() {
  let textMarginX = width * 0.1;  
  let textMarginY = height * 0.1; 
  let textStartX = textMarginX; 
  let textStartY = textMarginY; 
  let textContentWidth = width - (2 * textMarginX); 

  let currentTextHeight = textHeightForWidth(textosHistoria[estadoHistoria], textContentWidth);
  
  noStroke(); 
  fill(0, 0, 0, 150); 
  let backgroundPadding = 20; 
  rect(textStartX - backgroundPadding, 
       textStartY - backgroundPadding, 
       textContentWidth + (2 * backgroundPadding), 
       currentTextHeight + (2 * backgroundPadding)); 

  fill(255); 
  text(textosHistoria[estadoHistoria], textStartX, textStartY, textContentWidth); 

  // Desenha a instrução "Pressione ENTER" na parte inferior
  drawInstrucaoEnter();
}

function drawQuiz() {
  let textMarginX = width * 0.1;  
  let textMarginY = height * 0.1; 
  let textStartX = textMarginX; 
  let textStartY = textMarginY; 
  let textContentWidth = width - (2 * textMarginX); 

  // --- Texto do Quiz ---
  let currentQuizText = perguntasQuiz[estadoQuiz];
  if (estadoQuiz > 0 && estadoQuiz <= 3) { // Se for uma pergunta, adiciona as alternativas
    currentQuizText += "\n\n";
    for(let i = 0; i < alternativasQuiz[estadoQuiz].length; i++) {
      currentQuizText += alternativasQuiz[estadoQuiz][i] + "\n";
    }
    currentQuizText += "\nSua escolha: " + (ultimaRespostaNumerica !== -1 ? ultimaRespostaNumerica : "_"); // Mostra a escolha do usuário ou um cursor
    currentQuizText += "\n\nDigite o número da alternativa e pressione ENTER.";
  } else if (estadoQuiz === 4) { // Tela de Resultado
    currentQuizText = acertos === 3 ? "Muito bem! Você acertou todas! 🎉🌟💧" : "Para continuar tentando... 😢🌱♻️";
  }

  let currentTextHeight = textHeightForWidth(currentQuizText, textContentWidth);
  
  // Desenha o retângulo de fundo para o texto do quiz
  noStroke(); 
  fill(0, 0, 0, 150); 
  let backgroundPadding = 20; 
  rect(textStartX - backgroundPadding, 
       textStartY - backgroundPadding, 
       textContentWidth + (2 * backgroundPadding), 
       currentTextHeight + (2 * backgroundPadding)); 

  // Desenha o texto do quiz
  fill(255); 
  text(currentQuizText, textStartX, textStartY, textContentWidth); 

  // Desenha a instrução "Pressione ENTER" para o quiz
  drawInstrucaoEnter();
}

function drawInstrucaoEnter() {
  let instrucaoTextSize = 20; 
  textSize(instrucaoTextSize); 
  textAlign(CENTER, BOTTOM); 

  let instrucaoText;
  if (estadoHistoria < textosHistoria.length) { // Ainda na história
    instrucaoText = instrucaoEnter;
  } else { // Já no quiz
    instrucaoText = (estadoQuiz === 4) ? instrucaoRecomecar : instrucaoEnter; 
  }

  let instrucaoPaddingX = width * 0.05; 
  let instrucaoPaddingY = height * 0.03;
  let instrucaoRectWidth = textWidth(instrucaoText) + (2 * instrucaoPaddingX);
  let instrucaoRectHeight = instrucaoTextSize * 1.5; 

  let instrucaoRectX = (width / 2) - (instrucaoRectWidth / 2); 
  let instrucaoRectY = height - instrucaoRectHeight - instrucaoPaddingY; 

  noStroke();
  fill(0, 0, 0, 150); 
  rect(instrucaoRectX, instrucaoRectY, instrucaoRectWidth, instrucaoRectHeight);

  fill(255); 
  text(instrucaoText, width / 2, height - instrucaoPaddingY); 

  // Volta o tamanho e alinhamento do texto para o principal
  textSize(24);
  textAlign(LEFT, TOP);
}


function keyPressed() {
  // Se estivermos na história e não for a última parte, avança com ENTER
  if (estadoHistoria < textosHistoria.length - 1 && keyCode === ENTER) {
    estadoHistoria++; 
  } 
  // Se terminou a história e é ENTER, vai para o quiz
  else if (estadoHistoria === textosHistoria.length - 1 && keyCode === ENTER) {
    estadoHistoria++; // Mudar para o estado do quiz
    estadoQuiz = 0; // Reinicia o quiz
    acertos = 0; // Zera acertos
    ultimaRespostaNumerica = -1; // Limpa a última resposta
  } 
  // Se já está no quiz
  else if (estadoHistoria >= textosHistoria.length) { 
    if (estadoQuiz === 0 && keyCode === ENTER) { // Na introdução do quiz, avança para a primeira pergunta
      estadoQuiz++;
      ultimaRespostaNumerica = -1; // Reseta para a próxima pergunta
    } else if (estadoQuiz > 0 && estadoQuiz < 4) { // Se for uma pergunta (1, 2 ou 3)
      // Captura a resposta numérica se uma tecla numérica foi pressionada
      if (key >= '1' && key <= '4') { // Verifica se a tecla é um número entre 1 e 4
        ultimaRespostaNumerica = int(key); // Armazena o número digitado
      }
      
      // Se ENTER foi pressionado E uma resposta numérica válida foi registrada
      if (keyCode === ENTER && ultimaRespostaNumerica !== -1) {
        // Verifica se a resposta está correta (lembrando que os índices do array são 0-base)
        if (ultimaRespostaNumerica - 1 === respostasCorretasQuiz[estadoQuiz]) {
            acertos++;
        }
        estadoQuiz++; // Avança para a próxima pergunta ou para o resultado
        ultimaRespostaNumerica = -1; // Reseta para a próxima pergunta
      }
    } else if (estadoQuiz === 4 && keyCode === ENTER) { // Tela de resultado, recomeçar
      estadoHistoria = 0; // Volta para o início da história
      estadoQuiz = 0; // Reseta o quiz
      acertos = 0; // Zera acertos
      ultimaRespostaNumerica = -1; // Limpa a última resposta
    }
  }
}

// Função auxiliar para calcular a altura do texto com quebra de linha
function textHeightForWidth(str, w) {
  let h = 0;
  let words = str.split(' ');
  let currentLine = '';
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    let parts = word.split('\n');
    for (let j = 0; j < parts.length; j++) {
        let part = parts[j];
        if (j > 0) { 
            h += textAscent() + textDescent();
            currentLine = '';
        }
        let testLine = currentLine + part + ' ';
        if (textWidth(testLine) < w) {
            currentLine = testLine;
        } else {
            h += textAscent() + textDescent();
            currentLine = part + ' ';
        }
    }
  }
  if (currentLine.length > 0) { 
    h += textAscent() + textDescent();
  }
  return h;
}