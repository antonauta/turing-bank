import { ApiModelProperty } from '@nestjs/swagger';


export class LoginDTO {
 @ApiModelProperty()
  readonly cpf: string;
  @ApiModelProperty()
  readonly password: string;
}

export class RegisterDTO {
  @ApiModelProperty()
  email: string;
  @ApiModelProperty()
  name: string;
  @ApiModelProperty()
  preferredName: string;
  @ApiModelProperty()
  password: string;
  @ApiModelProperty()
  cpf: string;

}