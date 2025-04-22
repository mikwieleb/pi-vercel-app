export const makePiPayment = async () => {
  if (typeof window.Pi === 'undefined') {
    alert('Pi SDK non chargé.');
    return;
  }

  // Initialisation du SDK Pi
  console.log("window.Pi SDK:", window.Pi);
  window.Pi.init({
    version: "2.0",
    sandbox: true // Toujours activer le mode Testnet
  });

  try {
    // Création du paiement
    const payment = await window.Pi.createPayment({
      amount: 0.001,
      memo: "Paiement test Pi",
      metadata: { type: "test-payment" }
    });

    if (!payment.identifier) {
      alert('Erreur : Payment identifier non trouvé.');
      return;
    }

    // Vérification du paiement côté backend
    const res = await fetch('/api/verify-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentId: payment.identifier })
    });

    const result = await res.json();
    if (res.ok) {
      alert('Paiement validé !');
    } else {
      alert('Erreur : ' + result.error || 'Erreur inconnue');
    }

  } catch (error) {
    console.error(error);
    alert('Erreur pendant le paiement.');
  }
};
