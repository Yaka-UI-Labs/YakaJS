# Custom Build Generator - YakaCLI

Generate custom builds of YakaJS with only the features you need!

## Why Custom Builds?

Not everyone needs everything. Some developers want:
- ✅ **Minimal bundle** - Just DOM manipulation and HTTP
- ✅ **No webcam** - Skip WebRTC and media features
- ✅ **SPA focus** - Router and state management
- ✅ **Media apps** - Include camera, audio, video
- ✅ **Interactive UI** - Rich effects and animations

**Custom builds can be 50-90% smaller than the full library!**

## Quick Start

```bash
# Navigate to YakaJS repository
cd YakaJS

# Run the build command
node yakacli/yakacli.js build
```

## Three Ways to Build

### 1. Quick Build (⭐ Recommended)

Choose from 7 optimized presets - perfect for most users:

```bash
$ yakacli build

Select option: 1 (Quick Build)

Available Presets:
  1. Minimal [SMALLEST]     - Just core (18 KB)
  2. Standard [POPULAR]     - Core + UI (41 KB)
  3. Full                   - Everything (176 KB)
  4. SPA Framework          - For web apps (73 KB)
  5. Media Rich             - With webcam (36 KB)
  6. Interactive            - Rich effects (67 KB)
  7. Developer              - Debug tools (52 KB)
```

### 2. Custom Build

Pick exactly what you need from 10 feature categories:

```bash
$ yakacli build

Select option: 2 (Custom Build)

Feature Categories:
  1. Animations
  2. UI Components
  3. Forms & Validation
  4. Routing & State
  5. Visual Effects
  6. Media & WebRTC
  7. Device APIs
  8. Advanced Features
  9. AI & ML
  10. Developer Tools

Your selection: 1,2,4  # Choose what you need
```

### 3. View All Features

Browse all available modules before deciding:

```bash
$ yakacli build

Select option: 3 (View All Features)

# See complete list of features and modules
# Then run 'yakacli build' again to create your build
```

## Build Presets

### 1. Minimal (18 KB, 89% smaller)

**Perfect for:**
- Simple websites
- Landing pages
- Prototypes

**Includes:**
- DOM manipulation (select, traverse, modify)
- Event handling
- HTTP/AJAX requests
- CSS manipulation
- Basic utilities
- Local storage

**Example:**
```javascript
_('#button').on('click', () => {
    _.get('/api/data').then(data => {
        _('#output').text(data.message);
    });
});
```

### 2. Standard (41 KB, 77% smaller)

**Perfect for:**
- Business websites
- Portfolio sites
- Simple web apps

**Includes:**
- Everything in Minimal
- Animations (fade, slide, pulse)
- UI Components (modals, notifications, tooltips)
- Tabs, accordion, carousel

**Example:**
```javascript
_('#myModal').modal('show');
_('.box').fadeIn(500);
_.notify('Welcome!', 'success');
```

### 3. Full (176 KB, 0% smaller)

The complete YakaJS library with all features.

### 4. SPA Framework (73 KB, 58% smaller)

**Perfect for:**
- Single-page applications
- Admin dashboards
- Web applications

**Includes:**
- Core features
- Animations
- Router (with guards, params, nested routes)
- Store (Vuex-style state management)
- Forms and validation
- UI components

**Example:**
```javascript
const router = _.createRouter();
router.addRoute('/', { component: HomePage });
router.addRoute('/users/:id', { component: UserPage });

const store = _.createStore({
    state: { users: [] },
    mutations: { addUser(state, user) { state.users.push(user); } }
});
```

### 5. Media Rich (36 KB, 79% smaller)

**Perfect for:**
- Video chat apps
- Photo/video editing
- Media streaming apps
- Camera apps

**Includes:**
- Core features
- WebRTC (webcam, peer connections)
- Audio API (record, playback, effects)
- Video controls
- Screen recording
- Image upload with preview
- Canvas helpers
- Charts

**Example:**
```javascript
// Start webcam
_.webrtc().getUserMedia({ video: true, audio: true })
    .then(stream => {
        _('#video')[0].srcObject = stream;
    });

// Record audio
_.record(5000).then(blob => {
    _.download(blob, 'recording.webm');
});
```

### 6. Interactive (67 KB, 62% smaller)

**Perfect for:**
- Portfolio websites
- Marketing sites
- Interactive experiences
- Creative projects

**Includes:**
- Core features
- All animations
- Visual effects (parallax, tilt, magnetic, ripple)
- Drag & drop
- Sortable lists
- Particles
- Confetti
- UI components

**Example:**
```javascript
_('.hero').parallax(0.5);
_('.card').tilt();
_('.button').ripple('#00ff00');
_('#celebrate').confetti();
```

### 7. Developer (52 KB, 70% smaller)

**Perfect for:**
- Development environment
- Debugging applications
- Performance testing

**Includes:**
- Core features
- Theme engine (dark/light mode)
- Debug mode
- Performance monitoring
- Memory leak detection
- Feature detection
- Plugin system

**Example:**
```javascript
_.debug = true;
_.theme.toggle();
_.performance.measure('app-init');
_.detectLeaks();
```

## Feature Categories

### Core (Always Included)
- DOM selection and manipulation
- Event system
- HTTP/AJAX
- Traversal methods
- CSS manipulation
- Utilities (debounce, throttle, etc.)
- Storage (cookies, localStorage)

### Animations
- `fadeIn()`, `fadeOut()`
- `slideUp()`, `slideDown()`
- `animate()` custom animations
- `pulse()`, `shake()`
- Timeline compositions

### UI Components
- Modals
- Notifications
- Tooltips
- Tabs
- Accordion
- Carousel
- Color picker
- Date picker
- Range slider
- Autocomplete
- Data table

### Forms & Validation
- Form serialization
- Auto-save
- Validation rules
- Input masking (phone, credit card, etc.)
- Honeypot spam prevention
- Advanced validator with 15+ rules

### Routing & State
- Simple hash router
- Advanced router (guards, params, nested)
- Basic state management
- Full store (Vuex-style)
- Signals and reactivity

### Visual Effects
- Parallax scrolling
- 3D tilt effect
- Magnetic hover
- Ripple effect
- Glitch effect
- Confetti animation
- Particles system
- Text scramble
- Progress bars
- Skeleton loaders

### Media & WebRTC
- WebRTC (camera, peer connections)
- Audio API (record, play, effects)
- Video controls
- Screen recording
- Image upload
- Canvas helper
- Simple charts

### Device APIs
- Geolocation
- Battery status
- Vibration
- Bluetooth
- Device detection
- Network status

### Advanced Features
- Drag & drop
- Sortable lists
- Touch gestures
- Web workers
- View transitions API
- IndexedDB
- Virtual DOM

### AI & ML
- WebNN integration
- Sentiment analysis
- Text summarization
- Translation

### Developer Tools
- Theme engine (dark/light)
- Debug mode
- Safe mode (error prevention)
- Feature detection
- Performance monitoring
- Memory leak detector
- Plugin system

## Build Statistics

| Preset | Size | Reduction | Use Case |
|--------|------|-----------|----------|
| Minimal | 18 KB | 89.3% | Simple sites |
| Standard | 41 KB | 76.7% | Business sites |
| Media Rich | 36 KB | 79.3% | Camera apps |
| SPA Framework | 73 KB | 58.5% | Web apps |
| Interactive | 67 KB | 62% | Creative sites |
| Developer | 52 KB | 70% | Development |
| Full | 176 KB | 0% | Everything |

## Real-World Examples

### Example 1: Landing Page (Minimal Build)

**Need:** Simple landing page with form submission

**Build:** Minimal preset (18 KB)

```javascript
_(() => {
    _('#contact-form').on('submit', async (e) => {
        e.preventDefault();
        
        const data = _('#contact-form').serialize();
        const result = await _.post('/api/contact', data);
        
        _.notify('Message sent!', 'success');
    });
});
```

### Example 2: Video Chat App (Media Build)

**Need:** Webcam, audio, screen sharing

**Build:** Media Rich preset (36 KB)

```javascript
_(() => {
    // Start webcam
    _('#start-camera').on('click', async () => {
        const stream = await _.webrtc().getUserMedia({
            video: true,
            audio: true
        });
        _('#local-video')[0].srcObject = stream;
    });
    
    // Record screen
    _('#record-screen').on('click', async () => {
        await _.screenRecord();
    });
});
```

### Example 3: Admin Dashboard (SPA Build)

**Need:** Routing, state management, forms

**Build:** SPA Framework preset (73 KB)

```javascript
// Router
const router = _.createRouter();
router.addRoute('/', { component: DashboardPage });
router.addRoute('/users', { component: UsersPage });
router.init();

// Store
const store = _.createStore({
    state: { users: [], loading: false },
    mutations: {
        setUsers(state, users) { state.users = users; }
    },
    actions: {
        async fetchUsers({ commit }) {
            const users = await _.get('/api/users');
            commit('setUsers', users);
        }
    }
});
```

### Example 4: Portfolio Site (Interactive Build)

**Need:** Cool effects, animations, smooth interactions

**Build:** Interactive preset (67 KB)

```javascript
_(() => {
    // Parallax hero section
    _('.hero').parallax(0.5);
    
    // 3D tilt on cards
    _('.project-card').tilt();
    
    // Magnetic effect on buttons
    _('.cta-button').magnetic(20);
    
    // Ripple effect
    _('button').ripple();
    
    // Confetti on success
    _('#submit').on('click', () => {
        _('#celebrate').confetti();
    });
});
```

## Integration with Projects

### Using Custom Build in Projects

After generating a custom build, use it in your project:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My App</title>
</head>
<body>
    <div id="app"></div>
    
    <!-- Use your custom build instead of full version -->
    <script src="path/to/minimal-yaka.js"></script>
    <script src="app.js"></script>
</body>
</html>
```

### Development Workflow

1. **Development:** Use full version for development
2. **Identify needs:** Determine which features you actually use
3. **Build custom:** Generate custom build with only those features
4. **Test:** Verify everything works
5. **Deploy:** Use custom build in production

## Tips & Best Practices

### 1. Start Small, Add More

Start with minimal preset and add categories as needed:

```bash
# Start minimal
yakacli build -> Select "1. Minimal"

# Later, add UI components if needed
yakacli build -> Select "2. Custom" -> Choose categories
```

### 2. Check Dependencies

Some features depend on others:
- UI components need: Core + Animations
- Router needs: State management
- Advanced effects need: Core animations

The build generator automatically includes dependencies.

### 3. Test Your Build

Always test your custom build before deploying:

```bash
# Generate build
yakacli build

# Test in your project
# Open index.html and test all features
```

### 4. Version Control

Add custom builds to `.gitignore` if they're generated on demand:

```gitignore
# .gitignore
*-yaka.js
custom-yaka.js
```

Or commit them if they're production builds:

```bash
git add production-yaka.js
git commit -m "Add production custom build"
```

## Troubleshooting

### Build Too Large

If your custom build is still too large:
1. Review selected categories
2. Use more specific selections
3. Consider splitting into multiple smaller builds

### Feature Not Working

If a feature doesn't work in custom build:
1. Check if you included the right category
2. Verify dependencies are included
3. Check browser console for errors

### Performance Issues

For best performance:
1. Only include features you actually use
2. Consider code splitting for large apps
3. Use CDN for faster loading

## Advanced Usage

### Programmatic Build Generation

You can also generate builds programmatically:

```javascript
const buildGenerator = require('./yakacli/build-generator');

// Generate from preset
buildGenerator.generateFromPreset(
    'yaka.js',
    'minimal',
    'dist/yaka-minimal.js'
);

// Generate from categories
buildGenerator.generateFromCategories(
    'yaka.js',
    ['core', 'animations', 'uiComponents'],
    'dist/yaka-custom.js'
);
```

## FAQs

**Q: Will my custom build work with all browsers?**
A: Yes, custom builds maintain the same browser compatibility as the full version.

**Q: Can I update my custom build later?**
A: Yes, regenerate it anytime with the same or different features.

**Q: How much can I save?**
A: Anywhere from 50% to 90% depending on your needs.

**Q: What if I need a feature later?**
A: Just regenerate the build with additional categories.

**Q: Can I create my own presets?**
A: Currently not through CLI, but you can modify `features-map.js` to add custom presets.

## Next Steps

1. ✅ Generate your first custom build
2. ✅ Test it in a project
3. ✅ Measure the size savings
4. ✅ Share your results!

## Support

- [YakaCLI Documentation](README.md)
- [YakaJS Main Docs](../README.md)
- [Report Issues](https://github.com/Yaka-UI-Labs/YakaJS/issues)

---

**Happy building! 🚀**
