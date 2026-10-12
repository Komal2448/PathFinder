// App State with multiple arrays for interests and goals
const state = {
  interests: [],
  customInterest: '',
  goals: [], 
  level: '',
  style: '',
  checklistDone: {}
};

function navMenu(page) {
  // Remove 'active' class from all nav links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
  });
  
  if (page === 'home') {
    document.getElementById('nav-home').classList.add('active');
    goToStep(1); 
  } else if (page === 'explore') {
    document.getElementById('nav-explore').classList.add('active');
    goToStep(2);
  } else if (page === 'how') {
    document.getElementById('nav-how').classList.add('active');
    alert("How It Works:\n\n1. Select your core interests.\n2. Choose what you want to achieve (Career, Hobby, etc.).\n3. Set your experience level.\n4. Get a custom roadmap with actionable next steps!");
  }
}

function goToStep(stepIndex) {
  document.querySelectorAll('.step-card').forEach(el => el.classList.remove('active'));
  const target = document.getElementById(`step-${stepIndex}`);
  if (target) target.classList.add('active');
}

function toggleMultiSelect(btn, value) {
  btn.classList.toggle('selected');
  if (state.interests.includes(value)) {
    state.interests = state.interests.filter(i => i !== value);
  } else {
    state.interests.push(value);
  }
}

function toggleMultiSelectGoal(btn, value) {
  btn.classList.toggle('selected');
  if (state.goals.includes(value)) {
    state.goals = state.goals.filter(g => g !== value);
  } else {
    state.goals.push(value);
  }
}

function selectSingle(btn, field, value) {
  const parent = btn.parentElement;
  parent.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  state[field] = value;
}

function validateStep2() {
  const custom = document.getElementById('custom-interest').value.trim();
  state.customInterest = custom;
  if (state.interests.length === 0 && !custom) {
    alert('Please select at least one interest or enter a custom one.');
    return;
  }
  goToStep(3);
}

function validateStep3() {
  if (state.goals.length === 0) {
    alert('Please select at least one goal to proceed.');
    return;
  }
  goToStep(4);
}

function generateRoadmap() {
  if (!state.level || !state.style) {
    alert('Please complete both options to generate your roadmap.');
    return;
  }

  const isTech = state.interests.includes('Technology & Coding');
  const isArt = state.interests.includes('Drawing & Art');
  const isBiz = state.interests.includes('Business & Sales');
  const isWriting = state.interests.includes('Writing & Storytelling');

  let pathways = [];
  let skills = [];
  let projects = [];
  let resources = [];
  let firstAction = '';

  if (isTech && isBiz) {
    pathways = ['Product Management', 'Tech Entrepreneurship', 'Technical Sales', 'Growth Hacking'];
    skills = ['Market Research', 'Agile/Scrum Basics', 'Data Analytics', 'Prototyping', 'Pitching'];
    projects = [
      'Identify a common daily problem and interview 3 people about it',
      'Create a 1-page Lean Canvas business plan for a software solution',
      'Design a basic landing page outlining the product features',
      'Set up an email capture form to see if people want the product',
      'Draft a 5-slide pitch deck'
    ];
    firstAction = 'Write down 3 problems you faced this week that a software tool or app could solve.';
    resources = ['Y Combinator Startup School', 'Book: "The Lean Startup"', 'HubSpot Academy'];
  } else if (isTech && isArt) {
    pathways = ['UI/UX Design', 'Frontend Development', 'Technical Art', 'Game Level Design'];
    skills = ['Color Theory', 'Wireframing (Figma)', 'HTML/CSS Basics', 'User Psychology'];
    projects = [
      'Analyze 3 of your favorite apps and list what makes them easy to use',
      'Sketch a wireframe for a new weather app on a piece of paper',
      'Recreate that wireframe digitally using Figma',
      'Code a simple static HTML/CSS version of the homepage',
      'Ask a friend to test the interface'
    ];
    firstAction = 'Create a free Figma account and complete their official tutorial.';
    resources = ['Figma Community Files', 'MDN Web Docs', 'Google UX Design Certificate'];
  } else if (isTech && isWriting) {
    pathways = ['Technical Writing', 'UX Copywriting', 'Developer Advocate'];
    skills = ['Information Architecture', 'Markdown Editing', 'Audience Empathy'];
    projects = [
      'Find an open-source project with confusing documentation',
      'Rewrite one page of their setup instructions to be simpler',
      'Learn basic Markdown syntax',
      'Write a beginner tutorial for a software tool you use daily',
      'Publish the tutorial on Medium or Dev.to'
    ];
    firstAction = 'Find a piece of software you use and rewrite its "About" page.';
    resources = ['Google Tech Writing Courses', 'Write the Docs', 'Dev.to'];
  } else if (isTech) {
    pathways = ['Software Engineering', 'Backend Development', 'Data Analysis'];
    skills = ['Algorithmic Logic', 'Version Control (Git)', 'Database Basics', 'Debugging'];
    projects = [
      'Install a code editor (like VS Code)',
      'Write a simple CLI calculator script',
      'Create a GitHub account and commit your code',
      'Connect your script to a public API',
      'Push your completed mini-project to a public GitHub repository'
    ];
    firstAction = 'Download Visual Studio Code and write a basic "Hello World" script today.';
    resources = ['FreeCodeCamp.org', 'GitHub Student Developer Pack', 'LeetCode'];
  } else if (isArt) {
    pathways = ['Illustration', 'Graphic Design', 'Character Design', 'Concept Art'];
    skills = ['Line Control', 'Perspective & Form', 'Shading & Values', 'Composition'];
    projects = [
      'Draw an everyday household object using one-point perspective',
      'Design an original character with front and profile views',
      'Create a minimalist poster for an imaginary exhibition',
      'Complete a master study',
      'Compile your 3 best pieces into a digital portfolio folder'
    ];
    firstAction = 'Finish one small object sketch on paper before the week ends.';
    resources = ['Drawabox.com', 'Proko YouTube Channel', 'Behance'];
  } else {
    const primary = state.customInterest || state.interests[0] || 'your chosen field';
    pathways = [`Independent ${primary} Explorer`, `Specialist in ${primary}`, 'Consultant'];
    skills = ['Core Fundamentals', 'Research & Analysis', 'Project Management'];
    projects = [
      `Identify the top 3 foundational concepts of ${primary}`,
      `Read a book or watch a documentary on ${primary}`,
      `Document a summary of what you learned`,
      `Build a small sample project around ${primary}`,
      `Share your findings with a community`
    ];
    firstAction = `Spend 30 focused minutes reading references on ${primary}.`;
    resources = ['Coursera / edX', 'Substack or Medium', 'Reddit topic communities'];
  }

  document.getElementById('first-action-text').innerText = firstAction;
  document.getElementById('pathways-container').innerHTML = pathways.map(p => `<span class="tag">${p}</span>`).join('');
  document.getElementById('skills-container').innerHTML = skills.map(s => `<span class="tag" style="background:#e0f2fe; color:#0369a1;">${s}</span>`).join('');
  document.getElementById('resources-container').innerHTML = resources.map(r => `<li>${r}</li>`).join('');

  const checklistContainer = document.getElementById('checklist-items');
  checklistContainer.innerHTML = '';
  const savedTasks = JSON.parse(localStorage.getItem('pathfinder_progress') || '{}');

  projects.forEach((proj, idx) => {
    const isDone = !!savedTasks[idx];
    const item = document.createElement('div');
    item.className = `checklist-item ${isDone ? 'done' : ''}`;
    item.innerHTML = `
      <input type="checkbox" id="task-${idx}" ${isDone ? 'checked' : ''} onchange="toggleTask(${idx})">
      <label for="task-${idx}" style="cursor:pointer; flex:1;">${proj}</label>
    `;
    checklistContainer.appendChild(item);
  });

  updateProgressBar();
  goToStep(5);
}

function toggleTask(index) {
  const savedTasks = JSON.parse(localStorage.getItem('pathfinder_progress') || '{}');
  savedTasks[index] = !savedTasks[index];
  localStorage.setItem('pathfinder_progress', JSON.stringify(savedTasks));

  const checkbox = document.getElementById(`task-${index}`);
  if (checkbox) {
    checkbox.closest('.checklist-item').classList.toggle('done', checkbox.checked);
  }
  updateProgressBar();
}

function updateProgressBar() {
  const items = document.querySelectorAll('#checklist-items input[type="checkbox"]');
  if (items.length === 0) return;
  const checked = document.querySelectorAll('#checklist-items input[type="checkbox"]:checked');
  const percentage = (checked.length / items.length) * 100;
  document.getElementById('checklist-progress').style.width = `${percentage}%`;
}

function resetAll() {
  localStorage.removeItem('pathfinder_progress');
  location.reload();
}