# Backend

The backend is built with Express and follows a clean separation of concerns.

- Key Decisions
- Drizzle ORM
    - Used for type-safe database queries with PostgreSQL (Neon).
    - Ensures strong TypeScript integration and better developer experience.
- Cookie-Based Authentication
    - Uses HTTP-only cookies for storing auth tokens
    - More secure than localStorage-based JWT handling
- AI Integration (Gemini API)
    - Uses OpenAI-compatible endpoint
    - Parses job descriptions into structured data
    - Generates tailored resume bullet points
    - Service Layer for AI

AI logic is abstracted away from route handlers for cleaner architecture and easier maintenance.

# AI Workflow
- User pastes a job description
- Backend sends it to the AI model
- AI returns structured JSON:
    - Role, company, skills
    - Summary and key requirements
    - Resume suggestions
- Data is validated and stored in the database