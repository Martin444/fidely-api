import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateCommercesDto,
  UpdateCommercesDto,
} from './dto/create-commerce.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Commerce } from './entities/commerce.entity';
import { v4 as uuidv4 } from 'uuid';
import { ClientUser } from './entities/client.entity';

@Injectable()
export class CommercesService {
  constructor(
    @InjectRepository(Commerce) private commerceRepo: Repository<Commerce>,
    @InjectRepository(ClientUser) private clientRepo: Repository<ClientUser>,
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

  async addClient(ownerCommerce: string, clientID: string) {
    try {
      const commerceID = await this.findByUser(ownerCommerce);
      if (commerceID) {
        const clientListExist = await this.clientRepo.findOne({
          where: { ownerCommerce: commerceID.id },
        });

        if (clientListExist) {
          console.log(clientListExist.clientsIdList);
          console.log(clientID);
          if (clientListExist.clientsIdList.includes(clientID)) {
            throw new HttpException(
              'El usuario ya es parte de tus clientes.',
              HttpStatus.CONFLICT,
            );
          }

          const newClient = clientListExist;

          newClient.clientsIdList.push(clientID);
          console.log(clientListExist);
          console.log(newClient);
          const loadUpdateClient = this.clientRepo.merge(
            clientListExist,
            newClient,
          );

          return this.clientRepo.save(loadUpdateClient);
        } else {
          const newClient = new ClientUser();

          newClient.id = uuidv4();
          newClient.ownerCommerce = commerceID.id;
          newClient.clientsIdList = [clientID];
          const loadedClient = this.clientRepo.create(newClient);
          return this.clientRepo.save(loadedClient);
        }
      }
    } catch (error) {
      throw error;
    }
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
