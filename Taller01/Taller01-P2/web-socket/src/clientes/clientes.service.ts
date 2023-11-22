import { Injectable, NotFoundException, InternalServerErrorException, Logger, BadRequestException } from '@nestjs/common';
import { Client } from './entities/client.entity';
import { CreateClient } from './dto/create-client.dto';
import { UpdateClient } from './dto/update-client.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ClientesService {
    private readonly logger = new Logger('ClientService');

    constructor(
        @InjectModel(Client.name)
        private readonly clientModel: Model<Client>,

    ) { }

    async create(createClienteDto: CreateClient): Promise<Client> {
        try {
            const cliente = new this.clientModel(createClienteDto)
            await cliente.save()
            return cliente
        } catch (error) {
            console.log(error);
            if (error.code === 11000) {
                throw new BadRequestException('Registro duplicado');
            }
            this.logger.error(error);
            throw new InternalServerErrorException('Error no esperado');
        }
    }

    async findAll(): Promise<Client[]> {
        return this.clientModel.find().exec()
    }

    async findOne(id: string): Promise<Client> {
        const cliente = await this.clientModel.findById(id).exec();
        if (!cliente) {
            throw new NotFoundException(`Cliente con id: ${id} no encontrado`)
        }
        return cliente
    }

    async update(id: string, updateClientDto: UpdateClient): Promise<Client> {
        const cliente = await this.clientModel.findByIdAndUpdate(id, updateClientDto, { new: true }).exec()
        if (!cliente) {
            throw new NotFoundException(`Cliente con id: ${id} no encontrado`)
        }
        return cliente
    }

    async remove(id: string): Promise<void> {
        const client = await this.findOne(id)
        await this.clientModel.deleteOne({ _id: client._id }).exec();
    }

    prueba(): String[] {
        return ['uno', 'dos', 'tres'];
    }
}