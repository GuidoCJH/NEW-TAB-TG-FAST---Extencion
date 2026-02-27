/**
 * config.js - Configuración del reloj
 * Permite personalizar comportamientos y zonas horarias
 */

const CLOCK_CONFIG = {
    // Zona horaria por defecto (usar la del sistema)
    timezone: 'auto', // 'auto' usa la del sistema, o IANA timezone string

    // Formato de fecha
    dateFormat: {
        locale: 'es-ES',
        options: {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
    },

    // Formato digital de hora
    timeFormat: '24h', // '24h' o '12h'

    // Actualización
    updateInterval: 1000, // milisegundos

    // Aspecto visual
    appearance: {
        size: 'large', // 'small', 'medium', 'large'
        theme: 'light', // 'light' o 'dark'
        showSeconds: true,
        animateSmooth: true
    },

    // Zonas horarias comunes
    timezones: {
        'México (CDMX)': 'America/Mexico_City',
        'USA (NYC)': 'America/New_York',
        'USA (LA)': 'America/Los_Angeles',
        'UK': 'Europe/London',
        'España': 'Europe/Madrid',
        'Japón': 'Asia/Tokyo',
        'China': 'Asia/Shanghai',
        'India': 'Asia/Kolkata',
        'Sydney': 'Australia/Sydney',
        'Dubai': 'Asia/Dubai'
    },

    // Debug
    debug: {
        enabled: true,
        logInterval: 5000 // cada 5 segundos
    }
};

/**
 * Aplicar configuración al reloj
 * @param {Object} config - Objeto de configuración
 */
function applyClockConfig(config) {
    if (!window.clockManager) {
        console.warn('⚠️ clockManager no está disponible aún');
        return;
    }

    // Aplicar zona horaria
    if (config.timezone && config.timezone !== 'auto') {
        window.clockManager.setTimezone(config.timezone);
    }

    // Aplicar tema
    if (config.appearance?.theme === 'dark') {
        document.documentElement.style.colorScheme = 'dark';
    }

    console.log('✅ Configuración aplicada:', config);
}

// Exportar si se usa como módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CLOCK_CONFIG, applyClockConfig };
}
