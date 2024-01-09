import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AritcleService } from './aritcle.service';
import { CreateAritcleDto } from './dto/create-aritcle.dto';
import { UpdateAritcleDto } from './dto/update-aritcle.dto';
import { FirebaseAuthGuard } from 'src/authentication/guard/firebase-auth.guard';
import { PoliciesGuard } from 'src/authorization/guards/policies.guard';
import { Check } from 'typeorm';
import { Action } from 'src/authorization/enums/action.enum';
import { CheckPolicies } from 'src/authorization/decorators/check-policies';

@Controller('aritcle')
export class AritcleController {
  constructor(private readonly aritcleService: AritcleService) {}

  @Post()
  create(@Body() createAritcleDto: CreateAritcleDto) {
    return this.aritcleService.create(createAritcleDto);
  }

  @Get()
  findAll() {
    return this.aritcleService.findAll();
  }

  @UseGuards(FirebaseAuthGuard, PoliciesGuard)
  @CheckPolicies({ action: Action.Read, subject: 'Article' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aritcleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAritcleDto: UpdateAritcleDto) {
    return this.aritcleService.update(+id, updateAritcleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aritcleService.remove(+id);
  }
}
