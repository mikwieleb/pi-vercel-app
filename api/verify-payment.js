// api/verify-payment.js
const { PI_API_SECRET } = process.env;

export default async (req, res) => {
  if (req.method === 'POST') {
    const { paymentId } = req.body;

    if (!paymentId) {
      return res.status(400).json({ error: 'paymentId manquant' });
    }

    try {
      // Vérification du paiement avec l'API Pi
      const response = await fetch(`https://api.minepi.com/payment/${paymentId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${PI_API_SECRET}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.success) {
        return res.status(200).json({ success: true, message: 'Paiement validé' });
      } else {
        return res.status(400).json({ error: 'Paiement échoué' });
      }

    } catch (error) {
      return res.status(500).json({ error: 'Erreur de communication avec l\'API Pi' });
    }
  } else {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }
};
