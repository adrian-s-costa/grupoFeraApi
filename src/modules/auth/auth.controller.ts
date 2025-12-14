import AdminService from './services/admin/admin.service';
import UserService from './services/user/user.service';
import { Request, Response } from 'express';

class Controller {
  public async loginAdm(req: Request, res: Response) {
    const result = await AdminService.loginAdm(req.body);
    res.status(200).json(result);
  }

  public async forgotPasswordAdm(req: Request, res: Response) {
    const result = await AdminService.forgotPasswordAdm(req.body);
    res.status(200).json(result);
  }

  public async resetPasswordAdm(req: Request, res: Response) {
    const result = await AdminService.resetPasswordAdm(req.body);
    res.status(200).json(result);
  }


  public async loginUser(req: Request, res: Response) {
    const result = await UserService.loginUser(req.body);
    res.status(200).json(result);
  }

  public async loginUserGoogleAlt(req: Request, res: Response) {
    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID || "298281998851-srot2ljcl61gn4bnsja7g1850dr05v9g.apps.googleusercontent.com",
      redirect_uri: 'https://grupoferaapi.shop/auth/google/callback',
      response_type: 'code',
      scope: 'profile email',
      access_type: 'offline',
      prompt: 'consent',
    });

    res.redirect(
      'https://accounts.google.com/o/oauth2/v2/auth?' + params.toString()
    );
  }

  public async loginUserGoogleNative(req: Request, res: Response) {
    try {
        const { code } = req.body;

        // IMPORTANTE: Para o fluxo iOS, a troca de token é direta.
        // Muitas vezes não precisa de client_secret se o Client ID for do tipo iOS/Android Nativo.
        // Mas se precisar, use as credenciais correspondentes.

        const params = {
            code,
            client_id: "298281998851-8h5l7o8iin0ffndfl6th3afvtlekgics.apps.googleusercontent.com", // ID IOS
            redirect_uri: "com.googleusercontent.apps.298281998851-8h5l7o8iin0ffndfl6th3afvtlekgics:/oauth2callback", // URI IOS
            grant_type: "authorization_code"
        };
        
        // Se o Google reclamar de falta de secret, você terá que criar um Client ID Web para fazer a troca,
        // mas geralmente fluxo nativo aceita troca direta ou validação de id_token.

        const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(params).toString(),
        }).then(r => r.json());

        // Usa sua lógica existente para achar/criar o usuário
        const result = await UserService.loginUserGoogleAlt(tokenResponse.id_token);

        // Retorna JSON puro (sem HTML)
        return res.json(result);

    } catch (error) {
        return res.status(400).json({ error: "Falha no login nativo" });
    }
  }

  public async loginUserGoogleCallback(req: Request, res: Response) {

    function toStringParam(val: unknown): string {
      if (typeof val === "string") return val;
      if (Array.isArray(val)) return val[0] ? toStringParam(val[0]) : "";
      return "";
    }

    const code = toStringParam(req.query.code);

    const params: Record<string, string> = {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID || "298281998851-srot2ljcl61gn4bnsja7g1850dr05v9g.apps.googleusercontent.com",
      client_secret: process.env.GOOGLE_CLIENT_SECRET || "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",
      redirect_uri: "https://grupoferaapi.shop/auth/google/callback",
      grant_type: "authorization_code",
    };

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(params).toString(),
    }).then(r => r.json());

      const result = await UserService.loginUserGoogleAlt(tokenResponse.id_token);
      const encoded = encodeURIComponent(JSON.stringify(result.account))

      res.setHeader("Content-Type", "text/html");
      res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Finalizando login</title>
        </head>
        <body>
          <script>
            window.location.href = "eppi://auth/callback?data=${encoded}";
          </script>

          <p>Finalizando login…</p>
        </body>
      </html>
      `);
  }

  public async loginUserGoogle(req: Request, res: Response) {
    const result = await UserService.loginUserGoogle(req);
    res.status(200).json(result);
  }

  public async forgotPasswordUser(req: Request, res: Response) {
    const result = await UserService.forgotPasswordUser(req.body);
    res.status(200).json(result);
  }

  public async forgotPasswordGoogle(req: Request, res: Response) {
    const result = await UserService.forgotPasswordUserGoogle(req.body);
    res.status(200).json(result);
  }

  public async checkCode(req: Request, res: Response) {
    await UserService.checkCode(req.body);
    res.sendStatus(200)
  }

  public async resetPasswordUser(req: Request, res: Response) {
    const result = await UserService.resetPasswordUser(req.body);
    res.status(200).json(result);
  }

  public async updateUserData(req: Request, res: Response) {
    const result = await UserService.updateUserData(req.body);
    res.status(200).json(result);
  }

  public async deleteUser(req: Request, res: Response){
    const result = await UserService.deleteUser(req.body.credential, req.body.initials)
    res.status(200).json(result);
  }

  public async getUser(req: Request, res: Response){
    const result = await UserService.getUser(req.params.email)
    res.status(200).json(result);
  }

  public async getDocument(req: Request, res: Response){
    const result = await UserService.getDocument(req.params.email)
    res.status(200).json({ initials: result?.initials });
  }

  public async getSmartlink(req: Request, res: Response){
    const result = await UserService.getSmartlink(req.params.initials)
    res.status(200).json(result);
  }
}

export default new Controller();
