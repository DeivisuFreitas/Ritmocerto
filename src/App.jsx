import React, { useState, useEffect, useMemo } from "react";

// ── CONSTANTES ─────────────────────────────────────────────
const SHEET_ID = "1Y9ZQeYjTBVdtawpBzKd63n416Nub-K42-hRNTCFsWvk";
const CLIENT_EMAIL = "ritmocerto-app@emerald-surface-316302.iam.gserviceaccount.com";
const PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCx7eY3q9nA6PNO\nZ+fu/DD0DL7N5KS4VVhgXPS229le6UErcZZPB6Jnp6H0BLfW2OVRxywXf4toE+qv\nghpdsfPNH/TyLXkQlFJFX6CQBlc03DOLW0O6eR+AwKCrKEH8PGGnhOQHcFVI46w4\nLJ53Q6CbW+tXNxj7wA45BwOO+NR1tpddpZudPkWP9F1jZiPeX9UtY2jXDiEa7Qbv\nyLoIlizfPKJV0eK1qjhCGZr5AgtSqtu8kGY1kZI/hmygnunKw4FcOp1T1gJZqOv4\nGsqx6DnNyQawdmd10QfiqDsQAat//QKJ2R7hKMxpue+qz4aPKFzxCocNxWSqs2W+\nVF6XNDb3AgMBAAECggEACND66U3wmj3GCzUxftwBfkuWC2mwPRoC07OHb1AcHeHS\nQtl7/dUpAkMszoSKqhtRMZN8PHsraIV5dCeEMERTCkTybtWQpsun+pwEaV6HD612\n4wmApPVqJDJnQ6kuVoCUw3zdjP4km69Rp0Q+uIt3TSYUK9wlDBm2GrPy7zCmhmE9\nRv54IZUBTxVaDpJri0oqnVk68fF2BhTo4bNOXs+ZgxacijSB2ksh/rxKDtizzVk5\nnddH1S0Cc9LLbFYyWRKwR4MJyIEdkAgMLjPTO/M4GcZE9yE2foVzmZac+BTFIywe\ns6NpNg+Uy1A6U9h0A7XzejH2D6bQ9PLNTyZOMqJ4gQKBgQDcLrr1xF1Ws15VGbsc\njO1qHMChFUyLOa261nyjM5eOyEE+NdJWSiGGqc0mo6ORFLxEtvr5XfrP0C9McDxs\nxWxPQQTu3KcErgQQvE010+YZfV30tXtb72b9rANrKV3QlNUBMfDgsatb2RcFr0Ct\nPCTaVxUnSpuAeIPaUXM4xTsn4QKBgQDO35O8mZBzxMdYViOHvDX8hof0IG4ToTaM\nscy9lTGtK/EsCTYmSxTxWwxuaQSAzrH4KpCdoXFDjUBgN9M4LXbVOWDHx/GZq9UW\nBiSbI5v0Frw1+dzoVWJAhuFCk2l5fAGmOv4XflBiaNLSHdDD3leccoiCsKW3wJQr\nQHKRpLjZ1wKBgQCgRrv9jxVKuYLfe72CyOtBpPBr0a9IYZIfQWa0/idC3m7vtAoK\nmifReOVHTTMRtwBdHL2QrGKYx7jGcaTqoMN45aGLpr9FXs7Cx++EUV1cDLBKI5lK\nkPhti7tpVFFgNhbfqdToGyzbzSk/EBWKhQ9miKFzWpHbcN66GzQ+jQPEwQKBgH1Z\n7iwmpOfxQZVeRJM30UKdxf2ANRMB6YrhJZ1urLYw3ScAweX8Msl4kRTJ36epFx+3\nsv9A1t/G1E45JWxx6AKVjPYhSl0CSNDakg3LSvFhYVQXfert6eYNlKsBpbSuFlXC\ngzp7GHw45h3ZYSl+LXon0F3YaeHo+B8pIwLrW/LrAoGBALhs37WGgw8o/JIc/z4d\nqkk7MIgw09VU6F3qdz5QaBv4Tkc0ocYFr0rhTItEJMsVfFTFhSSfpma/oJy5uI9g\nPZRZ4tVExLkPOFjDQraBHUjV9E8udrWY3vF50Y5W5cv7wn1H7WPnUFwGgiAsnDjy\nRivwV6CAnG7Y6EOCOJz1qNbE\n-----END PRIVATE KEY-----\n";

const COR = "#0f0f0f";
const CARD = "#1a1a1a";
const BORDA = "#2e2e2e";
const BRANCO = "#f5f5f5";
const CINZA = "#a0a0a0";
const DOURADO = "#c9a84c";
const FUNDO = "#0f0f0f";
const VERDE = "#4a7a1a";
const VERMELHO = "#c06040";

// ── GOOGLE AUTH ────────────────────────────────────────────
async function getAccessToken() {
  const header = { alg: "RS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: CLIENT_EMAIL,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };
  const b64 = (obj) =>
    btoa(JSON.stringify(obj)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_");
  const sigInput = `${b64(header)}.${b64(claim)}`;
  const keyData = PRIVATE_KEY.replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\n/g,"");
  const binaryKey = Uint8Array.from(atob(keyData), (c) => c.charCodeAt(0));
  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8", binaryKey.buffer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5", cryptoKey, new TextEncoder().encode(sigInput)
  );
  const sig64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_");
  const jwt = `${sigInput}.${sig64}`;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  });
  const data = await res.json();
  return data.access_token;
}

async function lerAba(token, aba) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(aba)}!A1:Z1000`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  const data = await res.json();
  return data.values || [];
}

async function escreverAba(token, aba, rows) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(aba)}!A1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
  await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ values: rows }),
  });
}

// ── TELA LOGIN ─────────────────────────────────────────────
function TelaLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) { setErro("Preencha email e senha"); return; }
    setLoading(true); setErro("");
    try {
      const token = await getAccessToken();
      const rows = await lerAba(token, "usuarios");
      const usuario = rows.slice(1).find(
        r => r[2]?.toLowerCase() === email.toLowerCase() && r[3] === senha
      );
      if (usuario) {
        onLogin({ id: usuario[0], nome: usuario[1], email: usuario[2], nivel: usuario[5] || "Iniciante", vinculo: usuario[7] || "Externo" });
      } else {
        setErro("Email ou senha incorretos");
      }
    } catch(e) { setErro("Erro ao conectar. Tente novamente."); }
    setLoading(false);
  };

  return (
    <div style={{ minHeight:"100vh", background:FUNDO, display:"flex", alignItems:"center", justifyContent:"center", padding:24, fontFamily:"'Inter',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap'); *{box-sizing:border-box;margin:0;padding:0;}`}</style>
      <div style={{ width:"100%", maxWidth:380 }}>
        {/* Logo */}
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <div style={{ width:64, height:64, background:DOURADO, borderRadius:18, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, margin:"0 auto 16px" }}>⚡</div>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:36, color:BRANCO, letterSpacing:4 }}>COFFEEMUSIC</div>
          <div style={{ fontSize:11, color:CINZA, letterSpacing:3, marginTop:4 }}>RUN CLUB</div>
        </div>

        {/* Form */}
        <div style={{ background:CARD, border:`1px solid ${BORDA}`, borderRadius:16, padding:28 }}>
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:10, color:CINZA, letterSpacing:2, marginBottom:6 }}>EMAIL</div>
            <input value={email} onChange={e=>setEmail(e.target.value)}
              placeholder="seu@email.com"
              style={{ width:"100%", background:"#111", border:`1px solid ${BORDA}`, borderRadius:10, padding:"13px 14px", color:BRANCO, fontSize:14, outline:"none", fontFamily:"Inter" }} />
          </div>
          <div style={{ marginBottom:20 }}>
            <div style={{ fontSize:10, color:CINZA, letterSpacing:2, marginBottom:6 }}>SENHA</div>
            <input type="password" value={senha} onChange={e=>setSenha(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&handleLogin()}
              placeholder="••••••••"
              style={{ width:"100%", background:"#111", border:`1px solid ${BORDA}`, borderRadius:10, padding:"13px 14px", color:BRANCO, fontSize:14, outline:"none", fontFamily:"Inter" }} />
          </div>
          {erro && <div style={{ color:VERMELHO, fontSize:12, marginBottom:14, textAlign:"center" }}>{erro}</div>}
          <button onClick={handleLogin} disabled={loading}
            style={{ width:"100%", background:DOURADO, color:"#000", border:"none", borderRadius:10, padding:15, fontFamily:"'Bebas Neue',sans-serif", fontSize:18, letterSpacing:2, cursor:"pointer" }}>
            {loading ? "ENTRANDO..." : "ENTRAR"}
          </button>
        </div>

        <div style={{ textAlign:"center", marginTop:20 }}>
          <span style={{ fontSize:12, color:CINZA }}>Não tem conta? </span>
          <button onClick={()=>onLogin(null, "cadastro")}
            style={{ background:"none", border:"none", color:DOURADO, fontSize:12, cursor:"pointer" }}>
            Criar conta
          </button>
        </div>

        <div style={{ textAlign:"center", marginTop:16, fontSize:11, color:"#444" }}>
          Dúvidas? Entre em contato pelo WhatsApp
        </div>
      </div>
    </div>
  );
}

// ── TELA CADASTRO ──────────────────────────────────────────
function TelaCadastro({ onVoltar, onCadastrado }) {
  const [passo, setPasso] = useState(1);
  const [form, setForm] = useState({
    nome:"", email:"", senha:"", telefone:"", sexo:"",
    cidade:"", idade:"", nivel:"Iniciante", vinculo:"Externo"
  });
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(p => ({...p, [k]:v}));

  const cadastrar = async () => {
    setLoading(true); setErro("");
    try {
      const token = await getAccessToken();
      const id = Date.now().toString();
      await escreverAba(token, "usuarios", [[
        id, form.nome, form.email, form.senha,
        form.telefone, form.nivel, form.sexo,
        form.vinculo, form.cidade, form.idade,
        new Date().toLocaleDateString("pt-BR")
      ]]);
      onCadastrado({ id, nome: form.nome, email: form.email, nivel: form.nivel, vinculo: form.vinculo });
    } catch(e) { setErro("Erro ao cadastrar. Tente novamente."); }
    setLoading(false);
  };

  const inputStyle = { width:"100%", background:"#111", border:`1px solid ${BORDA}`, borderRadius:10, padding:"13px 14px", color:BRANCO, fontSize:14, outline:"none", fontFamily:"Inter", marginBottom:14 };
  const labelStyle = { fontSize:10, color:CINZA, letterSpacing:2, marginBottom:6, display:"block" };

  return (
    <div style={{ minHeight:"100vh", background:FUNDO, padding:24, fontFamily:"'Inter',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap'); *{box-sizing:border-box;margin:0;padding:0;}`}</style>

      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:28 }}>
        <button onClick={onVoltar} style={{ background:"none", border:"none", color:CINZA, fontSize:24, cursor:"pointer" }}>←</button>
        <div>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:24, color:BRANCO, letterSpacing:2 }}>CRIAR CONTA</div>
          <div style={{ fontSize:11, color:CINZA }}>Passo {passo} de 3</div>
        </div>
      </div>

      {/* Barra de progresso */}
      <div style={{ display:"flex", gap:6, marginBottom:28 }}>
        {[1,2,3].map(n => (
          <div key={n} style={{ flex:1, height:3, borderRadius:2, background: n<=passo ? DOURADO : BORDA }} />
        ))}
      </div>

      {passo === 1 && (
        <div>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, color:BRANCO, letterSpacing:1, marginBottom:4 }}>QUEM É VOCÊ?</div>
          <div style={{ fontSize:12, color:CINZA, marginBottom:20 }}>Dados pessoais</div>
          <label style={labelStyle}>NOME COMPLETO</label>
          <input value={form.nome} onChange={e=>set("nome",e.target.value)} placeholder="Seu nome" style={inputStyle} />
          <label style={labelStyle}>EMAIL</label>
          <input value={form.email} onChange={e=>set("email",e.target.value)} placeholder="seu@email.com" style={inputStyle} />
          <label style={labelStyle}>SENHA</label>
          <input type="password" value={form.senha} onChange={e=>set("senha",e.target.value)} placeholder="Crie uma senha" style={inputStyle} />
          <label style={labelStyle}>TELEFONE (WHATSAPP)</label>
          <input value={form.telefone} onChange={e=>set("telefone",e.target.value)} placeholder="(xx) 9xxxx-xxxx" style={inputStyle} />
          <label style={labelStyle}>SEXO</label>
          <div style={{ display:"flex", gap:10, marginBottom:20 }}>
            {["Masculino","Feminino","Outro"].map(s => (
              <button key={s} onClick={()=>set("sexo",s)}
                style={{ flex:1, padding:"11px 6px", borderRadius:10, border:`1px solid ${form.sexo===s?DOURADO:BORDA}`, background:form.sexo===s?"rgba(201,168,76,0.1)":"transparent", color:form.sexo===s?DOURADO:CINZA, fontSize:12, cursor:"pointer" }}>
                {s}
              </button>
            ))}
          </div>
          <button onClick={()=>{ if(!form.nome||!form.email||!form.senha){setErro("Preencha todos os campos");return;} setErro(""); setPasso(2); }}
            style={{ width:"100%", background:DOURADO, color:"#000", border:"none", borderRadius:10, padding:15, fontFamily:"'Bebas Neue',sans-serif", fontSize:18, letterSpacing:2, cursor:"pointer" }}>
            CONTINUAR →
          </button>
          {erro && <div style={{ color:VERMELHO, fontSize:12, marginTop:10, textAlign:"center" }}>{erro}</div>}
        </div>
      )}

      {passo === 2 && (
        <div>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, color:BRANCO, letterSpacing:1, marginBottom:4 }}>SEU PERFIL</div>
          <div style={{ fontSize:12, color:CINZA, marginBottom:20 }}>Perfil de corredor</div>
          <label style={labelStyle}>CIDADE</label>
          <input value={form.cidade} onChange={e=>set("cidade",e.target.value)} placeholder="Sua cidade" style={inputStyle} />
          <label style={labelStyle}>IDADE</label>
          <input type="number" value={form.idade} onChange={e=>set("idade",e.target.value)} placeholder="Sua idade" style={inputStyle} />
          <label style={labelStyle}>NÍVEL DE CORREDOR</label>
          <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:20 }}>
            {[["Iniciante","🟢","até 5km"],["Intermediário","🟡","5 a 21km"],["Avançado","🔴","21km+"]].map(([n,e,d]) => (
              <button key={n} onClick={()=>set("nivel",n)}
                style={{ padding:"12px 14px", borderRadius:10, border:`1px solid ${form.nivel===n?DOURADO:BORDA}`, background:form.nivel===n?"rgba(201,168,76,0.1)":"transparent", color:BRANCO, fontSize:13, cursor:"pointer", textAlign:"left" }}>
                {e} <strong>{n}</strong> — {d}
              </button>
            ))}
          </div>
          <label style={labelStyle}>VÍNCULO COM O MANGALÔ</label>
          <div style={{ display:"flex", gap:10, marginBottom:20 }}>
            {["Cliente","Equipe","Externo"].map(v => (
              <button key={v} onClick={()=>set("vinculo",v)}
                style={{ flex:1, padding:"11px 6px", borderRadius:10, border:`1px solid ${form.vinculo===v?DOURADO:BORDA}`, background:form.vinculo===v?"rgba(201,168,76,0.1)":"transparent", color:form.vinculo===v?DOURADO:CINZA, fontSize:12, cursor:"pointer" }}>
                {v}
              </button>
            ))}
          </div>
          <button onClick={()=>setPasso(3)}
            style={{ width:"100%", background:DOURADO, color:"#000", border:"none", borderRadius:10, padding:15, fontFamily:"'Bebas Neue',sans-serif", fontSize:18, letterSpacing:2, cursor:"pointer" }}>
            CONTINUAR →
          </button>
        </div>
      )}

      {passo === 3 && (
        <div style={{ textAlign:"center" }}>
          <div style={{ fontSize:64, marginBottom:16 }}>🏃</div>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, color:BRANCO, letterSpacing:2, marginBottom:8 }}>TUDO CERTO!</div>
          <div style={{ fontSize:13, color:CINZA, marginBottom:32, lineHeight:1.6 }}>
            Pronto para entrar no grupo e<br/>começar a correr, {form.nome.split(" ")[0]}?
          </div>
          <div style={{ background:CARD, border:`1px solid ${BORDA}`, borderRadius:16, padding:20, marginBottom:24, textAlign:"left" }}>
            {[["Nome",form.nome],["Email",form.email],["Nível",form.nivel],["Cidade",form.cidade],["Vínculo",form.vinculo]].map(([k,v]) => (
              <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:`1px solid ${BORDA}`, fontSize:13 }}>
                <span style={{ color:CINZA }}>{k}</span>
                <span style={{ color:BRANCO }}>{v}</span>
              </div>
            ))}
          </div>
          {erro && <div style={{ color:VERMELHO, fontSize:12, marginBottom:14 }}>{erro}</div>}
          <button onClick={cadastrar} disabled={loading}
            style={{ width:"100%", background:DOURADO, color:"#000", border:"none", borderRadius:10, padding:15, fontFamily:"'Bebas Neue',sans-serif", fontSize:18, letterSpacing:2, cursor:"pointer" }}>
            {loading ? "CADASTRANDO..." : "ENTRAR NO GRUPO ⚡"}
          </button>
        </div>
      )}
    </div>
  );
}

// ── HOME ────────────────────────────────────────────────────
function TelaHome({ usuario, desafios, onRegistrar }) {
  const desafiosAtivos = desafios.filter(d => d.ativo === "true" || d.ativo === true);

  return (
    <div style={{ padding:"20px 20px 100px", fontFamily:"'Inter',sans-serif" }}>
      {/* Saudação */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
        <div>
          <div style={{ fontSize:12, color:CINZA }}>Bom dia, corredor 👋</div>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, color:BRANCO, letterSpacing:1 }}>
            {usuario.nome.split(" ")[0].toUpperCase()}
          </div>
        </div>
        <div style={{ width:42, height:42, background:DOURADO, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Bebas Neue',sans-serif", fontSize:18, color:"#000" }}>
          {usuario.nome[0]}
        </div>
      </div>

      {/* Desafios ativos */}
      <div style={{ fontSize:10, color:CINZA, letterSpacing:2, marginBottom:12 }}>DESAFIOS ATIVOS</div>

      {desafiosAtivos.length === 0 ? (
        <div style={{ background:CARD, border:`1px solid ${BORDA}`, borderRadius:16, padding:24, textAlign:"center" }}>
          <div style={{ fontSize:32, marginBottom:8 }}>🏃</div>
          <div style={{ color:CINZA, fontSize:13 }}>Nenhum desafio ativo no momento</div>
        </div>
      ) : desafiosAtivos.map((d, i) => (
        <div key={i} style={{ background:CARD, border:`1px solid ${BORDA}`, borderRadius:16, overflow:"hidden", marginBottom:14 }}>
          <div style={{ background:DOURADO, padding:"12px 16px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontSize:10, fontWeight:700, color:"#000", letterSpacing:2 }}>⚡ DESAFIO ATIVO</span>
            <span style={{ background:"rgba(0,0,0,0.2)", borderRadius:20, padding:"3px 8px", fontSize:10, color:"#000" }}>{d.participantes || 0} corredores</span>
          </div>
          <div style={{ padding:"14px 16px" }}>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, color:BRANCO, letterSpacing:1, marginBottom:4 }}>{d.nome}</div>
            <div style={{ fontSize:12, color:CINZA, marginBottom:14 }}>{d.descricao}</div>
            <button onClick={()=>onRegistrar(d)}
              style={{ width:"100%", background:DOURADO, color:"#000", border:"none", borderRadius:10, padding:"12px", fontFamily:"'Bebas Neue',sans-serif", fontSize:16, letterSpacing:2, cursor:"pointer" }}>
              REGISTRAR ATIVIDADE
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── RANKING ─────────────────────────────────────────────────
function TelaRanking({ atividades, usuarios }) {
  const ranking = useMemo(() => {
    const map = {};
    for (const a of atividades) {
      if (!map[a.usuario_id]) map[a.usuario_id] = { nome: a.usuario_nome, total: 0 };
      map[a.usuario_id].total += parseFloat(a.km) || 0;
    }
    return Object.values(map).sort((a,b) => b.total - a.total);
  }, [atividades]);

  const medals = ["🥇","🥈","🥉"];

  return (
    <div style={{ padding:"20px 20px 100px", fontFamily:"'Inter',sans-serif" }}>
      <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, color:BRANCO, letterSpacing:2, marginBottom:4 }}>RANKING</div>
      <div style={{ fontSize:11, color:CINZA, letterSpacing:2, marginBottom:20 }}>TOP CORREDORES</div>

      {ranking.length === 0 ? (
        <div style={{ textAlign:"center", padding:40, color:CINZA }}>Nenhuma atividade registrada ainda</div>
      ) : (
        <div style={{ background:CARD, border:`1px solid ${BORDA}`, borderRadius:16, overflow:"hidden" }}>
          {ranking.map((r, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", padding:"14px 16px", gap:12, borderBottom:`1px solid ${BORDA}` }}>
              <div style={{ fontSize:20, width:28 }}>{medals[i] || `#${i+1}`}</div>
              <div style={{ width:32, height:32, borderRadius:"50%", background:"#2a2a2a", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13 }}>🏃</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, color:BRANCO, fontWeight:600 }}>{r.nome}</div>
                <div style={{ fontSize:11, color:CINZA }}>{r.total.toFixed(1)} km</div>
              </div>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, color:DOURADO }}>{r.total.toFixed(0)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── PERFIL ──────────────────────────────────────────────────
function TelaPerfil({ usuario, atividades, onSair }) {
  const minhasAtividades = atividades.filter(a => a.usuario_id === usuario.id);
  const totalKm = minhasAtividades.reduce((a,r) => a + (parseFloat(r.km)||0), 0);

  return (
    <div style={{ padding:"20px 20px 100px", fontFamily:"'Inter',sans-serif" }}>
      <div style={{ textAlign:"center", marginBottom:24 }}>
        <div style={{ width:64, height:64, background:DOURADO, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Bebas Neue',sans-serif", fontSize:28, color:"#000", margin:"0 auto 12px" }}>
          {usuario.nome[0]}
        </div>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:24, color:BRANCO, letterSpacing:2 }}>{usuario.nome.toUpperCase()}</div>
        <div style={{ fontSize:12, color:CINZA, marginTop:4 }}>{usuario.nivel} · {usuario.vinculo}</div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:20 }}>
        <div style={{ background:CARD, border:`1px solid ${BORDA}`, borderRadius:12, padding:16, textAlign:"center" }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:32, color:DOURADO }}>{totalKm.toFixed(1)}</div>
          <div style={{ fontSize:11, color:CINZA, letterSpacing:1 }}>KM TOTAL</div>
        </div>
        <div style={{ background:CARD, border:`1px solid ${BORDA}`, borderRadius:12, padding:16, textAlign:"center" }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:32, color:DOURADO }}>{minhasAtividades.length}</div>
          <div style={{ fontSize:11, color:CINZA, letterSpacing:1 }}>ATIVIDADES</div>
        </div>
      </div>

      <div style={{ fontSize:10, color:CINZA, letterSpacing:2, marginBottom:12 }}>HISTÓRICO</div>
      {minhasAtividades.length === 0 ? (
        <div style={{ textAlign:"center", padding:32, color:CINZA, fontSize:13 }}>Nenhuma atividade ainda</div>
      ) : minhasAtividades.slice().reverse().map((a, i) => (
        <div key={i} style={{ background:CARD, border:`1px solid ${BORDA}`, borderRadius:12, padding:"12px 16px", marginBottom:8, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{ fontSize:13, color:BRANCO, fontWeight:500 }}>{a.desafio_nome || "Atividade"}</div>
            <div style={{ fontSize:11, color:CINZA }}>{a.data}</div>
          </div>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, color:DOURADO }}>{a.km} km</div>
        </div>
      ))}

      <button onClick={onSair}
        style={{ width:"100%", marginTop:20, padding:14, background:"transparent", border:`1px solid ${BORDA}`, borderRadius:10, color:CINZA, fontSize:13, cursor:"pointer", fontFamily:"Inter" }}>
        Sair da conta
      </button>
    </div>
  );
}

// ── REGISTRAR ATIVIDADE ─────────────────────────────────────
function ModalRegistrar({ desafio, usuario, onSalvar, onFechar }) {
  const [km, setKm] = useState("");
  const [loading, setLoading] = useState(false);

  const salvar = async () => {
    if (!km) return;
    setLoading(true);
    try {
      const token = await getAccessToken();
      await escreverAba(token, "atividades", [[
        Date.now().toString(),
        usuario.id,
        usuario.nome,
        desafio.id || desafio.nome,
        desafio.nome,
        km,
        new Date().toLocaleDateString("pt-BR")
      ]]);
      onSalvar();
    } catch(e) { alert("Erro ao salvar"); }
    setLoading(false);
  };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.8)", display:"flex", alignItems:"flex-end", zIndex:999, fontFamily:"'Inter',sans-serif" }}>
      <div style={{ background:CARD, borderRadius:"20px 20px 0 0", padding:28, width:"100%", border:`1px solid ${BORDA}` }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, color:BRANCO, letterSpacing:2, marginBottom:4 }}>REGISTRAR</div>
        <div style={{ fontSize:13, color:CINZA, marginBottom:24 }}>{desafio.nome}</div>
        <div style={{ fontSize:10, color:CINZA, letterSpacing:2, marginBottom:8 }}>DISTÂNCIA (KM)</div>
        <input type="number" value={km} onChange={e=>setKm(e.target.value)}
          placeholder="Ex: 5.2"
          style={{ width:"100%", background:"#111", border:`1px solid ${BORDA}`, borderRadius:10, padding:"16px", color:BRANCO, fontSize:24, textAlign:"center", outline:"none", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:2, marginBottom:20 }} />
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={onFechar}
            style={{ flex:1, padding:14, background:"transparent", border:`1px solid ${BORDA}`, borderRadius:10, color:CINZA, fontSize:13, cursor:"pointer" }}>
            Cancelar
          </button>
          <button onClick={salvar} disabled={!km||loading}
            style={{ flex:2, padding:14, background:DOURADO, color:"#000", border:"none", borderRadius:10, fontFamily:"'Bebas Neue',sans-serif", fontSize:18, letterSpacing:2, cursor:"pointer", opacity:km?1:0.5 }}>
            {loading ? "SALVANDO..." : "SALVAR ✓"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── NAV INFERIOR ────────────────────────────────────────────
function NavInferior({ aba, setAba }) {
  const itens = [
    { id:"home", icon:"🏠", label:"Home" },
    { id:"ranking", icon:"🏆", label:"Ranking" },
    { id:"perfil", icon:"👤", label:"Perfil" },
  ];
  return (
    <div style={{ position:"fixed", bottom:0, left:0, right:0, background:FUNDO, borderTop:`1px solid ${BORDA}`, display:"flex", padding:"12px 0 20px", zIndex:100 }}>
      {itens.map(item => (
        <button key={item.id} onClick={()=>setAba(item.id)}
          style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4, background:"none", border:"none", cursor:"pointer", color: aba===item.id ? DOURADO : CINZA }}>
          <div style={{ fontSize:22 }}>{item.icon}</div>
          <div style={{ fontSize:10, letterSpacing:1 }}>{item.label}</div>
        </button>
      ))}
    </div>
  );
}

// ── APP PRINCIPAL ───────────────────────────────────────────
export default function App() {
  const [tela, setTela] = useState("login"); // login | cadastro | app
  const [usuario, setUsuario] = useState(null);
  const [aba, setAba] = useState("home");
  const [desafios, setDesafios] = useState([]);
  const [atividades, setAtividades] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [modalDesafio, setModalDesafio] = useState(null);
  const [loading, setLoading] = useState(false);

  const carregarDados = async () => {
    setLoading(true);
    try {
      const token = await getAccessToken();
      const [rowsD, rowsA, rowsU] = await Promise.all([
        lerAba(token, "desafios"),
        lerAba(token, "atividades"),
        lerAba(token, "usuarios"),
      ]);
      setDesafios(rowsD.slice(1).map(r => ({ id:r[0], nome:r[1], descricao:r[2], tipo:r[3], meta:r[4], ativo:r[5], participantes:r[6] })));
      setAtividades(rowsA.slice(1).map(r => ({ id:r[0], usuario_id:r[1], usuario_nome:r[2], desafio_id:r[3], desafio_nome:r[4], km:r[5], data:r[6] })));
      setUsuarios(rowsU.slice(1).map(r => ({ id:r[0], nome:r[1], email:r[2] })));
    } catch(e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { if (tela === "app") carregarDados(); }, [tela]);

  const handleLogin = (user, destino) => {
    if (destino === "cadastro") { setTela("cadastro"); return; }
    setUsuario(user);
    setTela("app");
  };

  const CSS = `
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #0f0f0f; }
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap');
    input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-thumb { background: #2e2e2e; }
  `;

  if (tela === "login") return (
    <>
      <style>{CSS}</style>
      <TelaLogin onLogin={handleLogin} />
    </>
  );

  if (tela === "cadastro") return (
    <>
      <style>{CSS}</style>
      <TelaCadastro onVoltar={()=>setTela("login")} onCadastrado={user=>{ setUsuario(user); setTela("app"); }} />
    </>
  );

  return (
    <>
      <style>{CSS}</style>
      <div style={{ minHeight:"100vh", background:FUNDO, color:BRANCO }}>
        {loading ? (
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100vh", color:CINZA, fontSize:13 }}>
            Carregando...
          </div>
        ) : (
          <>
            {aba === "home" && <TelaHome usuario={usuario} desafios={desafios} onRegistrar={setModalDesafio} />}
            {aba === "ranking" && <TelaRanking atividades={atividades} usuarios={usuarios} />}
            {aba === "perfil" && <TelaPerfil usuario={usuario} atividades={atividades} onSair={()=>{ setUsuario(null); setTela("login"); }} />}
            <NavInferior aba={aba} setAba={setAba} />
            {modalDesafio && (
              <ModalRegistrar
                desafio={modalDesafio}
                usuario={usuario}
                onSalvar={()=>{ setModalDesafio(null); carregarDados(); }}
                onFechar={()=>setModalDesafio(null)}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}
