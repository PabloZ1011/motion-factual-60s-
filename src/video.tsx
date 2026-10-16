import React from 'react';
import {AbsoluteFill, Audio, staticFile, interpolate, Easing, useCurrentFrame, spring, useVideoConfig} from 'remotion';

const C={red:'#E32A28',black:'#111115',cream:'#FFF7E9',yellow:'#FAD44F',blue:'#315DF4',mint:'#B8F5D0'};
const clamp=(x:number)=>Math.max(0,Math.min(1,x));
const ease=Easing.bezier(.22,1,.36,1);
const t=(f:number,a:number,b:number)=>clamp((f-a)/(b-a));
const move=(f:number,a:number,b:number,x:number,y:number)=>interpolate(t(f,a,b),[0,1],[x,y],{easing:ease});
const Text:React.FC<{children:React.ReactNode;size?:number;color?:string;style?:React.CSSProperties}> =({children,size=100,color=C.cream,style})=><div style={{fontFamily:'Arial,Helvetica,sans-serif',fontSize:size,fontWeight:900,lineHeight:.96,letterSpacing:-size*.04,color,textTransform:'uppercase',...style}}>{children}</div>;
const Section:React.FC<{start:number;end:number;children:React.ReactNode}>=({start,end,children})=>{const f=useCurrentFrame();return f>=start&&f<end?<AbsoluteFill>{children}</AbsoluteFill>:null};
const Tag:React.FC<{children:React.ReactNode;color?:string}>=({children,color=C.yellow})=><div style={{display:'inline-block',background:color,color:C.black,padding:'18px 28px',fontSize:34,fontFamily:'Arial',fontWeight:900,letterSpacing:2}}>{children}</div>;
const Footer:React.FC<{text:string}>=({text})=><div style={{position:'absolute',bottom:100,left:65,right:65,fontFamily:'Arial',fontSize:29,fontWeight:700,color:C.cream,opacity:.9}}>{text}</div>;
const Entrance:React.FC<{f:number;at:number;children:React.ReactNode;style?:React.CSSProperties}>=({f,at,children,style})=><div style={{transform:`translateY(${move(f,at,at+19,190,0)}px)`,opacity:t(f,at,at+10),...style}}>{children}</div>;
const Diagonal:React.FC<{f:number}>=({f})=><svg width="1080" height="1920" style={{position:'absolute',inset:0,opacity:.14}}>{Array.from({length:16},(_,i)=><rect key={i} x={-800+i*170+Math.sin(f/22+i)*35} y="-400" width="42" height="2800" transform="rotate(-23 540 960)" fill="white"/>)}</svg>;
const Transition:React.FC<{f:number;end:number;color:string}>=({f,end,color})=><div style={{position:'absolute',inset:-100,background:color,transform:`translateX(${move(f,end-17,end+1,-1500,0)}px) skewX(-12deg)`}}/>;
const Card:React.FC<{f:number;at:number;children:React.ReactNode;top:number;color?:string}>=({f,at,children,top,color=C.cream})=><div style={{position:'absolute',top,left:65,width:950,background:color,color:C.black,padding:'38px 40px',borderRadius:8,boxShadow:'18px 20px 0 #111115',transform:`translateX(${move(f,at,at+20,1200,0)}px) rotate(-3deg)`}}>{children}</div>;
const Bar:React.FC<{f:number;at:number;label:string;value:number;max:number;top:number;color:string;caption:string}>=({f,at,label,value,max,top,color,caption})=><div style={{position:'absolute',left:80,top,width:920}}><Text size={46}>{label}</Text><div style={{height:82,background:'#ffffff33',marginTop:22,borderRadius:8,overflow:'hidden'}}><div style={{height:'100%',width:`${(value/max)*100*t(f,at,at+36)}%`,background:color}}/></div><div style={{display:'flex',justifyContent:'space-between',fontFamily:'Arial',fontWeight:900,color:C.cream,fontSize:52,marginTop:12}}><span>{caption}</span><span>{value.toLocaleString('pt-BR')}%</span></div></div>;
export const FactualVideo:React.FC=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 const pulse=spring({frame:f%30,fps,config:{damping:20,stiffness:140}});
 return <AbsoluteFill style={{background:C.black,overflow:'hidden'}}>
  <Audio src={staticFile('trilha.mp3')} volume={0.17}/>
  {/* Narracao sincronizada desde o primeiro frame. */}
  <Audio src={staticFile('narracao.mp3')} volume={1}/>
  <Section start={0} end={270}>
   <AbsoluteFill style={{background:C.red}}/><Diagonal f={f}/>
   <Entrance f={f} at={3} style={{position:'absolute',top:235,left:55,transform:`rotate(-5deg)`}}><Text size={190}>BRASIL</Text></Entrance>
   <Entrance f={f} at={23} style={{position:'absolute',top:490,left:55}}><Text size={215} color={C.black}>EM NÚMEROS</Text></Entrance>
   <div style={{position:'absolute',top:855,left:60,width:955,height:320,background:C.yellow,transform:`scaleX(${t(f,45,75)}) rotate(-5deg)`}}/>
   <Entrance f={f} at={55} style={{position:'absolute',top:900,left:100,transform:'rotate(-5deg)'}}><Text size={155} color={C.black}>GOVERNO</Text><Text size={195} color={C.black}>LULA</Text></Entrance>
   <Entrance f={f} at={115} style={{position:'absolute',top:1370,left:75}}><Text size={69}>O QUE DIZEM</Text><Text size={91} color={C.yellow}>OS DADOS?</Text></Entrance>
   <Footer text="POLÍTICAS PÚBLICAS • 2023–2025"/><Transition f={f} end={270} color={C.blue}/>
  </Section>
  <Section start={270} end={570}>
   <AbsoluteFill style={{background:C.blue}}/><Diagonal f={f}/>
   <Entrance f={f} at={277} style={{position:'absolute',top:140,left:65}}><Text size={125}>BOLSA</Text><Text size={183} color={C.yellow}>FAMÍLIA</Text></Entrance>
   <Card f={f} at={300} top={580}><Text size={62} color={C.black}>REFORMULADO</Text><Text size={130} color={C.red}>EM 2023</Text></Card>
   <Entrance f={f} at={355} style={{position:'absolute',top:930,left:70}}><Text size={65}>VALOR MÍNIMO</Text><Text size={250} color={C.yellow}>R$ 600</Text><Text size={50}>POR FAMÍLIA ELEGÍVEL</Text></Entrance>
   <div style={{position:'absolute',top:1390,left:70,width:900,height:140,background:C.yellow,transform:`scaleX(${t(f,425,480)})`,transformOrigin:'left'}}/>
   <Entrance f={f} at={440} style={{position:'absolute',top:1422,left:90}}><Text size={57} color={C.black}>+ ADICIONAIS POR CRIANÇA</Text></Entrance>
   <Footer text="Fonte: Lei 14.601/2023 • MDS"/><Transition f={f} end={570} color={C.yellow}/>
  </Section>
  <Section start={570} end={870}>
   <AbsoluteFill style={{background:C.yellow}}/>
   <Entrance f={f} at={575} style={{position:'absolute',top:160,left:55}}><Text size={104} color={C.black}>JUNHO / 2025</Text><Text size={90} color={C.red}>ALCANCE SOCIAL</Text></Entrance>
   <div style={{position:'absolute',top:620,left:60,transform:`scale(${move(f,600,650,.4,1)})`,transformOrigin:'left center'}}><Text size={210} color={C.black}>20,5</Text><Text size={135} color={C.red}>MILHÕES</Text><Text size={64} color={C.black}>DE FAMÍLIAS</Text></div>
   <svg width="1000" height="400" style={{position:'absolute',top:1170,left:40}}>{Array.from({length:35},(_,i)=>{const x=(i%7)*135+35,y=Math.floor(i/7)*75+10;const v=t(f,655+i*2,675+i*2);return <g key={i} opacity={v} transform={`translate(${x} ${y}) scale(${v})`}><circle cx="25" cy="18" r="16" fill={i%3===0?C.red:C.black}/><rect x="3" y="39" width="44" height="34" rx="8" fill={i%3===0?C.red:C.black}/></g>})}</svg>
   <div style={{position:'absolute',top:1660,left:60,right:60}}><Text size={40} color={C.black}>20.499.027 FAMÍLIAS NO MÊS</Text></div>
   <div style={{position:'absolute',bottom:95,left:60,fontFamily:'Arial',fontSize:29,color:C.black,fontWeight:700}}>Fonte: MDS, informe nº 086, julho de 2025</div>
   <Transition f={f} end={870} color={C.black}/>
  </Section>
  <Section start={870} end={1170}>
   <AbsoluteFill style={{background:C.black}}/>
   <Entrance f={f} at={875} style={{position:'absolute',top:130,left:60}}><Text size={114} color={C.yellow}>POBREZA</Text><Text size={78}>2022 × 2023</Text></Entrance>
   <Bar f={f} at={915} top={560} label="2022" value={31.6} max={40} color={C.red} caption="PESSOAS ABAIXO DA LINHA"/>
   <Bar f={f} at={960} top={1000} label="2023" value={27.4} max={40} color={C.mint} caption="PESSOAS ABAIXO DA LINHA"/>
   <Entrance f={f} at={1030} style={{position:'absolute',top:1500,left:75}}><Text size={84} color={C.yellow}>QUEDA DE</Text><Text size={110}>4,2 P.P.</Text></Entrance>
   <Footer text="IBGE • Síntese de Indicadores Sociais 2024"/><Transition f={f} end={1170} color={C.red}/>
  </Section>
  <Section start={1170} end={1470}>
   <AbsoluteFill style={{background:C.red}}/><Diagonal f={f}/>
   <Entrance f={f} at={1175} style={{position:'absolute',top:130,left:60}}><Text size={150}>ECONOMIA</Text><Text size={78} color={C.yellow}>CRESCIMENTO REAL DO PIB</Text></Entrance>
   <Card f={f} at={1220} top={620} color={C.cream}><Text size={80} color={C.black}>2024</Text><Text size={180} color={C.blue}>+3,4%</Text></Card>
   <Card f={f} at={1295} top={1060} color={C.yellow}><Text size={80} color={C.black}>2025</Text><Text size={180} color={C.black}>+2,3%</Text></Card>
   <Footer text="Fonte: IBGE • Contas Nacionais"/><Transition f={f} end={1470} color={C.yellow}/>
  </Section>
  <Section start={1470} end={1890}>
   <AbsoluteFill style={{background:C.yellow}}/>
   <Entrance f={f} at={1475} style={{position:'absolute',top:145,left:60}}><Text size={130} color={C.black}>MAS ATENÇÃO</Text><Text size={95} color={C.red}>CONTEXTO</Text></Entrance>
   <Entrance f={f} at={1530} style={{position:'absolute',top:610,left:60}}><Text size={78} color={C.black}>NENHUM DADO</Text><Text size={81} color={C.black}>EXPLICA TUDO</Text></Entrance>
   {['INFLAÇÃO','EMPREGO','CENÁRIO EXTERNO'].map((x,i)=><Card key={x} f={f} at={1575+i*30} top={945+i*180} color={i===1?C.red:C.cream}><Text size={67} color={i===1?C.cream:C.black}>{x}</Text></Card>)}
   <div style={{position:'absolute',top:1630,left:60,right:60}}><Text size={65} color={C.black}>COMPARE COM</Text><Text size={90} color={C.red}>FONTES.</Text></div>
   <div style={{position:'absolute',bottom:95,left:60,fontFamily:'Arial',fontSize:30,color:C.black,fontWeight:700}}>FONTES E LINKS NO README • BRASIL EM FOCO</div>
  </Section>
  <svg width="1080" height="1920" style={{position:'absolute',inset:0,opacity:.07,pointerEvents:'none'}}><defs><pattern id="grain" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="white"/></pattern></defs><rect width="1080" height="1920" fill="url(#grain)"/></svg>
 </AbsoluteFill>;
};
