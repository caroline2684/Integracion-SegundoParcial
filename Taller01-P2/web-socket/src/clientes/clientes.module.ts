import { Module } from '@nestjs/common';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from './entities/client.entity'


@Module({
  controllers: [ClientesController],
  providers: [ClientesService],
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }])
  ],
  exports: [ClientesService, MongooseModule],
})
export class ClientesModule { }
