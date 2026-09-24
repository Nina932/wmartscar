import {RuleError} from './engine';
import {tokenFrom,candidateId,isAdmin} from './session';
export async function context(request:Request){const token=tokenFrom(request);if(!/^[a-f0-9]{64}$/.test(token))throw new RuleError('SESSION_REQUIRED',401);const id=candidateId(token);const demo=new URL(request.url).searchParams.get('mode')==='demo';return{user:{userId:id},demo,admin:demo||isAdmin(request,token),scope:demo?'demo-v2:'+id:'live-v2:waymart',actor:id}}
export function sameOrigin(req:Request){const origin=req.headers.get('origin');if(!origin||origin!==new URL(req.url).origin)throw new RuleError('ORIGIN_REJECTED',403)}
export function failure(e:unknown){if(e instanceof RuleError)return Response.json({error:e.code},{status:e.status,headers:{'Cache-Control':'no-store'}});if(e instanceof SyntaxError)return Response.json({error:'INVALID_INPUT'},{status:400});console.error('WayMart request failed',e instanceof Error?e.message:'unknown');return Response.json({error:'SERVICE_UNAVAILABLE'},{status:503})}

