import { delay, lastValueFrom, of } from 'rxjs';
import { v4 } from 'uuid';
import { User, UserCreateParams, UserUpdateParams, UserToken } from './model';
import jwt from 'jsonwebtoken';
import config from '../../../config/config';

const users: User[] = [];

export const getUsers = () : Promise<User[]> =>  
    lastValueFrom(of( users ).pipe(delay(3000)))
;

export const getUser = (id: string) : Promise<User | undefined> =>  
    lastValueFrom(of( users.find((u) => u.id === id))
        .pipe(delay(3000)))
;

export const addUser = (user: UserCreateParams) : Promise<User> =>  {    
    const u: User = {... user, id: v4(), createAt: new Date()};
    users.push(u);
    return lastValueFrom(of(u)
        .pipe(delay(3000)))
};

export const updateUser = (user: UserUpdateParams) : Promise<User | null> => {    
    const i = users.findIndex((u) => u.id === user.id);

    if (i < 0){
        return lastValueFrom(of( null ).pipe(delay(3000)));
    }
    users[i] = { ...users[i], ...user };
    
    return lastValueFrom(of( users[i] ).pipe(delay(3000)))
};

export const deleteUser = (id: string) : Promise<User | null> =>  {    
    const i = users.findIndex((u) => u.id === id)
    
    if (i < 0) {
        return lastValueFrom(of( null ).pipe(delay(3000)));
    }
    const clientDeleted = users[i];
    users.splice(i, 1);

    return lastValueFrom(of( clientDeleted ).pipe(delay(3000)))    
};

export const login = (userToken: UserToken) => {
    const user = users.find((u) => u.username === userToken.username);

    if (!user) {
        return null;        
    }
    return lastValueFrom(of({
        value: jwt.sign(user, config.JWT_SECERT)
    }).pipe(delay(4000)));
}