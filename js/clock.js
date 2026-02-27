class ClockManager {
    constructor() {
        this.hourHand = document.getElementById('hourHand');
        this.minuteHand = document.getElementById('minuteHand');
        this.secondHand = document.getElementById('secondHand');
        this.isRunning = false;
        this.animationFrameId = null;

        this.validateElements();
        this.init();
    }

    validateElements() {
        const elements = { hourHand: this.hourHand, minuteHand: this.minuteHand };
        const missing = [];

        for (const [name, element] of Object.entries(elements)) {
            if (!element) {
                missing.push(name);
                console.error(`Elemento ${name} no encontrado en el DOM`);
            }
        }

        if (missing.length > 0) {
            throw new Error(`Elementos faltantes: ${missing.join(', ')}`);
        }
    }

    init() {
        [this.hourHand, this.minuteHand, this.secondHand]
            .filter(Boolean)
            .forEach((hand) => {
                hand.style.willChange = 'transform';
            });

        this.updateClock();
        this.startAnimation();
        this.isRunning = true;
    }

    startAnimation() {
        const animate = () => {
            this.updateClock();
            this.animationFrameId = requestAnimationFrame(animate);
        };
        animate();
    }

    stopAnimation() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.isRunning = false;
        }
    }

    resumeAnimation() {
        if (!this.isRunning) {
            this.startAnimation();
            this.isRunning = true;
        }
    }

    getCurrentTime() {
        const now = new Date();
        return {
            hours: now.getHours(),
            minutes: now.getMinutes(),
            seconds: now.getSeconds(),
            milliseconds: now.getMilliseconds()
        };
    }

    calculateAngles(time) {
        const { hours, minutes, seconds, milliseconds } = time;
        const secondsAngle = (seconds + milliseconds / 1000) * 6;
        const minutesAngle = (minutes + seconds / 60 + milliseconds / 60000) * 6;
        const hoursAngle = ((hours % 12) + minutes / 60 + seconds / 3600 + milliseconds / 3600000) * 30;

        return {
            hours: hoursAngle,
            minutes: minutesAngle,
            seconds: secondsAngle
        };
    }

    updateClock() {
        const time = this.getCurrentTime();
        const angles = this.calculateAngles(time);

        this.hourHand.style.transform = `rotate(${angles.hours}deg) translateZ(0)`;
        this.minuteHand.style.transform = `rotate(${angles.minutes}deg) translateZ(0)`;
        if (this.secondHand) {
            this.secondHand.style.transform = `rotate(${angles.seconds}deg) translateZ(0)`;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        const clock = new ClockManager();
        window.clockManager = clock;
    } catch (error) {
        console.error('Error al inicializar el reloj:', error);
    }
});

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        window.clockManager?.stopAnimation();
    } else {
        window.clockManager?.resumeAnimation();
    }
});
