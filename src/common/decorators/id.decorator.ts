import { Param, ParseIntPipe, PipeTransform, Type } from '@nestjs/common';

export function IDParam(
  property: string,
  ...pipes: Array<Type<PipeTransform> | PipeTransform>
): ParameterDecorator {
  return Param(property, new ParseIntPipe(), ...pipes);
}
