import { MercadoPagoConfig, Payment, PreApproval, PreApprovalPlan, Preference } from 'mercadopago';
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
        const url = `https://api.mercadopago.com/v1/preapproval/${req.body.data.id}`;

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

    public async createPreapproval(req: any) {
        const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });
        const preapproval = new PreApproval(client);
        
        const { plan, amount, email, userId } = req.body;

        const number = `Nº ${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

        try {
            const res = await preapproval.create({
                
                body: {
                    reason: plan + " - " + number,
                    payer_email: email,
                    auto_recurring: {
                        frequency: 1,
                        frequency_type: "months",
                        transaction_amount: amount,
                        currency_id: "BRL"
                    },
                    external_reference: email,
                    back_url: "https://grupofera.com/curso-gratis",
                }
            })
            await this.updateUserWithApprovalInfo(res.id);

            return { link: res.init_point};

        } catch (error) {
            console.log(error);
        }
    }

    public async updateUserWithApprovalInfo(id: any) {     
        const url = `https://api.mercadopago.com/preapproval/${id}`;

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
                data.external_reference,
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

}



export default new Service();