window.LUS_X_NEWS = {
  "updatedAt": "2026-08-08T13:22:01.288Z",
  "items": [
    {
      "time": "20:29",
      "title": "沖縄で語り部 被爆体験訴える理由",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591018?source=rss",
      "publishedAt": "2026-08-08T11:29:35.000Z",
      "xQuery": "沖縄で語り部 被爆体験訴える理由"
    },
    {
      "time": "17:34",
      "title": "夏休みに被災 ストレス感じる子も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591001?source=rss",
      "publishedAt": "2026-08-08T08:34:27.000Z",
      "xQuery": "夏休みに被災 ストレス感じる子も"
    },
    {
      "time": "20:56",
      "title": "男性死亡 ひき逃げ疑いで女を逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591021?source=rss",
      "publishedAt": "2026-08-08T11:56:19.000Z",
      "xQuery": "男性死亡 ひき逃げ疑いで女を逮捕"
    },
    {
      "time": "21:46",
      "title": "ブドウ200房窃盗疑い 販売目的か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591025?source=rss",
      "publishedAt": "2026-08-08T12:46:20.000Z",
      "xQuery": "ブドウ200房窃盗疑い 販売目的か"
    },
    {
      "time": "21:19",
      "title": "志茂田景樹さん「要介護5」の今",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591022?source=rss",
      "publishedAt": "2026-08-08T12:19:52.000Z",
      "xQuery": "志茂田景樹さん「要介護5」の今"
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
