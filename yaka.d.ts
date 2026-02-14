/**
 * YakaJS - Next-Gen JavaScript Library
 * TypeScript definitions for YakaJS v1.0.0+
 * 
 * @author Yaka-UI-Labs
 * @license MIT
 */

// ==================== INTERFACES ====================

/**
 * Validation rule for form fields
 */
export interface ValidationRule {
    required?: boolean;
    pattern?: RegExp;
    min?: number;
    max?: number;
    message?: string;
    requiredMessage?: string;
    patternMessage?: string;
    minMessage?: string;
    maxMessage?: string;
}

/**
 * Validation result
 */
export interface ValidationResult {
    valid: boolean;
    errors: Record<string, string[]>;
}

/**
 * Draggable options
 */
export interface DraggableOptions {
    onStart?: (event: Event) => void;
    onDrag?: (event: Event) => void;
    onEnd?: (event: Event) => void;
    handle?: string;
    containment?: string | HTMLElement;
    axis?: 'x' | 'y';
    grid?: [number, number];
}

/**
 * Droppable options
 */
export interface DroppableOptions {
    accept?: string;
    onDrop?: (event: Event, draggable: HTMLElement) => void;
    onOver?: (event: Event) => void;
    onOut?: (event: Event) => void;
}

/**
 * Resizable options
 */
export interface ResizableOptions {
    handles?: Array<'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw'>;
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
    aspectRatio?: boolean;
    onStart?: (event: Event) => void;
    onResize?: (event: Event, dimensions: { width: number; height: number }) => void;
    onEnd?: (event: Event) => void;
}

/**
 * Sortable options
 */
export interface SortableOptions {
    handle?: string;
    onSort?: (event: Event, item: HTMLElement, oldIndex: number, newIndex: number) => void;
    axis?: 'x' | 'y';
}

/**
 * Selectable options
 */
export interface SelectableOptions {
    filter?: string;
    onSelect?: (elements: HTMLElement[]) => void;
}

/**
 * Swipe handlers
 */
export interface SwipeHandlers {
    left?: () => void;
    right?: () => void;
    up?: () => void;
    down?: () => void;
}

/**
 * AJAX options
 */
export interface AjaxOptions {
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    data?: any;
    headers?: Record<string, string>;
    contentType?: string;
    dataType?: 'json' | 'text' | 'html';
    timeout?: number;
    beforeSend?: (xhr: XMLHttpRequest) => void;
    success?: (data: any, status: string, xhr: XMLHttpRequest) => void;
    error?: (xhr: XMLHttpRequest, status: string, error: string) => void;
    complete?: (xhr: XMLHttpRequest, status: string) => void;
}

/**
 * Animation properties
 */
export interface AnimationProperties {
    [property: string]: string | number;
}

/**
 * Tooltip options
 */
export interface TooltipOptions {
    position?: 'top' | 'bottom' | 'left' | 'right';
    trigger?: 'hover' | 'click';
    delay?: number;
}

/**
 * Modal options
 */
export interface ModalOptions {
    title?: string;
    closeButton?: boolean;
    backdrop?: boolean | 'static';
    keyboard?: boolean;
    onShow?: () => void;
    onHide?: () => void;
}

/**
 * Carousel options
 */
export interface CarouselOptions {
    autoplay?: boolean;
    interval?: number;
    indicators?: boolean;
    controls?: boolean;
    pause?: 'hover' | false;
}

/**
 * Dropdown options
 */
export interface DropdownOptions {
    trigger?: 'click' | 'hover';
    position?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
}

/**
 * Autocomplete options
 */
export interface AutocompleteOptions {
    minLength?: number;
    delay?: number;
    onSelect?: (item: any) => void;
}

/**
 * DataTable options
 */
export interface DataTableOptions {
    columns?: Array<{ key: string; label: string; sortable?: boolean }>;
    pagination?: boolean;
    pageSize?: number;
    sortable?: boolean;
    searchable?: boolean;
}

/**
 * Progress options
 */
export interface ProgressOptions {
    animated?: boolean;
    striped?: boolean;
    label?: boolean;
}

/**
 * Skeleton options
 */
export interface SkeletonOptions {
    width?: string | number;
    height?: string | number;
    circle?: boolean;
    count?: number;
}

/**
 * Virtual scroll options
 */
export interface VirtualScrollOptions {
    itemHeight: number;
    buffer?: number;
    container?: string | HTMLElement;
}

/**
 * Cropper options
 */
export interface CropperOptions {
    aspectRatio?: number;
    viewMode?: number;
    dragMode?: 'crop' | 'move' | 'none';
    minCropBoxWidth?: number;
    minCropBoxHeight?: number;
}

/**
 * Rich editor options
 */
export interface RichEditorOptions {
    toolbar?: string[];
    placeholder?: string;
    height?: number;
}

/**
 * Loading state options
 */
export interface LoadingStateOptions {
    text?: string;
    spinner?: boolean;
    disabled?: boolean;
}

/**
 * WebSocket options
 */
export interface WebSocketOptions {
    onOpen?: (event: Event) => void;
    onMessage?: (event: MessageEvent) => void;
    onError?: (event: Event) => void;
    onClose?: (event: CloseEvent) => void;
    reconnect?: boolean;
    reconnectDelay?: number;
}

/**
 * Retry options
 */
export interface RetryOptions {
    retries?: number;
    delay?: number;
    backoff?: number;
}

/**
 * Observer options
 */
export interface ObserverOptions {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
}

/**
 * Toast/Notification options
 */
export interface ToastOptions {
    type?: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
    position?: 'top' | 'bottom' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

/**
 * Component options
 */
export interface ComponentOptions {
    template?: string;
    data?: () => any;
    methods?: Record<string, Function>;
    mounted?: () => void;
    destroyed?: () => void;
}

/**
 * Router configuration
 */
export interface RouteConfig {
    path: string;
    component?: Function | string;
    beforeEnter?: (to: any, from: any, next: Function) => void;
}

/**
 * State management options
 */
export interface StateOptions<T = any> {
    state?: T;
    mutations?: Record<string, Function>;
    actions?: Record<string, Function>;
    getters?: Record<string, Function>;
}

/**
 * Chart data
 */
export interface ChartData {
    labels: string[];
    datasets: Array<{
        label: string;
        data: number[];
        backgroundColor?: string | string[];
        borderColor?: string | string[];
    }>;
}

/**
 * Chart options
 */
export interface ChartOptions {
    type: 'line' | 'bar' | 'pie' | 'doughnut';
    responsive?: boolean;
    maintainAspectRatio?: boolean;
}

/**
 * Cookie options
 */
export interface CookieOptions {
    days?: number;
    path?: string;
    domain?: string;
    secure?: boolean;
}

/**
 * Share data
 */
export interface ShareData {
    title?: string;
    text?: string;
    url?: string;
}

/**
 * Position options
 */
export interface PositionOptions {
    my?: string;
    at?: string;
    of?: string | HTMLElement;
    collision?: 'flip' | 'fit' | 'flipfit' | 'none';
}

/**
 * Mask options
 */
export interface MaskOptions {
    placeholder?: string;
    reverse?: boolean;
}

/**
 * Honeypot options
 */
export interface HoneypotOptions {
    fieldName?: string;
    onSpam?: () => void;
}

/**
 * Time ago options
 */
export interface TimeAgoOptions {
    live?: boolean;
    locale?: string;
}

/**
 * Breadcrumb item
 */
export interface BreadcrumbItem {
    label: string;
    href?: string;
    active?: boolean;
}

/**
 * Pagination options
 */
export interface PaginationOptions {
    total: number;
    pageSize?: number;
    current?: number;
    onChange?: (page: number) => void;
}

/**
 * Badge options
 */
export interface BadgeOptions {
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
    pill?: boolean;
}

/**
 * Popover options
 */
export interface PopoverOptions extends TooltipOptions {
    title?: string;
    html?: boolean;
}

/**
 * Stepper options
 */
export interface StepperOptions {
    steps: Array<{ title: string; content?: string }>;
    currentStep?: number;
    onStepChange?: (step: number) => void;
}

/**
 * Slider options
 */
export interface SliderOptions {
    min?: number;
    max?: number;
    step?: number;
    value?: number;
    range?: boolean;
    onChange?: (value: number | number[]) => void;
}

/**
 * Lottie options
 */
export interface LottieOptions {
    animationData: any;
    loop?: boolean;
    autoplay?: boolean;
}

/**
 * Tilt options
 */
export interface TiltOptions {
    maxTilt?: number;
    perspective?: number;
    scale?: number;
}

/**
 * Transform 3D options
 */
export interface Transform3DOptions {
    x?: number;
    y?: number;
    z?: number;
    rotateX?: number;
    rotateY?: number;
    rotateZ?: number;
}

/**
 * Particles options
 */
export interface ParticlesOptions {
    count?: number;
    speed?: number;
    size?: number;
    color?: string;
}

/**
 * Video controls options
 */
export interface VideoControlsOptions {
    controls?: boolean;
    autoplay?: boolean;
    loop?: boolean;
}

/**
 * Button options
 */
export interface ButtonOptions {
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
}

/**
 * Fullpage options
 */
export interface FullpageOptions {
    navigation?: boolean;
    navigationPosition?: 'left' | 'right';
    scrollingSpeed?: number;
}

// ==================== MAIN YAKA INTERFACE ====================

/**
 * YakaJS main interface
 */
export interface Yaka {
    /**
     * Array of matched DOM elements
     */
    elements: HTMLElement[];

    // ==================== ITERATION ====================

    /**
     * Iterate over elements
     */
    each(callback: (this: HTMLElement, index: number, element: HTMLElement) => void): this;

    /**
     * Get element(s) at index
     */
    get(): HTMLElement[];
    get(index: number): HTMLElement | undefined;

    /**
     * Get first element
     */
    first(): Yaka;

    /**
     * Get last element
     */
    last(): Yaka;

    /**
     * Get element at index
     */
    eq(index: number): Yaka;

    // ==================== CONTENT ====================

    /**
     * Get or set text content
     */
    text(): string;
    text(value: string): this;

    /**
     * Get or set HTML content
     */
    html(): string;
    html(value: string, sanitize?: boolean): this;

    /**
     * Get or set form value
     */
    val(): string;
    val(value: string): this;

    // ==================== ATTRIBUTES ====================

    /**
     * Get or set attribute
     */
    attr(name: string): string | undefined;
    attr(name: string, value: string | number | boolean): this;
    attr(attributes: Record<string, string | number | boolean>): this;

    /**
     * Remove attribute
     */
    removeAttr(name: string): this;

    /**
     * Get or set data attribute
     */
    data(key: string): any;
    data(key: string, value: any): this;

    // ==================== CSS & CLASSES ====================

    /**
     * Get or set CSS property
     */
    css(property: string): string;
    css(property: string, value: string | number): this;
    css(properties: Record<string, string | number>): this;

    /**
     * Add CSS class with optional duration
     */
    addClass(className: string, duration?: number): this;

    /**
     * Remove CSS class with optional duration
     */
    removeClass(className: string, duration?: number): this;

    /**
     * Toggle CSS class with optional duration
     */
    toggleClass(className: string, duration?: number): this;

    /**
     * Check if element has class
     */
    hasClass(className: string): boolean;

    /**
     * Show element
     */
    show(): this;

    /**
     * Hide element
     */
    hide(): this;

    // ==================== TRAVERSAL ====================

    /**
     * Find descendants
     */
    find(selector: string): Yaka;

    /**
     * Filter elements
     */
    filter(selector: string | ((index: number, element: HTMLElement) => boolean)): Yaka;

    /**
     * Find closest ancestor
     */
    closest(selector: string): Yaka;

    /**
     * Check if matches selector
     */
    is(selector: string): boolean;

    /**
     * Get parent element
     */
    parent(): Yaka;

    /**
     * Get children
     */
    children(selector?: string): Yaka;

    /**
     * Get siblings
     */
    siblings(): Yaka;

    /**
     * Get next sibling
     */
    next(): Yaka;

    /**
     * Get previous sibling
     */
    prev(): Yaka;

    // ==================== DOM MANIPULATION ====================

    /**
     * Append content
     */
    append(content: string | HTMLElement | Yaka): this;

    /**
     * Prepend content
     */
    prepend(content: string | HTMLElement | Yaka): this;

    /**
     * Insert after
     */
    after(content: string | HTMLElement | Yaka): this;

    /**
     * Insert before
     */
    before(content: string | HTMLElement | Yaka): this;

    /**
     * Empty element
     */
    empty(): this;

    /**
     * Clone element
     */
    clone(): Yaka;

    /**
     * Replace element
     */
    replace(newContent: string | HTMLElement | Yaka): this;

    /**
     * Wrap element
     */
    wrap(wrapper: string | HTMLElement): this;

    /**
     * Remove/detach element
     */
    detach(): this;

    // ==================== EVENTS ====================

    /**
     * Attach event handler
     */
    on(event: string, handler: (event: Event) => void): this;
    on(event: string, selector: string, handler: (event: Event) => void): this;

    /**
     * Remove event handler
     */
    off(event: string, handler?: (event: Event) => void): this;
    off(event: string, selector?: string, handler?: (event: Event) => void): this;

    /**
     * Attach one-time event handler
     */
    once(event: string, handler: (event: Event) => void): this;

    /**
     * Trigger event
     */
    trigger(event: string, data?: any): this;

    /**
     * Click event
     */
    click(handler?: (event: MouseEvent) => void): this;

    /**
     * Submit event
     */
    submit(handler?: (event: Event) => void): this;

    /**
     * Change event
     */
    change(handler: (event: Event) => void): this;

    /**
     * Input event
     */
    input(handler: (event: Event) => void): this;

    /**
     * Focus event
     */
    focus(handler?: (event: FocusEvent) => void): this;

    /**
     * Blur event
     */
    blur(handler: (event: FocusEvent) => void): this;

    /**
     * Hover event
     */
    hover(handlerIn: (event: MouseEvent) => void, handlerOut?: (event: MouseEvent) => void): this;

    /**
     * Scroll event
     */
    scroll(handler: (event: Event) => void): this;

    /**
     * Resize event
     */
    resize(handler: (event: Event) => void): this;

    /**
     * Debounced event
     */
    debounce(event: string, handler: (event: Event) => void, delay?: number): this;

    /**
     * Throttled event
     */
    throttle(event: string, handler: (event: Event) => void, delay?: number): this;

    // ==================== ANIMATIONS ====================

    /**
     * Animate properties
     */
    animate(properties: AnimationProperties, duration?: number, easing?: string): this;

    /**
     * Fade in
     */
    fadeIn(duration?: number): this;

    /**
     * Fade out
     */
    fadeOut(duration?: number): this;

    /**
     * Slide down
     */
    slideDown(duration?: number): this;

    /**
     * Slide up
     */
    slideUp(duration?: number): this;

    /**
     * Pulse animation
     */
    pulse(times?: number): this;

    /**
     * Shake animation
     */
    shake(): this;

    /**
     * Bounce animation
     */
    bounce(times?: number): this;

    /**
     * Flip animation
     */
    flip(axis?: 'x' | 'y', duration?: number): this;

    /**
     * Zoom in animation
     */
    zoomIn(duration?: number): this;

    /**
     * Zoom out animation
     */
    zoomOut(duration?: number): this;

    /**
     * Rotate in animation
     */
    rotateIn(duration?: number): this;

    /**
     * Rotate out animation
     */
    rotateOut(duration?: number): this;

    /**
     * Rubber band animation
     */
    rubberBand(): this;

    /**
     * Blur in animation
     */
    blurIn(duration?: number): this;

    /**
     * Blur out animation
     */
    blurOut(duration?: number): this;

    /**
     * Swing animation
     */
    swing(): this;

    /**
     * Slide in from left
     */
    slideInLeft(duration?: number): this;

    /**
     * Slide in from right
     */
    slideInRight(duration?: number): this;

    /**
     * Slide in from up
     */
    slideInUp(duration?: number): this;

    /**
     * Slide out to left
     */
    slideOutLeft(duration?: number): this;

    /**
     * Slide out to right
     */
    slideOutRight(duration?: number): this;

    // ==================== INTERACTIVE ====================

    /**
     * Make element draggable
     */
    draggable(options?: DraggableOptions): this;

    /**
     * Make element droppable
     */
    droppable(options?: DroppableOptions): this;

    /**
     * Make list sortable
     */
    sortable(options?: SortableOptions): this;

    /**
     * Make element resizable
     */
    resizable(options?: ResizableOptions): this;

    /**
     * Make elements selectable
     */
    selectable(options?: SelectableOptions): this;

    /**
     * Add swipe gestures
     */
    swipe(handlers: SwipeHandlers): this;

    // ==================== UI COMPONENTS ====================

    /**
     * Add tooltip
     */
    tooltip(text: string, position?: 'top' | 'bottom' | 'left' | 'right'): this;

    /**
     * Create tabs
     */
    tabs(): this;

    /**
     * Create accordion
     */
    accordion(): this;

    /**
     * Create carousel
     */
    carousel(options?: CarouselOptions): this;

    /**
     * Create dropdown
     */
    dropdown(options?: DropdownOptions): this;

    /**
     * Create breadcrumb
     */
    breadcrumb(items?: BreadcrumbItem[], options?: any): this;

    /**
     * Create pagination
     */
    pagination(options?: PaginationOptions): this;

    /**
     * Create badge
     */
    badge(text: string, options?: BadgeOptions): this;

    /**
     * Create popover
     */
    popover(content: string, options?: PopoverOptions): this;

    /**
     * Create stepper
     */
    stepper(options?: StepperOptions): this;

    /**
     * Create slider
     */
    slider(options?: SliderOptions): this;

    /**
     * Date picker
     */
    datePicker(callback: (date: Date) => void): this;

    /**
     * Color picker
     */
    colorPicker(callback: (color: string) => void): this;

    /**
     * Autocomplete
     */
    autocomplete(data: any[], options?: AutocompleteOptions): this;

    /**
     * Data table
     */
    dataTable(data: any[], options?: DataTableOptions): this;

    /**
     * Image upload
     */
    imageUpload(callback: (file: File) => void): this;

    /**
     * Button
     */
    button(options?: ButtonOptions): this;

    /**
     * Checkbox/radio styling
     */
    checkboxradio(options?: any): this;

    /**
     * Control group
     */
    controlgroup(options?: any): this;

    /**
     * Menu
     */
    menu(options?: any): this;

    /**
     * Selectbox
     */
    selectbox(options?: any): this;

    /**
     * Time picker
     */
    timepicker(options?: any): this;

    /**
     * Full page sections
     */
    fullpage(options?: FullpageOptions): this;

    // ==================== EFFECTS ====================

    /**
     * Parallax effect
     */
    parallax(speed?: number): this;

    /**
     * Infinite scroll
     */
    infiniteScroll(callback: () => void): this;

    /**
     * Masonry layout
     */
    masonry(columns?: number): this;

    /**
     * Progress bar
     */
    progress(percent: number, options?: ProgressOptions): this;

    /**
     * Skeleton loader
     */
    skeleton(options?: SkeletonOptions): this;

    /**
     * Lottie animation
     */
    lottie(options?: LottieOptions): this;

    /**
     * Tilt effect
     */
    tilt(options?: TiltOptions): this;

    /**
     * Magnetic effect
     */
    magnetic(strength?: number): this;

    /**
     * Ripple effect
     */
    ripple(color?: string): this;

    /**
     * Scramble text effect
     */
    scramble(finalText: string, duration?: number): this;

    /**
     * Glitch effect
     */
    glitch(duration?: number): this;

    /**
     * Virtual scroll
     */
    virtualScroll(options?: VirtualScrollOptions): this;

    /**
     * Lazy load with blur
     */
    lazyLoadBlur(): this;

    /**
     * Blur lazy load
     */
    blurLazyLoad(options?: any): this;

    /**
     * Confetti effect
     */
    confetti(): this;

    /**
     * Canvas operations
     */
    canvas(): this;

    /**
     * Video controls
     */
    videoControls(options?: VideoControlsOptions): this;

    /**
     * 3D transform
     */
    transform3d(options?: Transform3DOptions): this;

    /**
     * Particles effect
     */
    particles(options?: ParticlesOptions): this;

    /**
     * CSS filter
     */
    filter(filterType: string): this;

    // ==================== FORMS ====================

    /**
     * Serialize form data
     */
    serialize(): string;

    /**
     * Validate form
     */
    validate(rules: Record<string, ValidationRule>): ValidationResult;

    /**
     * Auto-save form
     */
    autoSave(key: string, delay?: number): this;

    /**
     * Restore form data
     */
    restore(key: string): this;

    /**
     * Copy to clipboard
     */
    copy(): this;

    /**
     * Count up animation
     */
    countUp(target: number, duration?: number): this;

    /**
     * Typewriter effect
     */
    typeWriter(text: string, speed?: number): this;

    /**
     * Validate form with schema
     */
    validateForm(schema: any, options?: any): this;

    /**
     * Loading state
     */
    loadingState(promise: Promise<any>, options?: LoadingStateOptions): this;

    /**
     * Mask input
     */
    mask(type: string, options?: MaskOptions): this;

    /**
     * Honeypot spam protection
     */
    honeypot(options?: HoneypotOptions): this;

    // ==================== OBSERVERS ====================

    /**
     * On element visible
     */
    onVisible(handler: () => void, options?: ObserverOptions): this;

    /**
     * Lazy load images
     */
    lazyLoad(): this;

    /**
     * Observe visibility
     */
    observeVisibility(callback: (entry: IntersectionObserverEntry) => void, options?: ObserverOptions): this;

    /**
     * Scroll to element
     */
    scrollTo(duration?: number): this;

    /**
     * Scroll spy
     */
    scrollSpy(callback: (section: string) => void): this;

    /**
     * Sticky positioning
     */
    sticky(offset?: number): this;

    // ==================== ADVANCED ====================

    /**
     * Image cropper
     */
    crop(options?: CropperOptions): this;

    /**
     * Rich text editor
     */
    richEditor(options?: RichEditorOptions): this;

    /**
     * DOM patch
     */
    patch(newHTML: string): this;

    /**
     * Time ago
     */
    timeAgo(options?: TimeAgoOptions): this;

    /**
     * Cropper
     */
    cropper(options?: CropperOptions): this;

    /**
     * Print element
     */
    print(): this;

    /**
     * Fullscreen
     */
    fullscreen(): this;

    /**
     * Position element
     */
    position(options?: PositionOptions): this;

    /**
     * Cleanup element
     */
    cleanup(): this;

    /**
     * Safe mode (prevents errors)
     */
    safe(): Yaka;

    /**
     * Component
     */
    component(name: string, props?: any): this;

    // ==================== ALIASES ====================

    /**
     * Alias for addClass
     */
    add(className: string, duration?: number): this;

    /**
     * Alias for removeClass
     */
    remove(className: string, duration?: number): this;

    /**
     * Alias for toggleClass
     */
    toggle(className: string, duration?: number): this;

    /**
     * Alias for hasClass
     */
    has(className: string): boolean;
}

// ==================== STATIC METHODS ====================

export interface YakaStatic {
    /**
     * Create new Yaka instance
     */
    (selector: string | HTMLElement | HTMLElement[] | Function | null, context?: HTMLElement | Document): Yaka;

    /**
     * Create new Yaka instance
     */
    new(selector: string | HTMLElement | HTMLElement[] | Function | null, context?: HTMLElement | Document): Yaka;

    // ==================== HTTP/AJAX ====================

    /**
     * HTTP GET request
     */
    get(url: string, data?: any): Promise<any>;

    /**
     * HTTP POST request
     */
    post(url: string, data?: any): Promise<any>;

    /**
     * HTTP PUT request
     */
    put(url: string, data?: any): Promise<any>;

    /**
     * HTTP DELETE request
     */
    delete(url: string): Promise<any>;

    /**
     * AJAX request
     */
    ajax(options: AjaxOptions): Promise<any>;

    /**
     * Add request interceptor
     */
    addRequestInterceptor(fn: (config: any) => any): void;

    /**
     * Add response interceptor
     */
    addResponseInterceptor(fn: (response: any) => any): void;

    // ==================== UTILITIES ====================

    /**
     * Iterate over object or array
     */
    each<T>(obj: T[] | Record<string, T>, callback: (value: T, key: string | number) => void): void;

    /**
     * Map array
     */
    map<T, R>(array: T[], callback: (value: T, index: number) => R): R[];

    /**
     * Filter array
     */
    filter<T>(array: T[], callback: (value: T, index: number) => boolean): T[];

    /**
     * DOM ready
     */
    ready(handler: () => void): void;

    /**
     * Debounce function
     */
    debounce<T extends Function>(func: T, delay?: number): T;

    /**
     * Throttle function
     */
    throttle<T extends Function>(func: T, delay?: number): T;

    /**
     * Generate random ID
     */
    randomId(prefix?: string): string;

    /**
     * Format number with commas
     */
    formatNumber(num: number): string;

    /**
     * Format currency
     */
    formatCurrency(num: number, symbol?: string): string;

    /**
     * Parse query string
     */
    parseQuery(query?: string): Record<string, string>;

    /**
     * Deep clone object
     */
    deepClone<T>(obj: T, hash?: WeakMap<any, any>): T;

    /**
     * Merge objects
     */
    merge<T>(...sources: Partial<T>[]): T;

    /**
     * Deep equality check
     */
    isEqual(a: any, b: any): boolean;

    /**
     * Get nested property
     */
    get(obj: any, path: string, defaultValue?: any): any;

    /**
     * Set nested property
     */
    set(obj: any, path: string, value: any): any;

    /**
     * Pick properties from object
     */
    pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>;

    /**
     * Omit properties from object
     */
    omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>;

    // ==================== ARRAY OPERATIONS ====================

    /**
     * Chunk array
     */
    chunk<T>(array: T[], size?: number): T[][];

    /**
     * Flatten array
     */
    flatten<T>(array: any[], depth?: number): T[];

    /**
     * Flatten array deeply
     */
    flattenDeep<T>(array: any[]): T[];

    /**
     * Get unique values
     */
    uniq<T>(array: T[]): T[];

    /**
     * Get unique values by iteratee
     */
    uniqBy<T>(array: T[], iteratee: (value: T) => any): T[];

    /**
     * Create range of numbers
     */
    range(start: number, end?: number, step?: number): number[];

    /**
     * Shuffle array
     */
    shuffle<T>(array: T[]): T[];

    /**
     * Get random sample(s)
     */
    sample<T>(array: T[], n?: number): T | T[];

    /**
     * Group by iteratee
     */
    groupBy<T>(array: T[], iteratee: (value: T) => any): Record<string, T[]>;

    /**
     * Sort by iteratee
     */
    sortBy<T>(array: T[], iteratee: (value: T) => any): T[];

    /**
     * Partition array
     */
    partition<T>(array: T[], predicate: (value: T) => boolean): [T[], T[]];

    /**
     * Array intersection
     */
    intersection<T>(...arrays: T[][]): T[];

    /**
     * Array union
     */
    union<T>(...arrays: T[][]): T[];

    /**
     * Array difference
     */
    difference<T>(array: T[], ...others: T[][]): T[];

    // ==================== STRING UTILITIES ====================

    /**
     * Convert to camelCase
     */
    camelCase(str: string): string;

    /**
     * Convert to kebab-case
     */
    kebabCase(str: string): string;

    /**
     * Convert to snake_case
     */
    snakeCase(str: string): string;

    /**
     * Capitalize first letter
     */
    capitalize(str: string): string;

    /**
     * Capitalize all words
     */
    capitalizeWords(str: string): string;

    /**
     * Truncate string
     */
    truncate(str: string, length?: number, ending?: string): string;

    /**
     * Convert to URL slug
     */
    slugify(str: string): string;

    /**
     * Escape HTML
     */
    escape(str: string): string;

    /**
     * Unescape HTML
     */
    unescape(str: string): string;

    // ==================== DATE/TIME ====================

    /**
     * Format date
     */
    formatDate(date: Date | string | number, format?: string): string;

    /**
     * Get relative time
     */
    fromNow(date: Date | string | number): string;

    /**
     * Get difference between dates
     */
    diffDates(date1: Date, date2: Date, unit?: 'days' | 'hours' | 'minutes' | 'seconds'): number;

    /**
     * Add days to date
     */
    addDays(date: Date, days: number): Date;

    /**
     * Add hours to date
     */
    addHours(date: Date, hours: number): Date;

    /**
     * Add minutes to date
     */
    addMinutes(date: Date, minutes: number): Date;

    // ==================== TYPE CHECKING ====================

    /**
     * Check if array
     */
    isArray(value: any): value is any[];

    /**
     * Check if object
     */
    isObject(value: any): value is object;

    /**
     * Check if function
     */
    isFunction(value: any): value is Function;

    /**
     * Check if string
     */
    isString(value: any): value is string;

    /**
     * Check if number
     */
    isNumber(value: any): value is number;

    /**
     * Check if boolean
     */
    isBoolean(value: any): value is boolean;

    /**
     * Check if null
     */
    isNull(value: any): value is null;

    /**
     * Check if undefined
     */
    isUndefined(value: any): value is undefined;

    /**
     * Check if null or undefined
     */
    isNil(value: any): value is null | undefined;

    /**
     * Check if empty
     */
    isEmpty(value: any): boolean;

    /**
     * Check if date
     */
    isDate(value: any): value is Date;

    /**
     * Check if RegExp
     */
    isRegExp(value: any): value is RegExp;

    /**
     * Check if Error
     */
    isError(value: any): value is Error;

    // ==================== MATH ====================

    /**
     * Clamp value between min and max
     */
    clamp(value: number, min: number, max: number): number;

    /**
     * Random number
     */
    random(min?: number, max?: number, floating?: boolean): number;

    /**
     * Sum of array
     */
    sum(array: number[]): number;

    /**
     * Mean of array
     */
    mean(array: number[]): number;

    /**
     * Median of array
     */
    median(array: number[]): number;

    /**
     * Minimum value
     */
    min(array: number[]): number;

    /**
     * Maximum value
     */
    max(array: number[]): number;

    // ==================== ASYNC/PROMISE ====================

    /**
     * Sleep for milliseconds
     */
    sleep(ms: number): Promise<void>;

    /**
     * Retry function with backoff
     */
    retry<T>(fn: () => Promise<T>, options?: RetryOptions): Promise<T>;

    /**
     * Add timeout to promise
     */
    timeout<T>(promise: Promise<T>, ms: number, message?: string): Promise<T>;

    /**
     * Promise.all
     */
    all<T>(promises: Promise<T>[]): Promise<T[]>;

    /**
     * Promise.race
     */
    race<T>(promises: Promise<T>[]): Promise<T>;

    /**
     * Promise.allSettled
     */
    allSettled<T>(promises: Promise<T>[]): Promise<Array<{ status: 'fulfilled' | 'rejected'; value?: T; reason?: any }>>;

    // ==================== STORAGE ====================

    /**
     * Cookie utilities
     */
    cookie: {
        set(name: string, value: string, days?: number): void;
        get(name: string): string | null;
        remove(name: string): void;
    };

    /**
     * Local storage utilities
     */
    storage: {
        set(key: string, value: any): void;
        get(key: string): any;
        remove(key: string): void;
        clear(): void;
    };

    // ==================== ADVANCED FEATURES ====================

    /**
     * Create reactive state
     */
    state<T = any>(initialState?: T): StateOptions<T>;

    /**
     * Create signal
     */
    signal<T = any>(initialValue: T): {
        get(): T;
        set(value: T): void;
        update(fn: (value: T) => T): void;
    };

    /**
     * Register component
     */
    component(name: string, options: ComponentOptions): void;

    /**
     * Router
     */
    router(routes: RouteConfig[]): any;

    /**
     * WebSocket wrapper
     */
    websocket(url: string, options?: WebSocketOptions): WebSocket;

    /**
     * Create chart
     */
    chart(canvas: HTMLCanvasElement | string, data: ChartData, options?: ChartOptions): any;

    /**
     * Show notification
     */
    notify(message: string, type?: 'success' | 'error' | 'warning' | 'info', duration?: number): void;

    /**
     * Show toast
     */
    toast(message: string, options?: ToastOptions): void;

    /**
     * Show alert
     */
    alert(options: ModalOptions | string): void;

    /**
     * Show modal
     */
    modal(content: string | HTMLElement, options?: ModalOptions): void;

    /**
     * Download data
     */
    download(data: any, filename: string, type?: string): void;

    /**
     * Exit fullscreen
     */
    exitFullscreen(): void;

    /**
     * Text to speech
     */
    speak(text: string, options?: any): void;

    /**
     * Get geolocation
     */
    getLocation(callback: (position: GeolocationPosition) => void, errorCallback?: (error: GeolocationPositionError) => void): void;

    /**
     * Native share API
     */
    share(data: ShareData): Promise<void>;

    /**
     * Vibrate device
     */
    vibrate(pattern?: number | number[]): void;

    /**
     * Online status callback
     */
    onlineStatus(callback: (online: boolean) => void): void;

    /**
     * Visibility change callback
     */
    onVisibilityChange(callback: (visible: boolean) => void): void;

    /**
     * Performance measurement
     */
    measure(name: string, fn: () => any): any;

    /**
     * Generate QR code
     */
    qrcode(text: string, size?: number): string;

    /**
     * Generate barcode
     */
    barcode(text: string): string;

    /**
     * Render markdown
     */
    markdown(text: string): string;

    /**
     * Syntax highlight
     */
    highlight(code: string, language?: string): string;

    /**
     * Template engine
     */
    template(templateString: string, data: any): string;

    /**
     * Create timeline
     */
    timeline(): any;

    /**
     * Use plugin
     */
    use(plugin: Function, options?: any): void;

    /**
     * Feature detection
     */
    supports(feature: string): boolean;

    /**
     * Voice commands
     */
    voice: {
        listen(commands: Record<string, () => void>): void;
        stop(): void;
    };

    /**
     * Security utilities
     */
    security: {
        sanitizeHtml(html: string): string;
        csrfToken(): string;
    };
}

// ==================== GLOBAL DECLARATIONS ====================

declare global {
    interface Window {
        Yaka: YakaStatic;
        _: YakaStatic;
    }

    const Yaka: YakaStatic;
    const _: YakaStatic;
}

// ==================== EXPORTS ====================

declare const yaka: YakaStatic;
export default yaka;
export { YakaStatic, Yaka };
