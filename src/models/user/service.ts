import { delay, lastValueFrom, of } from 'rxjs';
import { User } from './model';

let users: User[]  = [
    {
        id: "qwerty",
        username: "joe",        
        createAt: new Date()

    },
    {
        id: "asdfg",
        username: "manu",  
        createAt: new Date()
     
    }
];

export const getUsers = () : Promise<User[]> =>  
    lastValueFrom(of( users ).pipe(delay(3000)))
;

export const getUser = (id: string) : Promise<User | undefined> =>  
    lastValueFrom(of( users.find((u) => u.id === id))
        .pipe(delay(3000)))
;
 
export const addUser = (user: User) : Promise<User> =>  {    
    users.push(user);
    return lastValueFrom(of( user ).pipe(delay(3000)))
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