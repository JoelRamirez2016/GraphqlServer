import { addUser, deleteUser, getUser, getUsers, login, updateUser } from "../../services/user.service"; 
import { resolvers } from "../user";

jest.mock("../../services/user.service")

describe("Test User Rosolvers", () => {     
    const Query = resolvers.Query;
    const Mutation = resolvers.Mutation;
    const Subscription = resolvers.Subscription;

    test("test queries", () => {  
        (getUsers as jest.Mock).mockResolvedValue(new Promise(() => []));
        (getUser as jest.Mock).mockResolvedValue(new Promise(() => {}));

        expect(Query.users()).resolves.toBe([]);           
        expect(Query.userCount()).resolves.toBe(0);           

        Query.user({}, { id:"" });        
        Query.me({},{},{});
        expect(getUsers).toHaveBeenCalledTimes(2);
        expect(getUser).toHaveBeenCalledTimes(1);        

    })
    test("test mutations", () => {      
        Mutation.addUser({},{});
        Mutation.updateUser({},{});
        Mutation.deleteUser({},{});
        Mutation.login({},{});

        expect(addUser).toHaveBeenCalledTimes(1);
        expect(updateUser).toHaveBeenCalledTimes(1);
        expect(deleteUser).toHaveBeenCalledTimes(1);
        expect(login).toHaveBeenCalledTimes(1);
    });
    test("test subscription", () => {      
        Subscription.userConsulted.subscribe();
    });

})