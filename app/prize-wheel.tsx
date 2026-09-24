"use client";
import {useRef,useState,useEffect} from 'react';
import type {ComponentType} from 'react';
import {Coffee,Gift,ArrowUpRight,Check,RefreshCw,X} from 'lucide-react';
type Props={rotation:number;spinning:boolean;disabled:boolean;demo:boolean;kind?:'meal'|'voucher';completed?:boolean;stepLabel?:string;floatTitle?:string;floatPrize?:string;onSpin:()=>void};
export default function PrizeWheel({rotation,spinning,disabled,demo,kind='meal',completed=false,stepLabel,floatTitle,floatPrize,onSpin}:Props){
 const [tilt,setTilt]=useState({x:0,y:0}),[celebrate,setCelebrate]=useState(false),[focused,setFocused]=useState(false);
 const previous=useRef(false),canvas=useRef<HTMLCanvasElement>(null);
 const segments:Array<[string,string,ComponentType<{size?:number}>]>=kind==='voucher'
  ? [['50₾','ვაუჩერი',Gift],['თითქმის','გადასცდა',SparkleIcon],['25₾','სიურპრიზი',Gift],['კიდევ','სცადე',ArrowUpRight],['50₾','ვაუჩერი',Gift],['ბონუსი','ახლოსაა',SparkleIcon],['10₾','ტიზერი',Gift],['50₾','შენია',Gift]]
  : [['ყავა','პირველი',Coffee],['თითქმის','გადასცდა',SparkleIcon],['ჰოთდოგი','გემრიელი',Gift],['კიდევ','სცადე',ArrowUpRight],['ყავა','ახლოსაა',Coffee],['ბონუსი','მალე',SparkleIcon],['ჰოთდოგი','შენია',Gift],['სიურპრიზი','WayMart',Gift]];
 useEffect(()=>{if(previous.current&&!spinning){setCelebrate(true);const timeout=setTimeout(()=>setCelebrate(false),2400);previous.current=spinning;return()=>clearTimeout(timeout)}previous.current=spinning},[spinning]);
 useEffect(()=>{if(!celebrate||!canvas.current||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const c=canvas.current,ctx=c.getContext('2d');if(!ctx)return;const dpr=Math.min(devicePixelRatio,2),w=c.clientWidth,h=c.clientHeight;c.width=w*dpr;c.height=h*dpr;ctx.scale(dpr,dpr);const parts=Array.from({length:64},(_,i)=>({x:w/2,y:h/2,vx:(Math.random()-.5)*13,vy:-Math.random()*10-3,r:Math.random()*5+3,a:Math.random()*6,color:['#ed1740','#fa5875','#ffb2c2','#25232d','#f7cba1'][i%5]}));let tick=0,frame=0;function draw(){ctx!.clearRect(0,0,w,h);for(const p of parts){p.x+=p.vx;p.y+=p.vy;p.vy+=.18;p.a+=.07;ctx!.save();ctx!.translate(p.x,p.y);ctx!.rotate(p.a);ctx!.globalAlpha=Math.max(0,1-tick/130);ctx!.fillStyle=p.color;ctx!.fillRect(-p.r/2,-p.r/2,p.r,p.r*.55);ctx!.restore()}tick++;if(tick<130)frame=requestAnimationFrame(draw)}frame=requestAnimationFrame(draw);return()=>cancelAnimationFrame(frame)},[celebrate]);
 function move(e:React.PointerEvent<HTMLDivElement>){if(e.pointerType==='touch'||spinning||matchMedia('(max-width: 700px)').matches)return;const b=e.currentTarget.getBoundingClientRect();setTilt({x:(e.clientY-b.top-b.height/2)/-70,y:(e.clientX-b.left-b.width/2)/70})}
 useEffect(()=>{if(!focused)return;const previous=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=previous}},[focused]);
 function closeFocus(e?:React.MouseEvent){e?.stopPropagation();setFocused(false)}
 return <div className={'premium-wheel-stage '+(spinning?'running ':'')+(celebrate?'celebrating ':'')+(focused?'is-focused ':'')} onPointerMove={move} onPointerLeave={()=>setTilt({x:0,y:0})}>
 {focused&&<><button className="wheel-focus-backdrop" aria-label="ბორბლის ფოკუსის დახურვა" onClick={closeFocus}/><button className="wheel-focus-close" aria-label="დახურვა" onClick={closeFocus}><X size={22}/></button></>}
 <div className="wheel-stage-heading"><span className="edition">WAYMART / REWARDS</span><span className="edition-number">01—02</span></div>
 <div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="wheel-energy"><i/><i/><i/><i/><i/><i/></div>
 <div className="premium-wheel-assembly" style={{transform:focused?'perspective(900px) scale(1.5) rotateX('+tilt.x+'deg) rotateY('+tilt.y+'deg)':'perspective(900px) rotateX('+tilt.x+'deg) rotateY('+tilt.y+'deg)'}}>
 <div className="wheel-ground-shadow"/><div className="outer-dial">{Array.from({length:48},(_,i)=><i key={i} style={{transform:'rotate('+i*7.5+'deg)'}}/> )}</div>
 <div className="precision-pointer"><span/></div>
 <div className="rotating-disc" style={{transform:'rotate('+rotation+'deg)'}}>
 <div className="disc-surface"/>
 {segments.map(([title,sub,Icon],i)=><div className="disc-label" key={i} style={{transform:'rotate('+(i*45)+'deg) translateY(calc(var(--label-radius) * -1)) rotate('+(-i*45)+'deg)'}}><span className="disc-icon"><Icon size={25}/></span><b>{title}</b><small>{sub}</small></div>)}
 </div><div className="disc-gloss"/>
 <button className="premium-spin-button" disabled={disabled} onClick={onSpin} aria-label="ბორბლის დატრიალება"><span className="tap-ring"/><span className="center-motion">{spinning?<RefreshCw size={25}/>:<ArrowUpRight size={29}/>}</span><b>{spinning?'ტრიალებს':completed?'გახსნილია':'დაატრიალე'}</b><small>{spinning?'შენი კარგი ამბავი…':completed?'3 / 3':stepLabel||'1 / 3'}</small></button>
 </div>
 <div className="wheel-live-label" aria-live="polite"><span/>{spinning?'ცოტაც… შენი საჩუქარი ახლოსაა':celebrate?'საჩუქარი გახსნილია!':'ერთი დატრიალება. კარგი დასაწყისი.'}</div>
 <div className="reward-float"><span><Coffee size={21}/></span><div><small>{floatTitle||'შენი შემდეგი დატრიალება'}</small><b>{floatPrize||(kind==='voucher'?'50₾-იანი ვაუჩერი':'ყავა ან ჰოთდოგი')}</b></div><Check size={16}/></div>
 <span className="premium-stage-note">{demo?'საცდელი დატრიალება • რეალური პრიზის გარეშე':'გამოყენება — დასაქმების დადასტურების შემდეგ'}</span>
 <canvas ref={canvas} className="wheel-confetti" aria-hidden="true"/>
 </div>
}
function SparkleIcon({size=24}:{size?:number}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l1.7 5.1L19 9l-5.3 1.9L12 16l-1.7-5.1L5 9l5.3-1.9L12 2z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z"/></svg>}


