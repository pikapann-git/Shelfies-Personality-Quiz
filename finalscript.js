/* finalscript.js  (modified scoring & result logic only)
   Based on your uploaded finalscript(old).js — minimal invasive edits:
   - keeps existing questions array, UI flow, and event wiring
   - changes scoring/result computation to pick highest trait and show mapped image
   - normalizes trait keys when looking up images (handles underscores/spaces/typos)
*/

const questions = [

    {
        // Question 1

        question: "You have to shop for groceries today! What are you wearing?",
        answers: {
            A1_1: {
                text: "Comfy and casual",
                scores: { Egg: +1, Tea_Bag: +1 },
                image: "images/Q1/Q1_A1.png",
            },
            
            A2_1: {
                text: "Full-on work mode",
                scores: { Coffee: +1, Soy_Sauce: +1 },
                image: "images/Q1/Q1_A2.png",
            },

            A3_1: {
                text: "The coolest drip ever",
                scores: { Rice: +1, Bread: +1 },
                image: "images/Q1/Q1_A3.png",
            },

            A4_1: {
                text: "I'll go there in my pajamas",
                scores: { Cheese: +1, Salt: +1 },
                image: "images/Q1/Q1_A4.png",
            },

            A5_1: {
                text: "Something very aesthetic",
                scores: { Sugar: +1, Milk: +1 },
                image: "images/Q1/Q1_A5.png",
            },
        },
    },
    {
        // Question 2

        question: "What's your mood today?",
        answers: {
            A1_2: {
                text: "Calm and collected",
                scores: { Milk: +1, Bread: +1 },
                image: "images/Q2/Q2_A1.png",
            },

            A2_2: {
                text: "Absolutely locked in",
                scores: { Rice: +1, Egg: +1 },
                image: "images/Q2/Q2_A2.png",
            },

            A3_2: {
                text: "All hands, ready for drama",
                scores: { Tea_Bag: +1, Soy_Sauce: +1 },
                image: "images/Q2/Q2_A3.png",
            },

            A4_2: {
                text: "No thoughts, empty head",
                scores: { Cheese: +1, Sugar: +1 },
                image: "images/Q2/Q2_A4.png",
            },

            A5_2: {
                text: "I wanna get this over with",
                scores: { Coffee: +1, Salt: +1 },
                image: "images/Q2/Q2_A5.png",
            },

        },
    },
    {
        // Question 3

        question: "What's your shopping cart vibe?",
        answers: {
            A1_3: {
                text: "Balanced! Boring but everything you need :)",
                scores: { Soy_Sauce: +1, Egg: +1 },
                image: "images/Q3/Q3_A1.png",
            },

            A2_3: {
                text: "Functional like quick snacks and energy boosts.",
                scores: { Coffee: +1, Bread: +1 },
                image: "images/Q3/Q3_A2.png",
            },

            A3_3: {
                text: "Daring; full of herbs, spices and trying new things out ",
                scores: { Milk: +1, Tea_Bag: +1 },
                image: "images/Q3/Q3_A3.png",
            },

            A4_3: {
                text: "Absolutely messy. I'll put anything if I could",
                scores: { Cheese: +1, Rice: +1 },
                image: "images/Q3/Q3_A4.png",
            },

            A5_3: {
                text: "Chock-full of artisanal products that caters to a niche taste",
                scores: { Salt: +1, Sugar: +1 },
                image: "images/Q3/Q3_A5.png",
            },
        },
    },
    {
        // Question 4

        question: "It's time to shop! Where do you wanna go",
        answers: {
            A1_4: {
                text: "Fresh and produce corner",
                scores: { Tea_Bag: +1, Rice: +1 },
                image: "images/Q4/Q4_A1.png",
            },

            A2_4: {
                text: "Coffee and drinks aisle",
                scores: { Coffee: +1, Milk: +1 },
                image: "images/Q4/Q4_A2.png",
            },

            A3_4: {
                text: "Bakery section",
                scores: { Bread: +1, Egg: +1 },
                image: "images/Q4/Q4_A3.png",
            },

            A4_4: {
                text: "Candy and snacks area",
                scores: { Sugar: +1, Soy_Sauce: +1 },
                image: "images/Q4/Q4_A4.png",
            },

            A5_4: {
                text: "Free tastings",
                scores: { Cheese: +1, Salt: +1 },
                image: "images/Q4/Q4_A5.png",
            },
        },
    },
    {
        // Question 5

        question: "Put your headphones on. What are you listening?",
        answers: {
            A1_5: {
                text: "Chill lo-fi playlists or relaxing music",
                scores: { Sugar: +1, Milk: +1 },
                image: "images/Q5/Q5_A1.png",
            },

            A2_5: {
                text: "Podcasts or listening to the radio",
                scores: { Tea_Bag: +1, Salt: +1 },
                image: "images/Q5/Q5_A2.png",
            },

            A3_5: {
                text: "Tracks that simply vibe with you",
                scores: { Soy_Sauce: +1, Egg: +1 },
                image: "images/Q5/Q5_A3.png",
            },

            A4_5: {
                text: "The most random songs that you hear when you shuffle",
                scores: { Cheese: +1, Rice: +1 },
                image: "images/Q5/Q5_A4.png",
            },

            A5_5: {
                text: "Just listening to a vlog or a YouTube commentary",
                scores: { Bread: +1, Coffee: +1 },
                image: "images/Q5/Q5_A5.png",
            },

        },
    },
    {
        // Question 6

        question: "It's time to check out! What's your call?",
        answers: {
            A1_6: {
                text: "Organizing your items while patiently waiting",
                scores: { Rice: +1, Soy_Sauce: +1 },
                image: "images/Q6/Q6_A1.png",
            },

            A2_6: {
                text: " Checking your phone for any emails, schedules, etc.",
                scores: { Coffee: +1, Milk: +1 },
                image: "images/Q6/Q6_A2.png",
            },

            A3_6: {
                text: "Casually gossiping with the cashier or the customers behind you",
                scores: { Salt: +1, Egg: +1 },
                image: "images/Q6/Q6_A3.png",
            },

            A4_6: {
                text: "Doomscrolling or watching brainrot videos from your phone",
                scores: { Cheese: +1, Bread: +1 },
                image: "images/Q6/Q6_A4.png",
            },

            A5_6: {
                text: "Daydreaming",
                scores: { Sugar: +1, Tea_Bag: +1 },
                image: "images/Q6/Q6_A5.png",
            },

        },
    },
    {
        // Ending Question 

        question: "Ending scene.",
        image: "test_image.png",
        answers: {
            KRAB: {
                text: "Are you feeling it now Mr. Krabs?",
                scores: { Coffee: +1, Tea_Bag: +1, Salt: +1, Rice: +1, Milk: +1},
            },
            PAT: {
                text: "No, Patrick, Mayonnaise is not an instrument. Horseradish is not an instrument either.",
                scores: { Egg: +1, Sugar: +1, Soy_Sauce: +1, Tea_Bag: +1, Cheese: +1},
            },
        },
    },
];

const resultOptions = {
    "Egg": {
        image: "Egg.png",
        title: "Egg",
        description: "well-rounded, loves company"
    },
    "Coffee": {
        image: "Coffee.png",
        title: "Coffee",
        description: "workaholic, realist"
    },
    "Bread": {
        image: "Bread.png",
        title: "Bread",
        description: "warm and dependable, can get along with others easily"
    },
    "Tea Bag": {
        image: "Tea_Bag.png",
        title: "Tea Bag",
        description: "the friend who gives advice"
    },
    "Rice": {
        image: "Rice.png",
        title: "Rice",
        description: "the MVP, the one who carries everyone"
    },
    "Sugar": {
        image: "Sugar.png",
        title: "Sugar",
        description: "hopeless romantic"
    },
    "Milk": {
        image: "Milk.png",
        title: "Milk",
        description: "the parental figure of the group"
    },
    "Salt": {
        image: "Salt.png",
        title: "Salt",
        description: "sassy, down-to-earth"
    },
    "Cheese": {
        image: "Cheese.png",
        title: "Cheese",
        description: "loves telling corny jokes"
    },
    "Soy Sauce": { 
        image: "Soy_Sauce.png",
        title: "Soy Sauce",
        description: "sociable and fixer-upper"
    },
};

let currentQuestion = 0;
let userAnswers = {}; // keep this global so showResult/others can read it

// Display Question function
function displayQuestion() {
    const quizElement = document.getElementById('quiz');
    const question = questions[currentQuestion];
    if (!quizElement) return;

    if (question) {
        // Start markup: question text and optional question-level image
        let html = `<div class="question-block">`;
        html += `<p class="question-text">${escapeHtml(question.question)}</p>`;

        // optional big question image (keeps your existing behavior)
        if (question.image) {
            // put question-level image above answers (small preview)
            html += `<div class="question-main-image-wrap" style="text-align:center;margin-bottom:10px;">
                        <img src="${escapeHtml(question.image)}" alt="Question ${currentQuestion + 1}" style="max-width:100%;height:auto;border-radius:6px;" />
                     </div>`;
        }

        // Answers area: create a flexible grid that holds image above each button
        html += `<div class="answers-grid" style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;">`;

        // For each option, create a small wrapper with an image (if provided) above the button
        for (const option in question.answers) {
            const opt = question.answers[option];
            const optImage = opt && opt.image ? opt.image : null;

            // wrapper width — adjust as necessary (uses responsive calc to try to fit 2-3 per row)
            // You can override in CSS later; inline style avoids needing HTML edits
            html += `<div class="answer-wrapper" style="width:calc(50% - 12px); max-width:220px; text-align:center;">`;

            if (optImage) {
                html += `<div class="answer-thumb" style="margin:0 0 6px 0;">
                           <img src="${escapeHtml(optImage)}" alt="${escapeHtml(opt.text)}" style="max-width:120px; width:100%; height:auto; display:block; margin:0 auto; border-radius:8px;" />
                         </div>`;
            }

            // button stays same class so existing handlers still find it
            html += `<button class="large-rectangular" value="${escapeHtml(option)}" id="${escapeHtml(option)}" style="width:100%;">${escapeHtml(opt.text)}</button>`;

            html += `</div>`; // .answer-wrapper
        }

        html += `</div>`; // .answers-grid
        html += `</div>`; // .question-block

        quizElement.innerHTML = html;
        attachButtonClickHandlers();
    } else {
        // no question found — nothing to display
        quizElement.innerHTML = '';
    }
}

// Attach onclick event handlers to buttons
function attachButtonClickHandlers() {
    const choiceButtons = document.querySelectorAll('.large-rectangular');
    choiceButtons.forEach((button) => {
        // remove old handlers to avoid duplicates (safe-guard)
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        newButton.addEventListener('click', handleAnswer);
    });
}

// Answer handling function
function handleAnswer(event) {
    const selectedOption = event.target;
    const answerKey = selectedOption.value;
    const question = questions[currentQuestion];
    const answer = question.answers[answerKey];

    // If the answer has a scores object, increment; otherwise ignore (e.g., ending scene)
    if (answer && answer.scores && typeof answer.scores === 'object') {
        for (const dimension in answer.scores) {
            // ensure numeric increment (in case the value is +1)
            const inc = Number(answer.scores[dimension]) || (answer.scores[dimension] === +1 ? 1 : 0);
            userAnswers[dimension] = (userAnswers[dimension] || 0) + inc;
        }
    } else {
        // no scores to apply (ending / informational answers)
        // Do nothing — preserves original behavior
    }
    

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
    } else {
        showResult();
    }
}

function normalizeKey(k) {
    if (!k) return '';
    // lowercase, remove non-word characters (space, underscores, punctuation)
    return String(k).toLowerCase().replace(/[^a-z0-9]/g, '');
}

function buildNormalizedResultMap(resultOptionsObj) {
    const norm = {};
    for (const key in resultOptionsObj) {
        norm[normalizeKey(key)] = { origKey: key, data: resultOptionsObj[key] };
    }
    return norm;
}

function escapeHtml(str) {
  return String(str === undefined || str === null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function showResult() {
    const resultElement = document.getElementById('result');
    let resultTextContainer = document.querySelector('.result-text');
    let resultImage = document.getElementById('result-image');

    const normMap = buildNormalizedResultMap(resultOptions);

    // If there are no recorded scores (user skipped scoring questions), gracefully handle
    if (!userAnswers || Object.keys(userAnswers).length === 0) {
        // show a fallback message
        if (resultTextContainer) {
            resultTextContainer.innerHTML = `<p>No trait data collected. Try answering the quiz questions.</p>`;
        }
        if (resultImage) {
            resultImage.src = 'images/placeholder.png';
            resultImage.alt = 'Placeholder';
        }
        document.getElementById('quiz').style.display = 'none';
        if (resultElement) resultElement.style.display = 'block';
        document.getElementById('restart-button').style.display = 'block';
        return;
    }

    // Find top traits
    let maxScore = -Infinity;
    const topTraits = [];
    for (const trait in userAnswers) {
        const v = Number(userAnswers[trait]) || 0;
        if (v > maxScore) {
            maxScore = v;
            topTraits.length = 0;
            topTraits.push(trait);
        } else if (v === maxScore) {
            topTraits.push(trait);
        }
    }

    // Tie handling (deterministic): choose first alphabetically of topTraits (you can change this logic)
    topTraits.sort();
    const winnerTrait = topTraits[0];

    // Try direct lookup in resultOptions first
    let personalityData = resultOptions[winnerTrait];

    // If not found, try normalized lookup (handles underscores/spaces/typos like 'Suagr' -> normalize)
    if (!personalityData) {
        const nk = normalizeKey(winnerTrait);
        if (normMap[nk]) personalityData = normMap[nk].data;
        else {
            
            const alt1 = String(winnerTrait).replace(/_/g, ' ');
            const alt2 = String(winnerTrait).replace(/\s+/g, '_');
            if (resultOptions[alt1]) personalityData = resultOptions[alt1];
            else if (resultOptions[alt2]) personalityData = resultOptions[alt2];
        }
    }

    // Prepare and show result content
    // Ensure resultTextContainer and resultImage exist; if not, create them inside #result

    if (!resultElement) {
        console.warn('showResult: #result element not found in DOM.');
    } else {
        if (!resultTextContainer) {
            resultTextContainer = document.createElement('div');
            resultTextContainer.className = 'result-text';
            resultElement.appendChild(resultTextContainer);
        }
        if (!resultImage) {
            resultImage = document.createElement('img');
            resultImage.id = 'result-image';
            resultImage.alt = 'result image';
            resultElement.appendChild(resultImage);
        }
    }

    // Build trait breakdown HTML
    let traitHtml = '<h3>Your trait scores</h3><ul>';
    const allTraits = Object.keys(userAnswers).sort();
    for (const t of allTraits) {
        traitHtml += `<li>${t}: ${userAnswers[t] || 0}</li>`;
    }
    traitHtml += '</ul>';

    // Compose displayed top-trait info
    let displayTitle = `Top trait: ${winnerTrait} (${maxScore})`;
    let displayDesc = '';
    let displayImagePath = 'images/placeholder.png';

    if (personalityData) {
        displayImagePath = 'images/Pages/' + personalityData.image;
        
    }

    if (!resultElement) {
  console.warn('showResult: #result element not found in DOM.');
  return;
}

// Create/reuse result sub-elements
    let titleEl = document.getElementById('result-title');
    let descEl  = document.getElementById('result-desc');
    let imgEl   = document.getElementById('result-image');

    // Ensure a result text container exists
    if (!resultTextContainer) {
        resultTextContainer = document.createElement('div');
        resultTextContainer.className = 'result-text';
        resultElement.appendChild(resultTextContainer);
    }

    // Create title/desc/image if missing
    if (!titleEl) {
        titleEl = document.createElement('h2');
        titleEl.id = 'result-title';
        resultTextContainer.appendChild(titleEl);
    }
    if (!descEl) {
        descEl = document.createElement('p');
        descEl.id = 'result-desc';
        resultTextContainer.appendChild(descEl);
    }
    if (!imgEl) {
        imgEl = document.createElement('img');
        imgEl.id = 'result-image';
        imgEl.alt = 'result image';
        // place image before the text block
        resultElement.insertBefore(imgEl, resultTextContainer);
    }

    // Fill content (use textContent to avoid HTML injection)
    titleEl.textContent = (personalityData && (personalityData.title || personalityData.name)) || displayTitle || `Top trait: ${winnerTrait}`;
    descEl.textContent  = (personalityData && (personalityData.description || personalityData.desc)) || displayDesc || '';
    imgEl.src = displayImagePath || (personalityData && (personalityData.image ? ('images/' + personalityData.image) : null)) || 'images/placeholder.png';
    imgEl.alt = (personalityData && personalityData.title) ? personalityData.title : winnerTrait || 'result image';

    // Build a clean trait-score breakdown (DOM-based)
    // let breakdown = document.getElementById('result-trait-breakdown');
    // if (breakdown) breakdown.remove(); // remove old one if present
    // breakdown = document.createElement('div');
    // breakdown.id = 'result-trait-breakdown';
    // const ul = document.createElement('ul');

    // const sortedTraits = Object.keys(userAnswers || {}).sort();
    // for (const t of sortedTraits) {
    // const li = document.createElement('li');
    // li.textContent = `${t}: ${userAnswers[t] || 0}`;
    // ul.appendChild(li);
    // }
    // breakdown.appendChild(ul);
    // resultTextContainer.appendChild(breakdown);

    // Show/hide UI
    const quizEl = document.getElementById('quiz');
    if (quizEl) quizEl.style.display = 'none'; // Hide the quiz
    if (resultElement) resultElement.style.display = 'block'; // Show the result
    const restartBtn = document.getElementById('restart-button');
    if (restartBtn) restartBtn.style.display = 'block'; // Show the restart button
}

//Function to restart the quiz
function restartQuiz() {
    currentQuestion = 0;
    userAnswers = {};

    document.getElementById('result').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    displayQuestion(); // Start the quiz from the beginning
}

// Main starters
function attachMainListeners(){
    const startBtn = document.getElementById('start-button');
    const restartBtn = document.getElementById('restart-button');

    if (startBtn) {
        startBtn.addEventListener('click', function() {
        const sp = document.getElementById('start-page');
        const qp = document.getElementById('quiz-page');
        if (sp) sp.style.display = 'none';
        if (qp) qp.style.display = 'block';
        currentQuestion = 0;
        userAnswers = {};
        displayQuestion();
    });
    } else {
        console.warn('finalscript.js: start-button not found — quiz will try to auto-start.');
    }

    if (restartBtn) {
        restartBtn.addEventListener('click', restartQuiz);
    } else {
        console.warn('finalscript.js: restart-button not found (restart may be unavailable).');
    }

    // If there's no start button, assume we should start the quiz automatically.
    if (!startBtn) {

    // small timeout to ensure other initialization finished
        setTimeout(() => {
            try { displayQuestion(); } catch (e) { /* ignore */ }
        }, 0);
    }
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachMainListeners);
} else {
    attachMainListeners();
}