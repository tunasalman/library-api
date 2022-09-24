import {
  BadRequestException,
  Injectable,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class MyValidationPipe extends ValidationPipe {
  constructor() {
    super({ transform: true, whitelist: true, skipNullProperties: true });

    this.exceptionFactory = (validationErrors: ValidationError[]) => {
      const formattedErrors = [];
      this.formatErrors(validationErrors, formattedErrors);

      throw new BadRequestException({
        message: 'Validation Failed',
        errors: formattedErrors,
      });
    };
  }

  private formatErrors(
    validationErrors: ValidationError[],
    formattedErrors: any[],
  ) {
    return validationErrors.map((err) => {
      for (const property in err.constraints) {
        formattedErrors.push({
          message: err.constraints[property],
          field: err.property,
          from: err.target.constructor.name,
        });
      }
      if (_.isArray(err.children)) {
        this.formatErrors(err.children, formattedErrors);
      }
    });
  }
}
