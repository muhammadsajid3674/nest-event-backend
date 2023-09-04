// * For optional Inputs
// export class UpdateEventDto {
//   name?: string;
//   description?: string;
//   address?: string;
//   when?: string;
// }

import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';

// * For optional Inputs using package
export class UpdateEventDto extends PartialType(CreateEventDto) {}
