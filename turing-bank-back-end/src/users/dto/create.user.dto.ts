import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
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
}
