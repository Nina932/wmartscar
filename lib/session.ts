import {createHash,randomBytes,createHmac,timingSafeEqual} from 'node:crypto';
export const cookieName='wm_session_v2';
export function tokenFrom(req:Request){return req.headers.get('cookie')?.split(';').map(x=>x.trim()).find(x=>x.startsWith(cookieName+'='))?.slice(cookieName.length+1)||''}
export function candidateId(token:string){return 'WM-'+createHash('sha256').update(token).digest('hex').slice(0,32)}
export function newToken(){return randomBytes(32).toString('hex')}
export function cookie(req:Request,token:string){return cookieName+'='+token+'; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000'+(new URL(req.url).protocol==='https:'?'; Secure':'')}
export function adminSignature(token:string,stamp:string){return createHmac('sha256',process.env.ADMIN_ACCESS_KEY||'disabled').update(token+'.'+stamp).digest('hex')}
export function isAdmin(req:Request,token:string){if(!process.env.ADMIN_ACCESS_KEY)return false;const value=req.headers.get('cookie')?.split(';').map(x=>x.trim()).find(x=>x.startsWith('wm_operator='))?.slice(12)||'';const [stamp,sig]=value.split('.');if(!stamp||!sig||Date.now()-Number(stamp)>28800000||Number(stamp)>Date.now()||!/^[a-f0-9]{64}$/.test(sig))return false;return timingSafeEqual(Buffer.from(sig),Buffer.from(adminSignature(token,stamp)))}

