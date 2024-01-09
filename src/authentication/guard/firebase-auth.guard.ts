import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as admin from 'firebase-admin';
import { UserService } from 'src/user/user.service';
@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private userService: UserService) {}
  extractTokenFromHeader(request: Request): string {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (type !== 'Bearer') {
      throw new UnauthorizedException('Invalid ID token');
    }
    return token;
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const idToken: string = this.extractTokenFromHeader(request);

    // hard fix idToken becasuse dont have client yet
    // const idToken =
    // 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjUyNmM2YTg0YWMwNjcwMDVjZTM0Y2VmZjliM2EyZTA4ZTBkZDliY2MiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoicXVhbmciLCJyb2xlIjoiYWRtaW4iLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdGVzdC1kZmE4ZSIsImF1ZCI6InRlc3QtZGZhOGUiLCJhdXRoX3RpbWUiOjE3MDQ0MzgyMTAsInVzZXJfaWQiOiJlRVNNczA3b092U2o5a2d1YVNjczJTb1RnYkczIiwic3ViIjoiZUVTTXMwN29PdlNqOWtndWFTY3MyU29UZ2JHMyIsImlhdCI6MTcwNDQzODIxMCwiZXhwIjoxNzA0NDQxODEwLCJlbWFpbCI6ImFyZ2FyZ2FyZ3RibjAyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhcmdhcmdhcmd0Ym4wMkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.mB-vkprz-TDhRvs7_5tujARC-6zATQ1DobbVNpWMIXcwKVasKXkdEa2XOHtsYc7X4Jc_hw-JyYFXqGZpaUeO49ZGlb2oG3-J5WN30XjCQU5tYd6c1f-4fp6V_XuwZxA9jsf_3qrJdWfYeR-0gonbWHQwfhhfFmJAIbPc4dcAzOkDprqZexvYhHAOJC8_-Dl9SbNPdTuevXN2GzBQ6D6znpoasRrhNCnC1X_rAGU6NB4y4w8h3hw3C4YdNnNe-05iEUPsCQx_href26i-Lap5TFFufnZK9NcrySlaCZ8OXabh8HjWcNlqJFNyLBsZxFOgH5gQqzdSqMOJdAmBECqB6w';
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    if (!decodedToken) {
      throw new UnauthorizedException('Invalid ID token');
    }
    const user = await this.userService.create({
      uid: decodedToken.uid,
      email: decodedToken.email,
    }); // create user if not exist
    request['user'] = user;
    return true;
  }
}
