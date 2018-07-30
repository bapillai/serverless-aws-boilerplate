async function helloWorldTwo(event) {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: `Go Serverless v1.0! with helloWorldTwo`,
        }),
    };

    return response
}

export default helloWorldTwo