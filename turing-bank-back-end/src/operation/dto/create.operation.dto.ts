import { ApiModelProperty } from '@nestjs/swagger';

export class CreateOperationDto {
    @ApiModelProperty()
    readonly id: number;
    @ApiModelProperty()
    readonly type: number;
    @ApiModelProperty()
    readonly value: number;
    @ApiModelProperty()
    readonly createAt: Date;
    @ApiModelProperty()
    readonly origin: string;
    @ApiModelProperty()
    readonly destination: string;
}