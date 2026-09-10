import { GerenciadorNotificacao } from "../abstract/GerenciadorNotificacao";
import { Notificacao } from "../interface/Notificacao";
import { NotificacaoPush } from "./NotificacaoPush";

export class GerenciadorPush extends GerenciadorNotificacao {
  criarNotificacao(): Notificacao {
    return new NotificacaoPush();
  }
}