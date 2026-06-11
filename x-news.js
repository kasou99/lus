window.LUS_X_NEWS = {
  "updatedAt": "2026-06-11T23:37:52.141Z",
  "items": [
    {
      "time": "07:34",
      "title": "イラン側 米合意は最終決定至らず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583906?source=rss",
      "publishedAt": "2026-06-11T22:34:33.000Z",
      "xQuery": "イラン側 米合意は最終決定至らず"
    },
    {
      "time": "08:28",
      "title": "資金洗浄疑い 国際共同捜査で逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583911?source=rss",
      "publishedAt": "2026-06-11T23:28:20.000Z",
      "xQuery": "資金洗浄疑い 国際共同捜査で逮捕"
    },
    {
      "time": "07:53",
      "title": "コンゴのエボラ熱 15～44歳が中心",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583908?source=rss",
      "publishedAt": "2026-06-11T22:53:27.000Z",
      "xQuery": "コンゴのエボラ熱 15～44歳が中心"
    },
    {
      "time": "07:37",
      "title": "困窮者に消費期限切れパン 市提供",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583904?source=rss",
      "publishedAt": "2026-06-11T22:37:38.000Z",
      "xQuery": "困窮者に消費期限切れパン 市提供"
    },
    {
      "time": "08:16",
      "title": "梅雨期「耳カビ」注意 強烈かゆみ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583912?source=rss",
      "publishedAt": "2026-06-11T23:16:21.000Z",
      "xQuery": "梅雨期「耳カビ」注意 強烈かゆみ"
    }
  ]
};

(function renderLusXNews() {
  const data = window.LUS_X_NEWS || { items: [] };

  function escapeX(value) {
    return String(value || "").replace(/[&<>"']/g, (char) => {
      if (char === "&") return "&amp;";
      if (char === "<") return "&lt;";
      if (char === ">") return "&gt;";
      if (char === '"') return "&quot;";
      return "&#039;";
    });
  }

  function xSearchUrl(item) {
    const query = item.xQuery || item.originalTitle || item.title || "";
    return "https://x.com/search?q=" + encodeURIComponent(query + " lang:ja") + "&src=typed_query&f=live";
  }

  function render() {
    const grid = document.querySelector(".news-grid.headline-mode");
    if (!grid) return false;

    let card = document.querySelector("#xTrendCard");
    if (!card) {
      card = document.createElement("article");
      card.className = "headline-card x-trend-card";
      card.id = "xTrendCard";
      grid.prepend(card);
    }

    const items = (data.items || []).slice(0, 5);
    card.innerHTML = `
      <div class="headline-top"><h3>Xで追う人気ニュースTop5</h3><span>新着順</span></div>
      <div id="xTrendHeadlines">
        ${items.length ? items.map((item) => `
          <a class="headline-item" href="${xSearchUrl(item)}" target="_blank" rel="noopener">
            <span class="headline-time">${escapeX(item.time || "速報")}</span>
            <span><strong class="headline-title">${escapeX(item.title)}</strong><span class="headline-source">${item.translated ? "自動翻訳 / " : ""}Xの新着投稿を開く / ${escapeX(item.source || "ニュース")}</span></span>
          </a>
        `).join("") : `<p class="headline-error">Xで追う見出しを準備中です。</p>`}
      </div>
    `;
    return true;
  }

  function scheduleRender() {
    let count = 0;
    const tick = () => {
      render();
      count += 1;
      if (count < 10) setTimeout(tick, 450);
    };
    tick();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleRender);
  } else {
    scheduleRender();
  }

  document.addEventListener("change", (event) => {
    if (event.target && event.target.id === "newsRegionSelect") setTimeout(render, 700);
  });
})();
