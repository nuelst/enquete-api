
import { BadRequestException } from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';
import { fromZodError } from 'zod-validation-error';

export class ZodValidationPipe {
  constructor(private readonly schema: ZodSchema) { }

  transform(value, metadata) {
    try {
      const parsedValue = this.schema.parse(value);

      return parsedValue;
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: 'Validation failed',
          statusCode: 400,
          error: fromZodError(error)
        })
      }
      throw new BadRequestException('Validation failed');
    }
  }
}
