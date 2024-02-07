import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateCommercesDto,
  UpdateCommercesDto,
} from './dto/create-commerce.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Commerce } from './entities/commerce.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CommercesService {
  constructor(
    @InjectRepository(Commerce) private commerceRepo: Repository<Commerce>,
  ) {}
  create(userId: string, createCommerceDto: CreateCommercesDto) {
    try {
      const newCommerce = this.commerceRepo.create(createCommerceDto);
      newCommerce.ownerID = userId;
      newCommerce.id = uuidv4();

      return this.commerceRepo.save(newCommerce);
    } catch (error) {
      console.error('Error creating new commerce:', error);
      throw new Error('Failed to create new commerce');
    }
  }

  async findAll() {
    const commerceList = await this.commerceRepo.find();
    return commerceList;
  }

  async findOne(id: string) {
    const comerce = await this.commerceRepo.findOne({ where: { id } });
    if (!comerce) {
      throw new NotFoundException(`Commerce #${id} not found`);
    }
    return comerce;
  }

  async findByUser(id: string) {
    const comerce = await this.commerceRepo.findOne({ where: { ownerID: id } });
    if (!comerce) {
      throw new NotFoundException(`Commerce #${id} not found`);
    }
    return comerce;
  }

  async update(id: string, updateCommerceDto: UpdateCommercesDto) {
    const idComerce = updateCommerceDto.id;
    const comerce = await this.commerceRepo.findOne({
      where: { id: idComerce },
    });
    if (!comerce) {
      throw new NotFoundException(`Commerce #${id} not found`);
    }
    const updateComerce = this.commerceRepo.merge(comerce, updateCommerceDto);
    return this.commerceRepo.save(updateComerce);
  }

  async remove(id: string) {
    const comerce = await this.commerceRepo.delete(id);
    if (!comerce) {
      throw new NotFoundException(`Commerce #${id} not found`);
    }
    return comerce;
  }
}
