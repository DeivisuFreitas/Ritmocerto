import React, { useState, useEffect, useMemo } from "react";																									
																									
const SHEET_ID = "1Y9ZQeYjTBVdtawpBzKd63n416Nub-K42-hRNTCFsWvk";																									
const CLIENT_EMAIL = "ritmocerto-app@emerald-surface-316302.iam.gserviceaccount.com";																									
const PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCx7eY3q9nA6PNO\nZ+fu/DD0DL7N5KS4VVhgXPS229le6UErcZZPB6Jnp6H0BLfW2OVRxywXf4toE+qv\nghpdsfPNH/TyLXkQlFJFX6CQBlc03DOLW0O6eR+AwKCrKEH8PGGnhOQHcFVI46w4\nLJ53Q6CbW+tXNxj7wA45BwOO+NR1tpddpZudPkWP9F1jZiPeX9UtY2jXDiEa7Qbv\nyLoIlizfPKJV0eK1qjhCGZr5AgtSqtu8kGY1kZI/hmygnunKw4FcOp1T1gJZqOv4\nGsqx6DnNyQawdmd10QfiqDsQAat//QKJ2R7hKMxpue+qz4aPKFzxCocNxWSqs2W+\nVF6XNDb3AgMBAAECggEACND66U3wmj3GCzUxftwBfkuWC2mwPRoC07OHb1AcHeHS\nQtl7/dUpAkMszoSKqhtRMZN8PHsraIV5dCeEMERTCkTybtWQpsun+pwEaV6HD612\n4wmApPVqJDJnQ6kuVoCUw3zdjP4km69Rp0Q+uIt3TSYUK9wlDBm2GrPy7zCmhmE9\nRv54IZUBTxVaDpJri0oqnVk68fF2BhTo4bNOXs+ZgxacijSB2ksh/rxKDtizzVk5\nnddH1S0Cc9LLbFYyWRKwR4MJyIEdkAgMLjPTO/M4GcZE9yE2foVzmZac+BTFIywe\ns6NpNg+Uy1A6U9h0A7XzejH2D6bQ9PLNTyZOMqJ4gQKBgQDcLrr1xF1Ws15VGbsc\njO1qHMChFUyLOa261nyjM5eOyEE+NdJWSiGGqc0mo6ORFLxEtvr5XfrP0C9McDxs\nxWxPQQTu3KcErgQQvE010+YZfV30tXtb72b9rANrKV3QlNUBMfDgsatb2RcFr0Ct\nPCTaVxUnSpuAeIPaUXM4xTsn4QKBgQDO35O8mZBzxMdYViOHvDX8hof0IG4ToTaM\nscy9lTGtK/EsCTYmSxTxWwxuaQSAzrH4KpCdoXFDjUBgN9M4LXbVOWDHx/GZq9UW\nBiSbI5v0Frw1+dzoVWJAhuFCk2l5fAGmOv4XflBiaNLSHdDD3leccoiCsKW3wJQr\nQHKRpLjZ1wKBgQCgRrv9jxVKuYLfe72CyOtBpPBr0a9IYZIfQWa0/idC3m7vtAoK\nmifReOVHTTMRtwBdHL2QrGKYx7jGcaTqoMN45aGLpr9FXs7Cx++EUV1cDLBKI5lK\nkPhti7tpVFFgNhbfqdToGyzbzSk/EBWKhQ9miKFzWpHbcN66GzQ+jQPEwQKBgH1Z\n7iwmpOfxQZVeRJM30UKdxf2ANRMB6YrhJZ1urLYw3ScAweX8Msl4kRTJ36epFx+3\nsv9A1t/G1E45JWxx6AKVjPYhSl0CSNDakg3LSvFhYVQXfert6eYNlKsBpbSuFlXC\ngzp7GHw45h3ZYSl+LXon0F3YaeHo+B8pIwLrW/LrAoGBALhs37WGgw8o/JIc/z4d\nqkk7MIgw09VU6F3qdz5QaBv4Tkc0ocYFr0rhTItEJMsVfFTFhSSfpma/oJy5uI9g\nPZRZ4tVExLkPOFjDQraBHUjV9E8udrWY3vF50Y5W5cv7wn1H7WPnUFwGgiAsnDjy\nRivwV6CAnG7Y6EOCOJz1qNbE\n-----END PRIVATE KEY-----\n";																									
																									
const STRAVA_CLIENT_ID="259363";																									
const STRAVA_REDIRECT="https://ritmocerto.vercel.app/api/strava";																									
const CARD="#1a1a1a",BORDA="#2e2e2e",BRANCO="#f5f5f5",CINZA="#a0a0a0",DOURADO="#c9a84c",FUNDO="#0f0f0f",VERMELHO="#c06040",VERDE="#4a7a1a",STRAVA="#FC4C02";																									
																									
const LOGINS_FIXOS=[																									
{email:"ritmocerto@mangalo",senha:"Ritmocerto2021",usuario:{id:"master",nome:"Admin",email:"ritmocerto@mangalo",nivel:"Avançado",vinculo:"Equipe",isOrganizador:true,isAdmin:true}},																									
{email:"pedrormiranda@live.com",senha:"cmrc2026@",usuario:{id:"pedro",nome:"Pedro Miranda",email:"pedrormiranda@live.com",nivel:"Avançado",vinculo:"Equipe",isOrganizador:true}},																									
{email:"deivisufreitas@icloud.com",senha:"Dryka2503",usuario:{id:"deivison",nome:"Deivison Freitas",email:"deivisufreitas@icloud.com",nivel:"Avançado",vinculo:"Equipe",isOrganizador:true}},																									
];																									
																									
async function getAccessToken(){																									
const header={alg:"RS256",typ:"JWT"};																									
const now=Math.floor(Date.now()/1000);																									
const claim={iss:CLIENT_EMAIL,scope:"https://www.googleapis.com/auth/spreadsheets",aud:"https://oauth2.googleapis.com/token",exp:now+3600,iat:now};																									
const b64=(obj)=>btoa(JSON.stringify(obj)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_");																									
const sigInput=`${b64(header)}.${b64(claim)}`;																									
const keyData=PRIVATE_KEY.replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\n/g,"");																									
const binaryKey=Uint8Array.from(atob(keyData),(c)=>c.charCodeAt(0));																									
const cryptoKey=await crypto.subtle.importKey("pkcs8",binaryKey.buffer,{name:"RSASSA-PKCS1-v1_5",hash:"SHA-256"},false,["sign"]);																									
const signature=await crypto.subtle.sign("RSASSA-PKCS1-v1_5",cryptoKey,new TextEncoder().encode(sigInput));																									
const sig64=btoa(String.fromCharCode(...new Uint8Array(signature))).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_");																									
const jwt=`${sigInput}.${sig64}`;																									
const res=await fetch("https://oauth2.googleapis.com/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:`grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`});																									
const data=await res.json();																									
if(!data.access_token)throw new Error("Token inválido");																									
return data.access_token;																									
}																									
																									
async function lerAba(token,aba){																									
const url=`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(aba)}!A1:Z1000`;																									
const res=await fetch(url,{headers:{Authorization:`Bearer ${token}`}});																									
const data=await res.json();																									
if(data.error)throw new Error(data.error.message);																									
return data.values||[];																									
}																									
																									
async function escreverAba(token,aba,rows){																									
const url=`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(aba)}!A1:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;																									
const res=await fetch(url,{method:"POST",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},body:JSON.stringify({values:rows})});																									
const data=await res.json();																									
if(data.error)throw new Error(data.error.message);																									
return data;																									
}																									
																									
function usarStrava(){																									
const [stravaToken,setStravaToken]=useState(()=>localStorage.getItem("strava_token")||null);																									
useEffect(()=>{																									
const params=new URLSearchParams(window.location.search);																									
const token=params.get("strava_token");																									
const athlete=params.get("strava_athlete");																									
const refresh=params.get("strava_refresh");																									
if(token){																									
localStorage.setItem("strava_token",token);																									
localStorage.setItem("strava_athlete",athlete||"");																									
localStorage.setItem("strava_refresh",refresh||"");																									
setStravaToken(token);																									
window.history.replaceState({},"","/");																									
}																									
},[]);																									
const conectarStrava=()=>{window.location.href=`https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&redirect_uri=${encodeURIComponent(STRAVA_REDIRECT)}&response_type=code&scope=activity:read_all`;};																									
const desconectarStrava=()=>{localStorage.removeItem("strava_token");localStorage.removeItem("strava_athlete");localStorage.removeItem("strava_refresh");setStravaToken(null);};																									
return{stravaToken,conectarStrava,desconectarStrava};																									
}																									
																									
// ── HELPERS ─────────────────────────────────────────────────																									
function diasRestantes(fim){																									
if(!fim)return null;																									
const f=new Date(fim);																									
const hoje=new Date();																									
const diff=Math.ceil((f-hoje)/(1000*60*60*24));																									
return diff>0?diff:0;																									
}																									
																									
function progressoPct(feito,meta){																									
if(!meta||!feito)return 0;																									
return Math.min(100,Math.round((parseFloat(feito)/parseFloat(meta))*100));																									
}																									
																									
// ── LOGIN ────────────────────────────────────────────────────																									
function TelaLogin({onLogin}){																									
const [email,setEmail]=useState("");																									
const [senha,setSenha]=useState("");																									
const [erro,setErro]=useState("");																									
const [loading,setLoading]=useState(false);																									
const handleLogin=async()=>{																									
if(!email||!senha){setErro("Preencha email e senha");return;}																									
setLoading(true);setErro("");																									
const fixo=LOGINS_FIXOS.find(l=>l.email.toLowerCase()===email.toLowerCase()&&l.senha===senha);																									
if(fixo){onLogin(fixo.usuario);setLoading(false);return;}																									
try{																									
const token=await getAccessToken();																									
const rows=await lerAba(token,"usuarios");																									
const u=rows.slice(1).find(r=>r[2]?.toLowerCase()===email.toLowerCase()&&r[3]===senha);																									
if(u)onLogin({id:u[0],nome:u[1],email:u[2],nivel:u[5]||"Iniciante",vinculo:u[7]||"Externo",isOrganizador:false});																									
else setErro("Email ou senha incorretos");																									
}catch(e){setErro("Erro: "+e.message);}																									
setLoading(false);																									
};																									
return(																									
<div style={{minHeight:"100vh",background:FUNDO,display:"flex",alignItems:"center",justifyContent:"center",padding:24,fontFamily:"'Inter',sans-serif"}}>																									
<style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap');*{box-sizing:border-box;margin:0;padding:0;}`}</style>																									
<div style={{width:"100%",maxWidth:380}}>																									
<div style={{textAlign:"center",marginBottom:40}}>																									
<div style={{width:64,height:64,background:DOURADO,borderRadius:18,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,margin:"0 auto 16px"}}>⚡</div>																									
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:36,color:BRANCO,letterSpacing:4}}>COFFEEMUSIC</div>																									
<div style={{fontSize:11,color:CINZA,letterSpacing:3,marginTop:4}}>RUN CLUB</div>																									
</div>																									
<div style={{background:CARD,border:`1px solid ${BORDA}`,borderRadius:16,padding:28}}>																									
<div style={{marginBottom:16}}>																									
<div style={{fontSize:10,color:CINZA,letterSpacing:2,marginBottom:6}}>EMAIL</div>																									
<input value={email} onChange={e=>setEmail(e.target.value)} placeholder="seu@email.com" style={{width:"100%",background:"#111",border:`1px solid ${BORDA}`,borderRadius:10,padding:"13px 14px",color:BRANCO,fontSize:14,outline:"none",fontFamily:"Inter"}}/>																									
</div>																									
<div style={{marginBottom:20}}>																									
<div style={{fontSize:10,color:CINZA,letterSpacing:2,marginBottom:6}}>SENHA</div>																									
<input type="password" value={senha} onChange={e=>setSenha(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleLogin()} placeholder="••••••••" style={{width:"100%",background:"#111",border:`1px solid ${BORDA}`,borderRadius:10,padding:"13px 14px",color:BRANCO,fontSize:14,outline:"none",fontFamily:"Inter"}}/>																									
</div>																									
{erro&&<div style={{color:VERMELHO,fontSize:12,marginBottom:14,textAlign:"center"}}>{erro}</div>}																									
<button onClick={handleLogin} disabled={loading} style={{width:"100%",background:DOURADO,color:"#000",border:"none",borderRadius:10,padding:15,fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:2,cursor:"pointer"}}>{loading?"ENTRANDO...":"ENTRAR"}</button>																									
</div>																									
<div style={{textAlign:"center",marginTop:20}}>																									
<span style={{fontSize:12,color:CINZA}}>Não tem conta? </span>																									
<button onClick={()=>onLogin(null,"cadastro")} style={{background:"none",border:"none",color:DOURADO,fontSize:12,cursor:"pointer"}}>Criar conta</button>																									
</div>																									
<div style={{textAlign:"center",marginTop:16,fontSize:11,color:"#444"}}>Dúvidas? Entre em contato pelo WhatsApp</div>																									
</div>																									
</div>																									
);																									
}																									
																									
// ── CADASTRO ─────────────────────────────────────────────────																									
function TelaCadastro({onVoltar,onCadastrado}){																									
const [passo,setPasso]=useState(1);																									
const [form,setForm]=useState({nome:"",email:"",senha:"",telefone:"",sexo:"",cidade:"",idade:"",nivel:"Iniciante",vinculo:"Externo"});																									
const [erro,setErro]=useState("");																									
const [loading,setLoading]=useState(false);																									
const set=(k,v)=>setForm(p=>({...p,[k]:v}));																									
const cadastrar=async()=>{																									
setLoading(true);setErro("");																									
try{																									
const token=await getAccessToken();																									
const id=Date.now().toString();																									
await escreverAba(token,"usuarios",[[id,form.nome,form.email,form.senha,form.telefone,form.nivel,form.sexo,form.vinculo,form.cidade,form.idade,new Date().toLocaleDateString("pt-BR")]]);																									
onCadastrado({id,nome:form.nome,email:form.email,nivel:form.nivel,vinculo:form.vinculo,isOrganizador:false});																									
}catch(e){setErro("Erro: "+e.message);}																									
setLoading(false);																									
};																									
const iS={width:"100%",background:"#111",border:`1px solid ${BORDA}`,borderRadius:10,padding:"13px 14px",color:BRANCO,fontSize:14,outline:"none",fontFamily:"Inter",marginBottom:14};																									
const lS={fontSize:10,color:CINZA,letterSpacing:2,marginBottom:6,display:"block"};																									
return(																									
<div style={{minHeight:"100vh",background:FUNDO,padding:24,fontFamily:"'Inter',sans-serif"}}>																									
<style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap');*{box-sizing:border-box;margin:0;padding:0;}`}</style>																									
<div style={{display:"flex",alignItems:"center",gap:12,marginBottom:28}}>																									
<button onClick={onVoltar} style={{background:"none",border:"none",color:CINZA,fontSize:24,cursor:"pointer"}}>←</button>																									
<div><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:24,color:BRANCO,letterSpacing:2}}>CRIAR CONTA</div><div style={{fontSize:11,color:CINZA}}>Passo {passo} de 3</div></div>																									
</div>																									
<div style={{display:"flex",gap:6,marginBottom:28}}>{[1,2,3].map(n=><div key={n} style={{flex:1,height:3,borderRadius:2,background:n<=passo?DOURADO:BORDA}}/>)}</div>																									
{passo===1&&<div>																									
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:BRANCO,letterSpacing:1,marginBottom:4}}>QUEM É VOCÊ?</div>																									
<div style={{fontSize:12,color:CINZA,marginBottom:20}}>Dados pessoais</div>																									
<label style={lS}>NOME COMPLETO</label><input value={form.nome} onChange={e=>set("nome",e.target.value)} placeholder="Seu nome" style={iS}/>																									
<label style={lS}>EMAIL</label><input value={form.email} onChange={e=>set("email",e.target.value)} placeholder="seu@email.com" style={iS}/>																									
<label style={lS}>SENHA</label><input type="password" value={form.senha} onChange={e=>set("senha",e.target.value)} placeholder="Crie uma senha" style={iS}/>																									
<label style={lS}>TELEFONE</label><input value={form.telefone} onChange={e=>set("telefone",e.target.value)} placeholder="(xx) 9xxxx-xxxx" style={iS}/>																									
<label style={lS}>SEXO</label>																									
<div style={{display:"flex",gap:10,marginBottom:20}}>{["Masculino","Feminino","Outro"].map(s=><button key={s} onClick={()=>set("sexo",s)} style={{flex:1,padding:"11px 6px",borderRadius:10,border:`1px solid ${form.sexo===s?DOURADO:BORDA}`,background:form.sexo===s?"rgba(201,168,76,0.1)":"transparent",color:form.sexo===s?DOURADO:CINZA,fontSize:12,cursor:"pointer"}}>{s}</button>)}</div>																									
<button onClick={()=>{if(!form.nome||!form.email||!form.senha){setErro("Preencha todos os campos");return;}setErro("");setPasso(2);}} style={{width:"100%",background:DOURADO,color:"#000",border:"none",borderRadius:10,padding:15,fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:2,cursor:"pointer"}}>CONTINUAR →</button>																									
{erro&&<div style={{color:VERMELHO,fontSize:12,marginTop:10,textAlign:"center"}}>{erro}</div>}																									
</div>}																									
{passo===2&&<div>																									
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:BRANCO,letterSpacing:1,marginBottom:4}}>SEU PERFIL</div>																									
<div style={{fontSize:12,color:CINZA,marginBottom:20}}>Perfil de corredor</div>																									
<label style={lS}>CIDADE</label><input value={form.cidade} onChange={e=>set("cidade",e.target.value)} placeholder="Sua cidade" style={iS}/>																									
<label style={lS}>IDADE</label><input type="number" value={form.idade} onChange={e=>set("idade",e.target.value)} placeholder="Sua idade" style={iS}/>																									
<label style={lS}>NÍVEL</label>																									
<div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:20}}>{[["Iniciante","🟢","até 5km"],["Intermediário","🟡","5 a 21km"],["Avançado","🔴","21km+"]].map(([n,e,d])=><button key={n} onClick={()=>set("nivel",n)} style={{padding:"12px 14px",borderRadius:10,border:`1px solid ${form.nivel===n?DOURADO:BORDA}`,background:form.nivel===n?"rgba(201,168,76,0.1)":"transparent",color:BRANCO,fontSize:13,cursor:"pointer",textAlign:"left"}}>{e} <strong>{n}</strong> — {d}</button>)}</div>																									
<label style={lS}>VÍNCULO COM O MANGALÔ</label>																									
<div style={{display:"flex",gap:10,marginBottom:20}}>{["Cliente","Equipe","Externo"].map(v=><button key={v} onClick={()=>set("vinculo",v)} style={{flex:1,padding:"11px 6px",borderRadius:10,border:`1px solid ${form.vinculo===v?DOURADO:BORDA}`,background:form.vinculo===v?"rgba(201,168,76,0.1)":"transparent",color:form.vinculo===v?DOURADO:CINZA,fontSize:12,cursor:"pointer"}}>{v}</button>)}</div>																									
<button onClick={()=>setPasso(3)} style={{width:"100%",background:DOURADO,color:"#000",border:"none",borderRadius:10,padding:15,fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:2,cursor:"pointer"}}>CONTINUAR →</button>																									
</div>}																									
{passo===3&&<div style={{textAlign:"center"}}>																									
<div style={{fontSize:64,marginBottom:16}}>🏃</div>																									
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:28,color:BRANCO,letterSpacing:2,marginBottom:8}}>TUDO CERTO!</div>																									
<div style={{fontSize:13,color:CINZA,marginBottom:32,lineHeight:1.6}}>Pronto para correr, {form.nome.split(" ")[0]}?</div>																									
<div style={{background:CARD,border:`1px solid ${BORDA}`,borderRadius:16,padding:20,marginBottom:24,textAlign:"left"}}>																									
{[["Nome",form.nome],["Email",form.email],["Nível",form.nivel],["Cidade",form.cidade],["Vínculo",form.vinculo]].map(([k,v])=>(																									
<div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${BORDA}`,fontSize:13}}>																									
<span style={{color:CINZA}}>{k}</span><span style={{color:BRANCO}}>{v}</span>																									
</div>																									
))}																									
</div>																									
{erro&&<div style={{color:VERMELHO,fontSize:12,marginBottom:14}}>{erro}</div>}																									
<button onClick={cadastrar} disabled={loading} style={{width:"100%",background:DOURADO,color:"#000",border:"none",borderRadius:10,padding:15,fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:2,cursor:"pointer"}}>{loading?"CADASTRANDO...":"ENTRAR NO GRUPO ⚡"}</button>																									
</div>}																									
</div>																									
);																									
}																									
																									
// ── HOME ─────────────────────────────────────────────────────																									
function TelaHome({usuario,desafios,atividades,onVerDesafio,stravaToken,conectarStrava,onSincronizar,sincMsg,sincronizando}){																									
const ativos=desafios.filter(d=>d.ativo==="true"||d.ativo===true);																									
																									
return(																									
<div style={{padding:"20px 20px 100px",fontFamily:"'Inter',sans-serif"}}>																									
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>																									
<div>																									
<div style={{fontSize:12,color:CINZA}}>Bom dia, corredor 👋</div>																									
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:28,color:BRANCO,letterSpacing:1}}>{usuario.nome.split(" ")[0].toUpperCase()}</div>																									
</div>																									
<div style={{width:42,height:42,background:DOURADO,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:"#000"}}>{usuario.nome[0]}</div>																									
</div>																									
																									
{/* Strava banner */}																									
{!stravaToken?(																									
<div style={{background:"rgba(252,76,2,0.08)",border:"1px solid rgba(252,76,2,0.3)",borderRadius:14,padding:14,marginBottom:16}}>																									
<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>																									
<div style={{width:30,height:30,background:STRAVA,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,color:"#fff",fontSize:13}}>S</div>																									
<div><div style={{fontSize:13,color:BRANCO,fontWeight:600}}>Conecte o Strava</div><div style={{fontSize:10,color:CINZA}}>Atividades entram automaticamente</div></div>																									
</div>																									
<button onClick={conectarStrava} style={{width:"100%",background:STRAVA,color:"#fff",border:"none",borderRadius:10,padding:"11px",fontFamily:"'Bebas Neue',sans-serif",fontSize:15,letterSpacing:2,cursor:"pointer"}}>CONECTAR STRAVA</button>																									
</div>																									
):(																									
<div style={{background:"rgba(252,76,2,0.08)",border:"1px solid rgba(252,76,2,0.4)",borderRadius:12,padding:12,marginBottom:16}}>																									
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>																									
<div style={{display:"flex",alignItems:"center",gap:8}}>																									
<div style={{width:24,height:24,background:STRAVA,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,color:"#fff",fontSize:11}}>✓</div>																									
<div><div style={{fontSize:12,color:BRANCO,fontWeight:600}}>Strava conectado</div><div style={{fontSize:10,color:CINZA}}>{sincMsg||"Toque SYNC para importar"}</div></div>																									
</div>																									
<button onClick={onSincronizar} disabled={sincronizando} style={{background:STRAVA,border:"none",borderRadius:8,padding:"7px 12px",color:"#fff",fontFamily:"'Bebas Neue',sans-serif",fontSize:13,cursor:"pointer",opacity:sincronizando?0.6:1}}>{sincronizando?"...":"SYNC"}</button>																									
</div>																									
</div>																									
)}																									
																									
<div style={{fontSize:10,color:CINZA,letterSpacing:2,marginBottom:10}}>DESAFIOS ATIVOS</div>																									
{ativos.length===0?(																									
<div style={{background:CARD,border:`1px solid ${BORDA}`,borderRadius:16,padding:24,textAlign:"center"}}>																									
<div style={{fontSize:32,marginBottom:8}}>🏃</div>																									
<div style={{color:CINZA,fontSize:13}}>Nenhum desafio ativo no momento</div>																									
</div>																									
):ativos.map((d,i)=>{																									
const minhasAtivs=atividades.filter(a=>a.usuario_id===usuario.id&&a.desafio_id===d.id);																									
const totalFeito=minhasAtivs.reduce((a,r)=>a+(parseFloat(r.km)||0),0);																									
const pct=progressoPct(totalFeito,d.meta);																									
const dias=diasRestantes(d.fim);																									
const rankingDesafio=Object.entries(																									
atividades.filter(a=>a.desafio_id===d.id).reduce((acc,a)=>{acc[a.usuario_id]=(acc[a.usuario_id]||0)+(parseFloat(a.km)||0);return acc;},{})																									
).sort((a,b)=>b[1]-a[1]);																									
const minhaPos=rankingDesafio.findIndex(([id])=>id===usuario.id)+1;																									
																									
return(																									
<div key={i} onClick={()=>onVerDesafio(d)} style={{background:CARD,border:`1px solid ${BORDA}`,borderRadius:16,overflow:"hidden",marginBottom:14,cursor:"pointer"}}>																									
<div style={{background:DOURADO,padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>																									
<span style={{fontSize:10,fontWeight:700,color:"#000",letterSpacing:2}}>⚡ DESAFIO ATIVO</span>																									
<span style={{fontSize:9,color:"#000",background:"rgba(0,0,0,0.15)",borderRadius:20,padding:"2px 8px"}}>{d.tipo==="km"?"📏 km":d.tipo==="cal"?"🔥 cal":d.tipo==="tempo"?"⏱️ tempo":"📅 dias"}</span>																									
</div>																									
<div style={{padding:"14px"}}>																									
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:BRANCO,letterSpacing:1,marginBottom:3}}>{d.nome}</div>																									
<div style={{fontSize:11,color:CINZA,marginBottom:12}}>{d.descricao}</div>																									
{d.meta&&<>																									
<div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>																									
<span style={{fontSize:11,color:BRANCO,fontWeight:600}}>{totalFeito.toFixed(1)} {d.tipo==="cal"?"cal":d.tipo==="tempo"?"min":d.tipo==="dias"?"dias":"km"}</span>																									
<span style={{fontSize:11,color:DOURADO,fontWeight:700}}>{pct}%</span>																									
</div>																									
<div style={{background:BORDA,borderRadius:4,height:6,overflow:"hidden",marginBottom:10}}>																									
<div style={{height:"100%",width:`${pct}%`,background:DOURADO,borderRadius:4}}/>																									
</div>																									
</>}																									
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:10}}>																									
<div style={{background:"#111",borderRadius:8,padding:"8px",textAlign:"center"}}>																									
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:DOURADO}}>{minhaPos>0?`#${minhaPos}`:"—"}</div>																									
<div style={{fontSize:9,color:CINZA,letterSpacing:1}}>POSIÇÃO</div>																									
</div>																									
<div style={{background:"#111",borderRadius:8,padding:"8px",textAlign:"center"}}>																									
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:DOURADO}}>{minhasAtivs.length}</div>																									
<div style={{fontSize:9,color:CINZA,letterSpacing:1}}>ATIVID.</div>																									
</div>																									
<div style={{background:"#111",borderRadius:8,padding:"8px",textAlign:"center"}}>																									
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:DOURADO}}>{dias!==null?`${dias}d`:"—"}</div>																									
<div style={{fontSize:9,color:CINZA,letterSpacing:1}}>RESTA</div>																									
</div>																									
</div>																									
<div style={{textAlign:"center",fontSize:11,color:CINZA}}>Toque para ver detalhes →</div>																									
</div>																									
</div>																									
);																									
})}																									
</div>																									
);																									
}																									
																									
// ── DETALHES DO DESAFIO ───────────────────────────────────────																									
function TelaDesafioDetalhe({desafio,atividades,usuario,onVoltar}){																									
const minhasAtivs=atividades.filter(a=>a.usuario_id===usuario.id&&a.desafio_id===desafio.id);																									
const totalFeito=minhasAtivs.reduce((a,r)=>a+(parseFloat(r.km)||0),0);																									
const pct=progressoPct(totalFeito,desafio.meta);																									
const dias=diasRestantes(desafio.fim);																									
const rankingDesafio=Object.entries(																									
atividades.filter(a=>a.desafio_id===desafio.id).reduce((acc,a)=>{																									
if(!acc[a.usuario_id])acc[a.usuario_id]={nome:a.usuario_nome,total:0};																									
acc[a.usuario_id].total+=(parseFloat(a.km)||0);																									
return acc;																									
},{})																									
).sort((a,b)=>b[1].total-a[1].total);																									
const minhaPos=rankingDesafio.findIndex(([id])=>id===usuario.id)+1;																									
const unidade=desafio.tipo==="cal"?"cal":desafio.tipo==="tempo"?"min":desafio.tipo==="dias"?"dias":"km";																									
const medals=["🥇","🥈","🥉"];																									
																									
return(																									
<div style={{minHeight:"100vh",background:FUNDO,fontFamily:"'Inter',sans-serif"}}>																									
<div style={{padding:"20px 20px 100px"}}>																									
<div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>																									
<button onClick={onVoltar} style={{width:36,height:36,background:CARD,border:`1px solid ${BORDA}`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,cursor:"pointer",color:CINZA,flexShrink:0}}>←</button>																									
<div>																									
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:BRANCO,letterSpacing:2,lineHeight:1}}>{desafio.nome}</div>																									
<div style={{fontSize:10,color:CINZA}}>{desafio.inicio&&desafio.fim?`${desafio.inicio} até ${desafio.fim}`:"Sem período definido"}</div>																									
</div>																									
</div>																									
																									
{/* Hero progresso */}																									
<div style={{background:`linear-gradient(135deg,${DOURADO} 0%,#8a6420 100%)`,borderRadius:16,padding:20,marginBottom:14,position:"relative",overflow:"hidden"}}>																									
<div style={{position:"absolute",right:-10,bottom:-10,fontSize:80,opacity:0.15}}>🏃</div>																									
<div style={{fontSize:9,color:"rgba(0,0,0,0.6)",fontWeight:700,letterSpacing:2,marginBottom:8}}>⚡ MEU PROGRESSO</div>																									
<div style={{display:"flex",alignItems:"flex-end",gap:8,marginBottom:12}}>																									
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:52,color:"#000",lineHeight:1}}>{totalFeito.toFixed(1)}</div>																									
<div style={{fontSize:14,color:"rgba(0,0,0,0.6)",marginBottom:10}}>/ {desafio.meta||"—"} {unidade}</div>																									
</div>																									
<div style={{background:"rgba(0,0,0,0.2)",borderRadius:6,height:10,overflow:"hidden",marginBottom:8}}>																									
<div style={{height:"100%",width:`${pct}%`,background:"#000",borderRadius:6}}/>																									
</div>																									
<div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"rgba(0,0,0,0.6)"}}>																									
<span>{pct}% concluído</span>																									
<span>faltam {desafio.meta?((parseFloat(desafio.meta)-totalFeito).toFixed(1)+` ${unidade}`):"—"}</span>																									
</div>																									
</div>																									
																									
{/* Posição */}																									
{minhaPos>0&&<div style={{background:"rgba(201,168,76,0.08)",border:`1px solid rgba(201,168,76,0.3)`,borderRadius:14,padding:16,marginBottom:14,display:"flex",alignItems:"center",gap:16}}>																									
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:46,color:DOURADO,lineHeight:1}}>#{minhaPos}</div>																									
<div>																									
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,color:BRANCO,letterSpacing:1}}>SUA POSIÇÃO</div>																									
<div style={{fontSize:11,color:CINZA}}>entre {rankingDesafio.length} corredores</div>																									
</div>																									
</div>}																									
																									
{/* Stats */}																									
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14}}>																									
{[[totalFeito.toFixed(1),unidade.toUpperCase()+" FEITOS"],[minhasAtivs.length,"ATIVIDADES"],[dias!==null?`${dias}d`:"—","DIAS REST."]].map(([v,l],i)=>(																									
<div key={i} style={{background:CARD,border:`1px solid ${BORDA}`,borderRadius:12,padding:12,textAlign:"center"}}>																									
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:DOURADO}}>{v}</div>																									
<div style={{fontSize:9,color:CINZA,letterSpacing:1,marginTop:3}}>{l}</div>																									
</div>																									
))}																									
</div>																									
																									
{/* Minhas atividades */}																									
<div style={{fontSize:10,color:CINZA,letterSpacing:2,marginBottom:10}}>MINHAS ATIVIDADES</div>																									
{minhasAtivs.length===0?(																									
<div style={{background:CARD,border:`1px solid ${BORDA}`,borderRadius:12,padding:20,textAlign:"center",marginBottom:14,color:CINZA,fontSize:13}}>Nenhuma atividade ainda</div>																									
):(																									
<div style={{background:CARD,border:`1px solid ${BORDA}`,borderRadius:14,padding:"4px 14px",marginBottom:14}}>																									
{minhasAtivs.slice().reverse().slice(0,5).map((a,i)=>(																									
<div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"11px 0",borderBottom:i<minhasAtivs.length-1?`1px solid ${BORDA}`:"none"}}>																									
<div style={{width:34,height:34,background:"#2a2a2a",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,flexShrink:0}}>🏃</div>																									
<div style={{flex:1}}>																									
<div style={{fontSize:12,color:BRANCO,fontWeight:500}}>Atividade{a.fonte==="strava"&&<span style={{color:STRAVA,fontSize:10}}> · Strava</span>}</div>																									
<div style={{fontSize:10,color:CINZA}}>{a.data}</div>																									
</div>																									
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:DOURADO}}>{a.km} {unidade}</div>																									
</div>																									
))}																									
</div>																									
)}																									
</div>																									
</div>																									
);																									
}																									
																									
// ── RANKING ───────────────────────────────────────────────────																									
function TelaRanking({desafios,atividades,usuario}){																									
const [desafioSel,setDesafioSel]=useState(null);																									
																									
useEffect(()=>{																									
if(desafios.length>0&&!desafioSel){																									
const ativo=desafios.find(d=>d.ativo==="true");																									
setDesafioSel(ativo||desafios[0]);																									
}																									
},[desafios]);																									
																									
const rankingAtual=useMemo(()=>{																									
if(!desafioSel)return[];																									
const map={};																									
atividades.filter(a=>a.desafio_id===desafioSel.id).forEach(a=>{																									
if(!map[a.usuario_id])map[a.usuario_id]={nome:a.usuario_nome,id:a.usuario_id,total:0};																									
map[a.usuario_id].total+=(parseFloat(a.km)||0);																									
});																									
return Object.values(map).sort((a,b)=>b.total-a.total);																									
},[desafioSel,atividades]);																									
																									
const minhaPos=rankingAtual.findIndex(r=>r.id===usuario.id)+1;																									
const meuTotal=rankingAtual.find(r=>r.id===usuario.id)?.total||0;																									
const medals=["🥇","🥈","🥉"];																									
const unidade=desafioSel?.tipo==="cal"?"cal":desafioSel?.tipo==="tempo"?"min":desafioSel?.tipo==="dias"?"dias":"km";																									
																									
return(																									
<div style={{padding:"20px 20px 100px",fontFamily:"'Inter',sans-serif"}}>																									
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:28,color:BRANCO,letterSpacing:2,marginBottom:16}}>RANKING</div>																									
																									
{/* Seletor de desafio */}																									
<div style={{display:"flex",gap:8,marginBottom:16,overflowX:"auto",paddingBottom:4}}>																									
{desafios.map((d,i)=>(																									
<button key={i} onClick={()=>setDesafioSel(d)}																									
style={{padding:"7px 14px",borderRadius:20,fontSize:11,fontWeight:600,whiteSpace:"nowrap",cursor:"pointer",flexShrink:0,																									
background:desafioSel?.id===d.id?(d.ativo==="true"?"rgba(201,168,76,0.15)":"rgba(74,122,26,0.1)"):"#1a1a1a",																									
color:desafioSel?.id===d.id?(d.ativo==="true"?DOURADO:VERDE):CINZA,																									
border:`1px solid ${desafioSel?.id===d.id?(d.ativo==="true"?DOURADO:VERDE):BORDA}`}}>																									
{d.ativo==="true"?"⚡ ":""}{d.nome}																									
</button>																									
))}																									
</div>																									
																									
{!desafioSel?(																									
<div style={{textAlign:"center",padding:40,color:CINZA}}>Nenhum desafio disponível</div>																									
):(																									
<>																									
{/* Info desafio */}																									
<div style={{background:CARD,border:`1px solid ${BORDA}`,borderRadius:12,padding:14,marginBottom:14}}>																									
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>																									
<div>																									
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,color:desafioSel.ativo==="true"?DOURADO:CINZA,letterSpacing:1}}>{desafioSel.nome}</div>																									
<div style={{fontSize:10,color:CINZA,marginTop:2}}>{desafioSel.ativo==="true"?"Em andamento":"Encerrado"} · {rankingAtual.length} corredores</div>																									
</div>																									
<div style={{background:desafioSel.ativo==="true"?"rgba(201,168,76,0.15)":"rgba(74,122,26,0.1)",border:`1px solid ${desafioSel.ativo==="true"?DOURADO:VERDE}`,borderRadius:20,padding:"4px 10px",fontSize:10,color:desafioSel.ativo==="true"?DOURADO:VERDE,fontWeight:700}}>																									
{desafioSel.ativo==="true"?"⚡ ATIVO":"✓ ENCERRADO"}																									
</div>																									
</div>																									
</div>																									
																									
{/* Minha posição */}																									
{minhaPos>0&&<div style={{background:"rgba(201,168,76,0.08)",border:`1px solid rgba(201,168,76,0.3)`,borderRadius:12,padding:"12px 14px",marginBottom:14,display:"flex",alignItems:"center",gap:14}}>																									
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:40,color:DOURADO,lineHeight:1}}>																									
{minhaPos<=3?medals[minhaPos-1]:`#${minhaPos}`}																									
</div>																									
<div>																									
<div style={{fontSize:12,color:CINZA}}>Sua posição</div>																									
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:BRANCO,letterSpacing:1}}>{meuTotal.toFixed(1)} {unidade}</div>																									
</div>																									
</div>}																									
																									
{/* Ranking */}																									
<div style={{fontSize:10,color:CINZA,letterSpacing:2,marginBottom:10}}>CLASSIFICAÇÃO</div>																									
{rankingAtual.length===0?(																									
<div style={{textAlign:"center",padding:32,color:CINZA,fontSize:13,background:CARD,border:`1px solid ${BORDA}`,borderRadius:14}}>Nenhuma atividade registrada</div>																									
):(																									
<div style={{background:CARD,border:`1px solid ${BORDA}`,borderRadius:14,padding:"4px 14px"}}>																									
{rankingAtual.map((r,i)=>{																									
const isEu=r.id===usuario.id;																									
return(																									
<div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"12px",margin:"2px -14px",borderRadius:8,background:isEu?"rgba(201,168,76,0.06)":"transparent",borderBottom:i<rankingAtual.length-1&&!isEu?`1px solid ${BORDA}`:"none"}}>																									
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,width:26,textAlign:"center",color:i<3?DOURADO:CINZA}}>{medals[i]||`#${i+1}`}</div>																									
<div style={{width:30,height:30,borderRadius:"50%",background:isEu?DOURADO:"#2a2a2a",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:isEu?"#000":CINZA,flexShrink:0}}>{r.nome[0]}</div>																									
<div style={{flex:1,fontSize:12,color:isEu?DOURADO:BRANCO,fontWeight:isEu?700:500}}>{isEu?"Você":r.nome}</div>																									
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:17,color:isEu?DOURADO:CINZA}}>{r.total.toFixed(1)}</div>																									
</div>																									
);																									
})}																									
</div>																									
)}																									
</>																									
)}																									
</div>																									
);																									
}																									
																									
// ── MEUS DESAFIOS (histórico) ─────────────────────────────────																									
function TelaMeusDesafios({desafios,atividades,usuario,onVerDesafio}){																									
const ativos=desafios.filter(d=>d.ativo==="true"||d.ativo===true);																									
const inativos=desafios.filter(d=>d.ativo!=="true"&&d.ativo!==true);																									
																									
const getStats=(d)=>{																									
const minhasAtivs=atividades.filter(a=>a.usuario_id===usuario.id&&a.desafio_id===d.id);																									
const total=minhasAtivs.reduce((a,r)=>a+(parseFloat(r.km)||0),0);																									
const pct=progressoPct(total,d.meta);																									
const rankingDesafio=Object.entries(																									
atividades.filter(a=>a.desafio_id===d.id).reduce((acc,a)=>{acc[a.usuario_id]=(acc[a.usuario_id]||0)+(parseFloat(a.km)||0);return acc;},{})																									
).sort((a,b)=>b[1]-a[1]);																									
const pos=rankingDesafio.findIndex(([id])=>id===usuario.id)+1;																									
return{total,pct,pos,qtd:minhasAtivs.length};																									
};																									
																									
const medals=["🥇","🥈","🥉"];																									
const unidade=(d)=>d.tipo==="cal"?"cal":d.tipo==="tempo"?"min":d.tipo==="dias"?"dias":"km";																									
																									
return(																									
<div style={{padding:"20px 20px 100px",fontFamily:"'Inter',sans-serif"}}>																									
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:26,color:BRANCO,letterSpacing:2,marginBottom:4}}>MEUS DESAFIOS</div>																									
<div style={{fontSize:10,color:CINZA,letterSpacing:2,marginBottom:18}}>SEU HISTÓRICO</div>																									
																									
{/* ATIVOS */}																									
{ativos.length>0&&<>																									
<div style={{fontSize:10,color:DOURADO,letterSpacing:2,marginBottom:8}}>⚡ PARTICIPANDO AGORA</div>																									
{ativos.map((d,i)=>{																									
const s=getStats(d);																									
return(																									
<div key={i} onClick={()=>onVerDesafio(d)} style={{background:CARD,border:`1px solid ${BORDA}`,borderRadius:14,overflow:"hidden",marginBottom:12,cursor:"pointer"}}>																									
<div style={{background:DOURADO,padding:"10px 14px",display:"flex",justifyContent:"space-between"}}>																									
<span style={{fontSize:9,fontWeight:700,color:"#000",letterSpacing:2}}>⚡ ATIVO · {d.tipo==="km"?"📏 KM":d.tipo==="cal"?"🔥 CAL":d.tipo==="tempo"?"⏱️ TEMPO":"📅 DIAS"}</span>																									
</div>																									
<div style={{padding:14}}>																									
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:BRANCO,letterSpacing:1,marginBottom:3}}>{d.nome}</div>																									
<div style={{fontSize:10,color:CINZA,marginBottom:12}}>{d.inicio&&d.fim?`${d.inicio} até ${d.fim}`:d.descricao}</div>																									
{d.meta&&<>																									
<div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>																									
<span style={{fontSize:11,color:BRANCO,fontWeight:600}}>{s.total.toFixed(1)} {unidade(d)}</span>																									
<span style={{fontSize:11,color:DOURADO,fontWeight:700}}>{s.pct}%</span>																									
</div>																									
<div style={{background:BORDA,borderRadius:4,height:6,overflow:"hidden",marginBottom:10}}>																									
<div style={{height:"100%",width:`${s.pct}%`,background:DOURADO,borderRadius:4}}/>																									
</div>																									
</>}																									
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>																									
{[[s.pos>0?`#${s.pos}`:"—","POSIÇÃO"],[s.qtd,"ATIVID."],[diasRestantes(d.fim)!==null?`${diasRestantes(d.fim)}d`:"—","RESTA"]].map(([v,l],j)=>(																									
<div key={j} style={{background:"#111",borderRadius:8,padding:"8px",textAlign:"center"}}>																									
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:DOURADO}}>{v}</div>																									
<div style={{fontSize:9,color:CINZA,letterSpacing:1}}>{l}</div>																									
</div>																									
))}																									
</div>																									
</div>																									
</div>																									
);																									
})}																									
</>}																									
																									
{/* HISTÓRICO */}																									
{inativos.length>0&&<>																									
<div style={{fontSize:10,color:CINZA,letterSpacing:2,marginBottom:8,marginTop:ativos.length>0?8:0}}>📁 HISTÓRICO</div>																									
{inativos.map((d,i)=>{																									
const s=getStats(d);																									
const metaBatida=d.meta&&s.total>=parseFloat(d.meta);																									
return(																									
<div key={i} style={{background:CARD,border:`1px solid ${BORDA}`,borderRadius:14,overflow:"hidden",marginBottom:12}}>																									
<div style={{background:"#1e1e1e",borderBottom:`1px solid ${BORDA}`,padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>																									
<span style={{fontSize:9,fontWeight:700,color:VERDE,letterSpacing:2}}>✓ ENCERRADO</span>																									
{s.pos>0&&s.pos<=3&&<span style={{fontSize:14}}>{medals[s.pos-1]}</span>}																									
</div>																									
<div style={{padding:14}}>																									
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:CINZA,letterSpacing:1,marginBottom:3}}>{d.nome}</div>																									
<div style={{fontSize:10,color:"#555",marginBottom:10}}>{d.inicio&&d.fim?`${d.inicio} até ${d.fim}`:d.descricao}</div>																									
{s.pos>0&&<div style={{display:"inline-flex",alignItems:"center",gap:4,padding:"4px 10px",borderRadius:20,fontSize:10,fontWeight:700,marginBottom:10,background:s.pos===1?"rgba(201,168,76,0.15)":s.pos===2?"rgba(160,160,160,0.1)":"rgba(180,100,60,0.1)",color:s.pos===1?DOURADO:s.pos===2?CINZA:"#b4643c",border:`1px solid ${s.pos===1?DOURADO:s.pos===2?CINZA:"#b4643c"}`}}>																									
{medals[s.pos-1]||`#${s.pos}`} {s.pos}º LUGAR																									
</div>}																									
{d.meta&&<>																									
<div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>																									
<span style={{fontSize:11,color:"#555",fontWeight:600}}>{s.total.toFixed(1)} {unidade(d)}</span>																									
<span style={{fontSize:11,color:metaBatida?VERDE:"#555",fontWeight:700}}>{metaBatida?"✓ META BATIDA":`${s.pct}%`}</span>																									
</div>																									
<div style={{background:BORDA,borderRadius:4,height:6,overflow:"hidden",marginBottom:10}}>																									
<div style={{height:"100%",width:`${Math.min(100,s.pct)}%`,background:metaBatida?VERDE:"#444",borderRadius:4}}/>																									
</div>																									
</>}																									
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>																									
{[[s.total.toFixed(1),unidade(d).toUpperCase()],[s.qtd,"ATIVID."],[s.pos>0?`#${s.pos}`:"—","POSIÇÃO"]].map(([v,l],j)=>(																									
<div key={j} style={{background:"#111",borderRadius:8,padding:"8px",textAlign:"center"}}>																									
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:metaBatida?VERDE:"#555"}}>{v}</div>																									
<div style={{fontSize:9,color:CINZA,letterSpacing:1}}>{l}</div>																									
</div>																									
))}																									
</div>																									
</div>																									
</div>																									
);																									
})}																									
</>}																									
																									
{desafios.length===0&&<div style={{textAlign:"center",padding:40,color:CINZA,fontSize:13}}>Nenhum desafio ainda</div>}																									
</div>																									
);																									
}																									
																									
// ── PERFIL ────────────────────────────────────────────────────																									
function TelaPerfil({usuario,atividades,onSair,stravaToken,conectarStrava,desconectarStrava}){																									
const totalKm=atividades.filter(a=>a.usuario_id===usuario.id).reduce((a,r)=>a+(parseFloat(r.km)||0),0);																									
const qtdAtivs=atividades.filter(a=>a.usuario_id===usuario.id).length;																									
return(																									
<div style={{padding:"20px 20px 100px",fontFamily:"'Inter',sans-serif"}}>																									
<div style={{textAlign:"center",marginBottom:24}}>																									
<div style={{width:64,height:64,background:DOURADO,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Bebas Neue',sans-serif",fontSize:28,color:"#000",margin:"0 auto 12px"}}>{usuario.nome[0]}</div>																									
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:24,color:BRANCO,letterSpacing:2}}>{usuario.nome.toUpperCase()}</div>																									
<div style={{fontSize:12,color:CINZA,marginTop:4}}>{usuario.nivel} · {usuario.vinculo}</div>																									
{usuario.isOrganizador&&<div style={{marginTop:6,display:"inline-block",padding:"3px 12px",background:"rgba(201,168,76,0.15)",border:`1px solid ${DOURADO}`,borderRadius:20,fontSize:10,color:DOURADO,letterSpacing:1}}>⚡ ORGANIZADOR</div>}																									
</div>																									
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>																									
<div style={{background:CARD,border:`1px solid ${BORDA}`,borderRadius:12,padding:16,textAlign:"center"}}>																									
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:32,color:DOURADO}}>{totalKm.toFixed(1)}</div>																									
<div style={{fontSize:11,color:CINZA,letterSpacing:1}}>KM TOTAL</div>																									
</div>																									
<div style={{background:CARD,border:`1px solid ${BORDA}`,borderRadius:12,padding:16,textAlign:"center"}}>																									
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:32,color:DOURADO}}>{qtdAtivs}</div>																									
<div style={{fontSize:11,color:CINZA,letterSpacing:1}}>ATIVIDADES</div>																									
</div>																									
</div>																									
<div style={{background:CARD,border:`1px solid ${BORDA}`,borderRadius:14,padding:16,marginBottom:16}}>																									
<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>																									
<div style={{width:32,height:32,background:STRAVA,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,color:"#fff",fontSize:14}}>S</div>																									
<div><div style={{fontSize:13,color:BRANCO,fontWeight:600}}>Strava</div><div style={{fontSize:10,color:stravaToken?STRAVA:CINZA}}>{stravaToken?"Conectado ✓":"Não conectado"}</div></div>																									
</div>																									
{!stravaToken?<button onClick={conectarStrava} style={{width:"100%",background:STRAVA,color:"#fff",border:"none",borderRadius:10,padding:"11px",fontFamily:"'Bebas Neue',sans-serif",fontSize:15,letterSpacing:2,cursor:"pointer"}}>CONECTAR STRAVA</button>																									
:<button onClick={desconectarStrava} style={{width:"100%",background:"transparent",color:CINZA,border:`1px solid ${BORDA}`,borderRadius:10,padding:"11px",fontSize:12,cursor:"pointer"}}>Desconectar Strava</button>}																									
</div>																									
<button onClick={onSair} style={{width:"100%",padding:14,background:"transparent",border:`1px solid ${BORDA}`,borderRadius:10,color:CINZA,fontSize:13,cursor:"pointer"}}>Sair da conta</button>																									
</div>																									
);																									
}																									
																									
// ── MODAL REGISTRAR ───────────────────────────────────────────																									
function ModalRegistrar({desafio,usuario,onSalvar,onFechar}){																									
const [val,setVal]=useState("");																									
const [loading,setLoading]=useState(false);																									
const [erro,setErro]=useState("");																									
const salvar=async()=>{																									
if(!val)return;																									
setLoading(true);setErro("");																									
try{																									
const token=await getAccessToken();																									
await escreverAba(token,"atividades",[[Date.now().toString(),usuario.id,usuario.nome,desafio.id||desafio.nome,desafio.nome,val,new Date().toLocaleDateString("pt-BR"),"manual"]]);																									
onSalvar();																									
}catch(e){setErro("Erro: "+e.message);}																									
setLoading(false);																									
};																									
const unidade=desafio.tipo==="cal"?"CALORIAS":desafio.tipo==="tempo"?"MINUTOS":desafio.tipo==="dias"?"DIAS":"KM";																									
return(																									
<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"flex-end",zIndex:999}}>																									
<div style={{background:CARD,borderRadius:"20px 20px 0 0",padding:28,width:"100%",border:`1px solid ${BORDA}`}}>																									
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:BRANCO,letterSpacing:2,marginBottom:4}}>REGISTRAR</div>																									
<div style={{fontSize:13,color:CINZA,marginBottom:24}}>{desafio.nome}</div>																									
<div style={{fontSize:10,color:CINZA,letterSpacing:2,marginBottom:8}}>{unidade}</div>																									
<input type="number" value={val} onChange={e=>setVal(e.target.value)} placeholder="0" style={{width:"100%",background:"#111",border:`1px solid ${BORDA}`,borderRadius:10,padding:"16px",color:BRANCO,fontSize:24,textAlign:"center",outline:"none",fontFamily:"'Bebas Neue',sans-serif",letterSpacing:2,marginBottom:12}}/>																									
{erro&&<div style={{color:VERMELHO,fontSize:12,marginBottom:12,textAlign:"center"}}>{erro}</div>}																									
<div style={{display:"flex",gap:10}}>																									
<button onClick={onFechar} style={{flex:1,padding:14,background:"transparent",border:`1px solid ${BORDA}`,borderRadius:10,color:CINZA,fontSize:13,cursor:"pointer"}}>Cancelar</button>																									
<button onClick={salvar} disabled={!val||loading} style={{flex:2,padding:14,background:DOURADO,color:"#000",border:"none",borderRadius:10,fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:2,cursor:"pointer",opacity:val?1:0.5}}>{loading?"SALVANDO...":"SALVAR ✓"}</button>																									
</div>																									
</div>																									
</div>																									
);																									
}																									
																									
// ── PAINEL ORGANIZADOR ────────────────────────────────────────																									
function PainelOrganizador({usuario,desafios,atividades,usuarios,onCriarDesafio,onEditarDesafio}){																									
const [abaP,setAbaP]=useState("desafios");																									
const totalKm=atividades.reduce((a,r)=>a+(parseFloat(r.km)||0),0);																									
const usuariosComKm=useMemo(()=>usuarios.map(u=>({...u,totalKm:atividades.filter(a=>a.usuario_id===u.id).reduce((a,r)=>a+(parseFloat(r.km)||0),0)})),[usuarios,atividades]);																									
const porSexo=useMemo(()=>{const m={Masculino:0,Feminino:0,Outro:0};for(const u of usuarios){if(u.sexo)m[u.sexo]=(m[u.sexo]||0)+1;}return m;},[usuarios]);																									
const porNivel=useMemo(()=>{const m={Iniciante:0,"Intermediário":0,"Avançado":0};for(const u of usuarios){if(u.nivel)m[u.nivel]=(m[u.nivel]||0)+1;}return m;},[usuarios]);																									
const porVinculo=useMemo(()=>{const m={Cliente:0,Equipe:0,Externo:0};for(const u of usuarios){if(u.vinculo)m[u.vinculo]=(m[u.vinculo]||0)+1;}return m;},[usuarios]);																									
const total=usuarios.length||1;																									
return(																									
<div style={{padding:"20px 20px 100px",fontFamily:"'Inter',sans-serif"}}>																									
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>																									
<div><div style={{fontSize:11,color:CINZA}}>Painel · Organizador</div><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:26,color:BRANCO,letterSpacing:2}}>{usuario.nome.split(" ")[0].toUpperCase()}</div></div>																									
<div style={{width:40,height:40,background:DOURADO,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Bebas Neue',sans-serif",fontSize:16,color:"#000"}}>{usuario.nome[0]}</div>																									
</div>																									
<div style={{display:"flex",gap:6,marginBottom:20,background:"#111",borderRadius:12,padding:4}}>																									
{[["desafios","🎯 DESAFIOS"],["dados","📊 DADOS"]].map(([id,label])=>(																									
<button key={id} onClick={()=>setAbaP(id)} style={{flex:1,padding:"10px",borderRadius:10,border:"none",cursor:"pointer",background:abaP===id?DOURADO:"transparent",color:abaP===id?"#000":CINZA,fontFamily:"'Bebas Neue',sans-serif",fontSize:14,letterSpacing:2}}>{label}</button>																									
))}																									
</div>																									
{abaP==="desafios"&&<div>																									
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>																									
<div style={{background:CARD,border:`1px solid ${BORDA}`,borderRadius:12,padding:14}}><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:32,color:DOURADO}}>{usuarios.length}</div><div style={{fontSize:10,color:CINZA,letterSpacing:1}}>PARTICIPANTES</div></div>																									
<div style={{background:CARD,border:`1px solid ${BORDA}`,borderRadius:12,padding:14}}><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:32,color:DOURADO}}>{desafios.filter(d=>d.ativo==="true").length}</div><div style={{fontSize:10,color:CINZA,letterSpacing:1}}>ATIVOS</div></div>																									
</div>																									
<div style={{fontSize:10,color:CINZA,letterSpacing:2,marginBottom:12}}>DESAFIOS</div>																									
{desafios.length===0&&<div style={{textAlign:"center",padding:32,color:CINZA,background:CARD,border:`1px solid ${BORDA}`,borderRadius:14,marginBottom:16,fontSize:13}}>Nenhum desafio ainda</div>}																									
{desafios.map((d,i)=>(																									
<div key={i} style={{background:CARD,border:`1px solid ${BORDA}`,borderRadius:14,overflow:"hidden",marginBottom:12}}>																									
<div style={{background:d.ativo==="true"?DOURADO:"#2a2a2a",padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>																									
<span style={{fontSize:9,fontWeight:700,color:d.ativo==="true"?"#000":CINZA,letterSpacing:2}}>{d.ativo==="true"?"⚡ ATIVO":"⏸ PAUSADO"}</span>																									
<button onClick={()=>onEditarDesafio(d)} style={{background:"rgba(0,0,0,0.2)",border:"none",borderRadius:20,padding:"3px 10px",fontSize:10,color:d.ativo==="true"?"#000":CINZA,cursor:"pointer"}}>Editar</button>																									
</div>																									
<div style={{padding:"12px 14px"}}>																									
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:BRANCO,letterSpacing:1,marginBottom:3}}>{d.nome}</div>																									
<div style={{fontSize:11,color:CINZA,marginBottom:8}}>{d.descricao}</div>																									
<span style={{padding:"3px 8px",borderRadius:20,fontSize:10,background:"rgba(201,168,76,0.15)",color:DOURADO}}>{d.tipo==="km"?"📏 Distância":d.tipo==="cal"?"🔥 Calorias":d.tipo==="tempo"?"⏱️ Tempo":"📅 Frequência"}</span>																									
</div>																									
</div>																									
))}																									
<button onClick={onCriarDesafio} style={{width:"100%",background:DOURADO,color:"#000",border:"none",borderRadius:10,padding:14,fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:2,cursor:"pointer"}}>+ CRIAR DESAFIO</button>																									
</div>}																									
{abaP==="dados"&&<div>																									
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:16}}>																									
{[["👥",usuarios.length,"MEMBROS"],["🏃",totalKm.toFixed(0),"KM TOTAL"],["⌀",usuarios.length>0?(totalKm/usuarios.length).toFixed(1):"0","KM MÉDIO"]].map(([icon,val,label],i)=>(																									
<div key={i} style={{background:CARD,border:`1px solid ${BORDA}`,borderRadius:12,padding:12,textAlign:"center"}}>																									
<div style={{fontSize:16,marginBottom:2}}>{icon}</div>																									
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:DOURADO}}>{val}</div>																									
<div style={{fontSize:9,color:CINZA,letterSpacing:1}}>{label}</div>																									
</div>																									
))}																									
</div>																									
<div style={{background:CARD,border:`1px solid ${BORDA}`,borderRadius:14,padding:16,marginBottom:12}}>																									
<div style={{fontSize:10,color:CINZA,letterSpacing:2,marginBottom:12}}>SEXO</div>																									
{[["👨 Masculino",porSexo.Masculino,"#60a5fa"],["👩 Feminino",porSexo.Feminino,"#f472b6"],["Outro",porSexo.Outro,CINZA]].map(([nome,qtd,cor])=>(																									
<div key={nome} style={{marginBottom:10}}>																									
<div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:12,color:BRANCO}}>{nome}</span><span style={{fontSize:12,color:cor,fontWeight:600}}>{qtd} ({Math.round((qtd||0)/total*100)}%)</span></div>																									
<div style={{background:BORDA,borderRadius:4,height:8,overflow:"hidden"}}><div style={{height:"100%",width:`${(qtd||0)/total*100}%`,background:cor,borderRadius:4}}/></div>																									
</div>																									
))}																									
</div>																									
<div style={{background:CARD,border:`1px solid ${BORDA}`,borderRadius:14,padding:16,marginBottom:12}}>																									
<div style={{fontSize:10,color:CINZA,letterSpacing:2,marginBottom:12}}>NÍVEL</div>																									
{[["🟢 Iniciante",porNivel.Iniciante,VERDE],["🟡 Intermediário",porNivel["Intermediário"],"#b8860b"],["🔴 Avançado",porNivel["Avançado"],VERMELHO]].map(([nome,qtd,cor])=>(																									
<div key={nome} style={{marginBottom:10}}>																									
<div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:12,color:BRANCO}}>{nome}</span><span style={{fontSize:12,color:cor,fontWeight:600}}>{qtd||0}</span></div>																									
<div style={{background:BORDA,borderRadius:4,height:8,overflow:"hidden"}}><div style={{height:"100%",width:`${(qtd||0)/total*100}%`,background:cor,borderRadius:4}}/></div>																									
</div>																									
))}																									
</div>																									
<div style={{background:CARD,border:`1px solid ${BORDA}`,borderRadius:14,padding:16,marginBottom:12}}>																									
<div style={{fontSize:10,color:CINZA,letterSpacing:2,marginBottom:12}}>VÍNCULO</div>																									
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>																									
{[["Clientes",porVinculo.Cliente],["Equipe",porVinculo.Equipe],["Externos",porVinculo.Externo]].map(([nome,qtd])=>(																									
<div key={nome} style={{textAlign:"center",background:"#111",borderRadius:10,padding:12}}>																									
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:24,color:DOURADO}}>{qtd||0}</div>																									
<div style={{fontSize:9,color:CINZA,letterSpacing:1}}>{nome.toUpperCase()}</div>																									
</div>																									
))}																									
</div>																									
</div>																									
<div style={{background:CARD,border:`1px solid ${BORDA}`,borderRadius:14,padding:16}}>																									
<div style={{fontSize:10,color:CINZA,letterSpacing:2,marginBottom:12}}>TOP CORREDORES</div>																									
{usuariosComKm.sort((a,b)=>b.totalKm-a.totalKm).slice(0,5).map((u,i)=>(																									
<div key={u.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:`1px solid ${BORDA}`}}>																									
<div style={{display:"flex",alignItems:"center",gap:10}}>																									
<span style={{fontSize:16}}>{"🥇🥈🥉"[i]||`#${i+1}`}</span>																									
<div><div style={{fontSize:13,color:BRANCO,fontWeight:500}}>{u.nome}</div><div style={{fontSize:10,color:CINZA}}>{u.nivel} · {u.vinculo}</div></div>																									
</div>																									
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:DOURADO}}>{u.totalKm.toFixed(1)} km</div>																									
</div>																									
))}																									
</div>																									
</div>}																									
</div>																									
);																									
}																									
																									
// ── CRIAR/EDITAR DESAFIO ──────────────────────────────────────																									
function TelaDesafioForm({desafioEditando,onSalvar,onVoltar}){																									
const [form,setForm]=useState(desafioEditando||{nome:"",descricao:"",tipo:"km",meta:"",inicio:"",fim:"",ativo:"true"});																									
const [loading,setLoading]=useState(false);																									
const [erro,setErro]=useState("");																									
const set=(k,v)=>setForm(p=>({...p,[k]:v}));																									
const salvar=async()=>{																									
if(!form.nome)return;																									
setLoading(true);setErro("");																									
try{																									
const token=await getAccessToken();																									
const id=desafioEditando?desafioEditando.id:Date.now().toString();																									
await escreverAba(token,"desafios",[[id,form.nome,form.descricao||"",form.tipo||"km",form.meta||"",form.ativo||"true",form.inicio||"",form.fim||""]]);																									
onSalvar();																									
}catch(e){setErro("Erro: "+e.message);setLoading(false);}																									
setLoading(false);																									
};																									
const iS={width:"100%",background:"#111",border:`1px solid ${BORDA}`,borderRadius:10,padding:"13px 14px",color:BRANCO,fontSize:14,outline:"none",fontFamily:"Inter",marginBottom:14};																									
const lS={fontSize:10,color:CINZA,letterSpacing:2,marginBottom:6,display:"block"};																									
return(																									
<div style={{minHeight:"100vh",background:FUNDO,padding:24,fontFamily:"'Inter',sans-serif",paddingBottom:80}}>																									
<style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap');*{box-sizing:border-box;margin:0;padding:0;}`}</style>																									
<div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>																									
<button onClick={onVoltar} style={{background:"none",border:"none",color:CINZA,fontSize:24,cursor:"pointer"}}>←</button>																									
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:24,color:BRANCO,letterSpacing:2}}>{desafioEditando?"EDITAR DESAFIO":"NOVO DESAFIO"}</div>																									
</div>																									
<label style={lS}>NOME</label><input value={form.nome} onChange={e=>set("nome",e.target.value)} placeholder="Ex: 100km Julho 🏃" style={iS}/>																									
<label style={lS}>DESCRIÇÃO</label><input value={form.descricao} onChange={e=>set("descricao",e.target.value)} placeholder="Descreva o desafio" style={iS}/>																									
<label style={lS}>TIPO</label>																									
<div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>																									
{[["km","📏 Distância (km)","Quem correr mais km"],["cal","🔥 Calorias","Quem queimar mais cal"],["tempo","⏱️ Tempo","Quem correr por mais tempo"],["dias","📅 Frequência","Quem correr mais dias"]].map(([val,nome,desc])=>(																									
<button key={val} onClick={()=>set("tipo",val)} style={{padding:"12px 14px",borderRadius:10,border:`1px solid ${form.tipo===val?DOURADO:BORDA}`,background:form.tipo===val?"rgba(201,168,76,0.1)":"transparent",color:BRANCO,fontSize:13,cursor:"pointer",textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center"}}>																									
<div><div style={{fontWeight:500}}>{nome}</div><div style={{fontSize:10,color:CINZA,marginTop:2}}>{desc}</div></div>																									
{form.tipo===val&&<span style={{color:DOURADO}}>✓</span>}																									
</button>																									
))}																									
</div>																									
<label style={lS}>META</label>																									
<input value={form.meta} onChange={e=>set("meta",e.target.value)} placeholder={form.tipo==="km"?"Ex: 100":form.tipo==="cal"?"Ex: 10000":form.tipo==="tempo"?"Ex: 600":"Ex: 20"} style={iS}/>																									
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>																									
<div><label style={lS}>INÍCIO</label><input type="date" value={form.inicio} onChange={e=>set("inicio",e.target.value)} style={{...iS,marginBottom:0,colorScheme:"dark"}}/></div>																									
<div><label style={lS}>FIM</label><input type="date" value={form.fim} onChange={e=>set("fim",e.target.value)} style={{...iS,marginBottom:0,colorScheme:"dark"}}/></div>																									
</div>																									
<label style={lS}>STATUS</label>																									
<div style={{display:"flex",gap:10,marginBottom:24}}>																									
{[["true","⚡ Ativo"],["false","⏸ Pausado"]].map(([val,nome])=>(																									
<button key={val} onClick={()=>set("ativo",val)} style={{flex:1,padding:"12px",borderRadius:10,border:`1px solid ${form.ativo===val?DOURADO:BORDA}`,background:form.ativo===val?"rgba(201,168,76,0.1)":"transparent",color:form.ativo===val?DOURADO:CINZA,fontSize:13,cursor:"pointer",fontWeight:500}}>{nome}</button>																									
))}																									
</div>																									
{erro&&<div style={{color:VERMELHO,fontSize:12,marginBottom:14,textAlign:"center",background:"rgba(192,96,64,0.1)",padding:"10px",borderRadius:8}}>{erro}</div>}																									
<button onClick={salvar} disabled={!form.nome||loading} style={{width:"100%",background:DOURADO,color:"#000",border:"none",borderRadius:10,padding:15,fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:2,cursor:"pointer",opacity:form.nome?1:0.5}}>{loading?"SALVANDO...":"SALVAR DESAFIO ✓"}</button>																									
</div>																									
);																									
}																									
																									
// ── NAV ───────────────────────────────────────────────────────																									
function NavInferior({aba,setAba,isOrganizador}){																									
const itens=[																									
{id:"home",icon:"🏠",label:"Home"},																									
{id:"desafios",icon:"🎯",label:"Desafios"},																									
{id:"ranking",icon:"🏆",label:"Ranking"},																									
...(isOrganizador?[{id:"painel",icon:"📊",label:"Painel"}]:[]),																									
{id:"perfil",icon:"👤",label:"Perfil"},																									
];																									
return(																									
<div style={{position:"fixed",bottom:0,left:0,right:0,background:FUNDO,borderTop:`1px solid ${BORDA}`,display:"flex",padding:"10px 0 18px",zIndex:100}}>																									
{itens.map(item=>(																									
<button key={item.id} onClick={()=>setAba(item.id)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,background:"none",border:"none",cursor:"pointer",color:aba===item.id?DOURADO:CINZA}}>																									
<div style={{fontSize:20}}>{item.icon}</div>																									
<div style={{fontSize:9,letterSpacing:1}}>{item.label}</div>																									
</button>																									
))}																									
</div>																									
);																									
}																									
																									
// ── APP ───────────────────────────────────────────────────────																									
export default function App(){																									
const [tela,setTela]=useState("login");																									
const [usuario,setUsuario]=useState(null);																									
const [aba,setAba]=useState("home");																									
const [desafios,setDesafios]=useState([]);																									
const [atividades,setAtividades]=useState([]);																									
const [usuarios,setUsuarios]=useState([]);																									
const [modalDesafio,setModalDesafio]=useState(null);																									
const [telaDesafio,setTelaDesafio]=useState(null);																									
const [desafioSelecionado,setDesafioSelecionado]=useState(null);																									
const [loading,setLoading]=useState(false);																									
const [sincMsg,setSincMsg]=useState("");																									
const [sincronizando,setSincronizando]=useState(false);																									
const {stravaToken,conectarStrava,desconectarStrava}=usarStrava();																									
																									
const carregarDados=async()=>{																									
setLoading(true);																									
try{																									
const token=await getAccessToken();																									
const [rD,rA,rU]=await Promise.all([lerAba(token,"desafios"),lerAba(token,"atividades"),lerAba(token,"usuarios")]);																									
setDesafios(rD.slice(1).filter(r=>r[0]).map(r=>({id:r[0],nome:r[1],descricao:r[2],tipo:r[3]||"km",meta:r[4],ativo:r[5],inicio:r[6],fim:r[7]})));																									
setAtividades(rA.slice(1).filter(r=>r[0]).map(r=>({id:r[0],usuario_id:r[1],usuario_nome:r[2],desafio_id:r[3],desafio_nome:r[4],km:r[5],data:r[6],fonte:r[7]||"manual"})));																									
setUsuarios(rU.slice(1).filter(r=>r[0]).map(r=>({id:r[0],nome:r[1],email:r[2],nivel:r[5]||"Iniciante",sexo:r[6]||"",vinculo:r[7]||"Externo"})));																									
}catch(e){console.error(e);}																									
setLoading(false);																									
};																									
																									
useEffect(()=>{if(tela==="app")carregarDados();},[tela]);																									
																									
const handleSincronizar=async()=>{																									
if(!stravaToken||!usuario)return;																									
setSincronizando(true);setSincMsg("Buscando...");																									
try{																									
const res=await fetch("/api/strava",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({access_token:stravaToken})});																									
const data=await res.json();																									
if(Array.isArray(data)&&data.length>0){																									
const desafiosAtivos=desafios.filter(d=>d.ativo==="true");																									
if(desafiosAtivos.length===0){setSincMsg(`${data.length} atividade(s) encontrada(s), sem desafios ativos.`);setSincronizando(false);return;}																									
const token=await getAccessToken();																									
const jaRegistradas=await lerAba(token,"atividades");																									
const idsExistentes=new Set(jaRegistradas.slice(1).map(r=>r[0]));																									
let novas=0;																									
for(const ativ of data){																									
for(const desafio of desafiosAtivos){																									
const idAtiv=`strava_${ativ.id}_${desafio.id}`;																									
if(idsExistentes.has(idAtiv))continue;																									
const dataInicio=desafio.inicio?new Date(desafio.inicio):null;																									
const dataAtiv=new Date(ativ.start_date);																									
if(dataInicio&&dataAtiv<dataInicio)continue;																									
const km=((ativ.distance||0)/1000).toFixed(2);																									
const cal=Math.round((ativ.kilojoules||0)*0.239);																									
const tempo=Math.round((ativ.moving_time||0)/60);																									
const valor=desafio.tipo==="cal"?cal:desafio.tipo==="tempo"?tempo:km;																									
const dataFmt=dataAtiv.toLocaleDateString("pt-BR");																									
await escreverAba(token,"atividades",[[idAtiv,usuario.id,usuario.nome,desafio.id,desafio.nome,valor,dataFmt,"strava"]]);																									
novas++;																									
}																									
}																									
setSincMsg(novas>0?`✓ ${novas} atividade(s) importada(s)!`:"Nenhuma atividade nova.");																									
if(novas>0)await carregarDados();																									
}else if(Array.isArray(data)&&data.length===0){																									
setSincMsg("Nenhuma atividade no Strava.");																									
}else{																									
setSincMsg("Resp: "+JSON.stringify(data).slice(0,80));																									
}																									
}catch(e){setSincMsg("Erro: "+e.message);}																									
setSincronizando(false);																									
};																									
																									
const handleLogin=(user,destino)=>{																									
if(destino==="cadastro"){setTela("cadastro");return;}																									
setUsuario(user);setTela("app");																									
};																									
																									
const CSS=`*{box-sizing:border-box;margin:0;padding:0;}body{background:#0f0f0f;}input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;}input[type=date]{color-scheme:dark;}::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-thumb{background:#2e2e2e;}`;																									
																									
if(tela==="login")return(<><style>{CSS}</style><TelaLogin onLogin={handleLogin}/></>);																									
if(tela==="cadastro")return(<><style>{CSS}</style><TelaCadastro onVoltar={()=>setTela("login")} onCadastrado={user=>{setUsuario(user);setTela("app");}}/></>);																									
if(telaDesafio!==null)return(<><style>{CSS}</style><TelaDesafioForm desafioEditando={telaDesafio==="criar"?null:telaDesafio} onSalvar={()=>{setTelaDesafio(null);carregarDados();}} onVoltar={()=>setTelaDesafio(null)}/></>);																									
if(desafioSelecionado)return(<><style>{CSS}</style><TelaDesafioDetalhe desafio={desafioSelecionado} atividades={atividades} usuario={usuario} onVoltar={()=>setDesafioSelecionado(null)}/></>);																									
																									
return(																									
<><style>{CSS}</style>																									
<div style={{minHeight:"100vh",background:FUNDO,color:BRANCO}}>																									
{loading?<div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",color:CINZA,fontSize:13}}>Carregando...</div>:(																									
<>																									
{aba==="home"&&<TelaHome usuario={usuario} desafios={desafios} atividades={atividades} onVerDesafio={setDesafioSelecionado} stravaToken={stravaToken} conectarStrava={conectarStrava} onSincronizar={handleSincronizar} sincMsg={sincMsg} sincronizando={sincronizando}/>}																									
{aba==="desafios"&&<TelaMeusDesafios desafios={desafios} atividades={atividades} usuario={usuario} onVerDesafio={setDesafioSelecionado}/>}																									
{aba==="ranking"&&<TelaRanking desafios={desafios} atividades={atividades} usuario={usuario}/>}																									
{aba==="painel"&&usuario?.isOrganizador&&<PainelOrganizador usuario={usuario} desafios={desafios} atividades={atividades} usuarios={usuarios} onCriarDesafio={()=>setTelaDesafio("criar")} onEditarDesafio={d=>setTelaDesafio(d)}/>}																									
{aba==="perfil"&&<TelaPerfil usuario={usuario} atividades={atividades} onSair={()=>{setUsuario(null);setTela("login");}} stravaToken={stravaToken} conectarStrava={conectarStrava} desconectarStrava={desconectarStrava}/>}																									
<NavInferior aba={aba} setAba={setAba} isOrganizador={usuario?.isOrganizador}/>																									
{modalDesafio&&<ModalRegistrar desafio={modalDesafio} usuario={usuario} onSalvar={()=>{setModalDesafio(null);carregarDados();}} onFechar={()=>setModalDesafio(null)}/>}																									
</>																									
)}																									
</div></>																									
);																									
}																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
																									
