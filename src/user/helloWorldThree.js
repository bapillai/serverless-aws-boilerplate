async function helloWorldThree(event) {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: `Go Serverless v1.0! with helloWorldThree`,
        }),
    };

    return response
}

export default helloWorldThree