import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Client extends Document {
    @Prop()
    name_client: string;

    @Prop()
    direction: string;

    @Prop()
    phone: number;

    @Prop()
    id_city: string;

    @Prop()
    id_client_type: mongoose.Types.ObjectId;

    @Prop()
    ci_client: mongoose.Types.ObjectId;

    @Prop({ default: true })
    estado: boolean;

}
export const ClientSchema = SchemaFactory.createForClass(Client);