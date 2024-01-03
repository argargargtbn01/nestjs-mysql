import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as admin from 'firebase-admin';
@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  extractTokenFromHeader(request: Request): string {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (type !== 'Bearer') {
      throw new UnauthorizedException('Invalid ID token');
    }
    return token;
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    // const idToken: string = this.extractTokenFromHeader(request);

    // hard fix idToken becasuse dont have client yet
    const idToken =
      'eyJhbGciOiJSUzI1NiIsImtpZCI6IjUyNmM2YTg0YWMwNjcwMDVjZTM0Y2VmZjliM2EyZTA4ZTBkZDliY2MiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoicXVhbmciLCJyb2xlIjoiYWRtaW4iLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdGVzdC1kZmE4ZSIsImF1ZCI6InRlc3QtZGZhOGUiLCJhdXRoX3RpbWUiOjE3MDQyNzE3MDUsInVzZXJfaWQiOiJlRVNNczA3b092U2o5a2d1YVNjczJTb1RnYkczIiwic3ViIjoiZUVTTXMwN29PdlNqOWtndWFTY3MyU29UZ2JHMyIsImlhdCI6MTcwNDI3MTcwNSwiZXhwIjoxNzA0Mjc1MzA1LCJlbWFpbCI6ImFyZ2FyZ2FyZ3RibjAyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhcmdhcmdhcmd0Ym4wMkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.m7OjfoXdHD3BTVtCCTRfoaUxwTyASB0AWcXjlPvajXLAcGzfhTuDQvmzy3KmRvndo20mvRZIApdmjsK_phX0B9_duKaNsKsiN9VYeC-1FSyVDQRqP-e_E1sYLrpp8juYJGOWYORnF_SooMynaoWtBeoZUJfMYMFX4FIlEM26QMjx3gcmoBWA7v2_FgR3w0hyjp7h70bIEtGpqruGJxNAp4YTgWlxGfTQvOqTWOEG-Cg70V9m617I-kjCcmAXIS40_LDLoNSHIyglpHeYKtnW_phLLdZkh0mxqcmGiol9VGxtGGDFY-1PSY8gFK0B7BVIrHIqjQD_VIC-w1rTndHOeQ';
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    if (!decodedToken) {
      throw new UnauthorizedException('Invalid ID token');
    }

    request['user'] = decodedToken; // Save user in4 into request object
    return true;
  }
}
