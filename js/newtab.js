(() => {
    const STORAGE_KEY = 'relojNewTabSettingsV2';
    const MEDIA_DB_NAME = 'relojNewTabMediaDB';
    const MEDIA_DB_VERSION = 1;
    const MEDIA_STORE_NAME = 'mediaFiles';
    const BACKGROUND_MEDIA_KEY = 'background-media';
    const SESSION_MEDIA_KEY = 'session-media';

    const DEFAULT_SETTINGS = {
        showGoogleHeader: true,
        showSearchBar: true,
        showTopSites: true,
        showSidebar: true,
        showStickyNotes: true,
        showClock: true,
        useChromeTopSites: true,
        siteCount: 8,
        clockScale: 100,
        bgOverlay: 18,
        bgBlur: 0,
        accentColor: '#1f2230',
        textColor: '#f4f7fb',
        borderColor: '#d7dee6',
        backgroundImage: '',
        backgroundMediaType: '',
        backgroundMediaKey: '',
        backgroundMediaUpdatedAt: 0,
        hiddenSiteKeys: [],
        stickyNotes: [
            { id: 'note-a', text: 'lim x->0', x: 34, y: 178, rot: -3, w: 132, h: 114 },
            { id: 'note-b', text: "f'(x)=0", x: 40, y: 286, rot: -2, w: 132, h: 114 }
        ],
        appsOrder: [],
        hiddenAppIds: [],
        customApps: [],
        customSites: [
            { title: 'YouTube', url: 'https://www.youtube.com' },
            { title: 'WhatsApp', url: 'https://web.whatsapp.com' },
            { title: 'Drive', url: 'https://drive.google.com' }
        ]
    };

    const GSTATIC_ICON_BASE = 'https://www.gstatic.com/images/branding/product/2x/';

    const GOOGLE_APPS = [
        { id: 'gemini', title: 'Gemini', url: 'https://gemini.google.com', domain: 'gemini.google.com', icon: `${GSTATIC_ICON_BASE}gemini_48dp.png` },
        { id: 'drive', title: 'Drive', url: 'https://drive.google.com', domain: 'drive.google.com', icon: `${GSTATIC_ICON_BASE}drive_2020q4_48dp.png` },
        { id: 'account', title: 'Cuenta', url: 'https://myaccount.google.com', domain: 'myaccount.google.com', icon: `${GSTATIC_ICON_BASE}googleg_48dp.png` },
        { id: 'youtube', title: 'YouTube', url: 'https://www.youtube.com', domain: 'youtube.com', icon: `${GSTATIC_ICON_BASE}youtube_48dp.png` },
        { id: 'gmail', title: 'Gmail', url: 'https://mail.google.com', domain: 'mail.google.com', icon: `${GSTATIC_ICON_BASE}gmail_2020q4_48dp.png` },
        { id: 'maps', title: 'Maps', url: 'https://maps.google.com', domain: 'maps.google.com', icon: `${GSTATIC_ICON_BASE}maps_48dp.png` },
        { id: 'calendar', title: 'Calendario', url: 'https://calendar.google.com', domain: 'calendar.google.com', icon: `${GSTATIC_ICON_BASE}calendar_2020q4_48dp.png` },
        { id: 'photos', title: 'Fotos', url: 'https://photos.google.com', domain: 'photos.google.com', icon: `${GSTATIC_ICON_BASE}photos_48dp.png` },
        { id: 'docs', title: 'Documentos', url: 'https://docs.google.com/document', domain: 'docs.google.com', icon: `${GSTATIC_ICON_BASE}docs_2020q4_48dp.png` },
        { id: 'slides', title: 'Presentaciones', url: 'https://slides.google.com', domain: 'slides.google.com', icon: `${GSTATIC_ICON_BASE}slides_2020q4_48dp.png` },
        { id: 'forms', title: 'Formularios', url: 'https://forms.google.com', domain: 'forms.google.com', icon: `${GSTATIC_ICON_BASE}forms_2020q4_48dp.png` },
        { id: 'admin', title: 'Admin', url: 'https://admin.google.com', domain: 'admin.google.com', icon: `${GSTATIC_ICON_BASE}admin_48dp.png` },
        { id: 'ytmusic', title: 'YouTube Music', url: 'https://music.youtube.com', domain: 'music.youtube.com', icon: `${GSTATIC_ICON_BASE}youtube_music_48dp.png` },
        { id: 'notebooklm', title: 'NotebookLM', url: 'https://notebooklm.google.com', domain: 'notebooklm.google.com', icon: `${GSTATIC_ICON_BASE}notebooklm_48dp.png` },
        { id: 'search', title: 'Busqueda', url: 'https://www.google.com', domain: 'google.com', icon: `${GSTATIC_ICON_BASE}googleg_48dp.png` },
        { id: 'news', title: 'Noticias', url: 'https://news.google.com', domain: 'news.google.com', icon: `${GSTATIC_ICON_BASE}news_48dp.png` },
        { id: 'meet', title: 'Meet', url: 'https://meet.google.com', domain: 'meet.google.com', icon: `${GSTATIC_ICON_BASE}meet_48dp.png` },
        { id: 'translate', title: 'Traductor', url: 'https://translate.google.com', domain: 'translate.google.com', icon: `${GSTATIC_ICON_BASE}translate_48dp.png` },
        { id: 'sheets', title: 'Sheets', url: 'https://sheets.google.com', domain: 'sheets.google.com', icon: `${GSTATIC_ICON_BASE}sheets_2020q4_48dp.png` },
        { id: 'play', title: 'Play', url: 'https://play.google.com', domain: 'play.google.com', icon: `${GSTATIC_ICON_BASE}play_48dp.png` }
    ];
    const APP_LONG_PRESS_MS = 460;
    const SHORTCUT_MODAL_MODE = {
        APP: 'app',
        SITE: 'site'
    };
    const WEATHER_CODE_LABELS = {
        0: 'Despejado',
        1: 'Mayormente despejado',
        2: 'Parcialmente nublado',
        3: 'Nublado',
        45: 'Neblina',
        48: 'Neblina escarchada',
        51: 'Llovizna ligera',
        53: 'Llovizna moderada',
        55: 'Llovizna intensa',
        56: 'Llovizna helada ligera',
        57: 'Llovizna helada intensa',
        61: 'Lluvia ligera',
        63: 'Lluvia moderada',
        65: 'Lluvia fuerte',
        66: 'Lluvia helada ligera',
        67: 'Lluvia helada intensa',
        71: 'Nieve ligera',
        73: 'Nieve moderada',
        75: 'Nieve fuerte',
        77: 'Granizo',
        80: 'Chubascos ligeros',
        81: 'Chubascos moderados',
        82: 'Chubascos fuertes',
        85: 'Chubascos de nieve ligeros',
        86: 'Chubascos de nieve fuertes',
        95: 'Tormenta',
        96: 'Tormenta con granizo',
        99: 'Tormenta fuerte con granizo'
    };

    const state = {
        settings: loadSettings(),
        chromeTopSites: [],
        toastTimer: null,
        draggingAppId: null,
        profilePhotoUrl: '',
        appEditMode: false,
        siteEditMode: false,
        noteEditMode: false,
        editingNoteId: null,
        noteImageTargetId: null,
        sidebarPeekTimer: null,
        mediaDbPromise: null,
        backgroundObjectUrl: '',
        backgroundSignature: '',
        backgroundApplyToken: 0,
        noteMediaObjectUrls: {},
        weatherOpen: false,
        weatherRequestToken: 0,
        weatherLastFetchAt: 0,
        shortcutModalMode: SHORTCUT_MODAL_MODE.APP
    };

    const refs = {};

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        cacheElements();
        renderGoogleAppsLauncher();
        bindEvents();
        loadGoogleProfileAvatar();
        applySettings();
        renderCustomSites();
        renderSites();
        refreshChromeTopSites();
    }

    function cacheElements() {
        refs.body = document.body;
        refs.searchForm = document.getElementById('searchForm');
        refs.searchInput = document.getElementById('searchInput');
        refs.appsBtn = document.getElementById('appsBtn');
        refs.appsPopover = document.getElementById('appsPopover');
        refs.appsGrid = document.getElementById('appsGrid');
        refs.profileBtn = document.getElementById('profileBtn');
        refs.profileImage = document.getElementById('profileImage');
        refs.profileFallback = document.getElementById('profileFallback');
        refs.leftToolbar = document.getElementById('leftToolbar');
        refs.sidebarEdgeTrigger = document.getElementById('sidebarEdgeTrigger');
        refs.toolButtons = Array.from(document.querySelectorAll('.tool-btn'));
        refs.stickyNotes = document.getElementById('stickyNotes');
        refs.quickSites = document.getElementById('quickSites');
        refs.siteGrid = document.getElementById('siteGrid');
        refs.addSiteBtn = document.getElementById('addSiteBtn');
        refs.refreshTopSitesBtn = document.getElementById('refreshTopSitesBtn');
        refs.settingsPanel = document.getElementById('settingsPanel');
        refs.closeSettingsBtn = document.getElementById('closeSettingsBtn');
        refs.changeBackgroundBtn = document.getElementById('changeBackgroundBtn');
        refs.clearBackgroundBtn = document.getElementById('clearBackgroundBtn');
        refs.bgFileInput = document.getElementById('bgFileInput');
        refs.backgroundVideo = document.getElementById('backgroundVideo');
        refs.noteImageInput = document.getElementById('noteImageInput');
        refs.resetSettingsBtn = document.getElementById('resetSettingsBtn');
        refs.toast = document.getElementById('toast');
        refs.shortcutModal = document.getElementById('shortcutModal');
        refs.shortcutForm = document.getElementById('shortcutForm');
        refs.shortcutModalTitle = document.getElementById('shortcutModalTitle');
        refs.shortcutNameLabel = document.getElementById('shortcutNameLabel');
        refs.shortcutUrlLabel = document.getElementById('shortcutUrlLabel');
        refs.shortcutTitleInput = document.getElementById('shortcutTitleInput');
        refs.shortcutUrlInput = document.getElementById('shortcutUrlInput');
        refs.shortcutCancelBtn = document.getElementById('shortcutCancelBtn');
        refs.shortcutSubmitBtn = document.getElementById('shortcutSubmitBtn');
        refs.shortcutModalError = document.getElementById('shortcutModalError');
        refs.addSitePanelBtn = document.getElementById('addSitePanelBtn');
        refs.customSitesList = document.getElementById('customSitesList');

        refs.settingShowGoogle = document.getElementById('settingShowGoogle');
        refs.settingShowSearch = document.getElementById('settingShowSearch');
        refs.settingShowSites = document.getElementById('settingShowSites');
        refs.settingShowSidebar = document.getElementById('settingShowSidebar');
        refs.settingShowNotes = document.getElementById('settingShowNotes');
        refs.settingShowClock = document.getElementById('settingShowClock');
        refs.settingUseChromeTop = document.getElementById('settingUseChromeTop');

        refs.settingClockScale = document.getElementById('settingClockScale');
        refs.settingOverlay = document.getElementById('settingOverlay');
        refs.settingBlur = document.getElementById('settingBlur');
        refs.settingSiteCount = document.getElementById('settingSiteCount');
        refs.settingAccentColor = document.getElementById('settingAccentColor');
        refs.settingTextColor = document.getElementById('settingTextColor');
        refs.settingBorderColor = document.getElementById('settingBorderColor');

        refs.clockScaleValue = document.getElementById('clockScaleValue');
        refs.overlayValue = document.getElementById('overlayValue');
        refs.blurValue = document.getElementById('blurValue');
        refs.siteCountValue = document.getElementById('siteCountValue');

        refs.weatherWidget = document.getElementById('weatherWidget');
        refs.closeWeatherBtn = document.getElementById('closeWeatherBtn');
        refs.weatherTemp = document.getElementById('weatherTemp');
        refs.weatherCondition = document.getElementById('weatherCondition');
        refs.weatherLocation = document.getElementById('weatherLocation');
        refs.weatherHumidity = document.getElementById('weatherHumidity');
        refs.weatherWind = document.getElementById('weatherWind');
        refs.weatherForecast = document.getElementById('weatherForecast');
    }

    function clearSidebarPeekTimer() {
        if (!state.sidebarPeekTimer) {
            return;
        }
        clearTimeout(state.sidebarPeekTimer);
        state.sidebarPeekTimer = null;
    }

    function setSidebarPeekVisible(visible) {
        if (!refs.body) {
            return;
        }
        const shouldShow = Boolean(visible) && !state.settings.showSidebar;
        refs.body.classList.toggle('sidebar-peek', shouldShow);
    }

    function showSidebarPeek() {
        clearSidebarPeekTimer();
        setSidebarPeekVisible(true);
    }

    function hideSidebarPeekSoon(delay = 160) {
        if (state.settings.showSidebar) {
            setSidebarPeekVisible(false);
            return;
        }
        clearSidebarPeekTimer();
        state.sidebarPeekTimer = window.setTimeout(() => {
            state.sidebarPeekTimer = null;
            if (refs.leftToolbar && refs.leftToolbar.matches(':hover')) {
                return;
            }
            setSidebarPeekVisible(false);
        }, delay);
    }

    function onSidebarEdgePointerMove(event) {
        if (state.settings.showSidebar) {
            return;
        }

        const x = Number(event.clientX);
        if (Number.isNaN(x)) {
            return;
        }

        if (x <= 14) {
            showSidebarPeek();
            return;
        }

        if (!refs.body.classList.contains('sidebar-peek')) {
            return;
        }

        const toolbarRect = refs.leftToolbar ? refs.leftToolbar.getBoundingClientRect() : null;
        const releaseX = toolbarRect ? toolbarRect.right + 24 : 98;
        if (x > releaseX) {
            hideSidebarPeekSoon(120);
        }
    }

    function syncSidebarPeekMode() {
        clearSidebarPeekTimer();
        if (state.settings.showSidebar) {
            setSidebarPeekVisible(false);
            return;
        }
        refs.body.classList.remove('sidebar-peek');
    }

    function renderGoogleAppsLauncher() {
        if (!refs.appsGrid) {
            return;
        }

        refs.appsGrid.innerHTML = '';
        getOrderedGoogleApps().forEach((app) => {
            refs.appsGrid.appendChild(createGoogleAppTile(app));
        });

        refs.appsGrid.appendChild(createAddAppTile());
    }

    function createGoogleAppTile(app) {
        const tile = document.createElement('a');
        tile.className = 'app-tile';
        if (state.appEditMode) {
            tile.classList.add('edit-enabled');
        }
        tile.href = app.url;
        tile.target = '_blank';
        tile.rel = 'noopener noreferrer';
        tile.draggable = state.appEditMode;
        tile.dataset.appId = app.id;
        tile.dataset.custom = app.custom ? '1' : '0';

        const iconWrap = document.createElement('span');
        iconWrap.className = 'app-icon-wrap';

        const icon = document.createElement('img');
        icon.className = 'app-icon';
        icon.loading = 'lazy';
        icon.alt = '';
        icon.referrerPolicy = 'no-referrer';
        const iconUrl = (app.id === 'account' && state.profilePhotoUrl)
            ? state.profilePhotoUrl
            : (app.icon || `https://www.google.com/s2/favicons?sz=128&domain_url=${encodeURIComponent(app.url)}`);

        icon.src = iconUrl;
        if (app.id === 'account' && state.profilePhotoUrl) {
            icon.classList.add('avatar-app-icon');
        }
        icon.addEventListener('error', () => {
            icon.remove();
            iconWrap.appendChild(createAppIconFallback(app.title));
        }, { once: true });

        iconWrap.appendChild(icon);

        const label = document.createElement('span');
        label.className = 'app-label';
        label.textContent = app.title;

        tile.appendChild(iconWrap);
        tile.appendChild(label);

        if (state.appEditMode) {
            const removeButton = document.createElement('button');
            removeButton.type = 'button';
            removeButton.className = 'app-remove-btn';
            removeButton.textContent = 'x';
            removeButton.title = 'Quitar acceso';
            removeButton.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                removeGoogleAppShortcut(app.id);
            });
            tile.appendChild(removeButton);
        }

        tile.addEventListener('click', (event) => {
            if (state.appEditMode) {
                event.preventDefault();
            }
        });

        bindAppTileLongPress(tile);
        tile.addEventListener('dragstart', onAppDragStart);
        tile.addEventListener('dragover', onAppDragOver);
        tile.addEventListener('dragenter', onAppDragEnter);
        tile.addEventListener('dragleave', onAppDragLeave);
        tile.addEventListener('drop', onAppDrop);
        tile.addEventListener('dragend', onAppDragEnd);

        return tile;
    }

    function createAddAppTile() {
        const tile = document.createElement('button');
        tile.type = 'button';
        tile.className = 'app-tile add-app-tile';
        tile.title = 'Agregar acceso';
        tile.setAttribute('aria-label', 'Agregar acceso');

        const iconWrap = document.createElement('span');
        iconWrap.className = 'app-icon-wrap add-app-icon-wrap';

        const plus = document.createElement('span');
        plus.className = 'add-app-icon';
        plus.textContent = '+';
        iconWrap.appendChild(plus);

        const label = document.createElement('span');
        label.className = 'app-label';
        label.textContent = 'Agregar';

        tile.appendChild(iconWrap);
        tile.appendChild(label);
        tile.addEventListener('click', (event) => {
            event.preventDefault();
            openAddShortcutModal();
        });

        return tile;
    }

    function isShortcutModalOpen() {
        return Boolean(refs.shortcutModal && !refs.shortcutModal.classList.contains('hidden'));
    }

    function setShortcutModalError(message) {
        if (!refs.shortcutModalError) {
            return;
        }
        refs.shortcutModalError.textContent = message || '';
    }

    function getShortcutModalConfig(mode) {
        if (mode === SHORTCUT_MODAL_MODE.SITE) {
            return {
                title: 'Agregar sitio frecuente',
                nameLabel: 'Nombre del sitio',
                namePlaceholder: 'Ej: ChatGPT',
                nameRequired: false,
                urlLabel: 'URL del sitio',
                urlPlaceholder: 'https://chatgpt.com',
                submitText: 'Agregar sitio'
            };
        }
        return {
            title: 'Agregar acceso',
            nameLabel: 'Nombre del acceso',
            namePlaceholder: 'Ej: Classroom',
            nameRequired: true,
            urlLabel: 'URL del acceso',
            urlPlaceholder: 'https://classroom.google.com',
            submitText: 'Agregar'
        };
    }

    function openShortcutModal(mode) {
        if (!refs.shortcutModal) {
            return;
        }
        state.shortcutModalMode = mode === SHORTCUT_MODAL_MODE.SITE
            ? SHORTCUT_MODAL_MODE.SITE
            : SHORTCUT_MODAL_MODE.APP;
        const config = getShortcutModalConfig(state.shortcutModalMode);

        if (refs.shortcutModalTitle) refs.shortcutModalTitle.textContent = config.title;
        if (refs.shortcutNameLabel) refs.shortcutNameLabel.textContent = config.nameLabel;
        if (refs.shortcutUrlLabel) refs.shortcutUrlLabel.textContent = config.urlLabel;
        if (refs.shortcutSubmitBtn) refs.shortcutSubmitBtn.textContent = config.submitText;
        if (refs.shortcutTitleInput) {
            refs.shortcutTitleInput.placeholder = config.namePlaceholder;
            refs.shortcutTitleInput.required = config.nameRequired;
        }
        if (refs.shortcutUrlInput) {
            refs.shortcutUrlInput.placeholder = config.urlPlaceholder;
            refs.shortcutUrlInput.required = true;
        }

        setShortcutModalError('');
        refs.shortcutForm?.reset();
        refs.shortcutModal.classList.remove('hidden');
        refs.shortcutModal.setAttribute('aria-hidden', 'false');
        window.requestAnimationFrame(() => {
            refs.shortcutTitleInput?.focus();
        });
    }

    function openAddShortcutModal() {
        openShortcutModal(SHORTCUT_MODAL_MODE.APP);
    }

    function openAddSiteModal() {
        openShortcutModal(SHORTCUT_MODAL_MODE.SITE);
    }

    function closeAddShortcutModal() {
        if (!refs.shortcutModal) {
            return;
        }
        refs.shortcutModal.classList.add('hidden');
        refs.shortcutModal.setAttribute('aria-hidden', 'true');
        setShortcutModalError('');
    }

    function getAllGoogleApps() {
        const customApps = Array.isArray(state.settings.customApps) ? state.settings.customApps : [];
        return [...GOOGLE_APPS, ...customApps];
    }

    function getOrderedGoogleApps() {
        const allApps = getAllGoogleApps();
        const hiddenIds = new Set(Array.isArray(state.settings.hiddenAppIds) ? state.settings.hiddenAppIds : []);
        const byId = new Map(allApps.map((app) => [app.id, app]));
        const defaultOrder = allApps.map((app) => app.id);
        const rawOrder = Array.isArray(state.settings.appsOrder) ? state.settings.appsOrder : [];
        const seen = new Set();
        const finalOrder = [];

        rawOrder.forEach((id) => {
            if (!byId.has(id) || seen.has(id)) {
                return;
            }
            seen.add(id);
            finalOrder.push(id);
        });

        defaultOrder.forEach((id) => {
            if (seen.has(id)) {
                return;
            }
            seen.add(id);
            finalOrder.push(id);
        });

        return finalOrder
            .filter((id) => !hiddenIds.has(id))
            .map((id) => byId.get(id))
            .filter(Boolean);
    }

    function setAppEditMode(enabled, showToastMessage = false) {
        const normalized = Boolean(enabled);
        if (state.appEditMode === normalized) {
            return;
        }
        state.appEditMode = normalized;
        clearAppsDropStyles();
        renderGoogleAppsLauncher();
        if (showToastMessage) {
            showToast(normalized ? 'Modo edicion activado' : 'Modo edicion desactivado');
        }
    }

    function bindAppTileLongPress(tile) {
        let pressTimer = null;
        let startX = 0;
        let startY = 0;

        const clearPressTimer = () => {
            if (!pressTimer) {
                return;
            }
            clearTimeout(pressTimer);
            pressTimer = null;
        };

        tile.addEventListener('pointerdown', (event) => {
            if (event.button !== 0) {
                return;
            }
            if (event.target && event.target.closest('.app-remove-btn')) {
                return;
            }
            startX = event.clientX;
            startY = event.clientY;
            clearPressTimer();
            pressTimer = window.setTimeout(() => {
                pressTimer = null;
                setAppEditMode(true, true);
            }, APP_LONG_PRESS_MS);
        });

        tile.addEventListener('pointermove', (event) => {
            if (!pressTimer) {
                return;
            }
            const dx = Math.abs(event.clientX - startX);
            const dy = Math.abs(event.clientY - startY);
            if (dx > 8 || dy > 8) {
                clearPressTimer();
            }
        });

        tile.addEventListener('pointerup', clearPressTimer);
        tile.addEventListener('pointerleave', clearPressTimer);
        tile.addEventListener('pointercancel', clearPressTimer);
        tile.addEventListener('dragstart', clearPressTimer);
    }

    function setSiteEditMode(enabled, showToastMessage = false) {
        const normalized = Boolean(enabled);
        if (state.siteEditMode === normalized) {
            return;
        }
        state.siteEditMode = normalized;
        renderSites();
        if (showToastMessage) {
            showToast(normalized ? 'Edicion de sitios activada' : 'Edicion de sitios desactivada');
        }
    }

    function bindSiteCardLongPress(card) {
        let pressTimer = null;
        let startX = 0;
        let startY = 0;

        const clearPressTimer = () => {
            if (!pressTimer) {
                return;
            }
            clearTimeout(pressTimer);
            pressTimer = null;
        };

        card.addEventListener('pointerdown', (event) => {
            if (event.button !== 0 || state.siteEditMode) {
                return;
            }
            if (event.target && event.target.closest('.site-remove-btn')) {
                return;
            }
            startX = event.clientX;
            startY = event.clientY;
            clearPressTimer();
            pressTimer = window.setTimeout(() => {
                pressTimer = null;
                setSiteEditMode(true, true);
            }, APP_LONG_PRESS_MS);
        });

        card.addEventListener('pointermove', (event) => {
            if (!pressTimer) {
                return;
            }
            const dx = Math.abs(event.clientX - startX);
            const dy = Math.abs(event.clientY - startY);
            if (dx > 8 || dy > 8) {
                clearPressTimer();
            }
        });

        card.addEventListener('pointerup', clearPressTimer);
        card.addEventListener('pointerleave', clearPressTimer);
        card.addEventListener('pointercancel', clearPressTimer);
    }

    function getStickyNotesList() {
        if (!Array.isArray(state.settings.stickyNotes)) {
            state.settings.stickyNotes = [];
        }
        return state.settings.stickyNotes;
    }

    function getStickyNoteMediaKey(noteId) {
        return `note-media-${noteId}`;
    }

    function revokeStickyNoteMediaUrl(noteId) {
        if (!noteId || !state.noteMediaObjectUrls[noteId]) {
            return;
        }
        try {
            URL.revokeObjectURL(state.noteMediaObjectUrls[noteId]);
        } catch (error) {
            // noop
        }
        delete state.noteMediaObjectUrls[noteId];
    }

    function revokeAllStickyNoteMediaUrls() {
        Object.keys(state.noteMediaObjectUrls).forEach((noteId) => {
            revokeStickyNoteMediaUrl(noteId);
        });
    }

    function escapeHtml(value) {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function normalizeImageSource(rawUrl) {
        const value = String(rawUrl || '').trim();
        if (!value) {
            return '';
        }
        if (/^https?:\/\/\S+$/i.test(value)) {
            return value;
        }
        const compact = value.replace(/\s+/g, '');
        if (/^data:image\/[a-z0-9.+-]+;base64,[a-z0-9+/=]+$/i.test(compact)) {
            return compact;
        }
        return '';
    }

    function normalizeVideoSource(rawUrl) {
        const value = String(rawUrl || '').trim();
        if (!value) {
            return '';
        }
        if (/^https?:\/\/\S+$/i.test(value)) {
            if (/\.(mp4|webm|ogg|mov|m4v)(?:[#?].*)?$/i.test(value)) {
                return value;
            }
            return '';
        }
        const compact = value.replace(/\s+/g, '');
        if (/^data:video\/[a-z0-9.+-]+;base64,[a-z0-9+/=]+$/i.test(compact)) {
            return compact;
        }
        return '';
    }

    function resolveStickyMediaSource(rawUrl, altText = '') {
        const imageSrc = normalizeImageSource(rawUrl);
        if (imageSrc) {
            return { type: 'image', src: imageSrc };
        }

        const videoSrc = normalizeVideoSource(rawUrl);
        if (videoSrc) {
            return { type: 'video', src: videoSrc };
        }

        const hint = String(altText || '').trim().toLowerCase();
        if (hint.startsWith('video')) {
            const fallbackVideoSrc = normalizeVideoSource(rawUrl);
            if (fallbackVideoSrc) {
                return { type: 'video', src: fallbackVideoSrc };
            }
        }
        return null;
    }

    function normalizeStickyNoteText(rawText, allowEmpty = false) {
        const clean = String(rawText || '').replace(/\r/g, '');
        const hasInlineMedia = /!\[[^\]]*\]\(\s*data:(?:image|video)\//i.test(clean);
        const maxLength = hasInlineMedia ? 1600000 : 12000;
        const trimmed = clean.slice(0, maxLength).trim();
        if (!trimmed) {
            return allowEmpty ? '' : 'Nueva nota';
        }
        return trimmed;
    }

    function renderStickyNoteMarkdown(rawText, allowEmpty = false) {
        const normalized = normalizeStickyNoteText(rawText, allowEmpty);
        const source = normalized.replace(/\r/g, '');
        const imageTokens = [];
        const sourceTrim = source.trim();

        let html = escapeHtml(source);
        html = html.replace(/!\[([^\]]*)\]\s*\(([\s\S]*?)\)/g, (match, alt, url) => {
            const media = resolveStickyMediaSource(url, alt);
            if (!media) {
                return match;
            }
            const token = `@@IMG${imageTokens.length}@@`;
            if (media.type === 'video') {
                imageTokens.push(`<video src="${escapeHtml(media.src)}" controls muted loop playsinline preload="metadata"></video>`);
            } else {
                imageTokens.push(`<img src="${escapeHtml(media.src)}" alt="${escapeHtml(alt)}" loading="lazy">`);
            }
            return token;
        });

        html = html
            .replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>')
            .replace(/\*([^*\n]+)\*/g, '<em>$1</em>')
            .replace(/==([^=\n]+)==/g, '<mark>$1</mark>')
            .replace(/`([^`\n]+)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>');

        imageTokens.forEach((tokenHtml, index) => {
            html = html.replace(`@@IMG${index}@@`, tokenHtml);
        });

        const imageOnlyMatch = sourceTrim.match(/^!\[([^\]]*)\]\s*\(([\s\S]*?)\)$/);
        let imageOnly = Boolean(imageOnlyMatch && resolveStickyMediaSource(imageOnlyMatch[2], imageOnlyMatch[1]));

        if (!imageOnly && imageTokens.length === 0) {
            const legacyDataMatch = sourceTrim.match(/^!\[[^\]]*\]\s*\(\s*(data:(?:image|video)\/[a-z0-9.+-]+;base64,[a-z0-9+/=\s]+)\s*\)?$/i);
            if (legacyDataMatch) {
                const media = resolveStickyMediaSource(legacyDataMatch[1], 'video');
                if (media) {
                    html = media.type === 'video'
                        ? `<video src="${escapeHtml(media.src)}" controls muted loop playsinline preload="metadata"></video>`
                        : `<img src="${escapeHtml(media.src)}" alt="imagen" loading="lazy">`;
                    imageOnly = true;
                }
            }
        }

        return {
            raw: normalized,
            html,
            imageOnly
        };
    }

    function setStickyNoteEditMode(enabled, showToastMessage = false) {
        const normalized = Boolean(enabled);
        if (state.noteEditMode === normalized) {
            return;
        }

        if (!normalized && state.editingNoteId) {
            const activeNote = refs.stickyNotes?.querySelector(`.sticky-note[data-note-id="${state.editingNoteId}"]`);
            const activeText = activeNote ? activeNote.querySelector('.sticky-note-text') : null;
            if (activeText) {
                const note = getStickyNotesList().find((item) => item.id === state.editingNoteId);
                const allowEmpty = Boolean(note && note.mediaKey);
                updateStickyNoteById(state.editingNoteId, { text: normalizeStickyNoteText(activeText.textContent || '', allowEmpty) }, true);
            }
            state.editingNoteId = null;
        }

        state.noteEditMode = normalized;
        renderStickyNotes();

        if (showToastMessage) {
            showToast(normalized ? 'Edicion de notas activada' : 'Edicion de notas desactivada');
        }
    }

    function clampStickyNotePosition(x, y, noteWidth = 136, noteHeight = 118) {
        const maxX = Math.max(8, window.innerWidth - noteWidth - 8);
        const maxY = Math.max(8, window.innerHeight - noteHeight - 8);
        return {
            x: clamp(Number(x), 8, maxX),
            y: clamp(Number(y), 8, maxY)
        };
    }

    function getStickyNoteSizeBounds() {
        const minW = 96;
        const minH = 86;
        const maxW = Math.max(minW, window.innerWidth - 16);
        const maxH = Math.max(minH, window.innerHeight - 16);
        return {
            minW,
            minH,
            maxW,
            maxH
        };
    }

    function normalizeAngleDeltaDegrees(delta) {
        let normalized = delta;
        while (normalized > 180) {
            normalized -= 360;
        }
        while (normalized < -180) {
            normalized += 360;
        }
        return normalized;
    }

    function updateStickyNoteById(noteId, patch, persist = true) {
        const notes = getStickyNotesList();
        const note = notes.find((item) => item.id === noteId);
        if (!note) {
            return;
        }
        Object.assign(note, patch);
        if (persist) {
            saveSettings();
        }
    }

    function addStickyNote() {
        if (!state.settings.showStickyNotes) {
            updateSetting('showStickyNotes', true);
        }

        const notes = getStickyNotesList();
        const id = `note-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
        const offset = notes.length * 14;
        const seededX = 56 + (offset % 120);
        const seededY = 150 + (offset % 140);
        const pos = clampStickyNotePosition(seededX, seededY);
        const rot = ((notes.length % 7) - 3) * 1.4;

        notes.push({
            id,
            text: 'Nueva nota',
            x: pos.x,
            y: pos.y,
            rot: clamp(rot, -8, 8),
            w: 132,
            h: 114,
            mediaType: '',
            mediaKey: '',
            mediaUpdatedAt: 0
        });

        saveSettings();
        renderStickyNotes();
        showToast('Nota agregada');
    }

    function removeStickyNote(noteId) {
        const notes = getStickyNotesList();
        const previous = notes.length;
        const removedNote = notes.find((note) => note.id === noteId);
        state.settings.stickyNotes = notes.filter((note) => note.id !== noteId);
        if (state.settings.stickyNotes.length === previous) {
            return;
        }

        if (removedNote && typeof removedNote.mediaKey === 'string' && removedNote.mediaKey) {
            deleteMediaBlob(removedNote.mediaKey).catch(() => {
                // noop
            });
        }
        revokeStickyNoteMediaUrl(noteId);

        if (state.editingNoteId === noteId) {
            state.editingNoteId = null;
        }

        saveSettings();
        renderStickyNotes();
        showToast('Nota eliminada');
    }

    function startStickyNoteTextEdit(noteEl, textEl) {
        const noteId = noteEl.dataset.noteId || '';
        if (!noteId) {
            return;
        }

        state.editingNoteId = noteId;
        if (!state.noteEditMode) {
            state.noteEditMode = true;
            refs.stickyNotes?.classList.add('edit-mode');
        }

        const rawText = noteEl.dataset.rawText || textEl.textContent || '';
        textEl.textContent = rawText;
        noteEl.classList.remove('image-only', 'attachment-only');
        noteEl.classList.add('editing');
        textEl.contentEditable = 'true';
        textEl.spellcheck = false;
        textEl.focus();

        const selection = window.getSelection();
        if (selection) {
            const range = document.createRange();
            range.selectNodeContents(textEl);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    function finishStickyNoteTextEdit(noteEl, textEl) {
        const noteId = noteEl.dataset.noteId || '';
        if (!noteId) {
            return;
        }

        const noteData = getStickyNotesList().find((item) => item.id === noteId);
        const hasAttachment = Boolean(noteData && noteData.mediaKey);
        const rendered = renderStickyNoteMarkdown(textEl.textContent || '', hasAttachment);
        const normalizedText = hasAttachment
            ? normalizeStickyNoteText(rendered.raw, true)
            : rendered.raw;
        textEl.innerHTML = rendered.html;
        textEl.contentEditable = 'false';
        noteEl.classList.remove('editing');
        noteEl.classList.toggle('image-only', rendered.imageOnly);
        noteEl.classList.toggle('attachment-only', hasAttachment && !normalizedText.trim());
        noteEl.dataset.rawText = normalizedText;

        if (state.editingNoteId === noteId) {
            state.editingNoteId = null;
        }

        updateStickyNoteById(noteId, { text: normalizedText }, true);
    }

    async function hydrateStickyNoteAttachment(noteEl, note) {
        if (!noteEl || !note) {
            return;
        }

        const attachmentEl = noteEl.querySelector('.sticky-note-attachment');
        if (!attachmentEl) {
            return;
        }

        attachmentEl.innerHTML = '';
        noteEl.classList.remove('has-attachment', 'attachment-only');

        const mediaType = normalizeBackgroundMediaType(note.mediaType);
        const mediaKey = typeof note.mediaKey === 'string' ? note.mediaKey : '';
        if (!mediaType || !mediaKey) {
            revokeStickyNoteMediaUrl(note.id);
            return;
        }

        try {
            const blob = await getMediaBlob(mediaKey);
            if (!blob || !noteEl.isConnected) {
                revokeStickyNoteMediaUrl(note.id);
                return;
            }

            const currentNote = getStickyNotesList().find((item) => item.id === note.id);
            if (!currentNote) {
                revokeStickyNoteMediaUrl(note.id);
                return;
            }
            if ((Number(currentNote.mediaUpdatedAt) || 0) !== (Number(note.mediaUpdatedAt) || 0)) {
                return;
            }

            revokeStickyNoteMediaUrl(note.id);
            const source = URL.createObjectURL(blob);
            state.noteMediaObjectUrls[note.id] = source;

            let mediaEl;
            if (mediaType === 'video') {
                mediaEl = document.createElement('video');
                mediaEl.controls = true;
                mediaEl.muted = true;
                mediaEl.loop = true;
                mediaEl.autoplay = true;
                mediaEl.playsInline = true;
                mediaEl.preload = 'metadata';
            } else {
                mediaEl = document.createElement('img');
                mediaEl.loading = 'lazy';
                mediaEl.alt = 'Nota multimedia';
            }
            mediaEl.src = source;
            attachmentEl.appendChild(mediaEl);

            noteEl.classList.add('has-attachment');
            const rawText = String(noteEl.dataset.rawText || '').trim();
            const hasVisibleText = rawText && rawText !== 'Nueva nota';
            if (!hasVisibleText) {
                noteEl.classList.add('attachment-only');
            }
        } catch (error) {
            console.warn('No se pudo cargar el medio de la nota', error);
        }
    }

    function openStickyNoteImagePicker(noteId) {
        if (!refs.noteImageInput || !noteId) {
            return;
        }
        state.noteImageTargetId = noteId;
        refs.noteImageInput.click();
    }

    async function onStickyNoteImageSelected(event) {
        const file = event.target.files && event.target.files[0];
        if (!file || !state.noteImageTargetId) {
            event.target.value = '';
            return;
        }

        const noteId = state.noteImageTargetId;
        const mimeType = String(file.type || '').toLowerCase();
        const isImage = mimeType.startsWith('image/');
        const isVideo = mimeType.startsWith('video/');
        if (!isImage && !isVideo) {
            showToast('Formato no compatible para nota');
            event.target.value = '';
            state.noteImageTargetId = null;
            return;
        }

        const notes = getStickyNotesList();
        const note = notes.find((item) => item.id === noteId);
        if (!note) {
            event.target.value = '';
            state.noteImageTargetId = null;
            return;
        }

        const mediaKey = getStickyNoteMediaKey(noteId);
        try {
            await putMediaBlob(mediaKey, file);

            note.mediaType = isVideo ? 'video' : 'image';
            note.mediaKey = mediaKey;
            note.mediaUpdatedAt = Date.now();

            saveSettings();
            renderStickyNotes();
            showToast(isVideo ? 'Video agregado a la nota' : 'Imagen agregada a la nota');
        } catch (error) {
            console.warn('No se pudo guardar el medio de la nota', error);
            showToast('No se pudo guardar el medio de la nota');
        } finally {
            event.target.value = '';
            state.noteImageTargetId = null;
        }
    }

    function bindStickyNoteInteractions(noteEl, textEl, deleteButton, imageButton, rotateHandle, resizeHandles) {
        const noteId = noteEl.dataset.noteId || '';
        let pressTimer = null;
        let pointerId = null;
        let rotatePointerId = null;
        let resizePointerId = null;
        let resizeDirection = '';
        let dragging = false;
        let rotating = false;
        let resizing = false;
        let startClientX = 0;
        let startClientY = 0;
        let startX = 0;
        let startY = 0;
        let startCenterX = 0;
        let startCenterY = 0;
        let startPointerAngle = 0;
        let startRot = Number(noteEl.dataset.rot || 0);
        let startWidth = Number(noteEl.dataset.w || noteEl.offsetWidth || 132);
        let startHeight = Number(noteEl.dataset.h || noteEl.offsetHeight || 114);

        const clearPressTimer = () => {
            if (!pressTimer) {
                return;
            }
            clearTimeout(pressTimer);
            pressTimer = null;
        };

        const releasePointer = () => {
            if (pointerId === null) {
                return;
            }
            if (noteEl.hasPointerCapture(pointerId)) {
                noteEl.releasePointerCapture(pointerId);
            }
            pointerId = null;
        };

        noteEl.addEventListener('pointerdown', (event) => {
            if (event.button !== 0) {
                return;
            }
            if (event.target && event.target.closest('.sticky-note-control')) {
                return;
            }
            if (noteEl.classList.contains('editing')) {
                return;
            }

            pointerId = event.pointerId;
            dragging = false;
            startClientX = event.clientX;
            startClientY = event.clientY;
            startX = Number(noteEl.dataset.x || 0);
            startY = Number(noteEl.dataset.y || 0);

            clearPressTimer();
            if (!state.noteEditMode) {
                pressTimer = window.setTimeout(() => {
                    pressTimer = null;
                    setStickyNoteEditMode(true, true);
                }, APP_LONG_PRESS_MS);
            }

            noteEl.setPointerCapture(pointerId);
        });

        noteEl.addEventListener('pointermove', (event) => {
            if (pointerId !== event.pointerId || rotating || resizing) {
                return;
            }

            const dx = event.clientX - startClientX;
            const dy = event.clientY - startClientY;

            if (!dragging) {
                if (Math.abs(dx) < 3 && Math.abs(dy) < 3) {
                    return;
                }
                dragging = true;
                clearPressTimer();
                noteEl.classList.add('dragging');
            }

            const nextPos = clampStickyNotePosition(startX + dx, startY + dy, noteEl.offsetWidth || 136, noteEl.offsetHeight || 118);
            noteEl.style.left = `${nextPos.x}px`;
            noteEl.style.top = `${nextPos.y}px`;
            noteEl.dataset.x = String(nextPos.x);
            noteEl.dataset.y = String(nextPos.y);
        });

        const endDrag = (event) => {
            if (pointerId !== event.pointerId) {
                return;
            }

            clearPressTimer();
            if (dragging) {
                const finalX = Number(noteEl.dataset.x || startX);
                const finalY = Number(noteEl.dataset.y || startY);
                updateStickyNoteById(noteId, { x: finalX, y: finalY }, true);
                noteEl.classList.remove('dragging');
            }
            dragging = false;
            releasePointer();
        };

        noteEl.addEventListener('pointerup', endDrag);
        noteEl.addEventListener('pointercancel', endDrag);
        noteEl.addEventListener('pointerleave', clearPressTimer);

        noteEl.addEventListener('dblclick', (event) => {
            if (event.target && event.target.closest('.sticky-note-control')) {
                return;
            }
            event.preventDefault();
            event.stopPropagation();
            startStickyNoteTextEdit(noteEl, textEl);
        });

        textEl.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                textEl.blur();
            }
        });

        textEl.addEventListener('blur', () => {
            if (textEl.isContentEditable) {
                finishStickyNoteTextEdit(noteEl, textEl);
            }
        });

        deleteButton.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            removeStickyNote(noteId);
        });

        imageButton.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            openStickyNoteImagePicker(noteId);
        });

        rotateHandle.addEventListener('pointerdown', (event) => {
            event.preventDefault();
            event.stopPropagation();
            clearPressTimer();
            rotatePointerId = event.pointerId;
            rotating = true;
            startRot = Number(noteEl.dataset.rot || 0);
            const rect = noteEl.getBoundingClientRect();
            startCenterX = rect.left + rect.width / 2;
            startCenterY = rect.top + rect.height / 2;
            startPointerAngle = Math.atan2(event.clientY - startCenterY, event.clientX - startCenterX);
            rotateHandle.setPointerCapture(rotatePointerId);
        });

        rotateHandle.addEventListener('pointermove', (event) => {
            if (!rotating || rotatePointerId !== event.pointerId) {
                return;
            }
            const currentAngle = Math.atan2(event.clientY - startCenterY, event.clientX - startCenterX);
            const deltaDeg = normalizeAngleDeltaDegrees((currentAngle - startPointerAngle) * (180 / Math.PI));
            const nextRot = clamp(startRot + deltaDeg, -180, 180);
            noteEl.dataset.rot = String(nextRot);
            noteEl.style.setProperty('--note-rot', `${nextRot}deg`);
        });

        const endRotate = (event) => {
            if (!rotating || rotatePointerId !== event.pointerId) {
                return;
            }
            rotating = false;
            if (rotateHandle.hasPointerCapture(rotatePointerId)) {
                rotateHandle.releasePointerCapture(rotatePointerId);
            }
            rotatePointerId = null;
            updateStickyNoteById(noteId, { rot: Number(noteEl.dataset.rot || startRot) }, true);
        };

        rotateHandle.addEventListener('pointerup', endRotate);
        rotateHandle.addEventListener('pointercancel', endRotate);

        const startResize = (event) => {
            event.preventDefault();
            event.stopPropagation();
            clearPressTimer();

            const handle = event.currentTarget;
            resizeDirection = handle && handle.dataset ? String(handle.dataset.dir || '') : '';
            if (!resizeDirection) {
                return;
            }

            resizePointerId = event.pointerId;
            resizing = true;
            startClientX = event.clientX;
            startClientY = event.clientY;
            startX = Number(noteEl.dataset.x || noteEl.offsetLeft || 0);
            startY = Number(noteEl.dataset.y || noteEl.offsetTop || 0);
            startWidth = Number(noteEl.dataset.w || noteEl.offsetWidth || 132);
            startHeight = Number(noteEl.dataset.h || noteEl.offsetHeight || 114);

            handle.setPointerCapture(resizePointerId);
        };

        const moveResize = (event) => {
            if (!resizing || resizePointerId !== event.pointerId || !resizeDirection) {
                return;
            }

            const dx = event.clientX - startClientX;
            const dy = event.clientY - startClientY;
            const bounds = getStickyNoteSizeBounds();

            let nextX = startX;
            let nextY = startY;
            let nextW = startWidth;
            let nextH = startHeight;

            if (resizeDirection.includes('e')) {
                nextW = startWidth + dx;
            }
            if (resizeDirection.includes('s')) {
                nextH = startHeight + dy;
            }
            if (resizeDirection.includes('w')) {
                nextW = startWidth - dx;
            }
            if (resizeDirection.includes('n')) {
                nextH = startHeight - dy;
            }

            nextW = clamp(nextW, bounds.minW, bounds.maxW);
            nextH = clamp(nextH, bounds.minH, bounds.maxH);

            if (resizeDirection.includes('w')) {
                nextX = startX + (startWidth - nextW);
            }
            if (resizeDirection.includes('n')) {
                nextY = startY + (startHeight - nextH);
            }

            const clampedPos = clampStickyNotePosition(nextX, nextY, nextW, nextH);
            noteEl.style.left = `${clampedPos.x}px`;
            noteEl.style.top = `${clampedPos.y}px`;
            noteEl.style.width = `${nextW}px`;
            noteEl.style.minHeight = `${nextH}px`;
            noteEl.dataset.x = String(clampedPos.x);
            noteEl.dataset.y = String(clampedPos.y);
            noteEl.dataset.w = String(nextW);
            noteEl.dataset.h = String(nextH);
        };

        const endResize = (event) => {
            if (!resizing || resizePointerId !== event.pointerId) {
                return;
            }

            const handle = event.currentTarget;
            if (handle && handle.hasPointerCapture(resizePointerId)) {
                handle.releasePointerCapture(resizePointerId);
            }

            resizing = false;
            resizePointerId = null;
            resizeDirection = '';

            const finalW = Number(noteEl.dataset.w || startWidth);
            const finalH = Number(noteEl.dataset.h || startHeight);
            const finalX = Number(noteEl.dataset.x || startX);
            const finalY = Number(noteEl.dataset.y || startY);
            const adjusted = clampStickyNotePosition(finalX, finalY, finalW, finalH);

            noteEl.style.left = `${adjusted.x}px`;
            noteEl.style.top = `${adjusted.y}px`;
            noteEl.dataset.x = String(adjusted.x);
            noteEl.dataset.y = String(adjusted.y);

            updateStickyNoteById(noteId, {
                x: adjusted.x,
                y: adjusted.y,
                w: finalW,
                h: finalH
            }, true);
        };

        resizeHandles.forEach((handle) => {
            handle.addEventListener('pointerdown', startResize);
            handle.addEventListener('pointermove', moveResize);
            handle.addEventListener('pointerup', endResize);
            handle.addEventListener('pointercancel', endResize);
        });
    }

    function renderStickyNotes() {
        if (!refs.stickyNotes) {
            return;
        }

        refs.stickyNotes.classList.toggle('edit-mode', state.noteEditMode);
        revokeAllStickyNoteMediaUrls();
        refs.stickyNotes.innerHTML = '';

        const notes = getStickyNotesList();
        notes.forEach((note) => {
            const noteEl = document.createElement('article');
            noteEl.className = 'sticky-note';
            noteEl.dataset.noteId = note.id;
            const noteRot = clamp(Number(note.rot), -180, 180);
            const bounds = getStickyNoteSizeBounds();
            const noteW = clamp(Number(note.w), bounds.minW, bounds.maxW);
            const noteH = clamp(Number(note.h), bounds.minH, bounds.maxH);
            noteEl.style.setProperty('--note-rot', `${noteRot}deg`);
            noteEl.dataset.rot = String(noteRot);
            noteEl.dataset.w = String(noteW);
            noteEl.dataset.h = String(noteH);
            noteEl.style.width = `${noteW}px`;
            noteEl.style.minHeight = `${noteH}px`;

            const pos = clampStickyNotePosition(note.x, note.y, noteW, noteH);
            noteEl.style.left = `${pos.x}px`;
            noteEl.style.top = `${pos.y}px`;
            noteEl.dataset.x = String(pos.x);
            noteEl.dataset.y = String(pos.y);

            const textEl = document.createElement('div');
            textEl.className = 'sticky-note-text';
            const rendered = renderStickyNoteMarkdown(note.text, Boolean(note.mediaKey));
            noteEl.dataset.rawText = rendered.raw;
            textEl.innerHTML = rendered.html;
            noteEl.classList.toggle('image-only', rendered.imageOnly);

            const attachmentEl = document.createElement('div');
            attachmentEl.className = 'sticky-note-attachment';

            const deleteButton = document.createElement('button');
            deleteButton.type = 'button';
            deleteButton.className = 'sticky-note-delete sticky-note-control';
            deleteButton.textContent = 'x';
            deleteButton.title = 'Eliminar nota';

            const imageButton = document.createElement('button');
            imageButton.type = 'button';
            imageButton.className = 'sticky-note-image sticky-note-control';
            imageButton.title = 'Agregar imagen o video';
            imageButton.textContent = 'md';

            const rotateHandle = document.createElement('button');
            rotateHandle.type = 'button';
            rotateHandle.className = 'sticky-note-rotate sticky-note-control';
            rotateHandle.title = 'Girar nota';
            rotateHandle.textContent = '⟳';

            const resizeDirections = ['n', 'e', 's', 'w', 'nw', 'ne', 'sw', 'se'];
            const resizeHandles = resizeDirections.map((dir) => {
                const handle = document.createElement('button');
                handle.type = 'button';
                handle.className = `sticky-note-resize sticky-note-control dir-${dir}`;
                handle.dataset.dir = dir;
                handle.title = 'Ajustar tamano';
                handle.setAttribute('aria-label', `Ajustar tamano ${dir}`);
                return handle;
            });

            noteEl.appendChild(textEl);
            noteEl.appendChild(attachmentEl);
            noteEl.appendChild(imageButton);
            noteEl.appendChild(rotateHandle);
            resizeHandles.forEach((handle) => noteEl.appendChild(handle));
            noteEl.appendChild(deleteButton);

            if (state.editingNoteId === note.id) {
                startStickyNoteTextEdit(noteEl, textEl);
            }

            bindStickyNoteInteractions(noteEl, textEl, deleteButton, imageButton, rotateHandle, resizeHandles);
            refs.stickyNotes.appendChild(noteEl);
            hydrateStickyNoteAttachment(noteEl, note);
        });
    }

    function onAppDragStart(event) {
        if (!state.appEditMode) {
            event.preventDefault();
            return;
        }
        const appId = event.currentTarget && event.currentTarget.dataset ? event.currentTarget.dataset.appId : '';
        if (!appId) {
            return;
        }

        state.draggingAppId = appId;
        event.currentTarget.classList.add('dragging');

        if (event.dataTransfer) {
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('text/plain', appId);
        }
    }

    function onAppDragOver(event) {
        if (!state.appEditMode || !state.draggingAppId) {
            return;
        }
        event.preventDefault();
        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = 'move';
        }
    }

    function onAppDragEnter(event) {
        const targetId = event.currentTarget && event.currentTarget.dataset ? event.currentTarget.dataset.appId : '';
        if (!state.appEditMode || !state.draggingAppId || !targetId || targetId === state.draggingAppId) {
            return;
        }
        event.currentTarget.classList.add('drop-target');
    }

    function onAppDragLeave(event) {
        event.currentTarget.classList.remove('drop-target');
    }

    function onAppDrop(event) {
        if (!state.appEditMode) {
            return;
        }
        event.preventDefault();
        const targetId = event.currentTarget && event.currentTarget.dataset ? event.currentTarget.dataset.appId : '';
        const draggedId = state.draggingAppId || (event.dataTransfer ? event.dataTransfer.getData('text/plain') : '');

        clearAppsDropStyles();

        if (!targetId || !draggedId || targetId === draggedId) {
            return;
        }

        moveAppInOrder(draggedId, targetId);
    }

    function onAppDragEnd(event) {
        event.currentTarget.classList.remove('dragging');
        clearAppsDropStyles();
    }

    function clearAppsDropStyles() {
        state.draggingAppId = null;
        document.querySelectorAll('.app-tile.dragging, .app-tile.drop-target').forEach((node) => {
            node.classList.remove('dragging', 'drop-target');
        });
    }

    function moveAppInOrder(draggedId, targetId) {
        const orderedIds = getOrderedGoogleApps().map((app) => app.id);
        const fromIndex = orderedIds.indexOf(draggedId);
        const toIndex = orderedIds.indexOf(targetId);

        if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) {
            return;
        }

        orderedIds.splice(fromIndex, 1);
        orderedIds.splice(toIndex, 0, draggedId);

        state.settings.appsOrder = orderedIds;
        saveSettings();
        renderGoogleAppsLauncher();
    }

    function addGoogleAppShortcut(titleInput, urlInput) {
        const title = String(titleInput || '').trim();
        const normalizedUrl = normalizeUrl(urlInput);

        if (!title) {
            setShortcutModalError('Ingresa un nombre valido');
            return false;
        }

        if (!isValidHttpUrl(normalizedUrl)) {
            setShortcutModalError('Ingresa una URL valida');
            return false;
        }

        const comparableUrl = normalizedUrl.toLowerCase().replace(/\/+$/, '');
        const duplicate = getAllGoogleApps().some((app) => {
            const appUrl = normalizeUrl(app.url).toLowerCase().replace(/\/+$/, '');
            return appUrl === comparableUrl;
        });
        if (duplicate) {
            setShortcutModalError('Ese acceso ya existe');
            return false;
        }

        const newId = `custom-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
        const domain = getHostname(normalizedUrl);
        const icon = `https://www.google.com/s2/favicons?sz=128&domain_url=${encodeURIComponent(normalizedUrl)}`;

        if (!Array.isArray(state.settings.customApps)) {
            state.settings.customApps = [];
        }

        state.settings.customApps.push({
            id: newId,
            title,
            url: normalizedUrl,
            domain,
            icon,
            custom: true
        });

        const orderedIds = getOrderedGoogleApps().map((app) => app.id);
        orderedIds.push(newId);
        state.settings.appsOrder = orderedIds;

        saveSettings();
        renderGoogleAppsLauncher();
        closeAddShortcutModal();
        showToast('Acceso agregado');
        return true;
    }

    function submitShortcutModal() {
        const titleValue = refs.shortcutTitleInput?.value || '';
        const urlValue = refs.shortcutUrlInput?.value || '';
        if (state.shortcutModalMode === SHORTCUT_MODAL_MODE.SITE) {
            addCustomSiteFromInputs(titleValue, urlValue);
            return;
        }
        addGoogleAppShortcut(titleValue, urlValue);
    }

    function removeGoogleAppShortcut(appId) {
        if (!appId) {
            return;
        }

        const isDefaultApp = GOOGLE_APPS.some((app) => app.id === appId);

        if (isDefaultApp) {
            if (!Array.isArray(state.settings.hiddenAppIds)) {
                state.settings.hiddenAppIds = [];
            }
            if (!state.settings.hiddenAppIds.includes(appId)) {
                state.settings.hiddenAppIds.push(appId);
            }
        } else if (Array.isArray(state.settings.customApps)) {
            state.settings.customApps = state.settings.customApps.filter((app) => app.id !== appId);
        }

        if (Array.isArray(state.settings.appsOrder)) {
            state.settings.appsOrder = state.settings.appsOrder.filter((id) => id !== appId);
        }

        saveSettings();
        renderGoogleAppsLauncher();
        showToast('Acceso eliminado');
    }

    function createAppIconFallback(text) {
        const fallback = document.createElement('span');
        fallback.className = 'app-icon-fallback';
        const cleanText = String(text || '').trim();
        fallback.textContent = cleanText ? cleanText[0] : '?';
        return fallback;
    }

    function bindEvents() {
        if (refs.searchForm) {
            refs.searchForm.addEventListener('submit', onSearchSubmit);
        }

        if (refs.appsBtn) {
            refs.appsBtn.addEventListener('click', (event) => {
                event.stopPropagation();
                const nowHidden = refs.appsPopover.classList.toggle('hidden');
                if (nowHidden) {
                    setAppEditMode(false);
                }
            });
        }

        if (refs.appsPopover) {
            refs.appsPopover.addEventListener('dblclick', (event) => {
                if (!state.appEditMode) {
                    return;
                }
                if (event.target && event.target.closest('.app-tile')) {
                    return;
                }
                setAppEditMode(false, true);
            });
        }

        if (refs.siteGrid) {
            refs.siteGrid.addEventListener('dblclick', (event) => {
                if (!state.siteEditMode) {
                    return;
                }
                if (event.target && event.target.closest('.site-card')) {
                    return;
                }
                setSiteEditMode(false, true);
            });
        }

        document.addEventListener('dblclick', (event) => {
            if (!state.noteEditMode) {
                return;
            }
            if (event.target && event.target.closest('.sticky-note')) {
                return;
            }
            setStickyNoteEditMode(false, true);
        });

        if (refs.shortcutForm) {
            refs.shortcutForm.addEventListener('submit', (event) => {
                event.preventDefault();
                submitShortcutModal();
            });
        }

        if (refs.shortcutCancelBtn) {
            refs.shortcutCancelBtn.addEventListener('click', closeAddShortcutModal);
        }

        if (refs.shortcutModal) {
            refs.shortcutModal.addEventListener('click', (event) => {
                if (event.target === refs.shortcutModal) {
                    closeAddShortcutModal();
                }
            });
        }

        if (refs.profileBtn) {
            refs.profileBtn.addEventListener('click', () => {
                window.open('https://myaccount.google.com', '_blank', 'noopener');
            });
        }

        document.addEventListener('click', (event) => {
            if (!refs.appsPopover || refs.appsPopover.classList.contains('hidden')) {
                return;
            }
            if (!refs.appsPopover.contains(event.target) && !refs.appsBtn?.contains(event.target)) {
                refs.appsPopover.classList.add('hidden');
                setAppEditMode(false);
            }
        });

        document.addEventListener('click', (event) => {
            if (!state.weatherOpen || !refs.weatherWidget) {
                return;
            }
            if (refs.weatherWidget.contains(event.target)) {
                return;
            }
            if (event.target && event.target.closest('.tool-btn[data-action="weather"]')) {
                return;
            }
            setWeatherWidgetOpen(false);
        });

        refs.toolButtons.forEach((button) => {
            button.addEventListener('click', () => onToolAction(button.dataset.action));
        });

        if (refs.sidebarEdgeTrigger) {
            refs.sidebarEdgeTrigger.addEventListener('pointerenter', showSidebarPeek);
            refs.sidebarEdgeTrigger.addEventListener('pointermove', onSidebarEdgePointerMove);
            refs.sidebarEdgeTrigger.addEventListener('pointerdown', showSidebarPeek);
        }

        if (refs.leftToolbar) {
            refs.leftToolbar.addEventListener('pointerenter', showSidebarPeek);
            refs.leftToolbar.addEventListener('pointerleave', () => {
                hideSidebarPeekSoon(190);
            });
        }

        document.addEventListener('pointermove', onSidebarEdgePointerMove, { passive: true });
        document.addEventListener('pointerdown', (event) => {
            if (state.settings.showSidebar || !refs.body.classList.contains('sidebar-peek')) {
                return;
            }
            if (refs.leftToolbar && refs.leftToolbar.contains(event.target)) {
                return;
            }
            const toolbarRect = refs.leftToolbar ? refs.leftToolbar.getBoundingClientRect() : null;
            const releaseX = toolbarRect ? toolbarRect.right + 20 : 92;
            if (Number(event.clientX) > releaseX) {
                hideSidebarPeekSoon(0);
            }
        });
        window.addEventListener('blur', () => {
            if (state.settings.showSidebar) {
                return;
            }
            clearSidebarPeekTimer();
            setSidebarPeekVisible(false);
        });

        if (refs.closeSettingsBtn) {
            refs.closeSettingsBtn.addEventListener('click', () => setSettingsPanel(false));
        }

        if (refs.addSiteBtn) {
            refs.addSiteBtn.addEventListener('click', addCustomSite);
        }

        if (refs.addSitePanelBtn) {
            refs.addSitePanelBtn.addEventListener('click', addCustomSite);
        }

        if (refs.refreshTopSitesBtn) {
            refs.refreshTopSitesBtn.addEventListener('click', () => {
                refreshChromeTopSites(true);
            });
        }

        if (refs.changeBackgroundBtn) {
            refs.changeBackgroundBtn.addEventListener('click', () => refs.bgFileInput?.click());
        }

        if (refs.clearBackgroundBtn) {
            refs.clearBackgroundBtn.addEventListener('click', async () => {
                await clearBackgroundMedia();
                showToast('Fondo restaurado');
            });
        }

        if (refs.bgFileInput) {
            refs.bgFileInput.addEventListener('change', onBackgroundFileSelected);
        }

        if (refs.noteImageInput) {
            refs.noteImageInput.addEventListener('change', onStickyNoteImageSelected);
        }

        if (refs.resetSettingsBtn) {
            refs.resetSettingsBtn.addEventListener('click', async () => {
                const ok = window.confirm('Se restableceran todos los ajustes. Continuar?');
                if (!ok) {
                    return;
                }
                const existingNoteKeys = Array.isArray(state.settings.stickyNotes)
                    ? state.settings.stickyNotes
                        .map((note) => (note && typeof note.mediaKey === 'string' ? note.mediaKey : ''))
                        .filter(Boolean)
                    : [];
                try {
                    await deleteMediaBlob(BACKGROUND_MEDIA_KEY);
                } catch (error) {
                    // noop
                }
                for (const mediaKey of existingNoteKeys) {
                    try {
                        await deleteMediaBlob(mediaKey);
                    } catch (error) {
                        // noop
                    }
                }
                revokeBackgroundObjectUrl();
                revokeAllStickyNoteMediaUrls();
                state.backgroundSignature = '';
                state.settings = cloneDefaults();
                state.appEditMode = false;
                state.siteEditMode = false;
                state.noteEditMode = false;
                state.editingNoteId = null;
                setWeatherWidgetOpen(false);
                saveSettings();
                applySettings();
                renderGoogleAppsLauncher();
                renderCustomSites();
                refreshChromeTopSites();
                showToast('Ajustes restablecidos');
            });
        }

        bindCheckbox(refs.settingShowGoogle, 'showGoogleHeader');
        bindCheckbox(refs.settingShowSearch, 'showSearchBar');
        bindCheckbox(refs.settingShowSites, 'showTopSites');
        bindCheckbox(refs.settingShowSidebar, 'showSidebar');
        bindCheckbox(refs.settingShowNotes, 'showStickyNotes');
        bindCheckbox(refs.settingShowClock, 'showClock');
        bindCheckbox(refs.settingUseChromeTop, 'useChromeTopSites', () => refreshChromeTopSites());

        bindRange(refs.settingClockScale, 'clockScale', 80, 120);
        bindRange(refs.settingOverlay, 'bgOverlay', 0, 70);
        bindRange(refs.settingBlur, 'bgBlur', 0, 12);
        bindRange(refs.settingSiteCount, 'siteCount', 4, 16, () => renderSites());

        if (refs.settingAccentColor) {
            refs.settingAccentColor.addEventListener('input', () => {
                updateSetting('accentColor', refs.settingAccentColor.value || DEFAULT_SETTINGS.accentColor, false);
                applySettings();
            });

            refs.settingAccentColor.addEventListener('change', () => {
                updateSetting('accentColor', refs.settingAccentColor.value || DEFAULT_SETTINGS.accentColor);
            });
        }

        if (refs.settingTextColor) {
            refs.settingTextColor.addEventListener('input', () => {
                updateSetting('textColor', refs.settingTextColor.value || DEFAULT_SETTINGS.textColor, false);
                applySettings();
            });
            refs.settingTextColor.addEventListener('change', () => {
                updateSetting('textColor', refs.settingTextColor.value || DEFAULT_SETTINGS.textColor);
            });
        }

        if (refs.settingBorderColor) {
            refs.settingBorderColor.addEventListener('input', () => {
                updateSetting('borderColor', refs.settingBorderColor.value || DEFAULT_SETTINGS.borderColor, false);
                applySettings();
            });
            refs.settingBorderColor.addEventListener('change', () => {
                updateSetting('borderColor', refs.settingBorderColor.value || DEFAULT_SETTINGS.borderColor);
            });
        }

        if (refs.closeWeatherBtn) {
            refs.closeWeatherBtn.addEventListener('click', () => {
                setWeatherWidgetOpen(false);
            });
        }

        document.addEventListener('keydown', (event) => {
            if (event.key === '/') {
                if (document.activeElement && ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
                    return;
                }
                event.preventDefault();
                refs.searchInput?.focus();
            }

            if (event.key === 'Escape') {
                if (isShortcutModalOpen()) {
                    closeAddShortcutModal();
                    return;
                }
                setSettingsPanel(false);
                refs.appsPopover?.classList.add('hidden');
                setAppEditMode(false);
                setSiteEditMode(false);
                setStickyNoteEditMode(false);
                setWeatherWidgetOpen(false);
                if (!state.settings.showSidebar) {
                    clearSidebarPeekTimer();
                    setSidebarPeekVisible(false);
                }
            }
        });

        window.addEventListener('resize', () => {
            renderStickyNotes();
        });

        window.addEventListener('beforeunload', () => {
            revokeBackgroundObjectUrl();
            revokeAllStickyNoteMediaUrls();
        });
    }

    function getAvatarSeed(value) {
        const text = String(value || '').trim();
        if (!text) {
            return 'U';
        }
        const normalized = text.includes('@') ? text.split('@')[0] : text;
        const first = normalized.trim().charAt(0).toUpperCase();
        return first || 'U';
    }

    function applyAvatarFallback(seed) {
        if (!refs.profileBtn || !refs.profileFallback) {
            return;
        }

        refs.profileFallback.textContent = getAvatarSeed(seed);
        refs.profileBtn.classList.remove('has-photo');
        if (refs.profileImage) {
            refs.profileImage.removeAttribute('src');
        }
        state.profilePhotoUrl = '';
    }

    function syncAccountAppAvatar(url) {
        const accountIcon = document.querySelector('.app-tile[data-app-id="account"] .app-icon');
        if (!accountIcon) {
            return;
        }

        if (url) {
            accountIcon.src = url;
            accountIcon.classList.add('avatar-app-icon');
            accountIcon.onerror = () => {
                accountIcon.onerror = null;
                accountIcon.src = `${GSTATIC_ICON_BASE}googleg_48dp.png`;
                accountIcon.classList.remove('avatar-app-icon');
            };
            return;
        }

        accountIcon.src = `${GSTATIC_ICON_BASE}googleg_48dp.png`;
        accountIcon.classList.remove('avatar-app-icon');
    }

    function getProfileUserInfoAsync() {
        if (typeof chrome === 'undefined' || !chrome || !chrome.identity || typeof chrome.identity.getProfileUserInfo !== 'function') {
            return Promise.resolve({});
        }

        const identity = chrome.identity;
        return new Promise((resolve) => {
            let settled = false;
            const finish = (info) => {
                if (settled) {
                    return;
                }
                settled = true;
                resolve(info && typeof info === 'object' ? info : {});
            };

            const timeoutId = setTimeout(() => finish({}), 1600);
            const wrap = (info) => {
                clearTimeout(timeoutId);
                finish(info);
            };

            try {
                identity.getProfileUserInfo({ accountStatus: 'ANY' }, wrap);
                return;
            } catch (error) {
                // Fallback a firma antigua.
            }

            try {
                identity.getProfileUserInfo(wrap);
            } catch (error) {
                clearTimeout(timeoutId);
                finish({});
            }
        });
    }

    function buildAvatarCandidates(info) {
        const email = info && typeof info.email === 'string' ? info.email.trim().toLowerCase() : '';
        const userId = info && typeof info.id === 'string' ? info.id.trim() : '';
        const identifiers = [email, userId].filter(Boolean);
        const urls = [];
        identifiers.forEach((value) => {
            const encoded = encodeURIComponent(value);
            urls.push(`https://www.google.com/s2/photos/profile/${encoded}?sz=128`);
            urls.push(`https://profiles.google.com/s2/photos/profile/${encoded}?sz=128`);
            urls.push(`https://lh3.googleusercontent.com/a/${encoded}=s128-c`);
        });
        return Array.from(new Set(urls));
    }

    function probeAvatarCandidate(url) {
        return new Promise((resolve) => {
            const img = new Image();
            let done = false;
            const finish = (ok) => {
                if (done) {
                    return;
                }
                done = true;
                clearTimeout(timer);
                resolve(Boolean(ok));
            };

            const timer = setTimeout(() => finish(false), 1800);
            img.referrerPolicy = 'no-referrer';
            img.onload = () => {
                const valid = Number(img.naturalWidth) >= 24 && Number(img.naturalHeight) >= 24;
                finish(valid);
            };
            img.onerror = () => finish(false);
            img.src = url;
        });
    }

    async function resolveAvatarCandidate(urls) {
        for (const candidate of urls) {
            // eslint-disable-next-line no-await-in-loop
            const ok = await probeAvatarCandidate(candidate);
            if (ok) {
                return candidate;
            }
        }
        return '';
    }

    async function loadGoogleProfileAvatar() {
        if (!refs.profileBtn || !refs.profileImage || !refs.profileFallback) {
            return;
        }

        const info = await getProfileUserInfoAsync();
        const seed = (info && (info.email || info.id)) ? (info.email || info.id) : '';
        applyAvatarFallback(seed);
        syncAccountAppAvatar('');

        const candidates = buildAvatarCandidates(info);
        if (candidates.length === 0) {
            return;
        }

        const avatarUrl = await resolveAvatarCandidate(candidates);
        if (!avatarUrl) {
            return;
        }

        applyAvatarPhoto(avatarUrl, seed);
    }

    function applyAvatarPhoto(url, seed = '') {
        if (!refs.profileBtn || !refs.profileImage) {
            return;
        }

        refs.profileImage.onerror = () => {
            refs.profileImage.onerror = null;
            applyAvatarFallback(seed);
            syncAccountAppAvatar('');
        };
        refs.profileImage.referrerPolicy = 'no-referrer';
        refs.profileImage.src = url;
        refs.profileBtn.classList.add('has-photo');
        state.profilePhotoUrl = url;
        syncAccountAppAvatar(url);
    }

    function bindCheckbox(input, settingKey, onChangeCallback) {
        if (!input) {
            return;
        }
        input.addEventListener('change', () => {
            updateSetting(settingKey, input.checked);
            if (typeof onChangeCallback === 'function') {
                onChangeCallback();
            }
        });
    }

    function bindRange(input, settingKey, min, max, onChangeCallback) {
        if (!input) {
            return;
        }

        input.addEventListener('input', () => {
            const value = clamp(Number(input.value), min, max);
            updateSetting(settingKey, value, false);
            applySettings();
            if (typeof onChangeCallback === 'function') {
                onChangeCallback();
            }
        });

        input.addEventListener('change', () => {
            const value = clamp(Number(input.value), min, max);
            updateSetting(settingKey, value, true);
            if (typeof onChangeCallback === 'function') {
                onChangeCallback();
            }
        });
    }

    function onSearchSubmit(event) {
        event.preventDefault();
        const rawValue = (refs.searchInput?.value || '').trim();
        if (!rawValue) {
            return;
        }

        const url = buildSearchOrUrl(rawValue);
        window.location.href = url;
    }

    function hexToRgba(hex, alpha = 1) {
        const value = String(hex || '').trim();
        const match = value.match(/^#([0-9a-f]{6})$/i);
        if (!match) {
            return `rgba(255,255,255,${alpha})`;
        }
        const normalized = match[1];
        const r = parseInt(normalized.slice(0, 2), 16);
        const g = parseInt(normalized.slice(2, 4), 16);
        const b = parseInt(normalized.slice(4, 6), 16);
        const a = clamp(Number(alpha), 0, 1);
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    function setWeatherWidgetOpen(open) {
        state.weatherOpen = Boolean(open);
        if (!refs.weatherWidget) {
            return;
        }

        refs.weatherWidget.classList.toggle('open', state.weatherOpen);
        if (state.weatherOpen) {
            refreshWeatherWidget(false);
        }
    }

    function getWeatherLabelFromCode(code) {
        const key = Number(code);
        if (Object.prototype.hasOwnProperty.call(WEATHER_CODE_LABELS, key)) {
            return WEATHER_CODE_LABELS[key];
        }
        return 'Condicion variable';
    }

    function formatWeatherDay(dateValue) {
        const date = new Date(`${dateValue}T12:00:00`);
        if (Number.isNaN(date.getTime())) {
            return '--';
        }
        return date.toLocaleDateString('es-ES', { weekday: 'short' });
    }

    function setWeatherLoadingState(message) {
        if (refs.weatherTemp) refs.weatherTemp.textContent = '--°';
        if (refs.weatherCondition) refs.weatherCondition.textContent = message || 'Cargando clima...';
        if (refs.weatherHumidity) refs.weatherHumidity.textContent = 'Humedad --%';
        if (refs.weatherWind) refs.weatherWind.textContent = 'Viento -- km/h';
        if (refs.weatherForecast) refs.weatherForecast.innerHTML = '';
    }

    function getCurrentPositionPromise(timeout = 5500) {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocalizacion no disponible'));
                return;
            }
            navigator.geolocation.getCurrentPosition(
                resolve,
                reject,
                {
                    enableHighAccuracy: false,
                    timeout,
                    maximumAge: 15 * 60 * 1000
                }
            );
        });
    }

    async function getWeatherCoordinates() {
        try {
            const position = await getCurrentPositionPromise();
            return {
                latitude: Number(position.coords.latitude),
                longitude: Number(position.coords.longitude),
                source: 'geo'
            };
        } catch (error) {
            return {
                latitude: 40.7128,
                longitude: -74.006,
                source: 'fallback'
            };
        }
    }

    async function fetchWeatherLocationName(latitude, longitude, source) {
        if (source !== 'geo') {
            return 'Ubicacion predeterminada';
        }
        try {
            const url = `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}&count=1&language=es&format=json`;
            const response = await fetch(url, { cache: 'no-store' });
            if (!response.ok) {
                return 'Tu ubicacion';
            }
            const data = await response.json();
            const first = Array.isArray(data.results) ? data.results[0] : null;
            if (!first) {
                return 'Tu ubicacion';
            }
            const parts = [first.name, first.admin1, first.country_code].filter(Boolean);
            return parts.join(', ');
        } catch (error) {
            return 'Tu ubicacion';
        }
    }

    async function refreshWeatherWidget(force) {
        if (!refs.weatherWidget || !state.weatherOpen) {
            return;
        }

        const now = Date.now();
        if (!force && state.weatherLastFetchAt && now - state.weatherLastFetchAt < 180000) {
            return;
        }

        const requestToken = ++state.weatherRequestToken;
        setWeatherLoadingState('Cargando clima...');

        const coords = await getWeatherCoordinates();
        if (requestToken !== state.weatherRequestToken || !state.weatherOpen) {
            return;
        }

        const locationLabel = await fetchWeatherLocationName(coords.latitude, coords.longitude, coords.source);
        if (requestToken !== state.weatherRequestToken || !state.weatherOpen) {
            return;
        }

        const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(coords.latitude)}&longitude=${encodeURIComponent(coords.longitude)}&timezone=auto&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min`;

        try {
            const response = await fetch(forecastUrl, { cache: 'no-store' });
            if (!response.ok) {
                throw new Error('No se pudo consultar el clima');
            }
            const data = await response.json();
            if (requestToken !== state.weatherRequestToken || !state.weatherOpen) {
                return;
            }

            const current = data.current || {};
            const daily = data.daily || {};
            const currentTemp = Math.round(Number(current.temperature_2m));
            const currentHumidity = Math.round(Number(current.relative_humidity_2m));
            const currentWind = Math.round(Number(current.wind_speed_10m));
            const currentCode = Number(current.weather_code);

            if (refs.weatherTemp) refs.weatherTemp.textContent = Number.isFinite(currentTemp) ? `${currentTemp}°` : '--°';
            if (refs.weatherCondition) refs.weatherCondition.textContent = getWeatherLabelFromCode(currentCode);
            if (refs.weatherLocation) refs.weatherLocation.textContent = locationLabel;
            if (refs.weatherHumidity) refs.weatherHumidity.textContent = Number.isFinite(currentHumidity) ? `Humedad ${currentHumidity}%` : 'Humedad --%';
            if (refs.weatherWind) refs.weatherWind.textContent = Number.isFinite(currentWind) ? `Viento ${currentWind} km/h` : 'Viento -- km/h';

            if (refs.weatherForecast) {
                refs.weatherForecast.innerHTML = '';
                const times = Array.isArray(daily.time) ? daily.time.slice(0, 3) : [];
                const maxTemps = Array.isArray(daily.temperature_2m_max) ? daily.temperature_2m_max : [];
                const minTemps = Array.isArray(daily.temperature_2m_min) ? daily.temperature_2m_min : [];
                const dailyCodes = Array.isArray(daily.weather_code) ? daily.weather_code : [];

                times.forEach((day, index) => {
                    const li = document.createElement('li');
                    const dayLabel = formatWeatherDay(day);
                    const max = Math.round(Number(maxTemps[index]));
                    const min = Math.round(Number(minTemps[index]));
                    const codeLabel = getWeatherLabelFromCode(Number(dailyCodes[index]));

                    const range = `${Number.isFinite(max) ? max : '--'}° / ${Number.isFinite(min) ? min : '--'}°`;
                    li.textContent = `${dayLabel} - ${range} - ${codeLabel}`;
                    refs.weatherForecast.appendChild(li);
                });
            }

            state.weatherLastFetchAt = Date.now();
        } catch (error) {
            if (requestToken !== state.weatherRequestToken || !state.weatherOpen) {
                return;
            }
            if (refs.weatherCondition) refs.weatherCondition.textContent = 'No se pudo cargar el clima';
            if (refs.weatherLocation) refs.weatherLocation.textContent = locationLabel;
            if (refs.weatherForecast) refs.weatherForecast.innerHTML = '';
        }
    }

    function onToolAction(action) {
        if (!action) {
            return;
        }
        const autoHidePeek = !state.settings.showSidebar;

        if (action === 'settings') {
            setSettingsPanel(true);
            if (autoHidePeek) {
                hideSidebarPeekSoon(240);
            }
            return;
        }

        if (action === 'background') {
            refs.bgFileInput?.click();
            if (autoHidePeek) {
                hideSidebarPeekSoon(240);
            }
            return;
        }

        if (action === 'note-add') {
            addStickyNote();
            if (autoHidePeek) {
                hideSidebarPeekSoon(260);
            }
            return;
        }

        if (action === 'weather') {
            setWeatherWidgetOpen(!state.weatherOpen);
            if (state.weatherOpen) {
                refreshWeatherWidget(true);
            }
            if (autoHidePeek) {
                hideSidebarPeekSoon(260);
            }
        }
    }

    function setSettingsPanel(open) {
        if (!refs.settingsPanel) {
            return;
        }
        refs.settingsPanel.classList.toggle('open', Boolean(open));
    }

    function normalizeBackgroundMediaType(value) {
        const normalized = String(value || '').trim().toLowerCase();
        if (normalized === 'image' || normalized === 'video') {
            return normalized;
        }
        return '';
    }

    function getBackgroundSignature(settings) {
        if (!settings || typeof settings !== 'object') {
            return 'none';
        }
        const mediaType = normalizeBackgroundMediaType(settings.backgroundMediaType);
        const mediaKey = typeof settings.backgroundMediaKey === 'string' ? settings.backgroundMediaKey : '';
        const mediaUpdatedAt = Number(settings.backgroundMediaUpdatedAt) || 0;
        if (mediaType && mediaKey) {
            return `media:${mediaType}:${mediaKey}:${mediaUpdatedAt}`;
        }
        if (typeof settings.backgroundImage === 'string' && settings.backgroundImage) {
            const sample = settings.backgroundImage.slice(0, 48);
            return `legacy:${settings.backgroundImage.length}:${sample}`;
        }
        return 'none';
    }

    function revokeBackgroundObjectUrl() {
        if (!state.backgroundObjectUrl) {
            return;
        }
        try {
            URL.revokeObjectURL(state.backgroundObjectUrl);
        } catch (error) {
            // noop
        }
        state.backgroundObjectUrl = '';
    }

    function clearImageBackground() {
        document.documentElement.style.setProperty('--user-bg-image', 'none');
        refs.body?.classList.remove('has-custom-bg');
    }

    function setImageBackground(source) {
        if (!source) {
            clearImageBackground();
            return;
        }
        document.documentElement.style.setProperty('--user-bg-image', `url(${JSON.stringify(source)})`);
        refs.body?.classList.add('has-custom-bg');
    }

    function clearVideoBackground() {
        const video = refs.backgroundVideo;
        refs.body?.classList.remove('has-custom-video');
        if (!video) {
            return;
        }
        video.pause();
        video.removeAttribute('src');
        video.load();
    }

    function setVideoBackground(source) {
        const video = refs.backgroundVideo;
        if (!video || !source) {
            clearVideoBackground();
            return;
        }

        video.src = source;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.autoplay = true;
        refs.body?.classList.add('has-custom-video');

        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(() => {
                // En algunas plataformas el autoplay puede bloquearse.
            });
        }
    }

    function openMediaDb() {
        if (state.mediaDbPromise) {
            return state.mediaDbPromise;
        }
        if (typeof indexedDB === 'undefined') {
            return Promise.reject(new Error('IndexedDB no disponible'));
        }

        state.mediaDbPromise = new Promise((resolve, reject) => {
            const request = indexedDB.open(MEDIA_DB_NAME, MEDIA_DB_VERSION);

            request.onupgradeneeded = () => {
                const db = request.result;
                if (!db.objectStoreNames.contains(MEDIA_STORE_NAME)) {
                    db.createObjectStore(MEDIA_STORE_NAME);
                }
            };

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                reject(request.error || new Error('No se pudo abrir la base de medios'));
            };
        });

        state.mediaDbPromise.catch(() => {
            state.mediaDbPromise = null;
        });

        return state.mediaDbPromise;
    }

    async function putMediaBlob(key, blob) {
        const db = await openMediaDb();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(MEDIA_STORE_NAME, 'readwrite');
            const store = tx.objectStore(MEDIA_STORE_NAME);
            const request = store.put(blob, key);

            tx.oncomplete = () => resolve();
            tx.onabort = () => reject(tx.error || new Error('Error guardando medio'));
            tx.onerror = () => reject(tx.error || new Error('Error guardando medio'));
            request.onerror = () => reject(request.error || new Error('Error guardando medio'));
        });
    }

    async function getMediaBlob(key) {
        const db = await openMediaDb();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(MEDIA_STORE_NAME, 'readonly');
            const store = tx.objectStore(MEDIA_STORE_NAME);
            const request = store.get(key);

            request.onsuccess = () => {
                const value = request.result;
                resolve(value instanceof Blob ? value : null);
            };
            request.onerror = () => reject(request.error || new Error('Error leyendo medio'));
        });
    }

    async function deleteMediaBlob(key) {
        const db = await openMediaDb();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(MEDIA_STORE_NAME, 'readwrite');
            const store = tx.objectStore(MEDIA_STORE_NAME);
            const request = store.delete(key);

            tx.oncomplete = () => resolve();
            tx.onabort = () => reject(tx.error || new Error('Error eliminando medio'));
            tx.onerror = () => reject(tx.error || new Error('Error eliminando medio'));
            request.onerror = () => reject(request.error || new Error('Error eliminando medio'));
        });
    }

    async function applyBackgroundMedia(force = false) {
        const settings = state.settings;
        const signature = getBackgroundSignature(settings);
        if (!force && signature === state.backgroundSignature) {
            return;
        }

        const applyToken = ++state.backgroundApplyToken;
        const mediaType = normalizeBackgroundMediaType(settings.backgroundMediaType);
        const mediaKey = typeof settings.backgroundMediaKey === 'string' ? settings.backgroundMediaKey : '';

        if (mediaType && mediaKey) {
            if (mediaKey === SESSION_MEDIA_KEY && state.backgroundObjectUrl) {
                if (mediaType === 'video') {
                    clearImageBackground();
                    setVideoBackground(state.backgroundObjectUrl);
                } else {
                    clearVideoBackground();
                    setImageBackground(state.backgroundObjectUrl);
                }
                state.backgroundSignature = signature;
                return;
            }
            try {
                const blob = await getMediaBlob(mediaKey);
                if (applyToken !== state.backgroundApplyToken) {
                    return;
                }

                if (blob) {
                    revokeBackgroundObjectUrl();
                    const objectUrl = URL.createObjectURL(blob);
                    state.backgroundObjectUrl = objectUrl;

                    if (mediaType === 'video') {
                        clearImageBackground();
                        setVideoBackground(objectUrl);
                    } else {
                        clearVideoBackground();
                        setImageBackground(objectUrl);
                    }

                    state.backgroundSignature = signature;
                    return;
                }
            } catch (error) {
                console.warn('No se pudo cargar el medio de fondo guardado', error);
            }
        }

        if (typeof settings.backgroundImage === 'string' && settings.backgroundImage) {
            revokeBackgroundObjectUrl();
            clearVideoBackground();
            setImageBackground(settings.backgroundImage);
            state.backgroundSignature = signature;
            return;
        }

        revokeBackgroundObjectUrl();
        clearVideoBackground();
        clearImageBackground();
        state.backgroundSignature = signature;
    }

    async function clearBackgroundMedia() {
        state.settings.backgroundImage = '';
        state.settings.backgroundMediaType = '';
        state.settings.backgroundMediaKey = '';
        state.settings.backgroundMediaUpdatedAt = 0;

        try {
            await deleteMediaBlob(BACKGROUND_MEDIA_KEY);
        } catch (error) {
            // noop
        }

        saveSettings();
        await applyBackgroundMedia(true);
    }

    async function onBackgroundFileSelected(event) {
        const file = event.target.files && event.target.files[0];
        if (!file) {
            return;
        }

        const mimeType = String(file.type || '').toLowerCase();
        const isImage = mimeType.startsWith('image/');
        const isVideo = mimeType.startsWith('video/');
        if (!isImage && !isVideo) {
            showToast('Formato no compatible. Usa imagen o video.');
            event.target.value = '';
            return;
        }

        try {
            await putMediaBlob(BACKGROUND_MEDIA_KEY, file);

            state.settings.backgroundImage = '';
            state.settings.backgroundMediaType = isVideo ? 'video' : 'image';
            state.settings.backgroundMediaKey = BACKGROUND_MEDIA_KEY;
            state.settings.backgroundMediaUpdatedAt = Date.now();

            saveSettings();
            await applyBackgroundMedia(true);
            showToast(isVideo ? 'Video de fondo actualizado' : 'Imagen de fondo actualizada');
        } catch (error) {
            console.warn('No se pudo guardar el fondo en IndexedDB', error);

            revokeBackgroundObjectUrl();
            state.backgroundObjectUrl = URL.createObjectURL(file);
            state.settings.backgroundImage = '';
            state.settings.backgroundMediaType = isVideo ? 'video' : 'image';
            state.settings.backgroundMediaKey = SESSION_MEDIA_KEY;
            state.settings.backgroundMediaUpdatedAt = Date.now();
            saveSettings();

            if (isVideo) {
                clearImageBackground();
                setVideoBackground(state.backgroundObjectUrl);
                showToast('Video aplicado temporalmente');
            } else {
                clearVideoBackground();
                setImageBackground(state.backgroundObjectUrl);
                showToast('Imagen aplicada temporalmente');
            }
            state.backgroundSignature = 'temporary';
        } finally {
            event.target.value = '';
        }
    }

    async function refreshChromeTopSites(forceMessage = false) {
        if (!state.settings.useChromeTopSites) {
            state.chromeTopSites = [];
            renderSites();
            return;
        }

        const topSites = await getChromeTopSites();
        state.chromeTopSites = topSites
            .filter((item) => item && typeof item.url === 'string')
            .map((item) => ({
                title: item.title || getHostname(item.url),
                url: item.url,
                source: 'chrome'
            }));

        if (forceMessage) {
            if (state.chromeTopSites.length > 0) {
                showToast('Top sites de Chrome actualizados');
            } else {
                showToast('No se detectaron top sites de Chrome');
            }
        }

        renderSites();
    }

    function getChromeTopSites() {
        const hasTopSites = typeof chrome !== 'undefined'
            && chrome
            && chrome.topSites
            && typeof chrome.topSites.get === 'function';

        if (!hasTopSites) {
            return Promise.resolve([]);
        }

        return new Promise((resolve) => {
            try {
                chrome.topSites.get((sites) => {
                    if (chrome.runtime && chrome.runtime.lastError) {
                        resolve([]);
                        return;
                    }
                    resolve(Array.isArray(sites) ? sites : []);
                });
            } catch (error) {
                resolve([]);
            }
        });
    }

    function renderSites() {
        if (!refs.siteGrid) {
            return;
        }

        refs.siteGrid.innerHTML = '';

        const sites = buildVisibleSiteList();
        sites.forEach((site) => {
            const card = document.createElement('a');
            card.className = 'site-card';
            if (state.siteEditMode) {
                card.classList.add('edit-enabled');
            }
            card.href = site.url;
            card.title = site.url;
            card.target = '_self';

            const bubble = document.createElement('span');
            bubble.className = 'site-bubble';

            const icon = document.createElement('img');
            icon.className = 'site-favicon';
            icon.alt = '';
            icon.loading = 'lazy';
            icon.src = `https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(site.url)}`;
            icon.referrerPolicy = 'no-referrer';
            icon.addEventListener('error', () => {
                icon.remove();
                bubble.appendChild(createFallbackIcon(site.title || site.url));
            }, { once: true });

            const title = document.createElement('span');
            title.className = 'site-title';
            title.textContent = site.title || getHostname(site.url);

            bubble.appendChild(icon);
            card.appendChild(bubble);
            card.appendChild(title);

            if (state.siteEditMode) {
                const removeButton = document.createElement('button');
                removeButton.type = 'button';
                removeButton.className = 'site-remove-btn';
                removeButton.textContent = 'x';
                removeButton.title = 'Quitar sitio';
                removeButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    removeSiteShortcut(site);
                });
                card.appendChild(removeButton);
            }

            card.addEventListener('click', (event) => {
                if (state.siteEditMode) {
                    event.preventDefault();
                }
            });
            bindSiteCardLongPress(card);

            refs.siteGrid.appendChild(card);
        });

        const addShortcut = document.createElement('button');
        addShortcut.type = 'button';
        addShortcut.className = 'site-card site-card-add';
        addShortcut.title = 'Agregar acceso directo';
        addShortcut.innerHTML = '<span class="site-bubble"><span>+</span></span><span class="site-title">Acceso directo</span>';
        addShortcut.addEventListener('click', (event) => {
            event.preventDefault();
            addCustomSite();
        });
        refs.siteGrid.appendChild(addShortcut);
    }

    function createFallbackIcon(labelText) {
        const fallback = document.createElement('span');
        fallback.className = 'site-fallback';
        const clean = String(labelText || '').trim();
        fallback.textContent = clean ? clean[0] : '?';
        return fallback;
    }

    function buildVisibleSiteList() {
        const maxCount = clamp(Number(state.settings.siteCount), 4, 16);
        const merged = [];
        const usedKeys = new Set();
        const hiddenKeys = new Set(Array.isArray(state.settings.hiddenSiteKeys) ? state.settings.hiddenSiteKeys : []);

        state.settings.customSites.forEach((site, index) => {
            if (!isValidHttpUrl(site.url)) {
                return;
            }
            const key = getSiteKey(site.url);
            if (usedKeys.has(key) || hiddenKeys.has(key)) {
                return;
            }
            usedKeys.add(key);
            merged.push({
                id: `${key}-${index}`,
                title: site.title || getHostname(site.url),
                url: site.url,
                source: 'custom',
                key
            });
        });

        if (state.settings.useChromeTopSites) {
            state.chromeTopSites.forEach((site) => {
                if (!isValidHttpUrl(site.url)) {
                    return;
                }
                const key = getSiteKey(site.url);
                if (usedKeys.has(key) || hiddenKeys.has(key)) {
                    return;
                }
                usedKeys.add(key);
                merged.push({
                    id: `${key}-chrome`,
                    title: site.title || getHostname(site.url),
                    url: site.url,
                    source: 'chrome',
                    key
                });
            });
        }

        return merged.slice(0, maxCount);
    }

    function addCustomSite() {
        openAddSiteModal();
    }

    function addCustomSiteFromInputs(titleInput, urlInput) {
        const normalizedUrl = normalizeUrl(urlInput);
        if (!isValidHttpUrl(normalizedUrl)) {
            setShortcutModalError('Ingresa una URL valida');
            return false;
        }

        const finalTitle = String(titleInput || '').trim() || getHostname(normalizedUrl);
        const alreadyExists = state.settings.customSites.some((site) => getSiteKey(site.url) === getSiteKey(normalizedUrl));

        if (alreadyExists) {
            setShortcutModalError('Ese sitio ya existe en tus accesos');
            return false;
        }

        const newKey = getSiteKey(normalizedUrl);
        if (!Array.isArray(state.settings.hiddenSiteKeys)) {
            state.settings.hiddenSiteKeys = [];
        } else {
            state.settings.hiddenSiteKeys = state.settings.hiddenSiteKeys.filter((key) => key !== newKey);
        }

        state.settings.customSites.push({ title: finalTitle, url: normalizedUrl });
        saveSettings();
        renderCustomSites();
        renderSites();
        closeAddShortcutModal();
        showToast('Sitio agregado');
        return true;
    }

    function removeSiteShortcut(site) {
        if (!site || !site.url) {
            return;
        }
        if (site.source === 'custom') {
            removeCustomSiteById(site.id);
            return;
        }

        const key = site.key || getSiteKey(site.url);
        if (!Array.isArray(state.settings.hiddenSiteKeys)) {
            state.settings.hiddenSiteKeys = [];
        }
        if (!state.settings.hiddenSiteKeys.includes(key)) {
            state.settings.hiddenSiteKeys.push(key);
            saveSettings();
            renderSites();
            showToast('Sitio ocultado');
        }
    }

    function removeCustomSiteById(siteId) {
        const key = siteId.replace(/-\d+$/, '').replace(/-chrome$/, '');
        const previousLength = state.settings.customSites.length;

        state.settings.customSites = state.settings.customSites.filter((site) => getSiteKey(site.url) !== key);

        if (state.settings.customSites.length === previousLength) {
            return;
        }

        saveSettings();
        renderCustomSites();
        renderSites();
        showToast('Sitio eliminado');
    }

    function renderCustomSites() {
        if (!refs.customSitesList) {
            return;
        }

        refs.customSitesList.innerHTML = '';

        if (state.settings.customSites.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'custom-site-item';
            const text = document.createElement('span');
            text.textContent = 'Aun no hay sitios personalizados';
            empty.appendChild(text);
            refs.customSitesList.appendChild(empty);
            return;
        }

        state.settings.customSites.forEach((site, index) => {
            const row = document.createElement('div');
            row.className = 'custom-site-item';

            const label = document.createElement('span');
            label.textContent = `${site.title} - ${site.url}`;

            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.textContent = 'Quitar';
            removeBtn.addEventListener('click', () => {
                state.settings.customSites.splice(index, 1);
                saveSettings();
                renderCustomSites();
                renderSites();
            });

            row.appendChild(label);
            row.appendChild(removeBtn);
            refs.customSitesList.appendChild(row);
        });
    }

    function applySettings() {
        const s = state.settings;

        refs.body.classList.toggle('hide-google', !s.showGoogleHeader);
        refs.body.classList.toggle('hide-search', !s.showSearchBar);
        refs.body.classList.toggle('hide-sites', !s.showTopSites);
        refs.body.classList.toggle('hide-sidebar', !s.showSidebar);
        refs.body.classList.toggle('hide-notes', !s.showStickyNotes);
        refs.body.classList.toggle('hide-clock', !s.showClock);
        syncSidebarPeekMode();

        const overlay = clamp(Number(s.bgOverlay), 0, 70) / 100;
        const blur = clamp(Number(s.bgBlur), 0, 12);
        const scale = clamp(Number(s.clockScale), 80, 120) / 100;

        document.documentElement.style.setProperty('--accent-color', s.accentColor || DEFAULT_SETTINGS.accentColor);
        document.documentElement.style.setProperty('--theme-text-color', s.textColor || DEFAULT_SETTINGS.textColor);
        document.documentElement.style.setProperty('--theme-border-color', hexToRgba(s.borderColor || DEFAULT_SETTINGS.borderColor, 0.42));
        document.documentElement.style.setProperty('--bg-overlay', String(overlay));
        document.documentElement.style.setProperty('--bg-blur', `${blur}px`);
        document.documentElement.style.setProperty('--clock-scale', String(scale));
        applyBackgroundMedia();

        syncControls();
        renderStickyNotes();
        renderSites();
    }

    function syncControls() {
        const s = state.settings;

        if (refs.settingShowGoogle) refs.settingShowGoogle.checked = s.showGoogleHeader;
        if (refs.settingShowSearch) refs.settingShowSearch.checked = s.showSearchBar;
        if (refs.settingShowSites) refs.settingShowSites.checked = s.showTopSites;
        if (refs.settingShowSidebar) refs.settingShowSidebar.checked = s.showSidebar;
        if (refs.settingShowNotes) refs.settingShowNotes.checked = s.showStickyNotes;
        if (refs.settingShowClock) refs.settingShowClock.checked = s.showClock;
        if (refs.settingUseChromeTop) refs.settingUseChromeTop.checked = s.useChromeTopSites;

        if (refs.settingClockScale) refs.settingClockScale.value = String(s.clockScale);
        if (refs.settingOverlay) refs.settingOverlay.value = String(s.bgOverlay);
        if (refs.settingBlur) refs.settingBlur.value = String(s.bgBlur);
        if (refs.settingSiteCount) refs.settingSiteCount.value = String(s.siteCount);
        if (refs.settingAccentColor) refs.settingAccentColor.value = s.accentColor;
        if (refs.settingTextColor) refs.settingTextColor.value = s.textColor;
        if (refs.settingBorderColor) refs.settingBorderColor.value = s.borderColor;

        if (refs.clockScaleValue) refs.clockScaleValue.textContent = `${s.clockScale}%`;
        if (refs.overlayValue) refs.overlayValue.textContent = `${s.bgOverlay}%`;
        if (refs.blurValue) refs.blurValue.textContent = `${s.bgBlur}px`;
        if (refs.siteCountValue) refs.siteCountValue.textContent = String(s.siteCount);
    }

    function updateSetting(key, value, persist = true) {
        state.settings[key] = value;
        if (persist) {
            saveSettings();
        }
        applySettings();
    }

    function saveSettings() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.settings));
        } catch (error) {
            console.warn('No se pudo guardar la configuracion', error);
        }
    }

    function loadSettings() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) {
                return cloneDefaults();
            }
            const parsed = JSON.parse(raw);
            return sanitizeSettings(parsed);
        } catch (error) {
            return cloneDefaults();
        }
    }

    function sanitizeSettings(raw) {
        const base = cloneDefaults();

        if (!raw || typeof raw !== 'object') {
            return base;
        }

        base.showGoogleHeader = readBoolean(raw.showGoogleHeader, base.showGoogleHeader);
        base.showSearchBar = readBoolean(raw.showSearchBar, base.showSearchBar);
        base.showTopSites = readBoolean(raw.showTopSites, base.showTopSites);
        base.showSidebar = readBoolean(raw.showSidebar, base.showSidebar);
        base.showStickyNotes = readBoolean(raw.showStickyNotes, base.showStickyNotes);
        base.showClock = readBoolean(raw.showClock, base.showClock);
        base.useChromeTopSites = readBoolean(raw.useChromeTopSites, base.useChromeTopSites);
        base.siteCount = readNumber(raw.siteCount, base.siteCount, 4, 16);
        base.clockScale = readNumber(raw.clockScale, base.clockScale, 80, 120);
        base.bgOverlay = readNumber(raw.bgOverlay, base.bgOverlay, 0, 70);
        base.bgBlur = readNumber(raw.bgBlur, base.bgBlur, 0, 12);
        base.accentColor = /^#[0-9a-fA-F]{6}$/.test(raw.accentColor || '') ? raw.accentColor : base.accentColor;
        base.textColor = /^#[0-9a-fA-F]{6}$/.test(raw.textColor || '') ? raw.textColor : base.textColor;
        base.borderColor = /^#[0-9a-fA-F]{6}$/.test(raw.borderColor || '') ? raw.borderColor : base.borderColor;
        base.backgroundImage = typeof raw.backgroundImage === 'string' ? raw.backgroundImage : '';
        base.backgroundMediaType = normalizeBackgroundMediaType(raw.backgroundMediaType);
        base.backgroundMediaKey = typeof raw.backgroundMediaKey === 'string' ? raw.backgroundMediaKey : '';
        base.backgroundMediaUpdatedAt = readNumber(raw.backgroundMediaUpdatedAt, 0, 0, 9999999999999);
        base.hiddenSiteKeys = [];
        base.stickyNotes = Array.isArray(base.stickyNotes) ? base.stickyNotes : [];
        base.customApps = [];
        base.hiddenAppIds = [];
        base.appsOrder = [];

        if (Array.isArray(raw.customApps)) {
            const seenCustomIds = new Set();
            base.customApps = raw.customApps
                .filter((app) => app && typeof app === 'object')
                .map((app) => {
                    const id = typeof app.id === 'string' ? app.id.trim() : '';
                    const title = typeof app.title === 'string' ? app.title.trim() : '';
                    const normalizedUrl = normalizeUrl(app.url);
                    const icon = typeof app.icon === 'string' ? app.icon : `https://www.google.com/s2/favicons?sz=128&domain_url=${encodeURIComponent(normalizedUrl)}`;
                    return {
                        id,
                        title,
                        url: normalizedUrl,
                        domain: getHostname(normalizedUrl),
                        icon,
                        custom: true
                    };
                })
                .filter((app) => app.id && app.title && isValidHttpUrl(app.url))
                .filter((app) => {
                    if (seenCustomIds.has(app.id)) {
                        return false;
                    }
                    seenCustomIds.add(app.id);
                    return true;
                })
                .slice(0, 100);
        }

        const validIds = new Set([
            ...GOOGLE_APPS.map((app) => app.id),
            ...base.customApps.map((app) => app.id)
        ]);

        if (Array.isArray(raw.hiddenAppIds)) {
            const seenHiddenIds = new Set();
            base.hiddenAppIds = raw.hiddenAppIds
                .filter((id) => typeof id === 'string')
                .filter((id) => validIds.has(id))
                .filter((id) => {
                    if (seenHiddenIds.has(id)) {
                        return false;
                    }
                    seenHiddenIds.add(id);
                    return true;
                });
        }

        if (Array.isArray(raw.appsOrder)) {
            const seenIds = new Set();
            base.appsOrder = raw.appsOrder
                .filter((id) => typeof id === 'string')
                .filter((id) => validIds.has(id))
                .filter((id) => {
                    if (seenIds.has(id)) {
                        return false;
                    }
                    seenIds.add(id);
                    return true;
                });
        }

        if (Array.isArray(raw.hiddenSiteKeys)) {
            const seenSiteKeys = new Set();
            base.hiddenSiteKeys = raw.hiddenSiteKeys
                .filter((key) => typeof key === 'string')
                .map((key) => key.trim().toLowerCase())
                .filter(Boolean)
                .filter((key) => {
                    if (seenSiteKeys.has(key)) {
                        return false;
                    }
                    seenSiteKeys.add(key);
                    return true;
                })
                .slice(0, 200);
        }

        if (Array.isArray(raw.stickyNotes)) {
            const seenNoteIds = new Set();
            base.stickyNotes = raw.stickyNotes
                .filter((note) => note && typeof note === 'object')
                .map((note, index) => {
                    const id = typeof note.id === 'string' && note.id.trim()
                        ? note.id.trim()
                        : `note-${index}`;
                    const mediaType = normalizeBackgroundMediaType(note.mediaType);
                    const mediaKey = typeof note.mediaKey === 'string' ? note.mediaKey : '';
                    const rawText = typeof note.text === 'string' ? note.text : '';
                    return {
                        id,
                        text: normalizeStickyNoteText(rawText, Boolean(mediaType && mediaKey)),
                        x: clamp(Number(note.x), 8, 5000),
                        y: clamp(Number(note.y), 8, 5000),
                        rot: clamp(Number(note.rot), -180, 180),
                        w: readNumber(note.w, 132, 96, 5000),
                        h: readNumber(note.h, 114, 86, 5000),
                        mediaType,
                        mediaKey,
                        mediaUpdatedAt: readNumber(note.mediaUpdatedAt, 0, 0, 9999999999999)
                    };
                })
                .filter((note) => {
                    if (seenNoteIds.has(note.id)) {
                        return false;
                    }
                    seenNoteIds.add(note.id);
                    return true;
                })
                .slice(0, 40);
        }

        if (Array.isArray(raw.customSites)) {
            base.customSites = raw.customSites
                .filter((site) => site && typeof site.url === 'string')
                .map((site) => ({
                    title: typeof site.title === 'string' ? site.title.trim() : '',
                    url: normalizeUrl(site.url)
                }))
                .filter((site) => isValidHttpUrl(site.url))
                .slice(0, 20);
        }

        return base;
    }

    function cloneDefaults() {
        return JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
    }

    function readBoolean(value, fallback) {
        if (typeof value === 'undefined') {
            return fallback;
        }
        return Boolean(value);
    }

    function readNumber(value, fallback, min, max) {
        if (typeof value === 'undefined') {
            return fallback;
        }
        return clamp(Number(value), min, max);
    }

    function showToast(message) {
        if (!refs.toast) {
            return;
        }
        refs.toast.textContent = message;
        refs.toast.classList.add('show');

        if (state.toastTimer) {
            clearTimeout(state.toastTimer);
        }

        state.toastTimer = setTimeout(() => {
            refs.toast.classList.remove('show');
        }, 2300);
    }

    function normalizeUrl(input) {
        const value = String(input || '').trim();
        if (!value) {
            return '';
        }

        if (/^https?:\/\//i.test(value)) {
            return value;
        }

        return `https://${value}`;
    }

    function buildSearchOrUrl(rawValue) {
        const maybeUrl = normalizeUrl(rawValue);

        if (isValidHttpUrl(maybeUrl) && /\./.test(rawValue) && !/\s/.test(rawValue)) {
            return maybeUrl;
        }

        return `https://www.google.com/search?q=${encodeURIComponent(rawValue)}`;
    }

    function isValidHttpUrl(value) {
        try {
            const url = new URL(value);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch (error) {
            return false;
        }
    }

    function getHostname(url) {
        try {
            return new URL(url).hostname.replace(/^www\./, '');
        } catch (error) {
            return url;
        }
    }

    function getSiteKey(url) {
        try {
            const parsed = new URL(url);
            return parsed.hostname.replace(/^www\./, '');
        } catch (error) {
            return String(url);
        }
    }

    function clamp(value, min, max) {
        if (Number.isNaN(value)) {
            return min;
        }
        return Math.min(Math.max(value, min), max);
    }
})();
