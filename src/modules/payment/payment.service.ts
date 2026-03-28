import { MercadoPagoConfig, Payment, PreApproval, PreApprovalPlan, Preference } from 'mercadopago';
import Repository from "./payment.repository"
import DataSource from '@database/data-source';


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
                    lastPaymentStatus: data.status,
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

    public async createPreapproval(req: any, res: any) {
        //const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });
        //const preapproval = new PreApproval(client);
        
        const { amount, planName, payer, token } = req.body;

        if (!amount || Number(amount) <= 0) {
            return res.json(
                { message: "Valor inválido para assinatura" },
                { status: 400 }
            );
        }

        try {
            const mpResponse = await fetch("https://api.mercadopago.com/preapproval", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
                },
                body: JSON.stringify({
                    reason: "Plano Premium",
                    payer_email: payer?.email,
                    card_token_id: token,
                    auto_recurring: {
                        frequency: 1,
                        frequency_type: "months",
                        transaction_amount: Number(amount),
                        currency_id: "BRL",
                    },
                    status: "authorized",
                    external_reference: payer?.email,
                }),
            });

            const result = await mpResponse.json();

            if (!mpResponse.ok) {
                return res.status(mpResponse.status).json(result);
            }

            return res.json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Erro interno ao criar assinatura",
            });
        }

    }

    public async updateUserWithApprovalInfo(req: any) {   
        console.log(req);
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

            const decodedData = this.decodeObject(data.external_reference);

            Repository.updateOne(
                decodedData.id,
                {
                    lastPaymentStatus: data.status,
                    lastPaymentId: data.id.toString()
                }
            )

            // Se houver cupom no pagamento, registrar o uso
            if (decodedData.cupom) {
                const coupon = await this.getCouponByName(decodedData.cupom);
                if (coupon) {
                    await DataSource.couponUsage.create({
                        data: {
                            cupomId: coupon.id,
                            data: new Date()
                        }
                    });
                }
            }
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    }

    public async getCouponByName(couponName: string) {
        return await DataSource.coupon.findFirst({
            where: {
                value: couponName
            }
        });
    }

    public decodeObject<T = any>(encoded: string): T {
        const json = Buffer.from(encoded, "base64").toString("utf8");
        return JSON.parse(json) as T;
    }

}



export default new Service();