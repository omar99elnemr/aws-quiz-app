# AWS Quiz Challenge - Technical Guide

## Overview
The AWS Quiz Challenge is an interactive web application that tests users' knowledge of AWS services through a timed quiz. The application features a modern UI, real-time scoring, and a leaderboard system. All services are configured to stay within AWS Free Tier limits.

## Features
- Welcome page with name input
- 10-minute timed quiz with 10 random questions
- Real-time answer validation
- Detailed results review
- Global leaderboard
- Responsive design
- About page with project information

## Technical Requirements

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- No external frameworks required
- Font Awesome for icons
- Responsive design for all screen sizes

### Backend Services (All Free Tier Eligible)
- AWS Lambda (1M free requests/month)
- Amazon DynamoDB (25 WCU/25 RCU free)
- Amazon API Gateway (1M free requests/month)

### API Endpoints
1. Score Submission
   - Endpoint: `https://snbrxduw58.execute-api.us-east-1.amazonaws.com/submit`
   - Method: POST
   - Body: `{ "name": string, "score": number }`
   - Response: JSON confirmation

2. Leaderboard
   - Endpoint: `https://snbrxduw58.execute-api.us-east-1.amazonaws.com/leaderboard`
   - Method: GET
   - Response: Array of `{ "name": string, "score": number }`

## Setup Instructions

### Backend Setup

1. Create DynamoDB Table
   - Go to AWS Console → DynamoDB
   - Click "Create table"
   - Table name: `QuizScores`
   - Partition key: `id` (String)
   - Table settings: Customize settings
   - Read/Write capacity mode: On-demand (Free Tier eligible)
   - Click "Create table"

2. Create Lambda Functions
   - Go to AWS Console → Lambda
   - Click "Create function"
   - Choose "Author from scratch"
   
   a. Score Submission Function:
   - Function name: `quiz-score-submission`
   - Runtime: Node.js 18.x
   - Architecture: x86_64
   - Memory: 128 MB (minimum, free tier eligible)
   - Timeout: 10 seconds (sufficient for this use case)
   - Click "Create function"
   - In the function code editor, paste:
     ```javascript
     const AWS = require('aws-sdk');
     const dynamoDB = new AWS.DynamoDB.DocumentClient();

     exports.handler = async (event) => {
       const { name, score } = JSON.parse(event.body);
       const id = Date.now().toString();
       
       await dynamoDB.put({
         TableName: 'QuizScores',
         Item: { id, name, score, timestamp: new Date().toISOString() }
       }).promise();
       
       return {
         statusCode: 200,
         headers: {
           'Access-Control-Allow-Origin': '*',
           'Access-Control-Allow-Headers': 'Content-Type'
         },
         body: JSON.stringify({ message: 'Score submitted successfully' })
       };
     };
     ```
   - Click "Deploy"
   - In the "Configuration" tab, add DynamoDB permissions:
     - Click "Add permissions"
     - Choose "Create inline policy"
     - Select DynamoDB service
     - Add `PutItem` permission for the QuizScores table
     - Name the policy and save

   b. Leaderboard Function:
   - Create another function named `quiz-leaderboard`
   - Use the same runtime and architecture
   - Memory: 128 MB
   - Timeout: 10 seconds
   - Paste this code:
     ```javascript
     const AWS = require('aws-sdk');
     const dynamoDB = new AWS.DynamoDB.DocumentClient();

     exports.handler = async () => {
       const result = await dynamoDB.scan({
         TableName: 'QuizScores',
         Limit: 10  // Limit to top 10 scores to minimize data transfer
       }).promise();
       
       const scores = result.Items
         .sort((a, b) => b.score - a.score)
         .slice(0, 10);
       
       return {
         statusCode: 200,
         headers: {
           'Access-Control-Allow-Origin': '*',
           'Access-Control-Allow-Headers': 'Content-Type'
         },
         body: JSON.stringify(scores)
       };
     };
     ```
   - Add DynamoDB permissions for `Scan` operation
   - Deploy the function

3. Configure API Gateway
   - Go to AWS Console → API Gateway
   - Click "Create API"
   - Choose "REST API" (not private)
   - API name: `quiz-api`
   - Click "Create API"
   
   a. Create Resources:
   - Click "Actions" → "Create Resource"
   - Resource name: `submit`
   - Enable API Gateway CORS: Yes
   - Click "Create Resource"
   - Select the POST method
   - Integration type: Lambda Function
   - Lambda Function: `quiz-score-submission`
   - Click "Save"
   
   - Create another resource named `leaderboard`
   - Enable CORS
   - Add GET method
   - Integrate with `quiz-leaderboard` Lambda
   
   b. Deploy API:
   - Click "Actions" → "Deploy API"
   - Stage name: `prod`
   - Stage description: "Production stage"
   - Click "Deploy"
   - Note the invoke URL for updating the frontend
   

### Frontend Setup
1. Clone the repository
2. Update API endpoints in `script.js` with your API Gateway invoke URL
3. Serve the application using a web server

## Cost Optimization
1. DynamoDB:
   - Using on-demand capacity mode (free tier eligible)
   - Minimal data storage (only scores)
   - Limited to top 10 scores in leaderboard

2. Lambda:
   - Minimum memory (128 MB)
   - Short timeout (10 seconds)
   - Efficient code execution

3. API Gateway:
   - Minimal API calls (only on quiz completion)
   - Cached responses for leaderboard
   - Efficient payload sizes

## Recent Updates
1. Added Enter key support for name submission
2. Improved quiz options formatting and styling
3. Fixed quiz submission functionality
4. Added confirmation for unanswered questions
5. Enhanced error handling for API calls
6. Improved results page with better navigation
7. Added visual feedback for selected answers

## Testing
1. Test name submission with both button click and Enter key
2. Verify quiz timer functionality
3. Check answer selection and navigation
4. Test submission with both complete and incomplete answers
5. Verify leaderboard updates
6. Test responsive design on different devices

## Known Issues
- None currently reported

## Future Improvements
1. Add user authentication
2. Implement question categories
3. Add difficulty levels
4. Create user profiles
5. Add more interactive features

## Support
For technical support or questions, please contact:
- LinkedIn: [omar99elnemr](https://linkedin.com/in/omar99elnemr)
- GitHub: [omar99elnemr](https://github.com/omar99elnemr)

## API Services Configuration

### API Gateway Setup
1. Create an HTTP API in AWS Console:
   - Go to API Gateway
   - Click "Create API"
   - Choose "HTTP API"
   - Click "Build"

2. Configure the API:
   - API name: `quiz-api`
   - Add routes:
     - POST /submit
     - GET /leaderboard (Important: Must be GET, not ANY)
   - Add integrations:
     - For /submit: Lambda function `submitScore`
     - For /leaderboard: Lambda function `getLeaderboard`

3. CORS Configuration:
   - Enable CORS
   - Configure CORS settings:
     ```json
     {
       "AllowOrigins": ["*"],
       "AllowHeaders": ["Content-Type"],
       "AllowMethods": ["GET", "POST", "OPTIONS"],
       "MaxAge": 300
     }
     ```

4. Deploy the API:
   - Click "Deploy"
   - Stage: `$default` (HTTP APIs use a default stage)
   - Note the API endpoint URL (e.g., `https://xxxxx.execute-api.region.amazonaws.com`)

5. Verify Method Configuration:
   - Go to API Gateway Console
   - Select your API
   - Click on "Routes"
   - For /leaderboard route:
     - Method should be GET (not ANY)
     - Integration should point to your Lambda function
   - For /submit route:
     - Method should be POST
     - Integration should point to your Lambda function

6. Update Lambda Permissions:
   - Go to Lambda Console
   - Select your leaderboard function
   - Go to "Configuration" → "Permissions"
   - Verify API Gateway has permission to invoke the function
   - If needed, add permission:
     ```json
     {
       "Version": "2012-10-17",
       "Statement": [
         {
           "Effect": "Allow",
           "Principal": {
             "Service": "apigateway.amazonaws.com"
           },
           "Action": "lambda:InvokeFunction",
           "Resource": "arn:aws:lambda:region:account-id:function:function-name"
         }
       ]
     }
     ```

### DynamoDB Table Setup
1. Create a DynamoDB table named 'QuizScores'
2. Configure the table with:
   - Partition key: `id` (String)
   - Sort key: `timestamp` (Number)
3. Add additional attributes:
   - `name` (String)
   - `score` (Number)
4. Enable DynamoDB Streams if needed for real-time updates

### Lambda Functions
1. Create two Lambda functions:
   - `submitScore`:
     ```javascript
     const AWS = require('aws-sdk');
     const dynamoDB = new AWS.DynamoDB.DocumentClient();

     exports.handler = async (event) => {
       const { name, score } = JSON.parse(event.body);
       const timestamp = Date.now();
       const id = `${name}-${timestamp}`;
       
       await dynamoDB.put({
         TableName: 'QuizScores',
         Item: { id, name, score, timestamp }
       }).promise();
       
       return {
         statusCode: 200,
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({ message: 'Score submitted successfully' })
       };
     };
     ```
   - `getLeaderboard`:
     ```javascript
     const AWS = require('aws-sdk');
     const dynamoDB = new AWS.DynamoDB.DocumentClient();

     exports.handler = async () => {
       const scores = await dynamoDB.scan({
         TableName: 'QuizScores',
         Limit: 10
       }).promise();
       
       const sortedScores = scores.Items
         .sort((a, b) => b.score - a.score)
         .slice(0, 10);
       
       return {
         statusCode: 200,
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(sortedScores)
       };
     };
     ```

### IAM Permissions
1. Create an IAM role for Lambda with:
   - `dynamodb:PutItem` permission for submitScore
   - `dynamodb:Scan` permission for getLeaderboard
2. Attach the role to both Lambda functions

### Testing the Services
1. Test the submit endpoint:
   ```bash
   curl -X POST https://your-api-id.execute-api.region.amazonaws.com/submit \
   -H "Content-Type: application/json" \
   -d '{"name":"Test User","score":80}'
   ```

2. Test the leaderboard endpoint:
   ```bash
   curl https://your-api-id.execute-api.region.amazonaws.com/leaderboard
   ```

### Troubleshooting
1. If scores aren't being saved:
   - Check Lambda function logs in CloudWatch
   - Verify DynamoDB table permissions
   - Ensure API Gateway is properly configured

2. If leaderboard isn't loading:
   - Check browser console for CORS errors
   - Verify API Gateway CORS configuration
   - Check Lambda function logs for errors

3. Common issues:
   - CORS configuration not properly set
   - IAM permissions missing
   - DynamoDB table not created
   - Lambda function errors

### Cost Optimization
1. HTTP API Benefits:
   - Lower cost than REST API
   - Built-in CORS support
   - Automatic deployments
   - No need for API keys
   - Simpler configuration

2. Lambda:
   - Set appropriate timeout (e.g., 10 seconds)
   - Configure memory based on needs
   - Monitor execution time and memory usage

3. DynamoDB:
   - Use on-demand capacity mode
   - Set up auto-scaling if needed
   - Monitor read/write capacity units

### Adding Additional Attributes to DynamoDB

1. Understanding DynamoDB's Schemaless Nature:
   - DynamoDB is schemaless, meaning you don't need to pre-define attributes
   - You can add new attributes at any time when inserting items
   - The table only requires the partition key and sort key to be defined

2. Adding Attributes When Inserting Data:
   ```javascript
   // Example of adding a new item with additional attributes
   await dynamoDB.put({
     TableName: 'QuizScores',
     Item: {
       id: 'user123-timestamp',
       timestamp: Date.now(),
       name: 'John Doe',
       score: 80,
       // New attributes can be added here
       category: 'AWS Basics',
       difficulty: 'Intermediate',
       completionTime: 450,
       correctAnswers: 8,
       totalQuestions: 10
     }
   }).promise();
   ```

3. Steps to Add New Attributes:
   1. Update your Lambda function to include the new attributes
   2. Modify your data model to include the new fields
   3. Update your frontend to collect and send the new data
   4. Update your queries to use the new attributes if needed

4. Example of Adding a New Attribute:
   ```javascript
   // In your Lambda function
   exports.handler = async (event) => {
     const { 
       name, 
       score, 
       // Add new attributes here
       category = 'General',  // Default value
       difficulty = 'Beginner'  // Default value
     } = JSON.parse(event.body);
     
     const timestamp = Date.now();
     const id = `${name}-${timestamp}`;
     
     await dynamoDB.put({
       TableName: 'QuizScores',
       Item: {
         id,
         timestamp,
         name,
         score,
         // Include new attributes
         category,
         difficulty
       }
     }).promise();
   };
   ```

5. Best Practices:
   - Use meaningful attribute names
   - Keep attribute names consistent
   - Consider data types carefully
   - Plan for future attributes
   - Use appropriate data types for each attribute
   - Consider query patterns when adding attributes

6. Querying with New Attributes:
   ```javascript
   // Example: Get scores by category
   const categoryScores = await dynamoDB.scan({
     TableName: 'QuizScores',
     FilterExpression: 'category = :cat',
     ExpressionAttributeValues: {
       ':cat': 'AWS Basics'
     }
   }).promise();
   ```

## Leaderboard Lambda Function Implementation

### 1. Lambda Function Code
```javascript
// leaderboard.js
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'QuizScores';

exports.handler = async (event) => {
    try {
        // Handle CORS
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS'
        };

        // Handle OPTIONS request for CORS
        if (event.httpMethod === 'OPTIONS') {
            return {
                statusCode: 200,
                headers,
                body: ''
            };
        }

        // Handle GET request (fetch leaderboard)
        if (event.httpMethod === 'GET') {
            const params = {
                TableName: TABLE_NAME,
                Limit: 10,
                ScanIndexForward: false, // Sort in descending order
                ProjectionExpression: 'name, score, completionTime, date'
            };

            const result = await dynamoDB.scan(params).promise();
            
            // Sort by score (descending) and completion time (ascending)
            const sortedScores = result.Items.sort((a, b) => {
                if (b.score !== a.score) {
                    return b.score - a.score;
                }
                return a.completionTime - b.completionTime;
            });

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ scores: sortedScores })
            };
        }

        // Handle POST request (submit score)
        if (event.httpMethod === 'POST') {
            const score = JSON.parse(event.body);
            
            // Validate required fields
            if (!score.name || !score.score || !score.completionTime) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ error: 'Missing required fields' })
                };
            }

            // Add timestamp
            score.date = new Date().toISOString();

            // Save to DynamoDB
            await dynamoDB.put({
                TableName: TABLE_NAME,
                Item: score
            }).promise();

            // Get updated leaderboard
            const params = {
                TableName: TABLE_NAME,
                Limit: 10,
                ScanIndexForward: false,
                ProjectionExpression: 'name, score, completionTime, date'
            };

            const result = await dynamoDB.scan(params).promise();
            
            // Sort scores
            const sortedScores = result.Items.sort((a, b) => {
                if (b.score !== a.score) {
                    return b.score - a.score;
                }
                return a.completionTime - b.completionTime;
            });

            // Check if the new score made it to top 10
            const isInTop10 = sortedScores.some(entry => 
                entry.name === score.name && 
                entry.score === score.score && 
                entry.completionTime === score.completionTime
            );

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ 
                    scores: sortedScores,
                    isInTop10
                })
            };
        }

        return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Invalid request method' })
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
};
```

### 2. DynamoDB Table Setup
```bash
# Create DynamoDB table
aws dynamodb create-table \
    --table-name QuizScores \
    --attribute-definitions \
        AttributeName=name,AttributeType=S \
        AttributeName=score,AttributeType=N \
    --key-schema \
        AttributeName=name,KeyType=HASH \
        AttributeName=score,KeyType=RANGE \
    --provisioned-throughput \
        ReadCapacityUnits=5,WriteCapacityUnits=5
```

### 3. IAM Permissions
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "dynamodb:PutItem",
                "dynamodb:Scan",
                "dynamodb:Query"
            ],
            "Resource": "arn:aws:dynamodb:*:*:table/QuizScores"
        }
    ]
}
```

### 4. API Gateway Configuration
1. Create a new REST API
2. Create two resources:
   - GET /leaderboard
   - POST /leaderboard
3. Enable CORS
4. Deploy the API

### 5. Frontend Integration
Update the JavaScript code to use the Lambda function:

```javascript
// Submit score
async function submitScore(score) {
    try {
        const response = await fetch('YOUR_API_GATEWAY_URL/leaderboard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(score)
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error submitting score:', error);
        throw error;
    }
}

// Fetch leaderboard
async function fetchLeaderboard() {
    try {
        const response = await fetch('YOUR_API_GATEWAY_URL/leaderboard');
        const data = await response.json();
        return data.scores;
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        throw error;
    }
}
```

### 6. Testing the Lambda Function
```bash
# Test GET request
curl -X GET https://your-api-gateway-url/leaderboard

# Test POST request
curl -X POST https://your-api-gateway-url/leaderboard \
    -H "Content-Type: application/json" \
    -d '{
        "name": "Test User",
        "score": 95,
        "completionTime": 240
    }'
```

### 7. Cost Optimization
1. Use DynamoDB On-Demand capacity mode for low traffic
2. Implement caching using API Gateway cache
3. Use Lambda provisioned concurrency for consistent performance
4. Monitor and adjust DynamoDB capacity as needed

### 8. Security Considerations
1. Implement API key authentication
2. Add rate limiting
3. Validate input data
4. Use AWS WAF for additional protection
5. Encrypt sensitive data

### 9. Monitoring and Logging
1. Set up CloudWatch alarms for errors
2. Monitor Lambda execution time
3. Track DynamoDB consumed capacity
4. Set up X-Ray tracing for debugging

