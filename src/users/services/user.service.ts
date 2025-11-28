import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
    constructor(@InjectRepository(User)
    private userRepository: Repository<User>) { }

    async create(createUserDto: CreateUserDto) {
        const { username, password, passwordConfirmation } = createUserDto;

        if (password !== passwordConfirmation) {
            throw new BadRequestException('Passwords do not match');
        }

        const validateUser = await this.findOne(username);

        if (validateUser) {
            throw new ConflictException(`User ${username} already exists`);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });
        return this.userRepository.save(user);
    }



    async findOne(username: string) {
        return this.userRepository.findOneBy({ username });
    }


}
