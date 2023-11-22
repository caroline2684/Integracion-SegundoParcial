import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CreateClient {
    @IsString()
    @IsNotEmpty()
    name_client: string;

    @IsString()
    @IsNotEmpty()
    direction: string;

    @IsNumber()
    @IsNotEmpty()
    phone: number;

    @IsString()
    @IsNotEmpty()
    id_city: string;

    @IsString()
    @IsNotEmpty()
    id_client_type: mongoose.Types.ObjectId;

    @IsString()
    @IsNotEmpty()
    ci_client: mongoose.Types.ObjectId;
}