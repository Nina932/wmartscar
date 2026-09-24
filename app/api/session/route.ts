import {cookie,tokenFrom,newToken,candidateId} from '@/lib/session';
import {sameOrigin,failure} from '@/lib/access';
import {mutate} from '@/lib/store';
export async function POST(req:Request){try{sameOrigin(req);let token=tokenFrom(req);if(!/^[a-f0-9]{64}$/.test(token))token=newToken();const id=candidateId(token);const demo=new URL(req.url).searchParams.get('mode')==='demo';const body=await req.json() as {referralCode?:string};const scope=demo?'demo-v2:'+id:'live-v2:waymart';await mutate(scope,{type:'register',candidateId:id,referralCode:typeof body.referralCode==='string'?body.referralCode.slice(0,30):undefined},id,'candidate');return Response.json({ok:true},{headers:{'Set-Cookie':cookie(req,token),'Cache-Control':'no-store'}})}catch(e){return failure(e)}}

