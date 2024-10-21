const questions = {
        Behavioral: [
            { question: "Tell me about yourself.", hint: "Focus on your background and experiences." },
            { question: "What are your strengths and weaknesses?", hint: "Be honest but strategic." },
            { question: "Describe a challenging situation you faced.", hint: "Use the STAR method." },
            { question: "How do you handle stress?", hint: "Provide specific techniques." },
            { question: "Why do you want to work here?", hint: "Research the company." },
            { question: "Tell me about a time you worked in a team.", hint: "Highlight collaboration." },
            { question: "Where do you see yourself in five years?", hint: "Align your goals with the role." },
            { question: "What motivates you?", hint: "Think about what drives your success." },
            { question: "How do you prioritize your work?", hint: "Discuss your organizational skills." },
            { question: "Tell me about a time you failed.", hint: "Focus on what you learned." },
        ],
        Technical: [
            { question: "What is your greatest achievement?", hint: "Be specific and relevant." },
            { question: "Why did you choose this career?", hint: "Connect your passions with the role." },
            { question: "What are your salary expectations?", hint: "Do your research beforehand." },
            { question: "What can you bring to this role?", hint: "Focus on your unique skills." },
            { question: "Why should we hire you?", hint: "Summarize your key points." },
            { question: "How do you handle feedback?", hint: "Discuss your openness to learning." },
            { question: "What is your work style?", hint: "Be honest and self-aware." },
            { question: "Tell me about a time you demonstrated leadership.", hint: "Focus on initiative and results." },
            { question: "How do you stay organized?", hint: "Discuss tools and techniques." },
            { question: "What are your hobbies?", hint: "Share relevant interests." },
        ],
        Case: [
            { question: "How would you approach a project that is behind schedule?", hint: "Discuss prioritization and resources." },
            { question: "What would you do if you were given a task with little direction?", hint: "Consider seeking clarity." },
            { question: "How would you handle a disagreement with a team member?", hint: "Focus on communication and resolution." },
            { question: "What steps would you take to analyze a problem?", hint: "Think about a systematic approach." },
            { question: "How would you convince a client to choose your solution?", hint: "Focus on benefits and value." },
            { question: "What would you do if you encountered an ethical dilemma?", hint: "Discuss decision-making frameworks." },
            { question: "How do you approach decision-making?", hint: "Consider analytical versus intuitive methods." },
            { question: "What factors would you consider in a market analysis?", hint: "Think about competition and trends." },
            { question: "How would you assess the success of a project?", hint: "Focus on metrics and feedback." },
            { question: "What strategies would you use to improve team performance?", hint: "Discuss motivation and collaboration." },
        ],
        Traditional: [
            { question: "Tell me about your education.", hint: "Focus on relevant coursework." },
            { question: "What skills have you acquired?", hint: "Be specific and relevant." },
            { question: "How do you stay current in your field?", hint: "Discuss continuous learning." },
            { question: "What do you think makes a good leader?", hint: "Consider traits and examples." },
            { question: "Describe your ideal work environment.", hint: "Align with company culture." },
            { question: "What are your long-term career goals?", hint: "Connect to personal aspirations." },
            { question: "What is your preferred communication style?", hint: "Be clear about your preferences." },
            { question: "How do you approach problem-solving?", hint: "Discuss analytical versus creative methods." },
            { question: "What have you learned from your past jobs?", hint: "Focus on transferable skills." },
            { question: "How would your coworkers describe you?", hint: "Be honest and reflective." },
        ],
    };
    
    let username = '';
    let currentInterviewType = '';
    let currentQuestionIndex = 0;
    let timer = null;
    let ratings = []; // Array to store ratings for each question
    
    document.getElementById('username').addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            startInterview(currentInterviewType);
        }
    });
    
    function startInterview(interviewType) {
        username = document.getElementById('username').value;
        if (username) {
            currentInterviewType = interviewType;
            currentQuestionIndex = 0;
            ratings = []; // Reset ratings for new interview
            document.getElementById('home').classList.add('hidden');
            document.getElementById('question-slide').classList.remove('hidden');
            showQuestion();
        } else {
            alert('Please enter your name.');
        }
    }
    
    function showQuestion() {
        const questionObj = questions[currentInterviewType][currentQuestionIndex];
        document.getElementById('question').innerText = questionObj.question;
    
        // Reset timer
        startTimer(10); // 10 seconds for each question
        document.getElementById('rating-slide').classList.add('hidden'); // Hide rating options initially
        document.getElementById('awkward-message').classList.add('hidden'); // Hide awkward message
        document.getElementById('hint').classList.add('hidden'); // Hide hint initially
    
        // Create a new Currently Answering button for each question
        createCurrentlyAnsweringButton();
        createHintButton(questionObj.hint);
    }
    
    function createCurrentlyAnsweringButton() {
        const buttonContainer = document.getElementById('button-container');
        buttonContainer.innerHTML = ''; // Clear previous buttons
        const currentlyAnsweringButton = document.createElement('button');
        currentlyAnsweringButton.id = 'currently-answering-btn';
        currentlyAnsweringButton.innerText = 'Currently answering';
        currentlyAnsweringButton.onclick = currentlyAnswering;
        buttonContainer.appendChild(currentlyAnsweringButton);
    }
    
    function createHintButton(hint) {
        const hintButton = document.createElement('button');
        hintButton.innerText = 'Give me a hint 💡';
        hintButton.style.background = 'transparent';
        hintButton.style.border = 'none';
        hintButton.style.color = 'white';
        hintButton.style.cursor = 'pointer';
        hintButton.onclick = () => showHint(hintButton, hint);
        document.getElementById('hint-container').innerHTML = ''; // Clear previous hint
        document.getElementById('hint-container').appendChild(hintButton);
    }
    
    function showHint(hintButton, hint) {
        hintButton.innerText = hint; // Replace button text with the hint
        fadeIn(hintButton);
    }
    
    function startTimer(duration) {
        const timerBar = document.getElementById('timer-bar');
        const timerText = document.getElementById('timer-text');
        let timeLeft = duration;
    
        timerBar.style.width = '100%';
        timerText.innerText = `${timeLeft} seconds left`;
    
        // Clear any existing timer
        clearInterval(timer);
    
        timer = setInterval(() => {
            timeLeft--;
            timerText.innerText = `${timeLeft} seconds left`;
            timerBar.style.width = `${(timeLeft / duration) * 100}%`;
    
            if (timeLeft <= 0) {
                clearInterval(timer);
                document.getElementById('awkward-message').classList.remove('hidden');
                document.getElementById('awkward-message').style.opacity = 1; // Fade-in
                setTimeout(() => {
                    fadeOut(document.getElementById('awkward-message'));
                }, 2500); // Fade out after 2.5 seconds
                document.getElementById('rating-slide').style.display = 'block'; // Show rating options
                fadeIn(document.getElementById('rating-slide')); // Fade in the rating options
            }
        }, 1000);
    }
    
    function currentlyAnswering() {
        clearInterval(timer);
        document.getElementById('awkward-message').classList.add('hidden'); // Hide the awkward message
        document.getElementById('rating-slide').style.display = 'block'; // Show rating options
        fadeIn(document.getElementById('rating-slide')); // Fade in the rating options
    }
    
    function fadeIn(element) {
        let opacity = 0; // Start with hidden
        element.style.opacity = opacity;
        element.style.display = 'block'; // Make it visible
        const interval = setInterval(() => {
            if (opacity < 1) {
                opacity += 0.1;
                element.style.opacity = opacity;
            } else {
                clearInterval(interval);
            }
        }, 100); // Fade-in duration
    }
    
    function fadeOut(element) {
        let opacity = 1; // Start with fully visible
        const interval = setInterval(() => {
            if (opacity > 0) {
                opacity -= 0.1;
                element.style.opacity = opacity;
            } else {
                clearInterval(interval);
                element.style.display = 'none'; // Hide it completely after fade-out
            }
        }, 100); // Fade-out duration
    }
    
    function recordRating(rating) {
        ratings.push(rating);
        currentQuestionIndex++;
        if (currentQuestionIndex < questions[currentInterviewType].length) {
            showQuestion();
        } else {
            displayFinalMessage();
            displayScoreboard();
            document.getElementById('final-slide').classList.remove('hidden');
        }
    }
    
    function displayFinalMessage() {
        const score = (ratings.filter(r => r === 'Easy').length / ratings.length) * 100; // Calculate score
        let finalMessage = '';
    
        if (score === 100) {
            finalMessage = "Congrats! You aced that!";
            showConfetti(); // Show confetti when score is 100%
        } else if (score >= 60) {
            finalMessage = "Nice job!";
        } else {
            finalMessage = "Keep trying!";
        }
    
        document.getElementById('final-message').innerText = finalMessage;
    }
    
    function displayScoreboard() {
        const scoreboard = document.getElementById('scoreboard');
        scoreboard.innerHTML = "<h3>Your Ratings:</h3>"; // Clear previous content
        questions[currentInterviewType].forEach((question, index) => {
            scoreboard.innerHTML += `<p>Question ${index + 1}: "${question.question}" - Rated: ${ratings[index]}</p>`;
        });
    }
    
    function showConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti-container';
        document.body.appendChild(confettiContainer);
    
        for (let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.innerText = Math.random() < 0.5 ? '🎊' : '🎉'; // Randomly select emoji
            confetti.style.fontSize = `${Math.random() * 30 + 20}px`; // Random size between 20px and 50px
            confetti.style.position = 'absolute';
            confetti.style.top = '0';
            confetti.style.left = `${Math.random() * 100}vw`;
            confettiContainer.appendChild(confetti);
            
            // Animate confetti falling
            setTimeout(() => {
                confetti.style.transition = 'transform 3s ease-in';
                confetti.style.transform = `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`;
            }, 100);
        }
    
        // Remove confetti after animation
        setTimeout(() => {
            document.body.removeChild(confettiContainer);
        }, 4000);
    }
    
    function goBack() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--; // Move back to the previous question
            document.getElementById('rating-slide').classList.add('hidden'); // Hide rating options
            showQuestion(); // Show the previous question
        }
    }
    

