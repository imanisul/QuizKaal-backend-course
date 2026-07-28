const requestFields = [
  { k: "Method:", v: "GET", tip: "The action being performed. GET means \"read data,\" never changes anything on the server." },
  { k: "Path:", v: "/api/users/42", tip: "Which resource. 42 is a route parameter identifying exactly one user." },
  { k: "Host:", v: "myapp.com", tip: "Which server should handle this. One server can host many domains." },
  { k: "Authorization:", v: "Bearer eyJhbG...", tip: "Proves who's asking. Since HTTP has no memory, this token must be sent on every single request." },
  { k: "Accept:", v: "application/json", tip: "Tells the server what format the client can understand back." },
];

const responseFields = [
  { k: "Content-Type:", v: "application/json", tip: "Tells the client how to parse the body that follows." },
  { k: "Cache-Control:", v: "max-age=60", tip: "How long the client may reuse this response before asking again." },
  { k: "Set-Cookie:", v: "session=a92f...", tip: "Server-issued state stored in the browser and resent automatically on future requests." },
  { k: "Body:", v: '{"id":42,"name":"Rahul"}', tip: "The actual data, serialized as JSON so any language can read it." },
];

function Field({ k, v, tip }) {
  return (
    <div className="field">
      <span className="k">{k}</span>
      <span className="v">{v}</span>
      <div className="tip"><b>{k.replace(":", "")}</b> — {tip}</div>
    </div>
  );
}

export default function HttpVisualizer() {
  return (
    <div className="browser">
      <div className="browser-chrome">
        <div className="dots"><span /><span /><span /></div>
        <div className="addr-bar"><span className="method-tag">GET</span> myapp.com/api/users/42</div>
      </div>
      <div className="browser-body">
        <div className="panel">
          <div className="panel-head">Request</div>
          <div className="field-list">
            {requestFields.map((f) => <Field key={f.k} {...f} />)}
          </div>
        </div>
        <div className="panel">
          <div className="panel-head">Response <span className="status-chip">200 OK</span></div>
          <div className="field-list">
            {responseFields.map((f) => <Field key={f.k} {...f} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
