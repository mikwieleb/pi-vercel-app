import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send({ error: 'Méthode non autorisée' });

  const { paymentId } = req.body;

  try {
    const response = await axios.get(`https://api.minepi.com/v2/payments/${paymentId}`, {
      headers: {
        Authorization: `Key ${process.env.PI_API_SECRET}`
      }
    });

    const payment = response.data;
    if (payment.status === 'COMPLETED') {
      return res.status(200).json({ message: 'Paiement validé avec succès' });
    } else {
      return res.status(400).json({ error: 'Paiement non complété' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Erreur serveur', details: err.message });
  }
}
