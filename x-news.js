window.LUS_X_NEWS = {
  "updatedAt": "2026-09-25T14:19:45.529Z",
  "items": [
    {
      "time": "22:12",
      "title": "墜落の無人機か 一部を海中で発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596548?source=rss",
      "publishedAt": "2026-09-25T13:12:06.000Z",
      "xQuery": "墜落の無人機か 一部を海中で発見"
    },
    {
      "time": "20:19",
      "title": "亀岡偉民・元衆院議員に有罪判決",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596534?source=rss",
      "publishedAt": "2026-09-25T11:19:10.000Z",
      "xQuery": "亀岡偉民・元衆院議員に有罪判決"
    },
    {
      "time": "22:34",
      "title": "群馬で女性死亡 逃亡男性は知人か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596549?source=rss",
      "publishedAt": "2026-09-25T13:34:44.000Z",
      "xQuery": "群馬で女性死亡 逃亡男性は知人か"
    },
    {
      "time": "22:02",
      "title": "ジャングリア 追加融資などを要請",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596547?source=rss",
      "publishedAt": "2026-09-25T13:02:42.000Z",
      "xQuery": "ジャングリア 追加融資などを要請"
    },
    {
      "time": "22:42",
      "title": "ラジオNIKKEI第2 今週末短波休止",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596550?source=rss",
      "publishedAt": "2026-09-25T13:42:44.000Z",
      "xQuery": "ラジオNIKKEI第2 今週末短波休止"
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
