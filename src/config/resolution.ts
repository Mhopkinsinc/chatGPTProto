// src/config/resolution.ts
import * as ex from 'excalibur';

/**
 * Enum for all supported resolution IDs.
 * This avoids magic strings and provides full TypeScript safety.
 */
export enum ResolutionId {
    Genesis = 'genesis',
    SNES = 'snes',
    GenesisWidescreen = 'genesis-widescreen'
}

/**
 * The shape of a resolution profile.
 * - internalWidth / internalHeight: resolution used internally for gameplay, 
 *   camera bounds, coordinates, etc.
 * - scale: visual upscale for the canvas (2x, 3x, etc.)
 */
export interface ResolutionProfile {
    id: ResolutionId;
    internalWidth: number;
    internalHeight: number;
    scale: number;
}

/**
 * All available resolution presets.
 * You can easily add new ones here.
 */
const RESOLUTION_PROFILES: Record<ResolutionId, ResolutionProfile> = {
    [ResolutionId.Genesis]: {
        id: ResolutionId.Genesis,
        internalWidth: 256,
        internalHeight: 224,
        scale: 1
    },

    [ResolutionId.SNES]: {
        id: ResolutionId.SNES,
        internalWidth: 256,
        internalHeight: 224,
        scale: 1
    },

    [ResolutionId.GenesisWidescreen]: {
        id: ResolutionId.GenesisWidescreen,
        internalWidth: 320,   // example “virtual” widescreen
        internalHeight: 224,
        scale: 1
    }
};

/**
 * Active profile (defaults to Genesis).
 * This is the currently applied global resolution.
 */
let activeProfile: ResolutionProfile = RESOLUTION_PROFILES[ResolutionId.Genesis];

/**
 * Set the active global resolution.
 */
export function setResolutionProfile(id: ResolutionId) {
    activeProfile = RESOLUTION_PROFILES[id];
}

/**
 * Get the current resolution profile object.
 */
export function getResolutionProfile(): ResolutionProfile {
    return activeProfile;
}

/**
 * Internal (world) size used by game logic, collision, positions & camera.
 */
export function getInternalSize() {
    return {
        width: activeProfile.internalWidth,
        height: activeProfile.internalHeight
    };
}

/**
 * Display size after applying the scale factor.
 * Use this for engine canvas width/height.
 */
export function getDisplaySize() {
    return {
        width: activeProfile.internalWidth * activeProfile.scale,
        height: activeProfile.internalHeight * activeProfile.scale
    };
}

/**
 * Applies the largest integer scale that fits within the user's window.
 * This updates engine.screen.viewport to a scaled version of the internal resolution.
 *
 * @param engine Excalibur Engine instance
 */
export function applyBestIntegerScale(engine: ex.Engine) {
    const profile = getResolutionProfile();

    const internalW = profile.internalWidth;
    const internalH = profile.internalHeight;

    const windowW = window.innerWidth;
    const windowH = window.innerHeight;

    // Max integer scale that fits the window
    const maxScaleX = Math.floor(windowW / internalW);
    const maxScaleY = Math.floor(windowH / internalH);

    let scale = Math.min(maxScaleX, maxScaleY);

    if (scale < 1) scale = 1;

    const viewportWidth = internalW * scale;
    const viewportHeight = internalH * scale;

    engine.screen.viewport = {
        width: viewportWidth,
        height: viewportHeight
    };

    return scale; // handy if you want to store/log it
}