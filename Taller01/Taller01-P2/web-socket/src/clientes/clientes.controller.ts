import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClient } from './dto/create-client.dto';
import { UpdateClient } from './dto/update-client.dto';

@Controller('clientes')
export class ClientesController {
    constructor(private readonly clientService: ClientesService) { }

    @Post()
    async create(@Body() createClientDto: CreateClient) {
        try {
            const cliente = await this.clientService.create(createClientDto)
            return { message: 'Cliente creado con éxito', cliente }
        } catch (error) {
            throw new NotFoundException('No se pudo crear el cliente')
        }
    }

    @Get()
    async findAll() {
        return this.clientService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            const cliente = await this.clientService.findOne(id)
            return cliente
        } catch (error) {
            throw new NotFoundException('Cliente no encontrado')
        }
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateClientDto: UpdateClient) {
        try {
            const cliente = await this.clientService.update(id, updateClientDto)
            return { message: 'Cliente actualizado con éxito', cliente }
        } catch (error) {
            throw new NotFoundException('No se pudo actualizar el cliente');
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        try {
            await this.clientService.remove(id)
            return { message: 'Producto eliminado con éxito' }
        } catch (error) {
            throw new NotFoundException('No se pudo eliminar el producto');
        }
    }
}
