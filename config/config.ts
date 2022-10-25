import path from "path";
import * as dotenv from 'dotenv'

dotenv.config({ path: path.resolve(__dirname, "../config/.env") })

interface Config {
    JWT_SECRET: string;
    PORT: number;
}

const getConfig = () => {
    return {
        JWT_SECRET: process.env.JWT_SECRET,
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