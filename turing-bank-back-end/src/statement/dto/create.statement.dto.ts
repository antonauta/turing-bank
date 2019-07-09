import { ApiModelProperty } from '@nestjs/swagger';

export class CreateStatementDto {
  @ApiModelProperty()
  readonly id: number;
  @ApiModelProperty()
  readonly operation: number;
  @ApiModelProperty()
  readonly value: number;
  @ApiModelProperty()
  readonly date: string;
  @ApiModelProperty()
  readonly accountOrigin: string;
  @ApiModelProperty()
  readonly accountDestiny: string;
}