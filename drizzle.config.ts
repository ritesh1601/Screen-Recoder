import {config} from "dotenv"
import {defineConfig} from "drizzle-kit";
import * as process from "node:process";

config({path:'./.env'})

export default defineConfig({
    schema:'./drizzle/schema.ts',
    out:'./drizzle/migrations',
    dialect:'postgresql',
    dbCredentials:{
        url:process.env.DATABASE_URL_POSTGRES!,
    }
})