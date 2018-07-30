async function helloWorldOne(event) {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: `Go Serverless v1.0! with helloworldOne`,
        }),
    };

    return response
}

export default helloWorldOne