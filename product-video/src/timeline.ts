export const SHOTS = {
  hook: {from: 0, duration: 90, label: 'Hook'},
  home: {from: 90, duration: 150, label: 'Home reveal'},
  foundations: {from: 240, duration: 150, label: 'Foundations'},
  project: {from: 390, duration: 180, label: 'Project workflow'},
  journal: {from: 570, duration: 150, label: 'Problem Journal'},
  mentors: {from: 720, duration: 150, label: 'Mentor checkpoints'},
  montage: {from: 870, duration: 90, label: 'System montage'},
  outro: {from: 960, duration: 120, label: 'PipLearn outro'},
} as const;

export const SFX_CUES = [
  {from: SHOTS.home.from - 4, src: 'audio/sfx/transition-soft.mp3', volume: 0.25, duration: 70},
  {from: SHOTS.foundations.from - 3, src: 'audio/sfx/swoosh-quick.mp3', volume: 0.22, duration: 35},
  {from: SHOTS.project.from + 84, src: 'audio/sfx/impact.mp3', volume: 0.28, duration: 72},
  {from: SHOTS.journal.from - 3, src: 'audio/sfx/transition-soft.mp3', volume: 0.22, duration: 65},
  {from: SHOTS.mentors.from - 3, src: 'audio/sfx/whoosh-big.mp3', volume: 0.22, duration: 70},
  {from: SHOTS.outro.from, src: 'audio/sfx/whoosh-big.mp3', volume: 0.2, duration: 90},
  {from: SHOTS.outro.from + 46, src: 'audio/sfx/impact.mp3', volume: 0.5, duration: 74},
  {from: SHOTS.outro.from + 69, src: 'audio/sfx/sparkle.mp3', volume: 0.32, duration: 50},
] as const;
