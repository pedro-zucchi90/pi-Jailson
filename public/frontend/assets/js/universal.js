const cursores = [
    'url("../assets/cursor/fullblast.png"), auto',
    'url("../assets/cursor/mediumblast.png"), auto',
    'url("../assets/cursor/smallblast.png"), auto'
  ];
  let indice = 0; 
  let intervalo;

//iniciar a animação do cursor
  function iniciarAnimacao(elemento) {
    intervalo = setInterval(() => {
      elemento.style.cursor = cursores[indice];
      indice = (indice + 1) % cursores.length;
    }, 200);
  }

//parar a animação do cursor
  function pararAnimacao(elemento) {
    clearInterval(intervalo);
    indice = 0; //reseta o índice do cursor
  }

//aplica a animação nos elementos selecionados
  document.querySelectorAll('.opcoes li, .saiba-mais, .logo, .footer li').forEach(elemento => {
    elemento.addEventListener('mouseenter', () => iniciarAnimacao(elemento));
    elemento.addEventListener('mouseleave', () => pararAnimacao(elemento));
  });


// -----------------botões com onClick-------------------

document.addEventListener('DOMContentLoaded', () => {
  // Botão de menu hambúrguer
  const hamburguer = document.querySelector('.hamburguer');
  const opcoes = document.querySelector('.opcoes');

  if (hamburguer && opcoes) {
    hamburguer.addEventListener('click', () => {
      opcoes.classList.toggle('active'); // Alterna a classe 'active'
      const expanded = hamburguer.getAttribute('aria-expanded') === 'true';
      hamburguer.setAttribute('aria-expanded', !expanded); // Atualiza o atributo ARIA
    });
  } else {
    console.error("Elemento '.hamburguer' ou '.opcoes' não encontrado.");
  }

  // Navegação entre páginas
  const navButtons = [
    { selector: '.botaoinicio', href: '/' },
    { selector: '.botaoplasma', href: '/plasma' },
    { selector: '.botaopropulsao', href: '/propulsao' },
    { selector: '.botaoaplicacoes', href: '/aplicacoes' }
  ];

  navButtons.forEach((button) => {
    const element = document.querySelector(button.selector);
    if (element) {
      element.addEventListener('click', () => {
        window.location.href = button.href;
      });
    } else {
      console.error(`Elemento '${button.selector}' não encontrado.`);
    }
  });
});


  

// ---------------------BD---------------

document.getElementById('emailForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;

  try {
      const response = await fetch('http://localhost:8081/save-email', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
      });

      if (response.ok) {
          alert('Email salvo com sucesso!');
          document.getElementById('email').value = '';
      } else {
          alert('Erro ao salvar email.');
      }
  } catch (error) {
      console.error('Erro:', error);
  }
});
