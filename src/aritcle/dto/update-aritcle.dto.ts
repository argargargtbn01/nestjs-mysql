import { PartialType } from '@nestjs/mapped-types';
import { CreateAritcleDto } from './create-aritcle.dto';

export class UpdateAritcleDto extends PartialType(CreateAritcleDto) {}
