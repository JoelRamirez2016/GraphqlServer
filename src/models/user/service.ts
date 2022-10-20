import { delay, lastValueFrom, of } from 'rxjs';
import { v4 } from 'uuid';
import { User, UserParams } from './model';
import { default as data } from '../../../src/data.json';

const users: User[] = data;

export const getUsers = () : Promise<User[]> =>  
    lastValueFrom(of( users ).pipe(delay(3000)))
;

export const getUser = (id: string) : Promise<User | undefined> =>  
    lastValueFrom(of( users.find((u) => u.id === id))
        .pipe(delay(3000)))
;
 
export const addUser = (args: UserParams) : Promise<User> =>  {    
    const u: User = {... args, id: v4(), createAt: new Date()}
    users.push(u);
    return lastValueFrom(of( u ).pipe(delay(3000)))
};

export const updateUser = (user: User) : Promise<User | null> =>  {        
    const i = users.findIndex((u) => u.id === user.id);

    if (i < 0){
        return lastValueFrom(of( null ).pipe(delay(3000)));
    }
    users[i] = user;
    
    return lastValueFrom(of( users[i] ).pipe(delay(3000)))
};

export const deleteUser = (id: string) : Promise<User | null> =>  {    
    const i = users.findIndex((u) => u.id === id)
    
    if(i < 0) {
        return lastValueFrom(of( null ).pipe(delay(3000)));
    }
    const userDeleted = users[i];
    users.splice(i, 1);
    return lastValueFrom(of( userDeleted ).pipe(delay(3000)))    
};