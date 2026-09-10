import { GerenciadorNotificacao } from "../abstract/GerenciadorNotificacao";
import { Notificacao } from "../interface/Notificacao";
import { NotificacaoSMS } from "./NotificacaoSMS";

export class GerenciadorSMS extends GerenciadorNotificacao {
  criarNotificacao(): Notificacao {
    return new NotificacaoSMS();
  }
}
