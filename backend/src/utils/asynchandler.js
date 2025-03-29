const asyncHandler = (requestHandler) => async (req , res , next) => {
    try {
        await requestHandler(req , res , next);
    } catch (error) {
        next(error);
    }
}

export {asyncHandler};