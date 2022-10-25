import { delay, lastValueFrom, of } from 'rxjs';
import { v4 } from 'uuid';
import { Client, ClientCreateParams, ClientUpdateParams } from '../models/client';

const clients: Client[] = [];

export const getClients = () : Promise<Client[]> =>  
    lastValueFrom(of( clients ).pipe(delay(3000)))
;

export const getClient = (id: string) : Promise<Client | undefined> =>  
    lastValueFrom(of( clients.find((u) => u.id === id))
        .pipe(delay(3000)))
;
 
export const addClient = (args: ClientCreateParams) : Promise<Client> =>  {    
    const u: Client = {... args, id: v4(), createAt: new Date()}
    clients.push(u);
    return lastValueFrom(of( u ).pipe(delay(3000)))
};

export const updateClient = (client: ClientUpdateParams) : Promise<Client | null> =>  {        
    const i = clients.findIndex((u) => u.id === client.id);

    if (i < 0){
        return lastValueFrom(of( null ).pipe(delay(3000)));
    }
    clients[i] = { ... clients[i], ... client};
    
    return lastValueFrom(of( clients[i] ).pipe(delay(3000)))
};

export const deleteClient = (id: string) : Promise<Client | null> =>  {    
    const i = clients.findIndex((u) => u.id === id)
    
    if(i < 0) {
        return lastValueFrom(of( null ).pipe(delay(3000)));
    }
    const clientDeleted = clients[i];
    clients.splice(i, 1);
    return lastValueFrom(of( clientDeleted ).pipe(delay(3000)))    
};