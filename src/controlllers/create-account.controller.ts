import { Body, ConflictException, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { hash } from "bcryptjs";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";

import { PrismaService } from "src/prisma/prisma.service";
import { string, z } from "zod";


const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: string()
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller("/account")
export class CreateAccountController {
  constructor(private readonly db: PrismaService) { }

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const { email, name, password } = body

    const existentUser = await this.db.user.findUnique({
      where: {
        email
      }
    })
    if (existentUser) {
      throw new ConflictException("User Already exists!")

    }
    const hashedPassword = await hash(password, 8)
    const user = await this.db.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })
    return user
  }
  r

}