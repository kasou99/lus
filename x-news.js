window.LUS_X_NEWS = {
  "updatedAt": "2026-10-08T00:53:53.105Z",
  "items": [
    {
      "time": "09:38",
      "title": "ビール大手を調査 経営層関与焦点",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597955?source=rss",
      "publishedAt": "2026-10-08T00:38:29.000Z",
      "xQuery": "ビール大手を調査 経営層関与焦点"
    },
    {
      "time": "08:03",
      "title": "外国人材 都市部への転職が増加",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597945?source=rss",
      "publishedAt": "2026-10-07T23:03:09.000Z",
      "xQuery": "外国人材 都市部への転職が増加"
    },
    {
      "time": "09:02",
      "title": "八田與一容疑者目撃情報 関東で増",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597952?source=rss",
      "publishedAt": "2026-10-08T00:02:41.000Z",
      "xQuery": "八田與一容疑者目撃情報 関東で増"
    },
    {
      "time": "09:40",
      "title": "意識回復の米死刑囚に重い症状",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597956?source=rss",
      "publishedAt": "2026-10-08T00:40:19.000Z",
      "xQuery": "意識回復の米死刑囚に重い症状"
    },
    {
      "time": "08:37",
      "title": "194歳ゾウガメのゲノム解析 研究",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597950?source=rss",
      "publishedAt": "2026-10-07T23:37:15.000Z",
      "xQuery": "194歳ゾウガメのゲノム解析 研究"
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
