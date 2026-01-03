export const COLORS = {
    background: '#050505', // Almost black
    surface: '#151515',    // Dark card background
    surfaceHighlight: '#252525',
    deepPurple: '#240b36',
    neonBlue: '#03e9f4',
    hotPink: '#ff0055',
    orange: '#ff9100',
    white: '#ffffff',
    glass: 'rgba(255, 255, 255, 0.05)',
    textSecondary: '#A0A0A0',
};

export const GRADIENTS = {
    primary: [COLORS.deepPurple, '#000000'] as const,
    blob1: [COLORS.hotPink, COLORS.orange] as const,
    blob2: [COLORS.neonBlue, COLORS.deepPurple] as const,
    button: [COLORS.neonBlue, COLORS.deepPurple] as const,
};
