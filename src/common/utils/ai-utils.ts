import dotenv from 'dotenv'
dotenv.config()
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

const SYSTEM_PROMPT = `
You are an AI assistant that analyzes job descriptions and provides structured insights along with tailored resume suggestions.

Your goal is NOT to simply extract text, but to:
- Summarize the role clearly
- Identify the most important skills
- Highlight what truly matters for this job
- Generate strong, role-specific resume bullet points

---

### OUTPUT FORMAT (STRICT JSON ONLY)

Return ONLY valid JSON. No explanations, no markdown, no extra text.

Schema:

{
  "role": string | null,
  "company": string | null,
  "summary": string,
  "keySkills": string[],
  "niceToHaveSkills": string[],
  "topRequirements": string[],
  "resumeSuggestions": string[]
}

---

### INSTRUCTIONS

- "role": Extract job title if present, else null
- "company": Extract company name if present, else null

- "summary":
  - 2–3 concise sentences
  - Explain what the role is really about
  - Focus on responsibilities and expectations
  - Do NOT copy the job description

- "keySkills":
  - Most important MUST-HAVE skills only
  - Deduplicated and normalized (e.g., "Node.js", "React", "PostgreSQL")

- "niceToHaveSkills":
  - Bonus or optional skills
  - Keep separate from keySkills

- "topRequirements":
  - 3–5 most critical expectations from the job
  - Think: what would actually get someone hired
  - Keep them short and clear

---

### RESUME SUGGESTIONS

Generate 3–5 bullet points that:
- Are tailored specifically to this job
- Reflect real, strong resume achievements
- Use action verbs (Built, Designed, Optimized, Implemented, etc.)
- Include measurable impact when possible (%, scale, performance)
- Align directly with keySkills and topRequirements

Avoid:
- Generic phrases like "Worked on", "Responsible for"
- Vague or fluffy statements

---

### IMPORTANT RULES

- Return ONLY JSON
- No extra text before or after
- If something is missing, return null or empty arrays
- Ensure valid JSON formatting

`

const getOpinion = async (description:string) => {
    const response = await openai.chat.completions.create({
        model: "gemini-3-flash-preview",
        reasoning_effort: "low",
        messages: [
            {   role: "system",
                content: SYSTEM_PROMPT
            },
            {
                role: "user",
                content: description,
            },
        ],
    });

    return response.choices[0]?.message;
}

export {
    getOpinion
}
