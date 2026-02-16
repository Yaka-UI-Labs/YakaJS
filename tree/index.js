/**
 * YakaJS Tree Folder Index
 * 
 * This folder contains modularized features from YakaJS.
 * Each file can be used independently or combined as needed.
 * 
 * Directory Structure:
 * - core/        - Core DOM methods and constructor
 * - dom/         - DOM manipulation and traversal
 * - events/      - Event handling
 * - animations/  - Animation effects
 * - ui/          - Advanced UI features
 * - ajax/        - HTTP and routing
 * - utils/       - Utility functions
 * - validation/  - Form validation
 * - security/    - Security utilities
 * - state/       - State management
 * - performance/ - Performance monitoring
 * 
 * Usage:
 * You can include individual features in your project:
 * <script src="tree/core/yaka-core.js"></script>
 * <script src="tree/animations/animations.js"></script>
 * 
 * Or use the full bundle from dist/min.yaka.js
 */

module.exports = {
    // Core features
    core: require('./core/yaka-core.js'),
    
    // Available as separate modules
    dom: {
        manipulation: './dom/manipulation.js',
        traversal: './dom/traversal.js'
    },
    events: './events/events.js',
    animations: './animations/animations.js',
    ajax: {
        http: './ajax/http.js',
        routing: './ajax/routing.js'
    },
    validation: './validation/validation.js',
    security: './security/security.js',
    state: './state/store.js',
    performance: './performance/monitoring.js'
};
