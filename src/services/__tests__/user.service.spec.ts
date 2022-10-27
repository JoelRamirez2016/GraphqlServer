import { addUser, deleteUser, getUser, getUsers, login, updateUser } from "../user.service";

describe("Test User Service", () => {     
    const userCreateParams = {
        name: "test u",
        email: "test",
        username: "test",
        password: "test"
    }

    test("Test user create", () => {        
        return addUser(userCreateParams)
            .then((u) => {
                expect(u.name).toEqual(userCreateParams.name)
                return getUser(u.id)
            })
            .then((u) => {
                expect(u?.name).toEqual(userCreateParams.name)
                expect(getUsers()).resolves.toContain(u)
            });
    }, 30000);
    test("Test user update", () => {        
        const name1 = "test u1";
        const name2 = "test u2";

        return addUser({... userCreateParams, name: name1})
            .then((u) => updateUser({ ...u, name: name2 }))
            .then((u) => expect(u?.name).toEqual(name2));
    }, 30000);
    test("Test user delete", () => {
        return addUser(userCreateParams)
            .then((u) => deleteUser(u.id))
            .then((u) => expect(u?.name).toEqual(userCreateParams.name));
    }, 30000);
    test("Test user update fail", () => {        
        const name1 = "test u1";
        const name2 = "test u2";

        return addUser({... userCreateParams, name: name1})
            .then((u) => updateUser({ ...u, name: name2, id: ""}))
            .then((u) => expect(u).toBeNull());
    }, 30000);
    test("Test user delete fail", () => {                
        return expect(deleteUser("")).resolves.toBeNull();
    }, 30000);
    test("user login", () => {
        return addUser(userCreateParams)
            .then(({password, username}) => 
                expect(login({password, username}))
                .resolves.toHaveProperty("value"))        
    }, 30000);
    test("user login with fail", () => {
        return expect(login({password:"", username:"test"}))
            .resolves.toBeNull();
    }, 30000);
})