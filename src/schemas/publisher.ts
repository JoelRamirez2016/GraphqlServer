import { RedisPubSub } from 'graphql-redis-subscriptions';

export const pubsub = new RedisPubSub();

export const PUB_KEYS = {
    USER_CONSULTED: "userConsulted"
};

const validateKeys = (key:string): string => {    
    if (Object.values(PUB_KEYS).indexOf(key) === -1) {
        throw new Error("PUB_KEY NOT FOUND");
    }
    return key
}

export const register = (key:string) => pubsub.asyncIterator(
    validateKeys(key)
);
export const pub = (key:string, promise: Promise<any>) => promise.then((val) =>
    pubsub.publish(validateKeys(key), val
));    