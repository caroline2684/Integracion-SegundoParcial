import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Client } from '../clientes/entities/client.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientesService } from '../clientes/clientes.service';

interface ConnectedClients {
    [id: string]: {
        socket: Socket,
        cliente: Client
    }
}

@Injectable()
export class MensajesWsService {
    private connectedClients: ConnectedClients = {}

    constructor(
        @InjectModel(Client.name)
        private readonly clientModel: Model<Client>,
    ) { }

    async registerClient(client: Socket, name: string) {
        const cliente = await this.clientModel.findOne({ name_client: name }).exec();
        if (!cliente) throw new Error('Cliente no encontrado');
        if (!cliente.estado) throw new Error('No activo');

        this.connectedClients[client.id] = { socket: client, cliente: cliente };
    }

    removeClient(clientId: string) {
        delete this.connectedClients[clientId];
    }

    getConnectedClients(): string[] {
        return Object.keys(this.connectedClients);
    }

    getStudentFullName(id: string) {
        return this.connectedClients[id].cliente.name_client;
    }
}
