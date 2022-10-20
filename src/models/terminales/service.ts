import { delay, lastValueFrom, of } from 'rxjs';
import { v4 } from 'uuid';
import { Terminal, TerminalParams } from './model';

const terminales: Terminal[] = [];

export const getTerminales = () : Promise<Terminal[]> =>  
    lastValueFrom(of( terminales ).pipe(delay(3000)))
;

export const getTerminal = (id: string) : Promise<Terminal | undefined> =>  
    lastValueFrom(of( terminales.find((t) => t.id === id))
        .pipe(delay(3000)))
;

export const getTerminalesByUser = (userId: string) : Promise<Terminal[]> =>  
    lastValueFrom(of(terminales.filter((t) => t.user.id === userId))
        .pipe(delay(3000)))
;

export const addTerminal = (args: TerminalParams) : Promise<Terminal> =>  {    
    const t: Terminal = {... args, id: v4(), createAt: new Date()};
    terminales.push(t);
    return lastValueFrom(of(t)
        .pipe(delay(3000)))
};

export const updateTerminal = (terminal: Terminal) : Promise<Terminal | null> =>  {    
    const i = terminales.findIndex((u) => u.id === terminal.id);

    if (i < 0){
        return lastValueFrom(of( null ).pipe(delay(3000)));
    }
    terminales[i] = terminal;
    
    return lastValueFrom(of( terminales[i] ).pipe(delay(3000)))
};

export const deleteTerminal = (id: string) : Promise<Terminal | null> =>  {    
    const i = terminales.findIndex((t) => t.id === id)
    
    if (i < 0) {
        return lastValueFrom(of( null ).pipe(delay(3000)));
    }
    const userDeleted = terminales[i];
    terminales.splice(i, 1);

    return lastValueFrom(of( userDeleted ).pipe(delay(3000)))    
};