import {Response} from 'express'

class ApiResponse {
    static ok(res : Response, message = "Executed successfully", data?: any){
        return res.status(200).json({message, data})
    }

    static error(res : Response, message = "Execution failed", data?: any){
        return res.status(500).json({message, data})
    }

    static created(res : Response, message = "Created successfully", data?: any){
        return res.status(200).json({message, data})
    }
}

export default ApiResponse
