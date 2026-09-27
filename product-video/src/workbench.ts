import {PipLearnLaunch, HookScene, HomeScene, FoundationScene, ProjectScene, JournalScene, MentorScene, MontageScene, OutroScene} from './Video';
import {SHOTS, SFX_CUES} from './timeline';

export const WORKBENCH = {
  name: 'PipLearn · Product Launch', fps: 30, width: 1920, height: 1080,
  total: 1080, background: '#031a42',
  shots: [
    {id:'hook', ...SHOTS.hook, label:'S1 Hook', component:HookScene},
    {id:'home', ...SHOTS.home, label:'S2 Home reveal', component:HomeScene},
    {id:'foundations', ...SHOTS.foundations, label:'S3 Foundations', component:FoundationScene},
    {id:'project', ...SHOTS.project, label:'S4 Project workflow', component:ProjectScene},
    {id:'journal', ...SHOTS.journal, label:'S5 Problem Journal', component:JournalScene},
    {id:'mentors', ...SHOTS.mentors, label:'S6 Mentor checkpoints', component:MentorScene},
    {id:'montage', ...SHOTS.montage, label:'S7 System montage', component:MontageScene},
    {id:'outro', ...SHOTS.outro, label:'S8 End screen', component:OutroScene},
  ],
  transitions: [], captions: [], overlays: [],
  sfx: SFX_CUES.map((s)=>({from:s.from,duration:s.duration,src:s.src,volume:s.volume})),
  bgm: [{from:0,duration:1080,src:'audio/bgm/tech-house.mp3',volume:.19}],
  original: PipLearnLaunch,
};
