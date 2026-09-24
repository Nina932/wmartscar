import {timingSafeEqual,createHash} from 'node:crypto';
import {tokenFrom,adminSignature} from '@/lib/session';
import {sameOrigin,failure} from '@/lib/access';
import {RuleError} from '@/lib/engine';
export async function POST(req:Request){try{sameOrigin(req);const secret=process.env.ADMIN_ACCESS_KEY;if(!secret||secret.length<32)throw new RuleError('ADMIN_NOT_CONFIGURED',503);const body=await req.json() as {key?:string};const a=createHash('sha256').update(body.key||'').digest(),b=createHash('sha256').update(secret).digest();if(!timingSafeEqual(a,b))throw new RuleError('FORBIDDEN',403);const token=tokenFrom(req);if(!/^[a-f0-9]{64}$/.test(token))throw new RuleError('SESSION_REQUIRED',401);const stamp=String(Date.now());return Response.json({ok:true},{headers:{'Set-Cookie':'wm_operator='+stamp+'.'+adminSignature(token,stamp)+'; Path=/; HttpOnly; SameSite=Strict; Max-Age=28800'+(new URL(req.url).protocol==='https:'?'; Secure':''),'Cache-Control':'no-store'}})}catch(e){return failure(e)}}

