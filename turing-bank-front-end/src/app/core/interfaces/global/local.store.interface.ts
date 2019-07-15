import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export abstract class LocalStoreInterface {

    /**
     * Salva dados local
     * @param key 
     * @param data 
     */
    abstract create(key: string, data: any);

    /**
     * Obter dado local
     * @param key 
     */
    abstract get(key: string): any;

    /**
     * Remove dado local
     * @param key 
     */
    abstract remove(key: string);

    /**
     * Remove todos os dados local
     */
    abstract cleanAll();

}