import path from "path";
import * as dotenv from 'dotenv'

dotenv.config({ path: path.resolve(__dirname, "../config/.env") })

interface Config {
    JWT_SECERT: string;
    PORT: number;
}

const getConfig = () => {
    return {
        JWT_SECERT: process.env.JWT_SECERT,
        PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    };
};

const getSanitzedConfig = (config: any): Config => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }
    return config as Config;
};

export default getSanitzedConfig(getConfig());