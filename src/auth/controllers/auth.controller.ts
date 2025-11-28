import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { LoginDto } from '../dto/auth.dto';
import { Public } from '../decorators/public.decorator';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Public()
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Req() req: Request & { user: any }) {
        return this.authService.login(req.user);
    }
}
