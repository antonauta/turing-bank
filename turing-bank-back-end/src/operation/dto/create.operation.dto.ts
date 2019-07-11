import { ApiModelProperty } from '@nestjs/swagger';

export class CreateOperationDto {
    @ApiModelProperty()
    readonly type: number;
    @ApiModelProperty()
    readonly value: number;
    @ApiModelProperty()
    readonly destination?: string;
}