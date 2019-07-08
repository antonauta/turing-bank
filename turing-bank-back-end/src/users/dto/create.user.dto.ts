import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiModelProperty()
  readonly agency?: string;
  @ApiModelProperty()
  readonly account: number;
  @ApiModelProperty()
  readonly preferredName: string;
  @ApiModelProperty()
  readonly name: string;
  @ApiModelProperty()
  readonly email: string;
  @ApiModelProperty()
  readonly cpf: string;
  @ApiModelProperty()
  readonly balance: number;
  @ApiModelProperty()
  readonly password: string;
}
