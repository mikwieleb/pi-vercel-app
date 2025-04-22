export const makePiPayment = async () => {
  // Vérification si le SDK Pi est chargé
  if (typeof window.Pi === 'undefined') {
    alert('Pi SDK non chargé.');
    console.error('Pi SDK non chargé.');
    return;
  }

  console.log('Pi SDK chargé, initialisation en cours...');
  
  // Initialisation du SDK Pi
  window.Pi.init({
    version: "2.0", // version actuelle du SDK
    sandbox: true   // Mode Testnet activé
  });

  console.log('SDK Pi initialisé avec succès.');

  try {
    // Tentative de création du paiement
    console.log('Tentative de création du paiement...');
    const payment = await window.Pi.createPayment({
      amount: 0.001,               // Montant du paiement
      memo: "Paiement test Pi",    // Message attaché au paiement
      metadata: { type: "test-payment" } // Métadonnées
    });

    console.log('Objet de paiement créé:', payment);

    // Vérifier si l’identifiant de paiement est bien retourné
    if (!payment.identifier) {
      alert('Erreur : Payment identifier non trouvé.');
      console.error('Erreur : Payment identifier non trouvé.');
      return;
    }

    // Vérification du paiement côté serveur (backend)
    console.log('Envoi de la requête de vérification...');
    const res = await fetch('/api/verify-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentId: payment.identifier })
    });

    const result = await res.json();
    if (res.ok) {
      alert('Paiement validé !');
      console.log('Paiement validé:', result);
    } else {
      alert('Erreur : ' + result.error || 'Erreur inconnue');
      console.error('Erreur pendant la vérification du paiement:', result.error);
    }

  } catch (error) {
    // Capture des erreurs
    console.error('Erreur pendant le paiement:', error);
    alert('Erreur pendant le paiement.');
  }
};
