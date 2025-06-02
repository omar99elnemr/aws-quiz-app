// Import questions
import { getRandomQuestions } from './questions.js';

// Expanded question pool
const questions = [
  {
    question: "What does S3 stand for?",
    correctAnswer: "Simple Storage Service",
    options: ["Server Side Storage", "Simple Storage Service", "Secure Service System", "Storage Server System"]
  },
  {
    question: "What is the default region when you create an AWS account?",
    correctAnswer: "us-east-1",
    options: ["us-west-1", "eu-central-1", "ap-south-1", "us-east-1"]
  },
  {
    question: "Which service is used for running code without provisioning servers?",
    correctAnswer: "AWS Lambda",
    options: ["EC2", "CloudWatch", "AWS Lambda", "ECS"]
  },
  {
    question: "Which AWS service is best for storing unstructured files?",
    correctAnswer: "S3",
    options: ["RDS", "EC2", "DynamoDB", "S3"]
  },
  {
    question: "Which service offers serverless database?",
    correctAnswer: "DynamoDB",
    options: ["RDS", "S3", "DynamoDB", "EBS"]
  },
  {
    question: "What is AWS CloudFormation primarily used for?",
    correctAnswer: "Infrastructure as Code",
    options: ["Infrastructure as Code", "Server Management", "Database Administration", "Security Management"]
  },
  {
    question: "Which AWS service provides a managed Kubernetes service?",
    correctAnswer: "EKS",
    options: ["ECS", "EKS", "ECR", "EC2"]
  },
  {
    question: "What is the primary purpose of AWS CloudWatch?",
    correctAnswer: "Monitoring and Logging",
    options: ["Security Management", "Monitoring and Logging", "Cost Management", "Resource Management"]
  },
  {
    question: "Which AWS service is used for content delivery?",
    correctAnswer: "CloudFront",
    options: ["Route 53", "CloudFront", "API Gateway", "Load Balancer"]
  },
  {
    question: "What is AWS IAM used for?",
    correctAnswer: "Identity and Access Management",
    options: ["Identity and Access Management", "Infrastructure Management", "Application Management", "Database Management"]
  }
];

// Global variables
let currentPage = 'welcome';
let userAnswers = {};
let randomizedQuestions = [];
let timer;
let timeLeft = 300; // 5 minutes in seconds
let currentQuestionIndex = 0;
let startTime;
let username = '';

// Store shuffled options for each question
let questionOptions = {};

// Navigation
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = e.target.closest('a').dataset.page;
        if (page) {
            navigateTo(page);
        }
    });
});

function navigateTo(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    // Remove active class from all nav links
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    
    // Show selected page
    const selectedPage = document.getElementById(page);
    if (selectedPage) {
        selectedPage.classList.add('active');
        // Add active class to corresponding nav link
        const activeLink = document.querySelector(`[data-page="${page}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        currentPage = page;

        // Special handling for about page
        if (page === 'about') {
            showAbout();
        }
    }
}

// Toast notification function
function showToast(type, title, message) {
    const toastContainer = document.querySelector('.toast-container') || (() => {
        const container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
        return container;
    })();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'error' ? '❌' : type === 'warning' ? '⚠️' : '✅';
    
    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Timer functions
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    
    if (timeLeft <= 0) {
      clearInterval(timer);
      submitQuiz();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeDisplay = document.getElementById('time');
  if (timeDisplay) {
    timeDisplay.textContent = 
      `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}

// Quiz functions
function startQuiz() {
    username = document.getElementById('username').value.trim();
    if (!username) {
        showToast('error', 'Name Required', 'Please enter your name to start the quiz');
        return;
    }
    
    // Reset quiz state
    currentQuestionIndex = 0;
    timeLeft = 300; // Reset to 5 minutes
    startTime = Date.now();
    userAnswers = {};
    
    // Get random questions
    randomizedQuestions = getRandomQuestions(10);
    
    // Show quiz page
    navigateTo('quiz');
    displayCurrentQuestion();
    startTimer();
}

function displayCurrentQuestion() {
    const quizContent = document.getElementById('quiz-content');
    const currentQuestion = randomizedQuestions[currentQuestionIndex];
    
    quizContent.innerHTML = `
        <div class="quiz-progress">
            <div class="progress-info">
                <span id="question-counter">Question ${currentQuestionIndex + 1} of ${randomizedQuestions.length}</span>
                <span>Time Remaining: <span id="time">05:00</span></span>
            </div>
            <div class="progress-bar">
                <div id="progress-fill" class="progress-fill" style="width: ${((currentQuestionIndex + 1) / randomizedQuestions.length) * 100}%"></div>
            </div>
        </div>
        <div class="question-container">
            <h3>${currentQuestion.question}</h3>
            <div class="options">
                ${currentQuestion.options.map(option => `
                    <button class="option ${userAnswers[currentQuestionIndex] === option ? 'selected' : ''}" 
                            data-answer="${option}">
                        ${option}
                    </button>
                `).join('')}
            </div>
            <div class="navigation-buttons">
                ${currentQuestionIndex > 0 ? 
                    '<button class="btn-secondary" id="prev-btn">Previous</button>' : 
                    '<div></div>'}
                ${currentQuestionIndex < randomizedQuestions.length - 1 ? 
                    '<button class="btn-secondary" id="next-btn">Next</button>' : 
                    '<button class="btn-primary" id="submit-btn">Submit Quiz</button>'}
            </div>
        </div>
    `;

    // Add event listeners
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', () => selectAnswer(option.dataset.answer));
    });

    if (document.getElementById('prev-btn')) {
        document.getElementById('prev-btn').addEventListener('click', previousQuestion);
    }

    if (document.getElementById('next-btn')) {
        document.getElementById('next-btn').addEventListener('click', nextQuestion);
    }

    if (document.getElementById('submit-btn')) {
        document.getElementById('submit-btn').addEventListener('click', checkQuizCompletion);
    }
}

function selectAnswer(answer) {
    userAnswers[currentQuestionIndex] = answer;
    displayCurrentQuestion();
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayCurrentQuestion();
    }
}

function nextQuestion() {
    if (currentQuestionIndex < randomizedQuestions.length - 1) {
        currentQuestionIndex++;
        displayCurrentQuestion();
    }
}

function checkQuizCompletion() {
    const unansweredQuestions = randomizedQuestions.filter((_, index) => !userAnswers[index]);
    if (unansweredQuestions.length > 0) {
        showToast('warning', 'Unanswered Questions', 
            `You have ${unansweredQuestions.length} unanswered question${unansweredQuestions.length > 1 ? 's' : ''}. 
            Please answer all questions before submitting.`);
        return;
    }
    submitQuiz();
}

function submitQuiz() {
    clearInterval(timer);
    
    let score = 0;
    let correctAnswers = [];
    const completionTime = Math.floor((Date.now() - startTime) / 1000); // Calculate completion time in seconds
    
    randomizedQuestions.forEach((q, index) => {
        if (userAnswers[index] === q.correctAnswer) {
            score += 10;
        }
        correctAnswers.push({
            question: q.question,
            userAnswer: userAnswers[index] || 'Not answered',
            correctAnswer: q.correctAnswer
        });
    });

    const newScore = {
        name: username,
        score: score,
        completionTime: completionTime,
        date: new Date().toISOString()
    };

    // Get current leaderboard from localStorage or initialize with default data
    let leaderboardData = JSON.parse(localStorage.getItem('leaderboard')) || {
        scores: [
            {
                name: "John Smith",
                score: 90,
                completionTime: 245,
                date: "2024-03-15T10:30:00Z"
            },
            {
                name: "Sarah Johnson",
                score: 85,
                completionTime: 280,
                date: "2024-03-15T11:15:00Z"
            },
            {
                name: "Michael Brown",
                score: 95,
                completionTime: 210,
                date: "2024-03-15T12:00:00Z"
            },
            {
                name: "Emily Davis",
                score: 80,
                completionTime: 295,
                date: "2024-03-15T13:45:00Z"
            },
            {
                name: "David Wilson",
                score: 100,
                completionTime: 180,
                date: "2024-03-15T14:20:00Z"
            }
        ]
    };

    // Add new score
    leaderboardData.scores.push(newScore);
    
    // Sort by score (descending) and completion time (ascending)
    leaderboardData.scores.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score; // Higher score first
        }
        return a.completionTime - b.completionTime; // Lower time first for same scores
    });

    // Keep only top 10 scores
    leaderboardData.scores = leaderboardData.scores.slice(0, 10);

    // Save to localStorage
    localStorage.setItem('leaderboard', JSON.stringify(leaderboardData));

    // Check if the new score made it to the leaderboard
    const isInTop10 = leaderboardData.scores.some(entry => 
        entry.name === username && 
        entry.score === score && 
        entry.completionTime === completionTime
    );

    // Update leaderboard display
    updateLeaderboardDisplay(leaderboardData.scores);

    // Show appropriate message
    if (isInTop10) {
        showToast('success', 'Congratulations!', 'You made it to the leaderboard!');
    } else {
        showToast('info', 'Quiz Completed', 'Try again to make it to the leaderboard!');
    }

    showResults(score, correctAnswers);

    /* API Implementation (commented out)
    // Submit score to Lambda function
    fetch('https://x33f954n9g.execute-api.us-east-1.amazonaws.com/prod/leaderboard', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newScore)
    })
    .then(response => response.json())
    .then(data => {
        // Update leaderboard display
        updateLeaderboardDisplay(data.scores);

        // Show appropriate message
        if (data.isInTop10) {
            showToast('success', 'Congratulations!', 'You made it to the leaderboard!');
        } else {
            showToast('info', 'Quiz Completed', 'Try again to make it to the leaderboard!');
        }

        showResults(score, correctAnswers);
    })
    .catch(error => {
        console.error('Error submitting score:', error);
        showToast('error', 'Error', 'Could not update leaderboard');
        showResults(score, correctAnswers);
    });
    */
}

function updateLeaderboardDisplay(scores) {
    const list = document.getElementById('leaders');
    if (!list) return;

    if (scores.length === 0) {
        list.innerHTML = '<div class="no-scores">No scores yet. Be the first to take the quiz!</div>';
        return;
    }

    // Ensure we show up to 10 entries
    const displayScores = scores.slice(0, 10);
    
    list.innerHTML = displayScores
        .map((entry, index) => `
            <div class="leaderboard-item">
                <span class="rank">#${index + 1}</span>
                <span class="name">${entry.name}</span>
                <span class="score">${entry.score}</span>
                <span class="time">${formatTime(entry.completionTime)}</span>
            </div>
        `).join('');
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function showResults(score, correctAnswers) {
  const quizContent = document.getElementById('quiz-content');
  quizContent.innerHTML = `
    <h2>Quiz Results</h2>
    <p class="score-display">Your score: ${score}/100</p>
    <div class="answers-review">
      ${correctAnswers.map((answer, index) => `
        <div class="answer-item ${answer.userAnswer === answer.correctAnswer ? 'correct' : 'incorrect'}">
          <h4>Question ${index + 1}: ${answer.question}</h4>
          <p>Your answer: ${answer.userAnswer}</p>
          <p>Correct answer: ${answer.correctAnswer}</p>
        </div>
      `).join('')}
    </div>
    <div class="navigation-buttons">
      <button id="new-quiz-btn" class="btn-primary">Start New Quiz</button>
      <button id="view-leaderboard-btn" class="btn-secondary">View Leaderboard</button>
    </div>
  `;

  // Add event listeners to the buttons
  document.getElementById('new-quiz-btn').addEventListener('click', () => {
    navigateTo('welcome');
  });

  document.getElementById('view-leaderboard-btn').addEventListener('click', () => {
    navigateTo('leaderboard');
  });
}

function fetchLeaderboard() {
    const list = document.getElementById('leaders');
    if (!list) return;

    // Show loading state
    list.innerHTML = '<div class="loading">Loading leaderboard...</div>';

    // Get leaderboard from localStorage
    const leaderboardData = JSON.parse(localStorage.getItem('leaderboard')) || {
        scores: [
            {
                name: "John Smith",
                score: 90,
                completionTime: 245,
                date: "2024-03-15T10:30:00Z"
            },
            {
                name: "Sarah Johnson",
                score: 85,
                completionTime: 280,
                date: "2024-03-15T11:15:00Z"
            },
            {
                name: "Michael Brown",
                score: 95,
                completionTime: 210,
                date: "2024-03-15T12:00:00Z"
            },
            {
                name: "Emily Davis",
                score: 80,
                completionTime: 295,
                date: "2024-03-15T13:45:00Z"
            },
            {
                name: "David Wilson",
                score: 100,
                completionTime: 180,
                date: "2024-03-15T14:20:00Z"
            }
        ]
    };

    updateLeaderboardDisplay(leaderboardData.scores);

    /* API Implementation (commented out)
    // Fetch leaderboard from Lambda function
    fetch('https://x33f954n9g.execute-api.us-east-1.amazonaws.com/prod/leaderboard')
        .then(response => response.json())
        .then(data => {
            updateLeaderboardDisplay(data.scores);
        })
        .catch(error => {
            console.error('Error loading leaderboard:', error);
            list.innerHTML = `
                <div class="error-message">
                    <p>Unable to load leaderboard.</p>
                    <p>Please try again later.</p>
                </div>`;
        });
    */
}

// Utility functions
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Event listeners
document.getElementById('start-quiz').addEventListener('click', startQuiz);
document.getElementById('username').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        startQuiz();
    }
});

// Initialize
window.onload = () => {
  fetchLeaderboard();
};

// Add this new section after the existing code
function showAbout() {
    const aboutContent = document.getElementById('about-content');
    aboutContent.innerHTML = `
        <div class="about-section">
            <h2>About This Quiz</h2>
            <p>This AWS Quiz application tests your knowledge of Amazon Web Services (AWS) through a series of multiple-choice questions. The quiz covers various AWS services, concepts, and best practices.</p>
            
            <h3>Features</h3>
            <ul>
                <li>10 random questions from a pool of AWS-related topics</li>
                <li>5-minute time limit to complete the quiz</li>
                <li>Immediate feedback on answers</li>
                <li>Leaderboard tracking top scores</li>
                <li>Progress tracking during the quiz</li>
            </ul>

            <h3>Technical Implementation</h3>
            <ul>
                <li>Built with vanilla JavaScript, HTML, and CSS</li>
                <li>Uses localStorage for data persistence</li>
                <li>Responsive design for all devices</li>
                <li>Real-time timer and progress tracking</li>
            </ul>

            <h3>AWS Services Used</h3>
            <ul>
                <li><strong>Amazon S3:</strong> Hosting all static website files (HTML, CSS, JavaScript)</li>
                <li><strong>AWS Amplify:</strong> Continuous deployment and hosting platform</li>
                <li><strong>Benefits:</strong>
                    <ul>
                        <li>Fast and reliable content delivery</li>
                        <li>Automatic HTTPS/SSL certificate management</li>
                        <li>Easy deployment from source code</li>
                        <li>Built-in CI/CD pipeline</li>
                    </ul>
                </li>
            </ul>

            <h3>How to Use</h3>
            <ol>
                <li>Enter your name on the welcome page</li>
                <li>Click "Start Quiz" to begin</li>
                <li>Answer all questions within the time limit</li>
                <li>Review your results and see if you made it to the leaderboard</li>
            </ol>

            <div class="navigation-buttons">
                <button onclick="navigateTo('welcome')" class="btn-primary">Back to Welcome</button>
            </div>
        </div>
    `;
}

// Add event listener for about page
document.addEventListener('DOMContentLoaded', () => {
    const aboutLink = document.querySelector('[data-page="about"]');
    if (aboutLink) {
        aboutLink.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('about');
        });
    }
});

// Text changing animation for About link
const changingText = document.querySelector('.changing-text');
const texts = JSON.parse(changingText.dataset.text);
let currentIndex = 0;
let currentText = '';
let isDeleting = false;
let typingSpeed = 100; // Speed for typing
let deletingSpeed = 50; // Speed for deleting
let pauseTime = 1000; // Time to pause at full text

function typeText() {
    const fullText = texts[currentIndex];
    
    if (isDeleting) {
        // Deleting text
        currentText = fullText.substring(0, currentText.length - 1);
        changingText.textContent = currentText;
        
        if (currentText === '') {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % texts.length;
            setTimeout(typeText, 500); // Pause before typing next word
        } else {
            setTimeout(typeText, deletingSpeed);
        }
    } else {
        // Typing text
        currentText = fullText.substring(0, currentText.length + 1);
        changingText.textContent = currentText;
        
        if (currentText === fullText) {
            isDeleting = true;
            setTimeout(typeText, pauseTime); // Pause at full text
        } else {
            setTimeout(typeText, typingSpeed);
        }
    }
}

// Start the typing animation
typeText();
