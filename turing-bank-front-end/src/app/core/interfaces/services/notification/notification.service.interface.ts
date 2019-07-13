import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

/**
 * Notificar usuário
 */
export abstract class NotificationServiceInterface {
     /**
     * Lista de notificação
     * @param messages
     */
    abstract notify(messages: Array<any>);
  //  abstract dismiss(event: MouseEvent);
}
