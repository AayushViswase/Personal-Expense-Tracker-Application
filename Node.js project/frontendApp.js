const apiUrl = 'http://localhost:3000'; // Replace with your backend server URL

function submitForm() {
    console.log('Submit form function called');
  const form = document.getElementById('transactionForm');
  const formData = new FormData(form);

  fetch(`${apiUrl}/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Transaction created:', data);
    form.reset();
    fetchTransactions();
  })
  .catch(error => console.error('Error:', error));
}

function fetchTransactions() {
  fetch(`${apiUrl}/transactions`)
  .then(response => response.json())
  .then(transactions => {
    const transactionsBody = document.getElementById('transactionsBody');
    transactionsBody.innerHTML = '';

    transactions.forEach(transaction => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${transaction.type}</td>
        <td>${transaction.category}</td>
        <td>${transaction.amount}</td>
        <td>${new Date(transaction.date).toLocaleDateString()}</td>
        <td>${transaction.description}</td>
        <td>
          <button onclick="editTransaction('${transaction._id}')">Edit</button>
          <button onclick="deleteTransaction('${transaction._id}')">Delete</button>
        </td>
      `;
      transactionsBody.appendChild(row);
    });
  })
  .catch(error => console.error('Error:', error));
}

function editTransaction(transactionId) {
  console.log('Edit transaction with ID:', transactionId);
}

function deleteTransaction(transactionId) {
  fetch(`${apiUrl}/transactions/${transactionId}`, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(data => {
    console.log('Transaction deleted:', data);
    fetchTransactions();
  })
  .catch(error => console.error('Error:', error));
}

fetchTransactions();
