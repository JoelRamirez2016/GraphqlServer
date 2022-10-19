import { delay, lastValueFrom, of } from 'rxjs';
import { Terminal } from './model';

let terminales: Terminal[]  = [
    {
        id: "qwertyqwerty",
        name: "terminal1",
        user: {
            id: "qwerty",
            username: "joe",
            createAt: new Date()
        },        
        createAt: new Date()
    },
    {
        id: "asdfgasdfg",
        name: "terminal2",
        user: {
            id: "asdfg",
            username: "manu",
            createAt: new Date()

        },
        createAt: new Date()
    }
];

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

export const addTerminal = (terminal: Terminal) : Promise<Terminal> =>  {    
    terminales.push(terminal);
    return lastValueFrom(of(terminal)
        .pipe(delay(3000)))
};

 
