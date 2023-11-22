import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { ClientesModule } from './clientes/clientes.module';
import { ClientSchema } from './clientes/entities/client.entity';

config();

const logger = new Logger('AppModule');
logger.log(`MONGODB_URI: ${process.env.MONGODB_URI}`);

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URI, {
    dbName: 'productos',
  }),
    ClientesModule,

  MongooseModule.forFeature([
    {
      name: 'Client',
      schema: ClientSchema,
    },
  ]),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }