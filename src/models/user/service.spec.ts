import { addUser, deleteUser, getUser, getUsers, updateUser } from "./service";

describe("Test User Service", () => {     
    test("Test user create", () => {        
        const username = "test u";
        return addUser({username})
            .then((u) => {
                expect(u.username).toEqual(username)
                return getUser(u.id)
            })
            .then((u) => {
                expect(u?.username).toEqual(username)
                expect(getUsers()).resolves.toContain(u)
            });
    }, 30000);
    test("Test user update", () => {        
        const username1 = "test u1";
        const username2 = "test u2";

        return addUser({username: username1})
            .then((u) => updateUser({ ...u, username: username2 }))
            .then((u) => expect(u?.username).toEqual(username2));
    }, 30000);
    test("Test user delete", () => {
        const username = "test u";
        return addUser({username})
            .then((u) => deleteUser(u.id))
            .then((u) => expect(u?.username).toEqual(username));
    }, 30000);
    test("Test user update fail", () => {        
        const username1 = "test u1";
        const username2 = "test u2";

        return addUser({username: username1})
            .then((u) => updateUser({ ...u, username: username2, id: ""}))
            .then((u) => expect(u).toBeNull());
    }, 30000);
    test("Test user delete fail", () => {                
        return expect(deleteUser("")).resolves.toBeNull();
    }, 30000);
})