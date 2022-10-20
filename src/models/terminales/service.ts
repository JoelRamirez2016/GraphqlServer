import { delay, lastValueFrom, of } from 'rxjs';
import { v4 } from 'uuid';
import { Terminal, TerminalCreateParams, TerminalUpdateParams } from './model';

const terminales: Terminal[] = [];

export const getTerminales = () : Promise<Terminal[]> =>  
    lastValueFrom(of( terminales ).pipe(delay(3000)))
;

export const getTerminal = (id: string) : Promise<Terminal | undefined> =>  
    lastValueFrom(of( terminales.find((t) => t.id === id))
        .pipe(delay(3000)))
;

export const getTerminalesByClient = (clientId: string) : Promise<Terminal[]> =>  
    lastValueFrom(of(terminales.filter((t) => t.client.id === clientId))
        .pipe(delay(3000)))
;

export const addTerminal = (args: TerminalCreateParams) : Promise<Terminal> =>  {    
    const t: Terminal = {... args, id: v4(), createAt: new Date()};
    terminales.push(t);
    return lastValueFrom(of(t)
        .pipe(delay(3000)))
};

export const updateTerminal = (terminal: TerminalUpdateParams) : Promise<Terminal | null> => {    
    const i = terminales.findIndex((u) => u.id === terminal.id);

    if (i < 0){
        return lastValueFrom(of( null ).pipe(delay(3000)));
    }
    terminales[i] = { ...terminales[i], ...terminal };
    
    return lastValueFrom(of( terminales[i] ).pipe(delay(3000)))
};

export const deleteTerminal = (id: string) : Promise<Terminal | null> =>  {    
    const i = terminales.findIndex((t) => t.id === id)
    
    if (i < 0) {
        return lastValueFrom(of( null ).pipe(delay(3000)));
    }
    const clientDeleted = terminales[i];
    terminales.splice(i, 1);

    return lastValueFrom(of( clientDeleted ).pipe(delay(3000)))    
};