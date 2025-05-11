import {NextRequest , NextResponse} from "next/server";
import {auth} from "@/lib/auth"
import {headers} from "next/headers"


export async function middleware(request: NextRequest, response: NextResponse) {
    const session=await auth.api.getSession({
        headers:await headers()
    });

    if(!session){
        return NextResponse.redirect(new URL('/Sign-In',request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher:["/((?!api|_next/static|_next/image|favicon.ico|Sign-In|assets).*)"]
}
