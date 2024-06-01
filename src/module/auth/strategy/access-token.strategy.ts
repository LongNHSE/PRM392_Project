import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import express from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { BlackListTokenService } from 'src/module/black-list-token/black-list-token.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private config: ConfigService,
    private blackListTokenService: BlackListTokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: express.Request, payload: any) {
    const token =
      ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken()])(
        req,
      ) || ''; // Extract the JWT from request
    // Check if token is blacklisted before returning user data
    const isBlacklisted =
      await this.blackListTokenService.isTokenBlacklisted(token);
    if (isBlacklisted) {
      throw new UnauthorizedException('This token has been blacklisted'); // Handle blacklisted token appropriately
    }
    return { userId: payload.userId, refreshToken: payload.refreshToken };
  }
}
