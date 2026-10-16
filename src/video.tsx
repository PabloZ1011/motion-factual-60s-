import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Easing} from 'remotion';

const C={red:'#E32A28',black:'#101014',cream:'#F8F1E4',yellow:'#F9D34D',blue:'#315DF4'};
const ease=Easing.bezier(.22,1,.36,1);
const clamp=(n:number,a:number,b:number)=>Math.max(a,Math.min(b,n));
const between=(f:number,a:number,b:number)=>clamp((f-a)/(b-a),0,1);
const slide=(f:number,a:number,b:number,from:number,to:number)=>interpolate(between(f,a,b),[0,1],[from,to],{easing:ease});
const Txt:React.FC<{children:React.ReactNode;size:number;color?:string;style?:React.CSSProperties}> = ({children,size,color=C.cream,style})=><div style={{fontFamily:'Arial, Helvetica, sans-serif',fontWeight:900,fontSize:size,lineHeight:.91,letterSpacing:-size*.055,color,textTransform:'uppercase',...style}}>{children}</div>;
const Scene:React.FC<{from:number;to:number;children:React.ReactNode}> = ({from,to,children})=>{const f=useCurrentFrame();return f>=from&&f<to?<AbsoluteFill>{children}</AbsoluteFill>:null};
const Stripes:React.FC<{f:number;color?:string}> = ({f,color=C.black})=><svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position:'absolute'}}>{Array.from({length:22},(_,i)=><rect key={i} x={-500+i*105+Math.sin(f/16+i)*35} y="-300" width="32" height="2500" transform={`rotate(-25 540 960)`} fill={color} opacity={.13}/>)}</svg>;
const BigNumber:React.FC<{value:string;f:number;start:number;left?:number;top?:number;size?:number;color?:string}> = ({value,f,start,left=80,top=580,size=400,color=C.cream})=><div style={{position:'absolute',left,top,transform:`translateY(${slide(f,start,start+18,280,0)}px) scale(${slide(f,start,start+22,.65,1)})`,opacity:between(f,start,start+8)}}><Txt size={size} color={color}>{value}</Txt></div>;
export const FactualVideo:React.FC=()=>{
 const f=useCurrentFrame(); const {fps}=useVideoConfig();
 const beat=(start:number)=>spring({frame:f-start,fps,config:{stiffness:140,damping:15}});
 return <AbsoluteFill style={{background:C.black,overflow:'hidden'}}>
 {/* 0-3s: dramatic typographic opening */}
 <Scene from={0} to={90}>
  <AbsoluteFill style={{background:C.red}}><Stripes f={f}/></AbsoluteFill>
  <div style={{position:'absolute',top:140,left:70,transform:`translateX(${slide(f,0,16,-1200,0)}px) rotate(-5deg)`}}><Txt size={220}>BRASIL</Txt></div>
  <div style={{position:'absolute',top:490,left:60,transform:`translateX(${slide(f,9,26,1300,0)}px) rotate(3deg)`}}><Txt size={280} color={C.black}>EM FOCO</Txt></div>
  <div style={{position:'absolute',left:75,top:980,width:930,height:260,background:C.yellow,transform:`rotate(-7deg) scaleX(${slide(f,25,43,0,1)})`}}/>
  <div style={{position:'absolute',left:118,top:1030,transform:`translateY(${slide(f,30,47,230,0)}px) rotate(-7deg)`}}><Txt size={110} color={C.black}>GOVERNO</Txt><Txt size={175} color={C.black}>LULA</Txt></div>
  <div style={{position:'absolute',left:80,bottom:155,fontFamily:'Arial',fontSize:37,fontWeight:800,letterSpacing:7,color:C.cream}}>POLÍTICAS PÚBLICAS  /  2023—</div>
  <div style={{position:'absolute',left:0,top:0,width:1080,height:1920,background:C.black,transform:`translateX(${slide(f,78,90,-1100,0)}px) skewX(-12deg)`}}/>
 </Scene>
 {/* 3-6s: large headline and morphing ring */}
 <Scene from={90} to={180}>
  <AbsoluteFill style={{background:C.black}}/>
  <div style={{position:'absolute',top:130,left:65,transform:`translateY(${slide(f,90,108,240,0)}px)`}}><Txt size={106} color={C.yellow}>POLÍTICA</Txt><Txt size={190}>SOCIAL</Txt></div>
  <svg style={{position:'absolute',top:620,left:-70,transform:`rotate(${(f-90)*2.4}deg) scale(${slide(f,90,123,.4,1)})`}} width="1220" height="1220" viewBox="0 0 1220 1220"><circle cx="610" cy="610" r="460" fill="none" stroke={C.red} strokeWidth="175" strokeDasharray="1750 1200" strokeLinecap="square"/><circle cx="610" cy="610" r="255" fill={C.yellow}/><path d="M460 620 L560 720 L780 470" stroke={C.black} strokeWidth="60" strokeLinecap="square" fill="none"/></svg>
  <div style={{position:'absolute',bottom:150,left:70,transform:`translateX(${slide(f,117,137,-900,0)}px)`}}><Txt size={74}>O QUE MUDOU?</Txt></div>
  <div style={{position:'absolute',inset:0,background:C.blue,transform:`scale(${slide(f,169,180,0,2)})`,borderRadius:'50%'}}/>
 </Scene>
 {/* 6-10s: policy visual as animated cards and scale bars */}
 <Scene from={180} to={300}>
  <AbsoluteFill style={{background:C.blue}}><Stripes f={f} color={C.cream}/></AbsoluteFill>
  <div style={{position:'absolute',top:145,left:65,transform:`translateX(${slide(f,180,200,-1100,0)}px)`}}><Txt size={110}>BOLSA</Txt><Txt size={192} color={C.yellow}>FAMÍLIA</Txt></div>
  <div style={{position:'absolute',top:590,left:72,width:930,height:130,background:C.cream,transform:`rotate(-4deg) scaleX(${slide(f,205,225,0,1)})`}}/>
  <div style={{position:'absolute',top:615,left:105,transform:`translateY(${slide(f,212,230,160,0)}px) rotate(-4deg)`}}><Txt size={75} color={C.black}>RETOMADO EM 2023</Txt></div>
  {Array.from({length:9},(_,i)=>{const x=90+(i%3)*320,y=865+Math.floor(i/3)*240;const p=beat(225+i*4);return <div key={i} style={{position:'absolute',left:x,top:y,width:260,height:170,background:i%2?C.yellow:C.cream,borderRadius:15,transform:`translateY(${(1-p)*300}px) rotate(${(1-p)*20}deg) scale(${clamp(p,0,1)})`,boxShadow:'18px 18px 0 #101014'}}><div style={{fontFamily:'Arial',fontWeight:900,fontSize:100,color:C.black,textAlign:'center',paddingTop:18}}>{['+','✓','+','✓','+','✓','+','✓','+'][i]}</div></div>})}
  <div style={{position:'absolute',bottom:70,left:72,fontFamily:'Arial',fontSize:32,fontWeight:700,color:C.cream}}>PROGRAMA DE TRANSFERÊNCIA DE RENDA</div>
  <div style={{position:'absolute',inset:0,background:C.yellow,transform:`translateY(${slide(f,286,300,1920,0)}px) rotate(-3deg) scale(1.3)`}}/>
 </Scene>
 {/* 10-13s: sources & verification */}
 <Scene from={300} to={390}>
  <AbsoluteFill style={{background:C.yellow}}/>
  <div style={{position:'absolute',top:170,left:55,transform:`translateX(${slide(f,300,319,1200,0)}px)`}}><Txt size={180} color={C.black}>DADOS.</Txt><Txt size={170} color={C.red}>FONTES.</Txt><Txt size={157} color={C.black}>CONTEXTO.</Txt></div>
  <svg width="1080" height="950" style={{position:'absolute',top:860}}><g transform={`rotate(${(f-300)*1.6} 540 430)`}><circle cx="540" cy="430" r="360" fill={C.black}/><circle cx="540" cy="430" r="260" fill="none" stroke={C.cream} strokeWidth="30" strokeDasharray="20 45"/><circle cx="540" cy="430" r="125" fill={C.red}/></g></svg>
  <div style={{position:'absolute',bottom:110,left:80,fontFamily:'Arial',fontSize:40,fontWeight:900,color:C.black,background:C.cream,padding:'20px 35px',transform:`rotate(-4deg) scale(${slide(f,325,342,.5,1)})`}}>VERIFIQUE ANTES DE COMPARTILHAR</div>
  <div style={{position:'absolute',inset:0,background:C.red,transform:`translateX(${slide(f,379,390,-1100,0)}px)`}}/>
 </Scene>
 {/* 13-15s: branded end card */}
 <Scene from={390} to={450}>
  <AbsoluteFill style={{background:C.red}}><Stripes f={f}/></AbsoluteFill>
  <div style={{position:'absolute',top:460,left:55,transform:`scale(${slide(f,390,410,.4,1)}) rotate(${slide(f,390,410,-15,0)}deg)`}}><Txt size={200}>BRASIL</Txt><Txt size={205} color={C.yellow}>EM FOCO</Txt></div>
  <div style={{position:'absolute',top:1110,left:70,width:930,height:18,background:C.black,transform:`scaleX(${slide(f,406,424,0,1)})`,transformOrigin:'left'}}/>
  <div style={{position:'absolute',top:1190,left:70,transform:`translateY(${slide(f,413,430,170,0)}px)`}}><Txt size={69}>POLÍTICA COM</Txt><Txt size={102} color={C.black}>CONTEXTO.</Txt></div>
  <div style={{position:'absolute',bottom:140,left:70,fontFamily:'Arial',fontSize:32,fontWeight:800,color:C.cream,letterSpacing:4}}>PROTÓTIPO VISUAL • SEM NARRAÇÃO</div>
 </Scene>
 {/* subtle animated film grain dots */}
 <svg style={{position:'absolute',inset:0,pointerEvents:'none',opacity:.1}} width="1080" height="1920"><defs><pattern id="dots" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="white"/></pattern></defs><rect width="1080" height="1920" fill="url(#dots)"/></svg>
 </AbsoluteFill>;
};
