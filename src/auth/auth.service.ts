import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SignInDto, SignUpDto } from "./dto";
import * as argon from "argon2"
import { Response } from "src/response";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt"
import { ConfigService } from "@nestjs/config";

@Injectable({})
export class AuthService {
    //to use prisma orm functions here, we will have to instantiate prisma service, we can do that via dependency injection. 

    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService) { }


    async login(dto: SignInDto) {
        try {
            const obj = dto;

            const user = await this.prisma.user.findUnique({ where: { email: obj.email } })

            if (!user) {
                return (new Response(false, "Invalid credentials!", {}))
            }

            const passwordMatch = await argon.verify(user.hash, obj.hash);

            if (!passwordMatch) return (new Response(false, "Invalid credentials", {}));

            delete user.hash;

            const access_token = await this.getToken(user.email, user.id);
            return (new Response(true, "", { access_token }))

        } catch (error) {
            throw error;
        }
    }

    async signUp(dto: SignUpDto) {

        try {
            dto.hash = await argon.hash(dto.hash);

            const user = await this.prisma.user.create({ data: dto })

            delete user.hash;

            const access_token = await this.getToken(user.email, user.id)
            return (new Response(true, "", { access_token }))

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken')
                }
            }
            throw error;
        }

    }

    getToken(email: string, id: number): Promise<string> {

        const payload = {
            sub: id,
            email
        }
        return this.jwt.signAsync(payload, {
            expiresIn: "15m",
            secret: this.config.get("JWT_SECRET")

        })

    }
}