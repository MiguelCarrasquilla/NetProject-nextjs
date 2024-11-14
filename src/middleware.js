import { NextResponse } from 'next/server';
import Cookies from 'js-cookie';

export function middleware(req) {
    // Obtenemos el token de Cookies
    const token = Cookies.get('token')

    // if (!token) {
    //     return NextResponse.redirect(new URL('/login', req.url));
    // }

    // // Si el token está presente, dejamos continuar con la solicitud
    // return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/profile', '/ferias'],  // Protege las rutas que quieres
};
