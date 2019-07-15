import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class CreateOperationDto {
    
    @ApiModelPropertyOptional()
    readonly description: string;
    @ApiModelProperty()
    readonly value: number;
    @ApiModelProperty()
    readonly destination?: string;
}