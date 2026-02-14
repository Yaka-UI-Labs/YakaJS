# YakaJS Examples & Recipes 💡

**Real-world code examples and patterns**  
**Maintained by:** [@dill-lk](https://github.com/dill-lk)

> Production-ready code examples you can copy and paste into your projects.

---

## Table of Contents

1. [Form Validation](#form-validation)
2. [Data Tables](#data-tables)
3. [Infinite Scroll](#infinite-scroll)
4. [Real-Time Chat](#real-time-chat)
5. [Image Gallery](#image-gallery)
6. [Shopping Cart](#shopping-cart)
7. [Todo App](#todo-app)
8. [Dashboard](#dashboard)
9. [Authentication](#authentication)
10. [File Upload](#file-upload)

---

## Form Validation

Complete form with real-time validation:

```javascript
// Initialize form validation
_('#signup-form').validate({
    rules: {
        username: {
            required: true,
            minLength: 3,
            maxLength: 20,
            pattern: /^[a-zA-Z0-9_]+$/
        },
        email: {
            required: true,
            email: true
        },
        password: {
            required: true,
            minLength: 8,
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/
        },
        confirmPassword: {
            required: true,
            matches: 'password'
        },
        age: {
            required: true,
            min: 18,
            max: 120
        },
        terms: {
            required: true,
            message: 'You must accept the terms'
        }
    },
    messages: {
        username: {
            required: 'Username is required',
            minLength: 'Username must be at least 3 characters',
            pattern: 'Username can only contain letters, numbers, and underscores'
        },
        password: {
            pattern: 'Password must contain uppercase, lowercase, and number'
        }
    },
    onSubmit: async (data) => {
        try {
            const response = await _.post('/api/signup', data);
            _.modal({
                title: 'Success!',
                content: 'Account created successfully',
                buttons: [
                    { 
                        text: 'Login', 
                        action: () => window.location = '/login' 
                    }
                ]
            });
        } catch (error) {
            _.toast('error', error.message);
        }
    }
});

// Real-time password strength indicator
_('#password').on('input', function() {
    const password = _(this).val();
    const strength = calculateStrength(password);
    
    _('#strength-bar')
        .css('width', `${strength}%`)
        .removeClass('weak medium strong')
        .addClass(
            strength < 33 ? 'weak' :
            strength < 66 ? 'medium' : 'strong'
        );
});

function calculateStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 25;
    return strength;
}
```

---

## Data Tables

Interactive data table with sorting, filtering, and pagination:

```javascript
class DataTable {
    constructor(container, options = {}) {
        this.container = _(container);
        this.data = _.signal([]);
        this.filteredData = _.computed(() => {
            let data = this.data();
            
            // Apply filter
            if (this.filterQuery()) {
                data = data.filter(row =>
                    Object.values(row).some(val =>
                        String(val).toLowerCase().includes(
                            this.filterQuery().toLowerCase()
                        )
                    )
                );
            }
            
            // Apply sort
            if (this.sortColumn()) {
                data = [...data].sort((a, b) => {
                    const aVal = a[this.sortColumn()];
                    const bVal = b[this.sortColumn()];
                    const compare = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
                    return this.sortDir() === 'asc' ? compare : -compare;
                });
            }
            
            return data;
        });
        
        this.filterQuery = _.signal('');
        this.sortColumn = _.signal(null);
        this.sortDir = _.signal('asc');
        this.currentPage = _.signal(1);
        this.pageSize = options.pageSize || 10;
        
        this.paginatedData = _.computed(() => {
            const start = (this.currentPage() - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.filteredData().slice(start, end);
        });
        
        this.totalPages = _.computed(() =>
            Math.ceil(this.filteredData().length / this.pageSize)
        );
        
        this.init();
    }
    
    init() {
        this.render();
        this.attachEvents();
        
        // Auto-render on data changes
        _.effect(() => {
            this.renderTable();
            this.renderPagination();
        });
    }
    
    render() {
        this.container.html(`
            <div class="datatable">
                <div class="datatable-header">
                    <input type="text" 
                           class="filter-input" 
                           placeholder="Search...">
                </div>
                <div class="datatable-body"></div>
                <div class="datatable-footer"></div>
            </div>
        `);
    }
    
    renderTable() {
        const data = this.paginatedData();
        if (data.length === 0) {
            this.container.find('.datatable-body').html(
                '<div class="no-data">No data available</div>'
            );
            return;
        }
        
        const columns = Object.keys(data[0]);
        
        const html = `
            <table>
                <thead>
                    <tr>
                        ${columns.map(col => `
                            <th data-column="${col}">
                                ${col}
                                ${this.sortColumn() === col ? 
                                    (this.sortDir() === 'asc' ? '▲' : '▼') : 
                                    ''}
                            </th>
                        `).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${data.map(row => `
                        <tr>
                            ${columns.map(col => `
                                <td>${row[col]}</td>
                            `).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        
        this.container.find('.datatable-body').html(html);
    }
    
    renderPagination() {
        const total = this.totalPages();
        const current = this.currentPage();
        
        const html = `
            <div class="pagination">
                <button class="prev" ${current === 1 ? 'disabled' : ''}>
                    Previous
                </button>
                <span>Page ${current} of ${total}</span>
                <button class="next" ${current === total ? 'disabled' : ''}>
                    Next
                </button>
            </div>
        `;
        
        this.container.find('.datatable-footer').html(html);
    }
    
    attachEvents() {
        // Filter
        this.container.on('input', '.filter-input', (e) => {
            this.filterQuery.set(_(e.target).val());
            this.currentPage.set(1); // Reset to first page
        });
        
        // Sort
        this.container.on('click', 'th[data-column]', (e) => {
            const column = _(e.target).attr('data-column');
            if (this.sortColumn() === column) {
                this.sortDir.set(this.sortDir() === 'asc' ? 'desc' : 'asc');
            } else {
                this.sortColumn.set(column);
                this.sortDir.set('asc');
            }
        });
        
        // Pagination
        this.container.on('click', '.prev', () => {
            this.currentPage.update(p => Math.max(1, p - 1));
        });
        
        this.container.on('click', '.next', () => {
            this.currentPage.update(p => Math.min(this.totalPages(), p + 1));
        });
    }
    
    setData(data) {
        this.data.set(data);
        this.currentPage.set(1);
    }
}

// Usage
const table = new DataTable('#my-table', { pageSize: 10 });

// Load data
const users = await _.get('/api/users');
table.setData(users);
```

---

## Infinite Scroll

Infinite scrolling list with loading indicator:

```javascript
class InfiniteScroll {
    constructor(container, options = {}) {
        this.container = _(container);
        this.loadMore = options.loadMore;
        this.threshold = options.threshold || 200;
        this.loading = false;
        this.hasMore = true;
        this.page = 1;
        
        this.init();
    }
    
    init() {
        // Add loading indicator
        this.container.append(`
            <div class="loading-indicator" style="display: none;">
                Loading more...
            </div>
        `);
        
        // Attach scroll handler
        _(window).on('scroll', _.throttle(() => {
            this.checkScroll();
        }, 100));
    }
    
    checkScroll() {
        if (this.loading || !this.hasMore) return;
        
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        
        if (scrollTop + windowHeight >= docHeight - this.threshold) {
            this.load();
        }
    }
    
    async load() {
        if (this.loading || !this.hasMore) return;
        
        this.loading = true;
        this.container.find('.loading-indicator').show();
        
        try {
            const items = await this.loadMore(this.page);
            
            if (items.length === 0) {
                this.hasMore = false;
                this.container.find('.loading-indicator')
                    .text('No more items');
                return;
            }
            
            // Render items
            items.forEach(item => {
                this.container.find('.loading-indicator').before(
                    this.renderItem(item)
                );
            });
            
            this.page++;
        } catch (error) {
            console.error('Failed to load more:', error);
            _.toast('error', 'Failed to load more items');
        } finally {
            this.loading = false;
            this.container.find('.loading-indicator').hide();
        }
    }
    
    renderItem(item) {
        return `
            <div class="item">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
    }
}

// Usage
const scroll = new InfiniteScroll('#feed', {
    loadMore: async (page) => {
        const response = await _.get('/api/posts', { 
            page, 
            limit: 10 
        });
        return response.data;
    },
    threshold: 300
});
```

---

## Real-Time Chat

WebSocket-based chat application:

```javascript
class ChatApp {
    constructor(container) {
        this.container = _(container);
        this.messages = _.signal([]);
        this.users = _.signal([]);
        this.currentUser = null;
        this.ws = null;
        
        this.init();
    }
    
    async init() {
        // Get current user
        this.currentUser = await _.get('/api/user');
        
        // Render UI
        this.render();
        
        // Connect WebSocket
        this.connectWebSocket();
        
        // Setup reactive rendering
        _.effect(() => {
            this.renderMessages();
        });
        
        _.effect(() => {
            this.renderUsers();
        });
        
        // Attach events
        this.attachEvents();
    }
    
    render() {
        this.container.html(`
            <div class="chat-app">
                <div class="chat-sidebar">
                    <h3>Users Online</h3>
                    <div class="users-list"></div>
                </div>
                <div class="chat-main">
                    <div class="messages-container"></div>
                    <form class="message-form">
                        <input type="text" 
                               class="message-input" 
                               placeholder="Type a message...">
                        <button type="submit">Send</button>
                    </form>
                </div>
            </div>
        `);
    }
    
    connectWebSocket() {
        this.ws = _.ws('wss://chat.example.com', {
            onOpen: () => {
                console.log('Connected to chat');
                this.ws.send({ type: 'join', user: this.currentUser });
            },
            
            onMessage: (data) => {
                if (data.type === 'message') {
                    this.messages.update(m => [...m, data]);
                } else if (data.type === 'users') {
                    this.users.set(data.users);
                }
            },
            
            onClose: () => {
                console.log('Disconnected from chat');
                _.toast('error', 'Connection lost. Reconnecting...');
            },
            
            autoReconnect: true
        });
    }
    
    renderMessages() {
        const messages = this.messages();
        const html = messages.map(msg => `
            <div class="message ${msg.user.id === this.currentUser.id ? 'own' : ''}">
                <div class="message-avatar">
                    <img src="${msg.user.avatar}" alt="${msg.user.name}">
                </div>
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-author">${msg.user.name}</span>
                        <span class="message-time">${this.formatTime(msg.timestamp)}</span>
                    </div>
                    <div class="message-text">${_.security.escapeHtml(msg.text)}</div>
                </div>
            </div>
        `).join('');
        
        this.container.find('.messages-container').html(html);
        
        // Scroll to bottom
        const container = this.container.find('.messages-container').get(0);
        container.scrollTop = container.scrollHeight;
    }
    
    renderUsers() {
        const users = this.users();
        const html = users.map(user => `
            <div class="user ${user.online ? 'online' : 'offline'}">
                <img src="${user.avatar}" alt="${user.name}">
                <span>${user.name}</span>
            </div>
        `).join('');
        
        this.container.find('.users-list').html(html);
    }
    
    attachEvents() {
        this.container.on('submit', '.message-form', (e) => {
            e.preventDefault();
            
            const input = this.container.find('.message-input');
            const text = input.val().trim();
            
            if (!text) return;
            
            // Send message
            this.ws.send({
                type: 'message',
                text,
                user: this.currentUser,
                timestamp: Date.now()
            });
            
            // Clear input
            input.val('');
        });
    }
    
    formatTime(timestamp) {
        return new Date(timestamp).toLocaleTimeString();
    }
}

// Usage
const chat = new ChatApp('#chat');
```

---

## Image Gallery

Lightbox gallery with lazy loading:

```javascript
class ImageGallery {
    constructor(container, images) {
        this.container = _(container);
        this.images = images;
        this.currentIndex = 0;
        
        this.init();
    }
    
    init() {
        this.renderGallery();
        this.attachEvents();
        
        // Lazy load images
        _.lazyLoad('.gallery-image', {
            threshold: 200,
            onLoad: (img) => {
                _(img).addClass('loaded');
            }
        });
    }
    
    renderGallery() {
        const html = this.images.map((img, index) => `
            <div class="gallery-item" data-index="${index}">
                <img 
                    class="gallery-image" 
                    data-src="${img.url}" 
                    alt="${img.title}"
                    src="${img.thumbnail}">
                <div class="gallery-caption">${img.title}</div>
            </div>
        `).join('');
        
        this.container.html(`
            <div class="gallery-grid">${html}</div>
            <div class="lightbox" style="display: none;">
                <div class="lightbox-content">
                    <button class="lightbox-close">×</button>
                    <button class="lightbox-prev">‹</button>
                    <img class="lightbox-image" src="" alt="">
                    <button class="lightbox-next">›</button>
                    <div class="lightbox-caption"></div>
                </div>
            </div>
        `);
    }
    
    attachEvents() {
        // Open lightbox
        this.container.on('click', '.gallery-item', (e) => {
            const index = +(_(e.currentTarget).attr('data-index'));
            this.showLightbox(index);
        });
        
        // Close lightbox
        this.container.on('click', '.lightbox-close, .lightbox', (e) => {
            if (_(e.target).hasClass('lightbox') || 
                _(e.target).hasClass('lightbox-close')) {
                this.closeLightbox();
            }
        });
        
        // Navigation
        this.container.on('click', '.lightbox-prev', () => {
            this.showImage(this.currentIndex - 1);
        });
        
        this.container.on('click', '.lightbox-next', () => {
            this.showImage(this.currentIndex + 1);
        });
        
        // Keyboard navigation
        _(document).on('keydown', (e) => {
            if (!_('.lightbox').get(0)?.style.display || 
                _('.lightbox').get(0).style.display === 'none') return;
            
            if (e.key === 'Escape') this.closeLightbox();
            if (e.key === 'ArrowLeft') this.showImage(this.currentIndex - 1);
            if (e.key === 'ArrowRight') this.showImage(this.currentIndex + 1);
        });
    }
    
    showLightbox(index) {
        this.currentIndex = index;
        this.showImage(index);
        _('.lightbox').fadeIn(300);
    }
    
    closeLightbox() {
        _('.lightbox').fadeOut(300);
    }
    
    showImage(index) {
        // Wrap around
        if (index < 0) index = this.images.length - 1;
        if (index >= this.images.length) index = 0;
        
        this.currentIndex = index;
        const img = this.images[index];
        
        _('.lightbox-image').attr('src', img.url);
        _('.lightbox-caption').text(img.title);
    }
}

// Usage
const gallery = new ImageGallery('#gallery', [
    { url: '/images/1.jpg', thumbnail: '/images/1-thumb.jpg', title: 'Image 1' },
    { url: '/images/2.jpg', thumbnail: '/images/2-thumb.jpg', title: 'Image 2' },
    // ...
]);
```

---

## More Examples

See the [interactive demos](../demos/) for more complete examples:

- Shopping cart with checkout
- Todo app with filters
- Dashboard with charts
- Authentication flow
- File upload with progress
- And many more!

---

**Maintained by [@dill-lk](https://github.com/dill-lk) and the Yaka UI Labs team** 🚀
