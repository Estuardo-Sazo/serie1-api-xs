import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../../users/services/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }


    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne(username);
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = {
            username: user.username,
            uuid: user.uuid,
            sub: user.id,
            role: user.role
        };
        return {
            access_token: this.jwtService.sign(payload),
            expires_in: 3600,
            user: {
                uuid: user.uuid,
                name: user.name,
                username: user.username,
                role: user.role,
            },
        };
    }


    async register(user: any) {
        return this.userService.create(user);
    }


}
