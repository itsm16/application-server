import { z } from "zod";
import BaseDto from "../../../common/dto/base.dto.js";

class ParseDescDto extends BaseDto{
  static schema = z.object({
    description: z.string({error: "Description is required"}).nonempty("No description provided"),
    company: z.string().optional(),
    role: z.string().optional(),
  });
}

class ApplicationDto extends BaseDto{
  static schema = z.object({
    userId: z.number(),
    company: z.string({error: "Company is required"}),
    role: z.string({error: "Role is required"}),
    skills: z.array(z.string()).optional(),
    resumeSuggestions: z.array(z.string()).optional(),
    status: z.string().default("applied").optional(),
  })
}

// types
type ApplicationDtoType = z.infer<typeof ApplicationDto.schema>

export {
  ParseDescDto,
  ApplicationDto,
  
}

export type {
  ApplicationDtoType
}