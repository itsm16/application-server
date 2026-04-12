import db from "../../common/db/db.js"
import { applicationsTable } from "../../common/db/schema.js"
import { getOpinion } from "../../common/utils/ai-utils.js"
import ApiError from "../../common/utils/api-error.js"
import { ApplicationDtoType } from "./dto/ai.dto.js"
import { eq } from "drizzle-orm"

const parse = async ({description}: {description: string}) => {
    const cleanDescription = JSON.stringify(description)
    const opinion = await getOpinion(cleanDescription)

    if (!opinion?.content) {
        throw ApiError.internal("Failed to extract details")
    }

    const parsed = JSON.parse(opinion?.content as string)

    if (!parsed) {
        throw ApiError.internal("Failed to extract details")
    }

    return parsed
}

const createApplication = async ({userId, company, role, skills, resumeSuggestions, status}: ApplicationDtoType) => {
    try {
        const application = await db.insert(applicationsTable).values({
            userId,
            company,
            role,
            skills,
            resumeSuggestions,
            status
        })

        return application
    } catch (error) {
        throw ApiError.internal("Failed to create application")
    }
}

const getApplications = async (userId: number) => {
    try {
        const applications = await db.select().from(applicationsTable).where(eq(applicationsTable.userId, userId))
        return applications
    } catch (error) {
        throw ApiError.internal("Failed to fetch applications")
    }
}

const updateApplication = async (id: string, status: string) => {
    try {
        const application = await db.update(applicationsTable)
            .set({ status })
            .where(eq(applicationsTable.id, parseInt(id)))
            .returning()
        return application[0]
    } catch (error) {
        throw ApiError.internal("Failed to update application")
    }
}

export {
    parse,
    createApplication,
    getApplications,
    updateApplication
}