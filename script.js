// Chapters and quiz questions

const chapters = {

  science: [

    "Matter in Our Surroundings",

    "Cell – The Basic Unit",

    "Tissues",

    "Motion"

    // add more science chapters here

  ],

  maths: [

    "Number Systems",

    "Polynomials",

    "Coordinate Geometry"

    // add more maths chapters here

  ],

  english: [

    "Grammar",

    "The Fun They Had",

    "The Road Not Taken"

    // add more english chapters here

  ],

  sst: [

    "French Revolution",

    "Nazism and the Rise of Hitler"

    // add more SST chapters here

  ]

};

const quizQuestions = {

  "Matter in Our Surroundings": [

    {q: "Water is a/an ____?", opts:["element","compound","atom","mixture"], a: 1},

    {q: "Which state of matter has no fixed shape?", opts:["Solid","Liquid","Gas","All"], a: 2}

  ],

  "The Fun They Had": [

    {q: "Who is Margie?", opts:["Teacher","Student","Writer","Scientist"], a: 1}

  ]

  // add more quizzes per chapter

};

function showChapters() {

  let subject = document.getElementById("subject").value;

  let chapterSelect = document.getElementById("chapter");

  chapterSelect.innerHTML = "";

  if (subject && chapters[subject]) {

    chapterSelect.innerHTML = '<option value="">--Choose Chapter--</option>';

    chapters[subject].forEach(ch => {

      let opt = document.createElement("option");

      opt.value = ch;

      opt.text = ch;

      chapterSelect.appendChild(opt);

    });

  }

  hideSections();

}

function hideSections() {

  document.getElementById("notes-section").style.display = "block";

  document.getElementById("quiz-section").style.display = "none";

  document.getElementById("doubt-section").style.display = "block";

  document.getElementById("notes-view").innerHTML = "Choose a chapter to see notes.";

}

function showUploadAndQuiz() {

  let chapter = document.getElementById("chapter").value;

  if (chapter) {

    document.getElementById("notes-section").style.display = "block";

    document.getElementById("quiz-section").style.display = "block";

    document.getElementById("notes-view").innerHTML = "Upload or see notes for " + chapter + ":<br>(Note: Real notes listing needs a backend)";

    document.getElementById("quiz-view").innerHTML = "Quiz available for: " + chapter;

  } else {

    hideSections();

  }

}

// Dummy Quiz (client-side only)

function startQuiz() {

  let chapter = document.getElementById("chapter").value;

  let quizDiv = document.getElementById("quiz-view");

  let qs = quizQuestions[chapter] || [{q:"No quiz for this chapter yet.", opts:[""], a:0}];

  let i = 0, score = 0;

  function renderQ() {

    if(i >= qs.length) {

      quizDiv.innerHTML = "Quiz Finished! Your score: " + score + "/" + qs.length;

      return;

    }

    let qObj = qs[i];

    quizDiv.innerHTML = `<p>${qObj.q}</p>`;

    qObj.opts.forEach((opt, idx) => {

      quizDiv.innerHTML += `<button onclick="window.submitAns(${idx})">${opt}</button> `;

    });

  }

  window.submitAns = function(optIdx) {

    if(qs[i].a === optIdx) score++;

    i++; renderQ();

  };

  renderQ();

}

// Doubt submission and teacher reminder display

document.getElementById("doubtForm").onsubmit = function(e){

  e.preventDefault();

  document.getElementById("doubtReminder").textContent =

    "Teacher will receive your doubt soon! Reminder sent.";

  setTimeout(()=>document.getElementById("doubtReminder").textContent="",6000);

  this.reset();

};

