import { Avatar } from "../entities/avatar.entity";

export class CreateUserDto {
    name: string;
    email: string;
    username?: string;
    password: string;
    avatar?: Avatar;
}
