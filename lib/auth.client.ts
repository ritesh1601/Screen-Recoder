import {createAuthClient} from "better-auth/react";
import * as process from "node:process";

export const authClient=createAuthClient({
    baseURL:process.env.NEXT_PUBLIC_BASE_URL!,
})
