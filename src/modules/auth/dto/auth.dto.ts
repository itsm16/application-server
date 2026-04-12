import z from "zod";
import BaseDto from "../../../common/dto/base.dto.js";

class RegisterDto extends BaseDto{
    static schema = z.object({
        name: z.string({error: "name is required"}).trim(),
        email: z.email({error: "valid mail is required"}).trim(),
        password: z.string().min(6, {error: "Password must be at least 6 characters"}).trim(),
    })
}

class LoginDto extends BaseDto {
    static schema = z.object({
        email: z.email({error: "valid email is required"}).trim(),
        password: z.string().min(6, {error: "password must be at least 6 characters"}).trim(),
    })
}

// types
type RegisterDtoType = z.infer<typeof RegisterDto.schema>
type LoginDtoType = z.infer<typeof LoginDto.schema>


export { 
    RegisterDto,
    LoginDto
}


export type { 
    RegisterDtoType,
    LoginDtoType 
}
