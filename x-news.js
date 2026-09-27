window.LUS_X_NEWS = {
  "updatedAt": "2026-09-27T09:18:31.083Z",
  "items": [
    {
      "time": "15:30",
      "title": "台風25号の土砂崩れ現場 1人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596725?source=rss",
      "publishedAt": "2026-09-27T06:30:58.000Z",
      "xQuery": "台風25号の土砂崩れ現場 1人死亡"
    },
    {
      "time": "17:31",
      "title": "自民福岡県連 新会長に古賀篤氏",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596741?source=rss",
      "publishedAt": "2026-09-27T08:31:32.000Z",
      "xQuery": "自民福岡県連 新会長に古賀篤氏"
    },
    {
      "time": "17:53",
      "title": "公開手配の男逮捕 靴下で逃走か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596745?source=rss",
      "publishedAt": "2026-09-27T08:53:29.000Z",
      "xQuery": "公開手配の男逮捕 靴下で逃走か"
    },
    {
      "time": "14:34",
      "title": "東京メトロ メアド5.9万件漏洩か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596712?source=rss",
      "publishedAt": "2026-09-27T05:34:11.000Z",
      "xQuery": "東京メトロ メアド5.9万件漏洩か"
    },
    {
      "time": "16:50",
      "title": "住宅街の不発弾撤去 住民避難も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596734?source=rss",
      "publishedAt": "2026-09-27T07:50:55.000Z",
      "xQuery": "住宅街の不発弾撤去 住民避難も"
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
