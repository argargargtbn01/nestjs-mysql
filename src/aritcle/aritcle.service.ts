import { Injectable } from '@nestjs/common';
import { CreateAritcleDto } from './dto/create-aritcle.dto';
import { UpdateAritcleDto } from './dto/update-aritcle.dto';
import { Article } from './entities/aritcle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AritcleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepo: Repository<Article>,
  ) {}
  create(createAritcleDto: CreateAritcleDto) {
    return 'This action adds a new aritcle';
  }

  findAll() {
    return `This action returns all aritcle`;
  }

  findOne(id: number) {
    return this.articleRepo.findOne({
      where: { id },
    });
  }

  update(id: number, updateAritcleDto: UpdateAritcleDto) {
    return `This action updates a #${id} aritcle`;
  }

  remove(id: number) {
    return `This action removes a #${id} aritcle`;
  }
}
