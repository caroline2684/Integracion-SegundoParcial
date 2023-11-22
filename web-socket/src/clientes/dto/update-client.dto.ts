import { PartialType } from '@nestjs/mapped-types';
import { CreateClient } from './create-client.dto'
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateClient extends PartialType(CreateClient) {
    @IsBoolean()
    @IsOptional()
    estado?: boolean;
}