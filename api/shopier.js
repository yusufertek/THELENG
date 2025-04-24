import crypto from 'crypto';

export default async function handler(req, res) {
  // Shopier API bilgileri
  const apiKey = "d8d221e6656717cdb1fc9f88703a0f0f";
  const apiSecret = "6ef68c8972f1fb3c8beafa5e3653d8ad";

  // POST ile gelen veriler
  const { product_names, total_amount } = req.body;

  // Sipariş ID'si oluştur
  const order_id = Math.floor(Math.random() * 900000 + 100000);
  const email = "ali@example.com";

  // İmza oluşturma
  const signatureData = apiKey + order_id + total_amount + email;
  const signature = crypto.createHmac('sha256', apiSecret)
    .update(signatureData)
    .digest('base64');

  // Shopier ödeme formu
  const form = `
    <form method="POST" action="https://www.shopier.com/ShowProduct/api_pay4.php" id="paymentForm">
      <input type="hidden" name="API_key" value="${apiKey}" />
      <input type="hidden" name="platform_order_id" value="${order_id}" />
      <input type="hidden" name="product_name" value="${product_names}" />
      <input type="hidden" name="buyer_name" value="Ali" />
      <input type="hidden" name="buyer_surname" value="Kaya" />
      <input type="hidden" name="email" value="${email}" />
      <input type="hidden" name="buyer_phone" value="05000000000" />
      <input type="hidden" name="billing_address" value="Adres" />
      <input type="hidden" name="billing_city" value="İstanbul" />
      <input type="hidden" name="billing_country" value="Türkiye" />
      <input type="hidden" name="total_order_value" value="${total_amount}" />
      <input type="hidden" name="currency" value="TL" />
      <input type="hidden" name="signature" value="${signature}" />
    </form>
    <script>document.getElementById('paymentForm').submit();</script>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(form);
}
