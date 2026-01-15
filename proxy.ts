export {auth as proxy} from "@/auth"

// export default function proxy(request: NextRequest) {
//   // Proxy logic

//   // Setting cookies on the response using the `ResponseCookies` API
//   const response = NextResponse.next();
//   if (!request.cookies.get("sessionCartId")) {
//     // Generate new session cart id cookie
//     const sessionCartId = crypto.randomUUID();
//     response.cookies.set({
//       name: "sessionCartId",
//       value: sessionCartId,
//       path: "/",
//     });
//   }

//   return response;
// }

// export const config = {
//   matcher: ["/", "/products/:path", "/cart", "/shipping-address"],
// };
