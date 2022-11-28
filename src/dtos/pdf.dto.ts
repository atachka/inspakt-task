import { IsNotEmpty, IsString, IsNumberString } from 'class-validator';

export class PDFDto {
  @IsString()
  @IsNotEmpty()
  public html: string;
}

export class PDFParams {
  @IsNumberString()
  @IsNotEmpty()
  public width: string;
  @IsNumberString()
  @IsNotEmpty()
  public height: string;
}
