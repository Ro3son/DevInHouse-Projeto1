const adicionaLista = () => {

  const button = document.querySelector('#buttonAdd');
  button.addEventListener('click', () => {

    const inputItem = document.getElementById('inputAdd');
    // localStorage //
    let armazena = localStorage.itens += JSON.stringify({ 'Item': inputItem.value });

    let input, label, button;

    const li = document.createElement('li');
    li.id = "listItem";

    li.append(...[
      input = document.createElement('input'),
      label = document.createElement('label'),
      button = document.createElement('button')
    ]);

    input.setAttribute('type', 'checkbox');
    input.setAttribute('name', 'checklist');
    input.id = 'checked';

    label.textContent = (`${inputItem.value}`);
    label.setAttribute('for', 'checked');

    button.id = 'btn-xmark';
    button.innerHTML = `<i class='fa-solid fa-rectangle-xmark'></i>`;

    document.querySelector('ul').append(li);
    document.querySelector('ul').style.backgroundColor = '#2b2a33';

    document.querySelectorAll('#confirm-form').forEach((form) => { form.remove() });
    // Funções sendo chamadas //
    riscaLabel();
    deletaLista();
    checkList();
    confirmaValor();
    limpaInput();
  });
};
adicionaLista();

const limpaInput = () => {
  const inputItem = document.getElementById('inputAdd').value = '';
  const inputNumber = document.getElementById('inputHidden').value = '';
};

const riscaLabel = () => {

  const inputs = document.querySelectorAll('#checked');

  for (let input of inputs) {
    input.addEventListener('click', riscaLabel);
    function riscaLabel() {
      let risca = (this.checked) ?
        this.nextElementSibling.style.textDecoration = 'line-through' :
        this.nextElementSibling.style.textDecoration = 'none';
    };
  };
};

const deletaLista = () => {

  const buttons = document.querySelectorAll('#btn-xmark');

  for (let btn of buttons) {
    btn.addEventListener('click', remove);
    function remove() {
      this.parentElement.remove();  // remove <li> da função adicionaLista() //
    };
  };
};

const checkList = () => {

  const inputs = document.querySelectorAll('#checked');

  for (let input of inputs) {
    input.addEventListener('click', checked);
    function checked() {
      let check = (this.checked) ?
        document.querySelector('.container-value-div').style.display = 'block' :
        document.querySelector('.container-value-div').style.display = 'none';

      input.addEventListener('change', function () {
        const span = document.createElement('span');
        span.id = 'confirm-span';
        span.setAttribute('style', 'color: #d9eee1');
        span.textContent = (`${this.nextElementSibling.innerText}`); // label //

        document.querySelectorAll('#confirm-span').forEach((span) => { span.remove() }); // Limpa saída span //
        document.querySelector('#h3').append(span);
      });

      input.addEventListener('change', function () {
        let visibleSpan = (this.checked) ?
          document.querySelector('#confirm-span').style.visibility = 'visible' :
          document.querySelector('#confirm-span').style.visibility = 'hidden';
      });
    };
  };
};

const confirmaValor = () => {

  let input, button;

  const form = document.createElement('form');
  form.append(...[
    input = document.createElement('input'),
    button = document.createElement('button')]);

  form.id = 'confirm-form';

  input.id = 'inputHidden';
  input.setAttribute('type', 'number');
  input.setAttribute('placeholder', 'Digite o valor');

  button.id = 'btnHidden';
  button.textContent = 'Confirmar';
  button.setAttribute('type', 'button');

  document.querySelector('.container-value-div').append(form);
  document.querySelector('.container-value-div').style.backgroundColor = '#2b2a33';

  const btnConfirmar = document.querySelector('#btnHidden');
  btnConfirmar.addEventListener('click', function () {

    const inputNumber = document.getElementById('inputHidden');

    let span;

    const p = document.createElement('p');
    p.id = 'paragraph';
    p.setAttribute('style', 'color: #44ce7b');
    p.textContent = `${h3.firstElementChild.innerText} R$ `;

    p.append(...[
      span = document.createElement('span')
    ])

    span.id = 'span-valor';
    span.textContent = `${parseFloat(inputNumber.value).toFixed(2)}`;

    document.querySelector('.paragraph').appendChild(p);
    document.querySelector('.descValor').style.backgroundColor = '#2b2a33';

    const button = document.createElement('button');
    button.id = 'buttonTotal';
    button.textContent = 'Fechar Pedido';
    document.querySelectorAll('#buttonTotal').forEach(button => { button.remove() });
    document.querySelector('.btnTotal').appendChild(button);

    limpaInput(); // Limpa saída  //
    valorTotal();
  });
};

const valorTotal = () => {

  const button = document.querySelector('#buttonTotal');

  button.addEventListener('click', function soma() {
    let soma = 0;
    const spans = document.querySelectorAll('#span-valor');
    spans.forEach((span, sum) => {
      sum = parseFloat(span.textContent);
      if (!isNaN(sum)) {
        soma += sum;
      };
    });
    const p = document.createElement('p');
    p.id = 'paragraphValorTotal';
    p.textContent = `Valor Total: ${parseFloat(soma).toFixed(2)}`;
    p.setAttribute('style', 'color: #ff6347');

    document.querySelectorAll('#paragraphValorTotal').forEach(p => { p.remove() });
    document.querySelector('.btnTotal').appendChild(p);
    document.querySelector('#buttonTotal').remove();
  });
};
