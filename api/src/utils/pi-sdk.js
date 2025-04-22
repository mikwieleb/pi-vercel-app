export const makePiPayment = async () => {
  if (!window.Pi) {
    alert('Pi SDK non chargé.');
    return;
  }

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
