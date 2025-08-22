// Le taux dechanges!!
const exchangeRates = {
   EUR: 1,
   USD: 1.10,
   GBP: 0.86,
   XOF: 650,  // FCFA
   CNY: 7.85
};

const currencySymbols = {
   EUR: '€',
   USD: '$',
   GBP: '£',
   XOF: 'CFA',
   CNY: '¥'
};

function convertToEUR(amount, fromCurrency) {
   return amount / exchangeRates[fromCurrency];
}

function convertFromEUR(amount, toCurrency) {
   return amount * exchangeRates[toCurrency];
}

function formatNumber(num, precision = 2) {
   return new Intl.NumberFormat('fr-FR', {
       minimumFractionDigits: precision,
       maximumFractionDigits: precision
   }).format(num);
}

function convertCurrency() {
   const amount = parseFloat(document.getElementById('amount').value);
   const fromCurrency = document.getElementById('fromCurrency').value;
   const toCurrency = document.getElementById('toCurrency').value;
   const precision = parseInt(document.getElementById('precision').value) || 2;
   
   if (!amount || amount <= 0) {
       alert('Veuillez entrer un montant valide');
       return;
   }
   
   // Conversion via EUR comme base
   const eurAmount = convertToEUR(amount, fromCurrency);
   const result = convertFromEUR(eurAmount, toCurrency);
   
   // Calcul du taux de change direct
   const directRate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
   
   // Afficher le résultat
   document.getElementById('result').style.display = 'block';
   document.getElementById('resultAmount').textContent = 
       `${formatNumber(result, precision)} ${currencySymbols[toCurrency]}`;
   
   // Mise à jour des détails
   document.getElementById('rateDisplay').textContent = 
       `Taux ${fromCurrency}=${toCurrency} : ${formatNumber(directRate, 6)}`;
   document.getElementById('calculDisplay').textContent = 
       `Calculs: ${formatNumber(amount, precision)}×${formatNumber(directRate, 3)}=${formatNumber(result, 0)}`;
}

function swapCurrencies() {
   const fromSelect = document.getElementById('fromCurrency');
   const toSelect = document.getElementById('toCurrency');
   
   const temp = fromSelect.value;
   fromSelect.value = toSelect.value;
   toSelect.value = temp;
   
   // Reconvertir automatiquement si il y a un montant
   const amount = document.getElementById('amount').value;
   if (amount && amount > 0) {
       convertCurrency();
   }
}

function copyResult() {
    const result = document.getElementById('resultAmount').textContent;
    
    if (!result || result === '655 957,00 CFA') {
        return alert('Aucun résultat à copier');
    }
    
    navigator.clipboard.writeText(result)
        .then(() => {
            const btn = document.querySelector('.btn-secondary');
            const original = btn.textContent;
            btn.textContent = 'ok';
            setTimeout(() => btn.textContent = original, 1000);
        })
        .catch(() => alert('Impossible de copier automatiquement'));
}

// Conversion automatique lors de la saisie
document.addEventListener('DOMContentLoaded', function() {
   const amountInput = document.getElementById('amount');
   const precisionInput = document.getElementById('precision');
   const fromSelect = document.getElementById('fromCurrency');
   const toSelect = document.getElementById('toCurrency');
   
   // Conversion en temps réel
   function autoConvert() {
       const amount = amountInput.value;
       if (amount && amount > 0) {
           convertCurrency();
       }
   }
   
   amountInput.addEventListener('input', autoConvert);
   precisionInput.addEventListener('input', autoConvert);
   fromSelect.addEventListener('change', autoConvert);
   toSelect.addEventListener('change', autoConvert);
   
   // Focus sur le champ montant au chargement
   amountInput.focus();
   
   // Conversion initiale avec les valeurs par défaut
   amountInput.value = '1000';
   convertCurrency();
});



