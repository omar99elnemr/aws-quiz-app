const questions = [
    // Cloud Practitioner (CLF) Level Questions
    {
        question: "What does S3 stand for?",
        correctAnswer: "Simple Storage Service",
        options: ["Server Side Storage", "Simple Storage Service", "Secure Service System", "Storage Server System"],
        difficulty: "CLF"
    },
    {
        question: "What is the default region when you create an AWS account?",
        correctAnswer: "us-east-1",
        options: ["us-west-1", "eu-central-1", "ap-south-1", "us-east-1"],
        difficulty: "CLF"
    },
    {
        question: "Which service is used for running code without provisioning servers?",
        correctAnswer: "AWS Lambda",
        options: ["EC2", "CloudWatch", "AWS Lambda", "ECS"],
        difficulty: "CLF"
    },
    {
        question: "Which AWS service is best for storing unstructured files?",
        correctAnswer: "S3",
        options: ["RDS", "EC2", "DynamoDB", "S3"],
        difficulty: "CLF"
    },
    {
        question: "What is AWS CloudFormation primarily used for?",
        correctAnswer: "Infrastructure as Code",
        options: ["Infrastructure as Code", "Server Management", "Database Administration", "Security Management"],
        difficulty: "CLF"
    },
    {
        question: "What is the primary purpose of AWS CloudWatch?",
        correctAnswer: "Monitoring and Logging",
        options: ["Security Management", "Monitoring and Logging", "Cost Management", "Resource Management"],
        difficulty: "CLF"
    },
    {
        question: "Which AWS service is used for content delivery?",
        correctAnswer: "CloudFront",
        options: ["Route 53", "CloudFront", "API Gateway", "Load Balancer"],
        difficulty: "CLF"
    },
    {
        question: "What is AWS IAM used for?",
        correctAnswer: "Identity and Access Management",
        options: ["Identity and Access Management", "Infrastructure Management", "Application Management", "Database Management"],
        difficulty: "CLF"
    },
    {
        question: "Which service offers serverless database?",
        correctAnswer: "DynamoDB",
        options: ["RDS", "S3", "DynamoDB", "EBS"],
        difficulty: "CLF"
    },
    {
        question: "What is the AWS shared responsibility model?",
        correctAnswer: "AWS is responsible for security of the cloud, customer is responsible for security in the cloud",
        options: [
            "AWS is responsible for security of the cloud, customer is responsible for security in the cloud",
            "AWS is responsible for all security aspects",
            "Customer is responsible for all security aspects",
            "Security is shared equally between AWS and customer"
        ],
        difficulty: "CLF"
    },
    {
        question: "What is the purpose of AWS Organizations?",
        correctAnswer: "Centralized management of multiple AWS accounts",
        options: [
            "Centralized management of multiple AWS accounts",
            "Managing EC2 instances",
            "Organizing S3 buckets",
            "Managing IAM users"
        ],
        difficulty: "CLF"
    },
    {
        question: "Which AWS service provides managed Kubernetes service?",
        correctAnswer: "EKS",
        options: ["ECS", "EKS", "ECR", "EC2"],
        difficulty: "CLF"
    },
    {
        question: "What is AWS WAF used for?",
        correctAnswer: "Web Application Firewall",
        options: [
            "Web Application Firewall",
            "Windows Application Framework",
            "Web Access Framework",
            "Web Authentication Framework"
        ],
        difficulty: "CLF"
    },
    {
        question: "Which service is used for managing SSL/TLS certificates?",
        correctAnswer: "AWS Certificate Manager",
        options: [
            "AWS Certificate Manager",
            "AWS Security Manager",
            "AWS SSL Manager",
            "AWS Encryption Manager"
        ],
        difficulty: "CLF"
    },
    {
        question: "What is AWS CloudTrail used for?",
        correctAnswer: "Logging API calls and account activity",
        options: [
            "Logging API calls and account activity",
            "Monitoring EC2 instances",
            "Managing cloud resources",
            "Storing application logs"
        ],
        difficulty: "CLF"
    },

    // Solutions Architect Associate (SAA) Level Questions
    {
        question: "Which AWS service provides a managed message queuing service?",
        correctAnswer: "Amazon SQS",
        options: ["Amazon SQS", "Amazon SNS", "Amazon MQ", "Amazon Kinesis"],
        difficulty: "SAA"
    },
    {
        question: "What is the maximum size of an S3 object?",
        correctAnswer: "5 TB",
        options: ["1 TB", "5 TB", "10 TB", "Unlimited"],
        difficulty: "SAA"
    },
    {
        question: "Which AWS service provides a managed Redis-compatible in-memory data store?",
        correctAnswer: "Amazon ElastiCache",
        options: ["Amazon ElastiCache", "Amazon RDS", "Amazon DynamoDB", "Amazon Redshift"],
        difficulty: "SAA"
    },
    {
        question: "What is the purpose of an Application Load Balancer (ALB)?",
        correctAnswer: "Distributes traffic to multiple targets based on content",
        options: [
            "Distributes traffic to multiple targets based on content",
            "Manages SSL certificates",
            "Provides DNS resolution",
            "Stores application data"
        ],
        difficulty: "SAA"
    },
    {
        question: "Which AWS service provides a managed container orchestration service?",
        correctAnswer: "Amazon ECS",
        options: ["Amazon ECS", "Amazon EKS", "Amazon EC2", "Amazon Lambda"],
        difficulty: "SAA"
    },
    {
        question: "What is the purpose of AWS Route 53?",
        correctAnswer: "Domain Name System (DNS) web service",
        options: [
            "Domain Name System (DNS) web service",
            "Load balancing service",
            "Content delivery network",
            "Database service"
        ],
        difficulty: "SAA"
    },
    {
        question: "Which AWS service provides a managed message broker service?",
        correctAnswer: "Amazon MQ",
        options: ["Amazon MQ", "Amazon SQS", "Amazon SNS", "Amazon Kinesis"],
        difficulty: "SAA"
    },
    {
        question: "What is the purpose of AWS CloudFront?",
        correctAnswer: "Content delivery network (CDN) service",
        options: [
            "Content delivery network (CDN) service",
            "Load balancing service",
            "Database service",
            "Compute service"
        ],
        difficulty: "SAA"
    },
    {
        question: "Which AWS service provides a managed relational database service?",
        correctAnswer: "Amazon RDS",
        options: ["Amazon RDS", "Amazon DynamoDB", "Amazon ElastiCache", "Amazon Redshift"],
        difficulty: "SAA"
    },
    {
        question: "What is the purpose of AWS Elastic Beanstalk?",
        correctAnswer: "Platform as a Service (PaaS) for deploying applications",
        options: [
            "Platform as a Service (PaaS) for deploying applications",
            "Infrastructure as a Service (IaaS)",
            "Software as a Service (SaaS)",
            "Function as a Service (FaaS)"
        ],
        difficulty: "SAA"
    },
    {
        question: "Which AWS service provides a managed data warehouse service?",
        correctAnswer: "Amazon Redshift",
        options: ["Amazon Redshift", "Amazon RDS", "Amazon DynamoDB", "Amazon ElastiCache"],
        difficulty: "SAA"
    },
    {
        question: "What is the purpose of AWS CloudFormation?",
        correctAnswer: "Infrastructure as Code (IaC) service",
        options: [
            "Infrastructure as Code (IaC) service",
            "Container orchestration service",
            "Database service",
            "Compute service"
        ],
        difficulty: "SAA"
    },
    {
        question: "Which AWS service provides a managed NoSQL database service?",
        correctAnswer: "Amazon DynamoDB",
        options: ["Amazon DynamoDB", "Amazon RDS", "Amazon ElastiCache", "Amazon Redshift"],
        difficulty: "SAA"
    },
    {
        question: "What is the purpose of AWS Lambda?",
        correctAnswer: "Serverless compute service",
        options: [
            "Serverless compute service",
            "Container orchestration service",
            "Database service",
            "Load balancing service"
        ],
        difficulty: "SAA"
    },
    {
        question: "Which AWS service provides a managed message notification service?",
        correctAnswer: "Amazon SNS",
        options: ["Amazon SNS", "Amazon SQS", "Amazon MQ", "Amazon Kinesis"],
        difficulty: "SAA"
    },
    {
        question: "What is the purpose of AWS API Gateway?",
        correctAnswer: "Managed API service",
        options: [
            "Managed API service",
            "Load balancing service",
            "Database service",
            "Compute service"
        ],
        difficulty: "SAA"
    },
    {
        question: "Which AWS service provides a managed search service?",
        correctAnswer: "Amazon Elasticsearch Service",
        options: [
            "Amazon Elasticsearch Service",
            "Amazon CloudSearch",
            "Amazon RDS",
            "Amazon DynamoDB"
        ],
        difficulty: "SAA"
    },
    {
        question: "What is the purpose of AWS CloudWatch?",
        correctAnswer: "Monitoring and observability service",
        options: [
            "Monitoring and observability service",
            "Load balancing service",
            "Database service",
            "Compute service"
        ],
        difficulty: "SAA"
    },
    {
        question: "Which AWS service provides a managed caching service?",
        correctAnswer: "Amazon ElastiCache",
        options: ["Amazon ElastiCache", "Amazon RDS", "Amazon DynamoDB", "Amazon Redshift"],
        difficulty: "SAA"
    },
    {
        question: "What is the purpose of AWS CloudTrail?",
        correctAnswer: "Logging and auditing service",
        options: [
            "Logging and auditing service",
            "Load balancing service",
            "Database service",
            "Compute service"
        ],
        difficulty: "SAA"
    },
    {
        question: "Which AWS service provides a managed data lake service?",
        correctAnswer: "Amazon S3",
        options: ["Amazon S3", "Amazon RDS", "Amazon DynamoDB", "Amazon Redshift"],
        difficulty: "SAA"
    },
    {
        question: "What is the purpose of AWS CloudFront?",
        correctAnswer: "Content delivery network (CDN) service",
        options: [
            "Content delivery network (CDN) service",
            "Load balancing service",
            "Database service",
            "Compute service"
        ],
        difficulty: "SAA"
    },
    {
        question: "Which AWS service provides a managed message queuing service?",
        correctAnswer: "Amazon SQS",
        options: ["Amazon SQS", "Amazon SNS", "Amazon MQ", "Amazon Kinesis"],
        difficulty: "SAA"
    },
    {
        question: "What is the purpose of AWS Elastic Beanstalk?",
        correctAnswer: "Platform as a Service (PaaS) for deploying applications",
        options: [
            "Platform as a Service (PaaS) for deploying applications",
            "Infrastructure as a Service (IaaS)",
            "Software as a Service (SaaS)",
            "Function as a Service (FaaS)"
        ],
        difficulty: "SAA"
    },
    {
        question: "Which AWS service provides a managed data warehouse service?",
        correctAnswer: "Amazon Redshift",
        options: ["Amazon Redshift", "Amazon RDS", "Amazon DynamoDB", "Amazon ElastiCache"],
        difficulty: "SAA"
    },
    {
        question: "What is the purpose of AWS CloudFormation?",
        correctAnswer: "Infrastructure as Code (IaC) service",
        options: [
            "Infrastructure as Code (IaC) service",
            "Container orchestration service",
            "Database service",
            "Compute service"
        ],
        difficulty: "SAA"
    },
    {
        question: "Which AWS service provides a managed NoSQL database service?",
        correctAnswer: "Amazon DynamoDB",
        options: ["Amazon DynamoDB", "Amazon RDS", "Amazon ElastiCache", "Amazon Redshift"],
        difficulty: "SAA"
    },
    {
        question: "What is the purpose of AWS Lambda?",
        correctAnswer: "Serverless compute service",
        options: [
            "Serverless compute service",
            "Container orchestration service",
            "Database service",
            "Load balancing service"
        ],
        difficulty: "SAA"
    },
    {
        question: "Which AWS service provides a managed message notification service?",
        correctAnswer: "Amazon SNS",
        options: ["Amazon SNS", "Amazon SQS", "Amazon MQ", "Amazon Kinesis"],
        difficulty: "SAA"
    },
    {
        question: "What is the purpose of AWS API Gateway?",
        correctAnswer: "Managed API service",
        options: [
            "Managed API service",
            "Load balancing service",
            "Database service",
            "Compute service"
        ],
        difficulty: "SAA"
    },
    {
        question: "Which AWS service provides a managed search service?",
        correctAnswer: "Amazon Elasticsearch Service",
        options: [
            "Amazon Elasticsearch Service",
            "Amazon CloudSearch",
            "Amazon RDS",
            "Amazon DynamoDB"
        ],
        difficulty: "SAA"
    },
    {
        question: "What is the purpose of AWS CloudWatch?",
        correctAnswer: "Monitoring and observability service",
        options: [
            "Monitoring and observability service",
            "Load balancing service",
            "Database service",
            "Compute service"
        ],
        difficulty: "SAA"
    },
    {
        question: "Which AWS service provides a managed caching service?",
        correctAnswer: "Amazon ElastiCache",
        options: ["Amazon ElastiCache", "Amazon RDS", "Amazon DynamoDB", "Amazon Redshift"],
        difficulty: "SAA"
    },
    {
        question: "What is the purpose of AWS CloudTrail?",
        correctAnswer: "Logging and auditing service",
        options: [
            "Logging and auditing service",
            "Load balancing service",
            "Database service",
            "Compute service"
        ],
        difficulty: "SAA"
    },
    {
        question: "Which AWS service provides a managed data lake service?",
        correctAnswer: "Amazon S3",
        options: ["Amazon S3", "Amazon RDS", "Amazon DynamoDB", "Amazon Redshift"],
        difficulty: "SAA"
    }
];

// Function to get random questions
function getRandomQuestions(count = 10) {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Export the questions and function
export { questions, getRandomQuestions }; 