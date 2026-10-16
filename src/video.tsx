import React from 'react';
import {AbsoluteFill, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const sections = [
  {head:'POLÍTICAS PÚBLICAS',sub:'O que os números realmente mostram?',label:'ABERTURA'},
  {head:'QUAL É A AFIRMAÇÃO?',sub:'Apresente aqui uma alegação verificável.',label:'PERGUNTA'},
  {head:'QUAL É A FONTE?',sub:'IBGE • Ipea • Tesouro • Portal da Transparência',label:'EVIDÊNCIAS'},
  {head:'COMPARE COM CONTEXTO',sub:'Use períodos equivalentes e explique limitações.',label:'ANÁLISE'},
  {head:'O QUE PODEMOS CONCLUIR?',sub:'Diferencie dado, interpretação e opinião.',label:'CONCLUSÃO'},
  {head:'CONFIRA AS FONTES',sub:'Inclua URLs e datas na descrição do vídeo.',label:'ENCERRAMENTO'},
];
const Background: React.FC = () => {
  const f=useCurrentFrame();
  return <AbsoluteFill style={{background:'linear-gradient(135deg,#090b15 0%,#181a30 55%,#381a26 100%)'}}>
    <div style={{position:'absolute',width:900,height:900,borderRadius:'50%',background:'#e94057',filter:'blur(170px)',opacity:.2,top:-230,left:-320,transform:`translateX(${Math.sin(f/60)*70}px)`}}/>
    <div style={{position:'absolute',width:800,height:800,borderRadius:'50%',background:'#4069ff',filter:'blur(180px)',opacity:.2,bottom:-300,right:-300}}/>
  </AbsoluteFill>;
};
const Slide:React.FC<{head:string;sub:string;label:string;index:number}> = ({head,sub,label,index}) => {
  const f=useCurrentFrame(); const {fps}=useVideoConfig();
  const appear=spring({frame:f,fps,config:{damping:18,stiffness:95}});
  const x=interpolate(appear,[0,1],[140,0]);
  const opacity=interpolate(f,[0,12,270,300],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const progress=Math.min(1,f/300);
  return <AbsoluteFill style={{padding:'220px 85px',justifyContent:'center',opacity}}>
    <div style={{fontFamily:'Arial,sans-serif',fontWeight:800,letterSpacing:7,color:'#ff647a',fontSize:35,marginBottom:45}}>{String(index+1).padStart(2,'0')} / {label}</div>
    <div style={{transform:`translateX(${x}px)`,fontFamily:'Arial,sans-serif',fontWeight:900,fontSize:108,lineHeight:1.06,letterSpacing:-4,color:'#fff',textTransform:'uppercase',overflowWrap:'anywhere'}}>{head}</div>
    <div style={{width:130,height:10,background:'#ff647a',margin:'55px 0 45px',transformOrigin:'left',transform:`scaleX(${appear})`}}/>
    <div style={{fontFamily:'Arial,sans-serif',fontSize:47,lineHeight:1.25,color:'#d6d8e4',maxWidth:850}}>{sub}</div>
    <div style={{position:'absolute',bottom:150,left:85,right:85,height:6,background:'#ffffff22',borderRadius:5}}><div style={{width:`${progress*100}%`,height:'100%',background:'#ff647a',borderRadius:5}}/></div>
  </AbsoluteFill>;
};
export const FactualVideo:React.FC = () => <AbsoluteFill><Background/>{sections.map((s,i)=><Sequence key={i} from={i*300} durationInFrames={300}><Slide {...s} index={i}/></Sequence>)}</AbsoluteFill>;
