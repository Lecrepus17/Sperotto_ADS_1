import { GerenciadorNotificacao } from "../abstract/GerenciadorNotificacao";
import { Notificacao } from "../interface/Notificacao";
import { NotificacaoEmail } from "./NotificacaoEmail";

export class GerenciadorEmail extends GerenciadorNotificacao {
  criarNotificacao(): Notificacao {
    return new NotificacaoEmail();
  }
}
