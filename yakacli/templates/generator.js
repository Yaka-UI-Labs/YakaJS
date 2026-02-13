/**
 * Template Generator for YakaCLI
 * Generates project files based on template type
 */

// Template content generators
const generators = {
    // Basic template
    basic: {
        'index.html': (projectName) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName} - YakaJS</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <h1 id="title">Welcome to ${projectName}! 🚀</h1>
        <p>This is a YakaJS project. Start building amazing things!</p>
        
        <button id="demo-btn" class="btn">Click Me!</button>
        
        <div id="output" class="output"></div>
    </div>
    
    <!-- YakaJS CDN -->
    <script src="https://cdn.jsdelivr.net/gh/Yaka-UI-Labs/YakaJS@latest/min.yaka.js"></script>
    <script src="js/app.js"></script>
</body>
</html>`,
        'css/style.css': () => `/* ${new Date().getFullYear()} YakaJS Project */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    line-height: 1.6;
    color: #333;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.container {
    background: white;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    max-width: 600px;
    text-align: center;
}

h1 {
    color: #667eea;
    margin-bottom: 20px;
    font-size: 2.5em;
}

p {
    margin-bottom: 30px;
    color: #666;
    font-size: 1.1em;
}

.btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 15px 40px;
    font-size: 1.1em;
    border-radius: 50px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}

.btn:active {
    transform: translateY(0);
}

.output {
    margin-top: 30px;
    padding: 20px;
    background: #f7f7f7;
    border-radius: 8px;
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #667eea;
    font-weight: bold;
}`,
        'js/app.js': (projectName) => `/**
 * ${projectName} - Main Application
 * Powered by YakaJS
 */

// Wait for DOM to be ready
_(() => {
    console.log('🚀 YakaJS is ready!');
    
    // Enable debug mode in development
    _.debug = true;
    
    // Demo: Button click handler
    _('#demo-btn').on('click', () => {
        const messages = [
            'YakaJS is awesome! 🎉',
            'Building with YakaJS is fun! 🚀',
            'You\'re doing great! ⭐',
            'Keep coding! 💻',
            'YakaJS makes it easy! ✨'
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        _('#output')
            .html(\`<p>\${randomMessage}</p>\`)
            .fadeIn(400);
        
        // Animate the button
        _('#demo-btn').pulse(2);
    });
    
    // Add smooth scroll behavior
    _('html').css('scroll-behavior', 'smooth');
});`,
        'README.md': (projectName) => `# ${projectName}

A YakaJS project created with YakaCLI.

## Getting Started

1. Open \`index.html\` in your browser
2. Or use a local development server:

\`\`\`bash
# Using Node.js
npx http-server

# Using Python
python -m http.server
\`\`\`

## Project Structure

\`\`\`
${projectName}/
├── index.html       # Main HTML file
├── css/
│   └── style.css    # Styles
└── js/
    └── app.js       # Application logic
\`\`\`

## Documentation

- [YakaJS Documentation](https://github.com/Yaka-UI-Labs/YakaJS)
- [API Reference](https://github.com/Yaka-UI-Labs/YakaJS#-features)

## License

MIT
`
    },
    
    // SPA template
    spa: {
        'index.html': (projectName) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName} - YakaJS SPA</title>
    <link rel="stylesheet" href="css/theme.css">
    <link rel="stylesheet" href="css/components.css">
</head>
<body>
    <div id="app">
        <nav id="navbar"></nav>
        <main id="content"></main>
    </div>
    
    <!-- YakaJS CDN -->
    <script src="https://cdn.jsdelivr.net/gh/Yaka-UI-Labs/YakaJS@latest/min.yaka.js"></script>
    <script src="js/router.js"></script>
    <script src="js/store.js"></script>
    <script src="js/components/navbar.js"></script>
    <script src="js/components/home.js"></script>
    <script src="js/components/404.js"></script>
    <script src="js/app.js"></script>
</body>
</html>`,
        'css/theme.css': () => `/* Theme & Base Styles */

:root {
    --primary: #667eea;
    --primary-dark: #5568d3;
    --secondary: #764ba2;
    --background: #ffffff;
    --text: #333333;
    --border: #e0e0e0;
    --shadow: rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] {
    --background: #1a1a1a;
    --text: #ffffff;
    --border: #333333;
    --shadow: rgba(0, 0, 0, 0.3);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    line-height: 1.6;
    color: var(--text);
    background: var(--background);
    transition: background 0.3s, color 0.3s;
}

#app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

main {
    flex: 1;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
}`,
        'css/components.css': () => `/* Component Styles */

/* Navbar */
nav {
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    padding: 1rem 2rem;
    box-shadow: 0 2px 10px var(--shadow);
}

nav ul {
    list-style: none;
    display: flex;
    gap: 2rem;
    align-items: center;
}

nav a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: opacity 0.2s;
}

nav a:hover {
    opacity: 0.8;
}

nav a.active {
    border-bottom: 2px solid white;
}

/* Buttons */
.btn {
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 25px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    transition: transform 0.2s, box-shadow 0.2s;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

/* Cards */
.card {
    background: var(--background);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 2px 10px var(--shadow);
    transition: transform 0.2s;
}

.card:hover {
    transform: translateY(-5px);
}

/* Loading */
.loading {
    text-align: center;
    padding: 3rem;
    color: var(--primary);
}`,
        'js/router.js': () => `/**
 * Router Configuration
 */

let router;

function initRouter() {
    router = _.createRouter({
        mode: 'hash'
    });
    
    // Define routes
    router.addRoute('/', {
        name: 'home',
        component: renderHome,
        beforeEnter: (to, from, next) => {
            console.log('Navigating to home');
            next();
        }
    });
    
    router.addRoute('/about', {
        name: 'about',
        component: renderAbout
    });
    
    // 404 handler
    router.setNotFound({
        component: render404
    });
    
    // Global guards
    router.beforeEach((to, from, next) => {
        _('#content').html('<div class="loading">Loading...</div>');
        next();
    });
    
    router.afterEach((to, from) => {
        updateActiveNav(to.path);
    });
    
    return router;
}

function updateActiveNav(path) {
    _('nav a').removeClass('active');
    _(\`nav a[href="#\${path}"]\`).addClass('active');
}

function renderAbout() {
    return \`
        <div class="card">
            <h1>About This App</h1>
            <p>Built with YakaJS - A modern JavaScript library.</p>
            <p>This is a single-page application (SPA) with routing and state management.</p>
        </div>
    \`;
}`,
        'js/store.js': () => `/**
 * State Management Store
 */

const store = _.createStore({
    state: {
        user: null,
        count: 0,
        items: []
    },
    
    getters: {
        isLoggedIn: (state) => state.user !== null,
        itemCount: (state) => state.items.length
    },
    
    mutations: {
        increment(state) {
            state.count++;
        },
        
        setUser(state, user) {
            state.user = user;
        },
        
        addItem(state, item) {
            state.items.push(item);
        }
    },
    
    actions: {
        async fetchUser({ commit }) {
            // Simulate API call
            const user = { name: 'Demo User', id: 1 };
            commit('setUser', user);
        }
    }
});`,
        'js/components/navbar.js': (projectName) => `/**
 * Navigation Bar Component
 */

function renderNavbar() {
    const html = \`
        <ul>
            <li><strong>${projectName}</strong></li>
            <li><a href="#/" class="active">Home</a></li>
            <li><a href="#/about">About</a></li>
            <li><button id="theme-toggle" class="btn">🌙</button></li>
        </ul>
    \`;
    
    _('#navbar').html(html);
    
    // Theme toggle
    _('#theme-toggle').on('click', () => {
        _.theme.toggle();
        const isDark = _.theme.current() === 'dark';
        _('#theme-toggle').text(isDark ? '☀️' : '🌙');
    });
}`,
        'js/components/home.js': () => `/**
 * Home Page Component
 */

function renderHome() {
    return \`
        <div class="card">
            <h1>Welcome to Your YakaJS SPA! 🚀</h1>
            <p>This is a single-page application with routing and state management.</p>
            
            <div style="margin: 2rem 0;">
                <button id="increment-btn" class="btn">
                    Count: <span id="count">0</span>
                </button>
            </div>
            
            <p><small>Try navigating to different pages and toggling the theme!</small></p>
        </div>
    \`;
}

// Initialize home page interactions
function initHomeInteractions() {
    _('#increment-btn').on('click', () => {
        store.commit('increment');
        _('#count').text(store.state.count);
    });
}`,
        'js/components/404.js': () => `/**
 * 404 Not Found Component
 */

function render404() {
    return \`
        <div class="card" style="text-align: center;">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>The page you're looking for doesn't exist.</p>
            <button onclick="router.navigateTo('/')" class="btn">Go Home</button>
        </div>
    \`;
}`,
        'js/app.js': () => `/**
 * Main Application Entry Point
 */

_(() => {
    console.log('🚀 YakaJS SPA is ready!');
    
    // Enable debug mode
    _.debug = true;
    
    // Initialize components
    renderNavbar();
    
    // Initialize router
    initRouter();
    router.init();
    
    // Watch for route changes to reinitialize interactions
    router.afterEach(() => {
        if (router.currentRoute.name === 'home') {
            setTimeout(initHomeInteractions, 100);
        }
    });
    
    // Initialize theme based on user preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        _.theme.dark();
        _('#theme-toggle').text('☀️');
    }
});`,
        'README.md': (projectName) => `# ${projectName}

A YakaJS Single Page Application (SPA) with routing and state management.

## Features

- ✅ Client-side routing with YakaJS Router
- ✅ State management with YakaJS Store
- ✅ Dark/Light theme support
- ✅ Component-based architecture
- ✅ Modern UI design

## Getting Started

Use a local development server:

\`\`\`bash
# Using Node.js
npx http-server

# Using Python
python -m http.server
\`\`\`

Then open http://localhost:8080 in your browser.

## Project Structure

\`\`\`
${projectName}/
├── index.html
├── css/
│   ├── theme.css         # Theme variables
│   └── components.css    # Component styles
└── js/
    ├── router.js         # Routing configuration
    ├── store.js          # State management
    ├── components/       # UI components
    │   ├── navbar.js
    │   ├── home.js
    │   └── 404.js
    └── app.js            # Main entry point
\`\`\`

## License

MIT
`
    },
    
    // Dashboard template
    dashboard: {
        'index.html': (projectName) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName} - Dashboard</title>
    <link rel="stylesheet" href="css/dashboard.css">
    <link rel="stylesheet" href="css/responsive.css">
</head>
<body>
    <div class="dashboard">
        <aside class="sidebar">
            <h2>Dashboard</h2>
            <nav>
                <a href="#" class="active">📊 Overview</a>
                <a href="#">👥 Users</a>
                <a href="#">📈 Analytics</a>
                <a href="#">⚙️ Settings</a>
            </nav>
        </aside>
        
        <main class="content">
            <header>
                <h1>${projectName}</h1>
                <div class="user-info">
                    <span id="username">Admin</span>
                    <button id="logout-btn">Logout</button>
                </div>
            </header>
            
            <div class="stats">
                <div class="stat-card">
                    <h3>Total Users</h3>
                    <p class="stat-value" id="total-users">0</p>
                </div>
                <div class="stat-card">
                    <h3>Revenue</h3>
                    <p class="stat-value" id="revenue">$0</p>
                </div>
                <div class="stat-card">
                    <h3>Active Sessions</h3>
                    <p class="stat-value" id="sessions">0</p>
                </div>
                <div class="stat-card">
                    <h3>Growth</h3>
                    <p class="stat-value" id="growth">0%</p>
                </div>
            </div>
            
            <div class="data-table">
                <h2>Recent Activity</h2>
                <table id="activity-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Action</th>
                            <th>Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </main>
    </div>
    
    <!-- YakaJS CDN -->
    <script src="https://cdn.jsdelivr.net/gh/Yaka-UI-Labs/YakaJS@latest/min.yaka.js"></script>
    <script src="js/store.js"></script>
    <script src="js/components.js"></script>
    <script src="js/app.js"></script>
</body>
</html>`,
        'css/dashboard.css': () => `/* Dashboard Styles */

:root {
    --primary: #667eea;
    --secondary: #764ba2;
    --success: #48bb78;
    --warning: #f6ad55;
    --danger: #f56565;
    --sidebar-bg: #2d3748;
    --sidebar-text: #e2e8f0;
    --bg: #f7fafc;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background: var(--bg);
}

.dashboard {
    display: flex;
    min-height: 100vh;
}

/* Sidebar */
.sidebar {
    width: 250px;
    background: var(--sidebar-bg);
    color: var(--sidebar-text);
    padding: 2rem;
}

.sidebar h2 {
    margin-bottom: 2rem;
    font-size: 1.5rem;
}

.sidebar nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.sidebar nav a {
    color: var(--sidebar-text);
    text-decoration: none;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    transition: background 0.2s;
}

.sidebar nav a:hover,
.sidebar nav a.active {
    background: rgba(255, 255, 255, 0.1);
}

/* Main Content */
.content {
    flex: 1;
    padding: 2rem;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 1rem;
}

#logout-btn {
    background: var(--danger);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
}

/* Stats Grid */
.stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.stat-card {
    background: white;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.stat-card h3 {
    color: #718096;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
}

.stat-value {
    font-size: 2rem;
    font-weight: bold;
    color: var(--primary);
}

/* Data Table */
.data-table {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.data-table h2 {
    margin-bottom: 1rem;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
}

th {
    background: #f7fafc;
    font-weight: 600;
}

.status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.85rem;
    font-weight: 500;
}

.status-success {
    background: #c6f6d5;
    color: #22543d;
}

.status-pending {
    background: #feebc8;
    color: #744210;
}`,
        'css/responsive.css': () => `/* Responsive Styles */

@media (max-width: 768px) {
    .dashboard {
        flex-direction: column;
    }
    
    .sidebar {
        width: 100%;
        padding: 1rem;
    }
    
    .sidebar h2 {
        margin-bottom: 1rem;
    }
    
    .sidebar nav {
        flex-direction: row;
        overflow-x: auto;
    }
    
    .stats {
        grid-template-columns: repeat(2, 1fr);
    }
    
    table {
        font-size: 0.9rem;
    }
    
    th, td {
        padding: 0.5rem;
    }
}`,
        'js/store.js': () => `/**
 * Dashboard State Management
 */

const dashboardStore = _.createStore({
    state: {
        user: {
            name: 'Admin',
            role: 'Administrator'
        },
        stats: {
            totalUsers: 0,
            revenue: 0,
            sessions: 0,
            growth: 0
        },
        activities: []
    },
    
    mutations: {
        updateStats(state, stats) {
            state.stats = { ...state.stats, ...stats };
        },
        
        addActivity(state, activity) {
            state.activities.unshift(activity);
            if (state.activities.length > 10) {
                state.activities.pop();
            }
        }
    },
    
    actions: {
        async loadDashboardData({ commit }) {
            // Simulate API call
            const stats = {
                totalUsers: 1234,
                revenue: 45678,
                sessions: 156,
                growth: 23.5
            };
            commit('updateStats', stats);
        }
    }
});`,
        'js/components.js': () => `/**
 * Dashboard Components
 */

function updateStatsDisplay() {
    const stats = dashboardStore.state.stats;
    
    _('#total-users').text(stats.totalUsers.toLocaleString());
    _('#revenue').text('$' + stats.revenue.toLocaleString());
    _('#sessions').text(stats.sessions);
    _('#growth').text(stats.growth + '%');
}

function generateMockActivities() {
    const users = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Williams'];
    const actions = ['Login', 'Created Post', 'Updated Profile', 'Uploaded File'];
    const statuses = ['success', 'pending'];
    
    for (let i = 0; i < 5; i++) {
        const activity = {
            user: users[Math.floor(Math.random() * users.length)],
            action: actions[Math.floor(Math.random() * actions.length)],
            time: \`\${Math.floor(Math.random() * 60)} min ago\`,
            status: statuses[Math.floor(Math.random() * statuses.length)]
        };
        
        dashboardStore.commit('addActivity', activity);
    }
}

function renderActivities() {
    const tbody = _('#activity-table tbody');
    tbody.html('');
    
    dashboardStore.state.activities.forEach(activity => {
        const statusClass = activity.status === 'success' ? 'status-success' : 'status-pending';
        const row = \`
            <tr>
                <td>\${activity.user}</td>
                <td>\${activity.action}</td>
                <td>\${activity.time}</td>
                <td><span class="status-badge \${statusClass}">\${activity.status}</span></td>
            </tr>
        \`;
        tbody.append(row);
    });
}`,
        'js/app.js': (projectName) => `/**
 * ${projectName} - Dashboard Application
 */

_(() => {
    console.log('🚀 Dashboard ready!');
    
    _.debug = true;
    
    // Load dashboard data
    dashboardStore.dispatch('loadDashboardData').then(() => {
        updateStatsDisplay();
    });
    
    // Generate mock activities
    generateMockActivities();
    renderActivities();
    
    // Watch for activity changes
    dashboardStore.watch('activities', () => {
        renderActivities();
    });
    
    // Logout handler
    _('#logout-btn').on('click', () => {
        if (confirm('Are you sure you want to logout?')) {
            console.log('Logging out...');
            _.notify('Logged out successfully', 'success');
        }
    });
    
    // Animate stats on load
    _('.stat-card').each(function(index) {
        _(this).css('opacity', '0').css('transform', 'translateY(20px)');
        setTimeout(() => {
            _(this).animate({
                opacity: 1,
                transform: 'translateY(0)'
            }, 400);
        }, index * 100);
    });
});`,
        'README.md': (projectName) => `# ${projectName}

An admin dashboard built with YakaJS.

## Features

- ✅ Statistics overview
- ✅ Activity tracking
- ✅ Responsive design
- ✅ State management
- ✅ Modern UI

## Getting Started

\`\`\`bash
# Using Node.js
npx http-server

# Using Python
python -m http.server
\`\`\`

## License

MIT
`
    },
    
    // PWA template
    pwa: {
        'index.html': (projectName) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#667eea">
    <meta name="description" content="${projectName} - Progressive Web App">
    <title>${projectName} - PWA</title>
    <link rel="manifest" href="manifest.json">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <h1>${projectName}</h1>
        <p>Progressive Web App built with YakaJS</p>
        
        <div class="status">
            <p id="online-status">🟢 Online</p>
            <button id="install-btn" class="btn" style="display: none;">Install App</button>
        </div>
        
        <div class="content">
            <h2>Features</h2>
            <ul>
                <li>✅ Offline support</li>
                <li>✅ Installable</li>
                <li>✅ Fast loading</li>
                <li>✅ Push notifications ready</li>
            </ul>
        </div>
    </div>
    
    <!-- YakaJS CDN -->
    <script src="https://cdn.jsdelivr.net/gh/Yaka-UI-Labs/YakaJS@latest/min.yaka.js"></script>
    <script src="js/offline.js"></script>
    <script src="js/app.js"></script>
</body>
</html>`,
        'manifest.json': (projectName) => `{
  "name": "${projectName}",
  "short_name": "${projectName}",
  "description": "Progressive Web App built with YakaJS",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#667eea",
  "icons": [
    {
      "src": "https://via.placeholder.com/192",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "https://via.placeholder.com/512",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}`,
        'sw.js': () => `/**
 * Service Worker for PWA
 */

const CACHE_NAME = 'yakajs-pwa-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/app.js',
    '/js/offline.js',
    'https://cdn.jsdelivr.net/gh/Yaka-UI-Labs/YakaJS@latest/min.yaka.js'
];

// Install event - cache resources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event - serve from cache
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                
                // Clone the request
                const fetchRequest = event.request.clone();
                
                return fetch(fetchRequest).then(response => {
                    // Check if valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    
                    // Clone the response
                    const responseToCache = response.clone();
                    
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });
                    
                    return response;
                });
            })
    );
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});`,
        'css/style.css': () => `/* PWA Styles */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    line-height: 1.6;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.container {
    background: white;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    max-width: 600px;
    text-align: center;
}

h1 {
    color: #667eea;
    margin-bottom: 20px;
}

.status {
    margin: 30px 0;
}

#online-status {
    font-size: 1.2em;
    margin-bottom: 20px;
}

.btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 15px 40px;
    font-size: 1.1em;
    border-radius: 50px;
    cursor: pointer;
    transition: transform 0.2s;
}

.btn:hover {
    transform: translateY(-2px);
}

.content {
    text-align: left;
    margin-top: 30px;
    padding: 20px;
    background: #f7f7f7;
    border-radius: 8px;
}

.content ul {
    list-style-position: inside;
}

.content li {
    margin: 10px 0;
    font-size: 1.1em;
}`,
        'js/offline.js': () => `/**
 * Offline Support & PWA Installation
 */

// Register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('✅ Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('❌ Service Worker registration failed:', error);
            });
    });
}

// Online/Offline detection
window.addEventListener('online', () => {
    _('#online-status').text('🟢 Online').css('color', 'green');
});

window.addEventListener('offline', () => {
    _('#online-status').text('🔴 Offline').css('color', 'red');
});

// PWA installation
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    _('#install-btn').css('display', 'inline-block');
});

function installPWA() {
    if (!deferredPrompt) {
        return;
    }
    
    deferredPrompt.prompt();
    
    deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
            console.log('✅ User accepted the install prompt');
        }
        deferredPrompt = null;
        _('#install-btn').css('display', 'none');
    });
}`,
        'js/app.js': (projectName) => `/**
 * ${projectName} - PWA Application
 */

_(() => {
    console.log('🚀 PWA ready!');
    
    _.debug = true;
    
    // Check online status
    if (!navigator.onLine) {
        _('#online-status').text('🔴 Offline').css('color', 'red');
    }
    
    // Install button handler
    _('#install-btn').on('click', installPWA);
    
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
        console.log('✅ Running as installed PWA');
        _('#install-btn').css('display', 'none');
    }
});`,
        'README.md': (projectName) => `# ${projectName}

A Progressive Web App built with YakaJS.

## Features

- ✅ Offline support with Service Worker
- ✅ Installable on mobile and desktop
- ✅ Fast loading with caching
- ✅ Online/offline detection

## Getting Started

**Important:** PWAs require HTTPS or localhost.

\`\`\`bash
# Using Node.js
npx http-server

# Using Python
python -m http.server
\`\`\`

Then open http://localhost:8080

## Installation

1. Open the app in a browser
2. Click "Install App" button
3. The app will be added to your home screen/app launcher

## License

MIT
`
    }
};

/**
 * Generate file content based on template type and filename
 */
function generate(templateType, filename, projectName) {
    const template = generators[templateType];
    
    if (!template || !template[filename]) {
        return `<!-- Generated by YakaCLI -->
<!-- Template for ${filename} not found -->
`;
    }
    
    const generator = template[filename];
    return generator(projectName);
}

module.exports = {
    generate
};
