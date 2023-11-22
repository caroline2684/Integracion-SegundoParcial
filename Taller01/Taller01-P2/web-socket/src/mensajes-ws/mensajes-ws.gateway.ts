import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MensajesWsService } from './mensajes-ws.service';
import { Socket } from 'socket.io';
import { Server } from 'socket.io';
import { NewMessageDto } from './dtos/new-message.dto';
import { BadRequestException } from '@nestjs/common';

@WebSocketGateway({ cors: true })
export class MensajesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  listaDeUsuarios: string[] = ['usuario1', 'usuario2'];

  @WebSocketServer() wss: Server;

  constructor(private readonly mensajesWsService: MensajesWsService) { }
  async handleConnection(clientsocket: Socket) {

    const token = clientsocket.handshake.headers.authentication as string;
    let payload: string;
    try {
      if (!this.listaDeUsuarios.includes(token))
        throw new BadRequestException('token no valido');
      payload = token;
      await this.mensajesWsService.registerClient(clientsocket, payload);

    } catch (error) {
      clientsocket.disconnect();
      return;
    }
    // console.log({payload})

    // client.join('ventas');
    // console.log(`cliente conectado`, client.id)

    // console.log({conectados: this.mensajesWsService.getConnectedClients()});

    this.wss.emit('clients-updated', this.mensajesWsService.getConnectedClients());


  }

  handleDisconnect(client: Socket) {
    // console.log('Desconectado',client.id)
    this.mensajesWsService.removeClient(client.id)
    // console.log({conectados: this.mensajesWsService.getConnectedClients()});
    this.wss.emit('clients-updated', this.mensajesWsService.getConnectedClients());
  }

  @SubscribeMessage('message-from-client')
  onMessageFromClient(client: Socket, payload: NewMessageDto) {
    // console.log(client.id, payload)
    // Solo para el cliente que emite
    // client.emit('message-from-server', {
    //   fullname:'Yo',
    //   message:payload.message || 'nada'
    // })
    // a todos menos al cliente inicial
    // client.broadcast.emit('message-from-server', {
    //   fullname:'Yo',
    //   message:payload.message || 'nada'
    // })
    // a todos
    this.wss.emit('message-from-server', {
      fullName: this.mensajesWsService.getStudentFullName(client.id),
      message: payload.message || 'no hay mensaje'
    })

  }
}
