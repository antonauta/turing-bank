import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiModelProperty()
  readonly agency?: string;
  @ApiModelProperty()
  readonly preferredName: string;
  @ApiModelProperty()
  readonly name: string;
  @ApiModelProperty()
  readonly email: string;
  @ApiModelProperty()
  readonly cpf: string;
  @ApiModelProperty()
  readonly password: string;
  @ApiModelProperty()
  readonly balance: number;
}
