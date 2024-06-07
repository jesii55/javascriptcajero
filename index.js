  var cuentas = [
    { nombre: "Mali", saldo: 200, password: "1234" },
    { nombre: "Gera", saldo: 290, password: "1234" },
    { nombre: "Maui", saldo: 67, password: "1234" }
  ];
  
  let selectedAccount = null;    //indicar que no hay ninguna cuenta seleccionada al principio
  // Al cargar el documento, configuramos los eventos y rellenamos las opciones de selección de cuenta
  document.addEventListener('DOMContentLoaded', () => {
      const accountSelect = document.getElementById('account-select');
      const passwordInput = document.getElementById('password');
      const accountSelection = document.getElementById('account-selection');
      const accountActions = document.getElementById('account-actions');
      const accountName = document.getElementById('account-name');
      const accountBalance = document.getElementById('account-balance');
      const actionForm = document.getElementById('action-form');
      const amountInput = document.getElementById('amount');
      const actionBtn = document.getElementById('action-btn');
      const saldoTexto = document.getElementById('saldo-texto'); // ----------------------

  
      // Rellenamos las opciones de selección de cuenta
      cuentas.forEach((cuenta, index) => {
          const option = document.createElement('option');
          option.value = index;
          option.textContent = cuenta.nombre;
          accountSelect.appendChild(option);
      });
  
      // Evento para seleccionar cuenta y autenticar con contraseña
      document.getElementById('select-account-btn').addEventListener('click', () => {
          const selectedIndex = accountSelect.value;
          const password = passwordInput.value;
          if (selectedIndex === "") {
              alert('Por favor, selecciona una cuenta.');
              return;
          }
          if (password !== cuentas[selectedIndex].password) {
              alert('Contraseña incorrecta. Inténtalo de nuevo.');
              return;
          }
          selectedAccount = cuentas[selectedIndex];
          accountSelection.style.display = 'none';
          accountActions.style.display = 'block';
          updateAccountInfo();
      });
  
      //       Evento para consultar saldo
      document.getElementById('consultar-saldo').addEventListener('click', () => {
        actionForm.style.display = "none" //-------------------------------------
      });

      // Evento para mostrar formulario de depósito
      document.getElementById('depositar-dinero').addEventListener('click', () => {
          actionForm.style.display = 'block';
          actionBtn.textContent = 'Depositar';
          actionBtn.onclick = depositarDinero;
      });
  
      // Evento para mostrar formulario de retiro
      document.getElementById('retirar-dinero').addEventListener('click', () => {
          actionForm.style.display = 'block';
          actionBtn.textContent = 'Retirar';
          actionBtn.onclick = retirarDinero;
      });
  
      // Evento para salir de la cuenta
      document.getElementById('logout-btn').addEventListener('click', () => {
          selectedAccount = null;
          accountSelection.style.display = 'block';
          accountActions.style.display = 'none';
          actionForm.style.display = 'none';
          saldoTexto.textContent = "";           // ---------------------------
          accountSelect.value = "";
          passwordInput.value = "";
          amountInput.value = "";
      });
  
      // Función para actualizar la información de la cuenta en la interfaz
      function updateAccountInfo() {
          accountName.textContent = selectedAccount.nombre;
          accountBalance.textContent = selectedAccount.saldo;
      }
  
      // Función para depositar dinero en la cuenta seleccionada
      function depositarDinero() {
          const amount = parseFloat(amountInput.value);
          if (isNaN(amount) || amount <= 0) {
              alert('Por favor, ingresa un monto válido.');
              return;
          }
          if (selectedAccount.saldo + amount > 990) {
              alert('No puedes tener más de $990 en tu cuenta.');
              return;
          }
          selectedAccount.saldo += amount;
          updateAccountInfo();
          alert(`Monto depositado: $${amount}\nNuevo saldo: $${selectedAccount.saldo}`);
          amountInput.value = "";
          actionForm.style.display = 'none';
      }
  
      // Función para retirar dinero de la cuenta seleccionada
      function retirarDinero() {
          const amount = parseFloat(amountInput.value);
          if (isNaN(amount) || amount <= 0) {
              alert('Por favor, ingresa un monto válido.');
              return;
          }
          if (selectedAccount.saldo - amount < 10) {
              alert('No puedes tener menos de $10 en tu cuenta.');
              return;
          }
          selectedAccount.saldo -= amount;
          updateAccountInfo();
          alert(`Monto retirado: $${amount}\nNuevo saldo: $${selectedAccount.saldo}`);
          amountInput.value = "";
          actionForm.style.display = 'none';
      }
  });
        //  Este código se asegura de que las operaciones de depósito y retiro cumplan con las reglas
        //  de negocio de no exceder un saldo máximo de $990 y no bajar de un saldo mínimo de $10. 