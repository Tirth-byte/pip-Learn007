import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import {SFX_CUES, SHOTS} from './timeline';

export type LaunchProps = {bgm: boolean};

const BLUE = '#0878df';
const DEEP = '#031a42';
const SKY = '#dff4ff';
const ease = Easing.bezier(0.16, 1, 0.3, 1);
const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

const LogoMark: React.FC<{size?: number; color?: string}> = ({size = 70, color = 'white'}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 3L3 8L12 13L21 8L12 3Z" fill={color}/>
    <path d="M3 16L12 21L21 16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 11.5L12 16.5L21 11.5" stroke="#5bd2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FilmGrain: React.FC = () => (
  <AbsoluteFill style={{pointerEvents: 'none', opacity: 0.07, mixBlendMode: 'soft-light', backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%270 0 180 180%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%27.8%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27 opacity=%27.55%27/%3E%3C/svg%3E")'}}/>
);

const Caption: React.FC<{eyebrow: string; title: string; detail?: string; align?: 'left'|'center'; dark?: boolean; delay?: number}> = ({eyebrow,title,detail,align='left',dark=false,delay=0}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [delay, delay + 20], [0, 1], {...clamp, easing: ease});
  return <div style={{position:'absolute', left: align==='left'?88:300, right:align==='left'?undefined:300, bottom:62, maxWidth:1120, padding:'28px 34px 30px', borderRadius:24, textAlign:align, color:dark?'#10233b':'white', background:dark?'rgba(250,253,255,.88)':'linear-gradient(90deg,rgba(2,16,46,.78),rgba(2,16,46,.24))', backdropFilter:'blur(10px)', boxShadow:dark?'0 16px 50px rgba(20,40,70,.12)':'0 18px 60px rgba(0,0,0,.18)', opacity:p, transform:`translateY(${(1-p)*28}px)`, textShadow:dark?'none':'0 3px 24px rgba(0,0,0,.35)'}}>
    <div style={{fontFamily:'ui-monospace, SFMono-Regular, Menlo, monospace',fontSize:32,fontWeight:700,letterSpacing:'.18em',marginBottom:18}}>{eyebrow}</div>
    <div style={{fontFamily:'Georgia, serif',fontSize:70,lineHeight:1.02,letterSpacing:'-.035em',maxWidth:align==='left'?1050:1320}}>{title}</div>
    {detail?<div style={{fontFamily:'Inter, system-ui, sans-serif',fontSize:32,lineHeight:1.35,marginTop:20,opacity:.88}}>{detail}</div>:null}
  </div>;
};

const Page: React.FC<{src:string; scaleFrom?:number; scaleTo?:number; xFrom?:number; xTo?:number; yFrom?:number; yTo?:number; dim?:number}> = ({src,scaleFrom=1.04,scaleTo=1,xFrom=0,xTo=0,yFrom=0,yTo=0,dim=0}) => {
  const f=useCurrentFrame();
  const p=interpolate(f,[0,120],[0,1],{...clamp,easing:Easing.out(Easing.quad)});
  return <AbsoluteFill style={{overflow:'hidden',backgroundColor:DEEP}}>
    <Img src={staticFile(src)} style={{width:'100%',height:'100%',objectFit:'cover',transform:`translate(${xFrom+(xTo-xFrom)*p}px,${yFrom+(yTo-yFrom)*p}px) scale(${scaleFrom+(scaleTo-scaleFrom)*p})`,filter:'saturate(1.03) contrast(1.02)'}}/>
    {dim>0?<AbsoluteFill style={{background:`rgba(1,13,35,${dim})`}}/>:null}
  </AbsoluteFill>;
};

export const HookScene: React.FC = () => {
  const f=useCurrentFrame();
  const zoom=interpolate(f,[0,70],[1.28,1.05],{...clamp,easing:Easing.out(Easing.cubic)});
  const line1=interpolate(f,[6,24],[0,1],{...clamp,easing:ease});
  const line2=interpolate(f,[28,48],[0,1],{...clamp,easing:ease});
  const sweep=interpolate(f,[4,34],[-500,2400],{...clamp,easing:Easing.inOut(Easing.cubic)});
  return <AbsoluteFill style={{background:DEEP,overflow:'hidden'}}>
    <Img src={staticFile('ui/home.png')} style={{width:'100%',height:'100%',objectFit:'cover',transform:`scale(${zoom}) translateX(70px)`,filter:'brightness(.58) saturate(1.2)'}}/>
    <AbsoluteFill style={{background:'linear-gradient(90deg,rgba(0,19,57,.92),rgba(0,40,100,.25) 58%,rgba(0,25,70,.2))'}}/>
    <div style={{position:'absolute',left:150,top:245,color:'white'}}>
      <div style={{font:'700 32px ui-monospace',letterSpacing:'.18em',marginBottom:28}}>THE NEW WAY TO LEARN SOFTWARE</div>
      <div style={{font:'400 94px/1 Georgia,serif',letterSpacing:'-.045em',opacity:line1,transform:`translateY(${(1-line1)*34}px)`}}>Don’t just learn code.</div>
      <div style={{font:'italic 400 104px/1 Georgia,serif',letterSpacing:'-.045em',marginTop:14,color:SKY,opacity:line2,transform:`translateY(${(1-line2)*34}px)`}}>Build with it.</div>
    </div>
    <div style={{position:'absolute',left:sweep,top:-200,width:260,height:1500,transform:'rotate(18deg)',background:'linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent)',filter:'blur(12px)'}}/>
  </AbsoluteFill>;
};

export const HomeScene: React.FC = () => {
  const f=useCurrentFrame();
  const p=interpolate(f,[0,105],[0,1],{...clamp,easing:Easing.out(Easing.quad)});
  const flash=interpolate(f,[0,5,10],[1,0.18,0],clamp);
  return <AbsoluteFill style={{background:BLUE,overflow:'hidden'}}>
    <Img src={staticFile('ui/home.png')} style={{width:'100%',height:'100%',objectFit:'cover',transform:`translate(${210*(1-p)}px,${-105*(1-p)}px) scale(${1.48-.48*p})`,transformOrigin:'70% 40%'}}/>
    <AbsoluteFill style={{background:'linear-gradient(90deg,rgba(0,39,105,.42),transparent 62%)'}}/>
    <Caption eyebrow="PIPLEARN" title="From fundamentals to engineering judgment." detail="Execution, persistence, and human calibration—in one learning system."/>
    <AbsoluteFill style={{background:'white',opacity:flash}}/>
  </AbsoluteFill>;
};

export const FoundationScene: React.FC = () => {
  const f=useCurrentFrame();
  const p=interpolate(f,[0,92],[0,1],{...clamp,easing:Easing.bezier(.4,0,.25,1)});
  return <AbsoluteFill style={{background:'#f5f7f9',overflow:'hidden'}}>
    <Img src={staticFile('ui/manual.png')} style={{width:'100%',height:'100%',objectFit:'cover',transform:`translate(${(1-p)*-55}px,${(1-p)*-105}px) scale(${1.32-.32*p})`,transformOrigin:'48% 26%',filter:`blur(${(1-p)*1.2}px)`}}/>
    <div style={{position:'absolute',left:80,top:110,width:10,height:interpolate(f,[8,80],[0,620],clamp),borderRadius:8,background:'linear-gradient(#20b9ff,#2bd88f)',boxShadow:'0 0 30px #37cbff88'}}/>
    <Caption eyebrow="FOUNDATIONS" title="A manual designed to lead somewhere." detail="Eleven focused modules. Then the work becomes real." dark/>
  </AbsoluteFill>;
};

export const ProjectScene: React.FC = () => {
  const f=useCurrentFrame();
  const switchP=interpolate(f,[72,96],[0,1],{...clamp,easing:Easing.bezier(.6,0,.2,1)});
  const projScale=interpolate(f,[0,72],[1.06,1],{...clamp,easing:Easing.out(Easing.quad)});
  const phaseScale=interpolate(f,[72,145],[1.22,1],{...clamp,easing:Easing.out(Easing.quad)});
  const pulse=interpolate(f,[94,100,112],[0,.9,0],clamp);
  return <AbsoluteFill style={{background:'#eafaf1',overflow:'hidden'}}>
    <div style={{position:'absolute',inset:0,opacity:1-switchP,transform:`translateX(${-120*switchP}px) scale(${projScale})`,filter:`blur(${switchP*8}px)`}}><Img src={staticFile('ui/projects.png')} style={{width:'100%',height:'100%',objectFit:'cover'}}/></div>
    <div style={{position:'absolute',inset:0,opacity:switchP,transform:`translateX(${70*(1-switchP)}px) scale(${phaseScale})`,filter:`blur(${(1-switchP)*8}px)`}}><Img src={staticFile('ui/phase.png')} style={{width:'100%',height:'100%',objectFit:'cover'}}/></div>
    <AbsoluteFill style={{background:`rgba(255,255,255,${pulse})`}}/>
    <Caption eyebrow="PROJECT-BASED LEARNING" title="One real project. Nine engineering phases." detail="Build Terminal Ledger from system intent to durable software." dark delay={8}/>
  </AbsoluteFill>;
};

export const JournalScene: React.FC = () => {
  const f=useCurrentFrame();
  const p=interpolate(f,[0,120],[0,1],{...clamp,easing:Easing.out(Easing.quad)});
  return <AbsoluteFill style={{background:'#180b38',overflow:'hidden'}}>
    <div style={{position:'absolute',inset:0,transform:`translateX(${60-120*p}px) scale(${1.08-.05*p})`}}>
      <Img src={staticFile('ui/journal.png')} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
      <div style={{position:'absolute',left:'59.4%',top:'62.4%',width:330,height:82,borderRadius:16,background:'#f3e2d7',display:'flex',alignItems:'center',justifyContent:'center',color:'#06483f',font:'700 24px ui-monospace',letterSpacing:'.04em'}}>RESOLUTION</div>
    </div>
    <div style={{position:'absolute',right:180,top:100,width:720,height:760,border:'2px solid rgba(255,255,255,.28)',borderRadius:44,boxShadow:'0 0 70px rgba(255,117,180,.3)',opacity:interpolate(f,[28,54],[0,1],clamp)}}/>
    <AbsoluteFill style={{background:'linear-gradient(90deg,rgba(22,5,47,.65),transparent 62%)'}}/>
    <Caption eyebrow="PROBLEM JOURNAL" title="Turn runtime surprises into durable lessons."/>
  </AbsoluteFill>;
};

export const MentorScene: React.FC = () => {
  const f=useCurrentFrame();
  const p=interpolate(f,[0,115],[0,1],{...clamp,easing:Easing.inOut(Easing.quad)});
  const glow=interpolate(f,[20,46,70],[0,.35,.12],clamp);
  return <AbsoluteFill style={{background:'#110743',overflow:'hidden'}}>
    <Img src={staticFile('ui/mentors.png')} style={{width:'100%',height:'100%',objectFit:'cover',transform:`translate(${50-90*p}px,${20-35*p}px) scale(${1.09-.04*p})`}}/>
    <AbsoluteFill style={{background:`radial-gradient(520px 420px at 68% 45%,rgba(183,150,255,${glow}),transparent 70%),linear-gradient(90deg,rgba(10,8,56,.64),transparent 68%)`}}/>
    <Caption eyebrow="HUMAN CALIBRATION" title="Defend the decisions that matter." detail="Three checkpoints. Real architectural conversations."/>
  </AbsoluteFill>;
};

const montageItems=[
  {src:'ui/home.png',label:'LEARN',x:-1,y:-1},
  {src:'ui/projects.png',label:'BUILD',x:1,y:-1},
  {src:'ui/journal.png',label:'REFLECT',x:-1,y:1},
  {src:'ui/mentors.png',label:'DEFEND',x:1,y:1},
] as const;

export const MontageScene: React.FC = () => {
  const f=useCurrentFrame();
  return <AbsoluteFill style={{background:DEEP,padding:18,gap:12,display:'grid',gridTemplateColumns:'1fr 1fr',gridTemplateRows:'1fr 1fr'}}>
    <Img src={staticFile('ui/home.png')} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',opacity:.22}}/>
    {montageItems.map((m,i)=>{const cue=i*5;const p=interpolate(f,[cue,cue+15],[0,1],{...clamp,easing:ease});return <div key={m.label} style={{position:'relative',overflow:'hidden',borderRadius:24,opacity:p,transform:`translate(${m.x*(1-p)*80}px,${m.y*(1-p)*80}px) scale(${.94+.06*p})`,boxShadow:'inset 0 0 0 1px rgba(255,255,255,.24)'}}><Img src={staticFile(m.src)} style={{width:'100%',height:'100%',objectFit:'cover'}}/>{m.label==='REFLECT'?<div style={{position:'absolute',left:'61%',top:'61%',width:145,height:32,borderRadius:7,background:'rgba(243,226,215,.96)',display:'flex',alignItems:'center',paddingLeft:15,color:'#06483f',font:'700 12px ui-monospace'}}>RESOLUTION</div>:null}<div style={{position:'absolute',inset:0,background:'linear-gradient(0deg,rgba(0,18,50,.65),transparent 60%)'}}/><div style={{position:'absolute',left:36,bottom:28,color:'white',font:'700 36px ui-monospace',letterSpacing:'.18em'}}>{m.label}</div></div>})}
  </AbsoluteFill>;
};

const outroCards=[
  {src:'ui/home.png',left:70,top:70,w:570,rot:-5,dx:-500,dy:-220,cue:0},
  {src:'ui/projects.png',left:1280,top:90,w:560,rot:5,dx:520,dy:-200,cue:4},
  {src:'ui/journal.png',left:85,top:700,w:520,rot:4,dx:-500,dy:300,cue:8},
  {src:'ui/mentors.png',left:1320,top:700,w:520,rot:-4,dx:520,dy:300,cue:12},
] as const;

export const OutroScene: React.FC = () => {
  const f=useCurrentFrame();
  const word=interpolate(f,[38,55],[0,1],{...clamp,easing:ease});
  const rule=interpolate(f,[58,72],[0,1],{...clamp,easing:ease});
  const crane=interpolate(f,[0,42],[0,1],{...clamp,easing:Easing.out(Easing.quad)});
  return <AbsoluteFill style={{background:'radial-gradient(circle at 50% 40%,#42c4ff 0%,#0878df 48%,#032a68 100%)',overflow:'hidden'}}>
    <AbsoluteFill style={{transform:`perspective(1400px) rotateX(${4*(1-crane)}deg) scale(${1.055-.055*crane})`}}>
      {outroCards.map((c,i)=>{const p=interpolate(f,[c.cue,c.cue+18],[0,1],{...clamp,easing:Easing.bezier(.34,1.4,.44,1)});return <div key={c.src} style={{position:'absolute',left:c.left,top:c.top,width:c.w,height:c.w*.5625,borderRadius:22,overflow:'hidden',opacity:p*.78,transform:`translate(${c.dx*(1-p)}px,${c.dy*(1-p)}px) rotate(${c.rot*(2-p)}deg)`,boxShadow:'0 28px 65px rgba(0,15,55,.34)',border:'1px solid rgba(255,255,255,.55)'}}><Img src={staticFile(c.src)} style={{width:'100%',height:'100%',objectFit:'cover'}}/>{c.src==='ui/journal.png'?<div style={{position:'absolute',left:'61%',top:'61%',width:86,height:19,borderRadius:4,background:'#f3e2d7',color:'#06483f',font:'700 7px ui-monospace',paddingLeft:8,display:'flex',alignItems:'center'}}>RESOLUTION</div>:null}</div>})}
    </AbsoluteFill>
    <AbsoluteFill style={{background:'radial-gradient(520px 300px at 50% 47%,rgba(255,255,255,.85),rgba(255,255,255,.12) 55%,transparent 76%)'}}/>
    <AbsoluteFill style={{justifyContent:'center',alignItems:'center',color:'white',textAlign:'center'}}>
      <div style={{transform:`translateY(${(1-word)*34}px) scale(${.82+.18*word})`,opacity:word,filter:`blur(${(1-word)*8}px)`}}>
        <div style={{display:'flex',justifyContent:'center',marginBottom:18}}><LogoMark size={92}/></div>
        <div style={{font:'600 150px/1 Georgia,serif',letterSpacing:'-.055em',textShadow:'0 10px 40px rgba(0,40,100,.35)'}}>PipLearn</div>
        <div style={{height:5,width:330,margin:'30px auto',borderRadius:4,background:'white',transform:`scaleX(${rule})`}}/>
        <div style={{font:'600 34px ui-monospace',letterSpacing:'.16em',opacity:rule}}>LEARN BY BUILDING SOFTWARE.</div>
      </div>
    </AbsoluteFill>
  </AbsoluteFill>;
};

export const PipLearnLaunch: React.FC<LaunchProps> = ({bgm}) => (
  <AbsoluteFill style={{background:DEEP}}>
    <Sequence from={SHOTS.hook.from} durationInFrames={SHOTS.hook.duration}><HookScene/></Sequence>
    <Sequence from={SHOTS.home.from} durationInFrames={SHOTS.home.duration}><HomeScene/></Sequence>
    <Sequence from={SHOTS.foundations.from} durationInFrames={SHOTS.foundations.duration}><FoundationScene/></Sequence>
    <Sequence from={SHOTS.project.from} durationInFrames={SHOTS.project.duration}><ProjectScene/></Sequence>
    <Sequence from={SHOTS.journal.from} durationInFrames={SHOTS.journal.duration}><JournalScene/></Sequence>
    <Sequence from={SHOTS.mentors.from} durationInFrames={SHOTS.mentors.duration}><MentorScene/></Sequence>
    <Sequence from={SHOTS.montage.from} durationInFrames={SHOTS.montage.duration}><MontageScene/></Sequence>
    <Sequence from={SHOTS.outro.from} durationInFrames={SHOTS.outro.duration}><OutroScene/></Sequence>
    {[SHOTS.home.from, SHOTS.foundations.from, SHOTS.project.from, SHOTS.journal.from, SHOTS.mentors.from, SHOTS.montage.from, SHOTS.outro.from].map((from)=><Sequence key={from} from={from} durationInFrames={8}><TransitionFlash/></Sequence>)}
    <FilmGrain/>
    {bgm?<Audio src={staticFile('audio/bgm/tech-house.mp3')} volume={0.19}/>:null}
    {SFX_CUES.map((s,i)=><Sequence key={i} from={s.from} durationInFrames={s.duration}><Audio src={staticFile(s.src)} volume={s.volume}/></Sequence>)}
  </AbsoluteFill>
);

const TransitionFlash: React.FC = () => {
  const f=useCurrentFrame();
  const opacity=interpolate(f,[0,3,8],[.9,.28,0],clamp);
  return <AbsoluteFill style={{background:'white',opacity,pointerEvents:'none'}}/>;
};
