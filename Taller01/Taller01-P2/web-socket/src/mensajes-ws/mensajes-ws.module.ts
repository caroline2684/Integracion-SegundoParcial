import { Module } from '@nestjs/common';
import { MensajesWsGateway } from './mensajes-ws.gateway';
import { MensajesWsService } from './mensajes-ws.service';
import { ClientesModule } from '../clientes/clientes.module';


@Module({
  providers: [MensajesWsGateway, MensajesWsService],
  imports: [ClientesModule]
})
export class MensajeWsModule { }