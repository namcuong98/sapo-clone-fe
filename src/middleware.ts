import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const privatePaths = ['/me']
const authPaths = ['/login', '/register']
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl
    const sessionToken = request.cookies.get('sessionToken')?.value
     // Dang nhap roi thi khong cho vao private paths nua
     if (privatePaths.some(path => pathname.startsWith(path)) && !sessionToken) {
      return NextResponse.redirect(new URL('/login',request.url))
    }
     // Dang nhap roi thi khong cho vao login/register nua
     if (authPaths.some(path => pathname.startsWith(path)) && sessionToken) {
      return NextResponse.redirect(new URL('/me',request.url))
    }
    return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher:  ['/me','/login', '/register'],
}