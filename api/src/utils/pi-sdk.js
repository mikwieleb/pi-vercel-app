export const makePiPayment = async () => {
  if (!window.Pi) {
    alert('Pi SDK non chargé.');
    return;
  }

  // Initialisation obligatoire du SDK
  window.Pi.init({
    version: "2.0", // ou "1.0" si c’est une ancienne version
    sandbox: true   // important pour le testnet !
  });

  try {
    const payment = await window.Pi.createPayment({
      amount: 0.001,
      memo: "Paiement test Pi",
      metadata: { type: "test-payment" }
    });

    const res = await fetch('/api/verify-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentId: payment.identifier })
    });

    const result = await res.json();
    if (res.ok) {
      alert('Paiement validé !');
    } else {
      alert('Erreur : ' + result.error);
    }

  } catch (error) {
    console.error(error);
    alert('Erreur pendant le paiement.');
  }
};
