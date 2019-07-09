import { ApiModelProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
    @ApiModelProperty()
    readonly id: number;
    @ApiModelProperty()
    readonly type: string;
    @ApiModelProperty()
    readonly value: number;
    @ApiModelProperty()
    readonly createAt: Date;
    @ApiModelProperty()
    readonly origin: string;
    @ApiModelProperty()
    readonly destination: string;
}