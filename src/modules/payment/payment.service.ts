import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';
import Repository from "./payment.repository"


class Service {
    public async createPayment(req: any) {     
        let client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

        const payment = new Payment(client);
        return await payment.create({ body: req.body })
    }

    public async createSub(sub: any) {
        return await Repository.createOne(sub)
    }

    public async getAllSub() {
        return await Repository.getAll()
    }

    public async updateUserWithPaymentInfo(req: any) {     
        const url = `https://api.mercadopago.com/v1/payments/${req.body.data.id}`;

      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN!}`
        }
      })
        .then(response => response.json())
        .then(async data => {
            Repository.updateOne(
                data.additional_info.payer.first_name,
                {
                    lastPaymentStaus: data.status,
                    lastPaymentId: data.id.toString()
                }
            )
        })
        .catch(error => {
          console.error('Erro:', error);
        });
    }

    public async createPreference(req: any) {     
        const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });
        const preference = new Preference(client);
        console.log(req)

        return await preference.create({
            body: {
                items: [
                    {
                        title: 'Grupo Fera Cursos',
                        quantity: 1,
                        unit_price: 1,
                        id: ''
                    }
                ],
                payer: {
                    name: req.userMail,
                    email: req.userMail,
                },
            }
        })
    }
}

export default new Service();