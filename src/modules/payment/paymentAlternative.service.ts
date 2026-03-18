import type { Request, Response } from "express";
import Repository from "./payment.repository"

type CreatePreapprovalBody = {
  amount: number;
  planName?: string;
  formData?: any;
  cupom?: string;
  id?: string;
  deviceId?: string;
};

export class MercadoPagoController {
  private readonly baseUrl = "https://api.mercadopago.com";

  private headersOther(deviceId: string) {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      "X-Device-Id": deviceId,
    };
  }

  private get headers() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
    };
  }

  public async createPreapproval(req: Request, res: Response) {
    const {
      amount,
      planName,
      formData,
      cupom,
      id,
      deviceId
    } = req.body as CreatePreapprovalBody;

    console.log("createPreapproval called with:", req.body);

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        message: "Valor inválido para assinatura",
      });
    }

    if (!formData?.payer?.email) {
      return res.status(400).json({
        message: "E-mail do pagador é obrigatório",
      });
    }

    if (!formData?.token) {
      return res.status(400).json({
        message: "card_token_id é obrigatório",
      });
    }

    const encodedData = this.encodeObject({
      cupom,
      id
    });

    try {
      const mpResponse = await fetch(`${this.baseUrl}/preapproval`, {
        method: "POST",
        headers: this.headersOther(deviceId!),
        body: JSON.stringify({
          reason: planName || "Assinatura",
          payer_email: formData.payer.email,
          card_token_id: formData.token,
          external_reference: encodedData,
          auto_recurring: {
            frequency: 1,
            frequency_type: "months",
            transaction_amount: Number(amount),
            currency_id: "BRL",
          },
          status: "authorized",
          back_url: "https://eppi.store/welcome",
        }),
      });

      const result = await mpResponse.json();

      console.log(result);

      if (!mpResponse.ok) {
        return res.status(mpResponse.status).json({
          message: "Erro ao criar assinatura no Mercado Pago",
          details: result,
        });
      }

      // Salve no seu banco:
      // subscriptionId: result.id
      // status: result.status
      // externalReference
      // payerEmail
      // amount

      Repository.updateOne(
        id!,
        {
          lastPaymentStatus: 'waiting_payment',
          lastPaymentId: '',
        }
      );

      return res.status(201).json({
        message: "Assinatura criada com sucesso",
        subscriptionId: result.id,
        status: result.status,
        payerEmail: result.payer_email,
        externalReference: result.external_reference,
        raw: result,
      });
    } catch (error) {
      console.error("createPreapproval error:", error);

      return res.status(500).json({
        message: "Erro interno ao criar assinatura",
      });
    }
  }

  public async handleWebhook(req: Request, res: Response) {
    try {
      // Responda rápido ao Mercado Pago
      const body = req.body;

      const topic =
        body?.type ||
        body?.topic ||
        body?.action;

      const resourceId =
        body?.data?.id ||
        body?.id;

      if (!resourceId) {
        return res.status(200).json({ received: true, ignored: true });
      }

      // Para assinaturas sem plano associado, acompanhe subscription_preapproval
      // e consulte a assinatura para obter o status atualizado.
      const mpResponse = await fetch(`${this.baseUrl}/preapproval/${resourceId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      });

      const subscription = await mpResponse.json();

      if (!mpResponse.ok) {
        console.error("Erro ao consultar preapproval:", subscription);

        return res.status(200).json({
          received: true,
          synced: false,
        });
      }

      const normalizedStatus = this.normalizeSubscriptionStatus(subscription.status);

      // Atualize no seu banco usando subscription.id
      // Exemplo:
      // await subscriptionRepository.updateByMpId(subscription.id, {
      //   status: normalizedStatus,
      //   mpStatus: subscription.status,
      //   payerEmail: subscription.payer_email,
      //   externalReference: subscription.external_reference,
      //   nextPaymentDate: subscription.next_payment_date,
      //   lastWebhookPayload: body,
      // });

      return res.status(200).json({
        received: true,
        synced: true,
        topic,
        subscriptionId: subscription.id,
        status: subscription.status,
        normalizedStatus,
        externalReference: subscription.external_reference,
      });
    } catch (error) {
      console.error("handleWebhook error:", error);

      // Em webhook, prefira evitar 500 desnecessário se você já recebeu o evento
      return res.status(200).json({
        received: true,
        synced: false,
      });
    }
  }

  public async getPreapproval(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "ID da assinatura é obrigatório",
      });
    }

    try {
      const mpResponse = await fetch(`${this.baseUrl}/preapproval/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      });

      const result = await mpResponse.json();

      if (!mpResponse.ok) {
        return res.status(mpResponse.status).json(result);
      }

      return res.status(200).json({
        subscriptionId: result.id,
        status: result.status,
        externalReference: result.external_reference,
        payerEmail: result.payer_email,
        nextPaymentDate: result.next_payment_date,
        raw: result,
      });
    } catch (error) {
      console.error("getPreapproval error:", error);

      return res.status(500).json({
        message: "Erro ao consultar assinatura",
      });
    }
  }

  public async updatePreapprovalCard(req: Request, res: Response) {
    const { id } = req.params;
    const { token } = req.body as { token?: string };

    if (!id) {
      return res.status(400).json({
        message: "ID da assinatura é obrigatório",
      });
    }

    if (!token) {
      return res.status(400).json({
        message: "Novo card_token_id é obrigatório",
      });
    }

    try {
      const mpResponse = await fetch(`${this.baseUrl}/preapproval/${id}`, {
        method: "PUT",
        headers: this.headers,
        body: JSON.stringify({
          card_token_id: token,
        }),
      });

      const result = await mpResponse.json();

      if (!mpResponse.ok) {
        return res.status(mpResponse.status).json({
          message: "Erro ao atualizar cartão da assinatura",
          details: result,
        });
      }

      return res.status(200).json({
        message: "Cartão da assinatura atualizado com sucesso",
        subscriptionId: result.id,
        status: result.status,
        raw: result,
      });
    } catch (error) {
      console.error("updatePreapprovalCard error:", error);

      return res.status(500).json({
        message: "Erro interno ao atualizar cartão da assinatura",
      });
    }
  }

  private normalizeSubscriptionStatus(status?: string) {
    switch (status) {
      case "authorized":
        return "active";
      case "paused":
        return "paused";
      case "cancelled":
        return "cancelled";
      case "pending":
        return "pending";
      default:
        return "unknown";
    }
  }

  private encodeObject(data: unknown): string {
    const json = JSON.stringify(data);
    return Buffer.from(json).toString("base64");
  }

  private decodeObject<T = unknown>(encoded: string): T {
    const json = Buffer.from(encoded, "base64").toString("utf8");
    return JSON.parse(json) as T;
  }
}