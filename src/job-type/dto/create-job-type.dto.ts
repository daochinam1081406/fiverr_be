import { ApiProperty } from "@nestjs/swagger"
export class CreateJobTypeDto {
@ApiProperty()
type_name:string
}
