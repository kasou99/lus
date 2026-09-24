window.LUS_X_NEWS = {
  "updatedAt": "2026-09-24T12:28:00.726Z",
  "items": [
    {
      "time": "17:04",
      "title": "中小事業者のレジ改修補助へ 政府",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596379?source=rss",
      "publishedAt": "2026-09-24T08:04:43.000Z",
      "xQuery": "中小事業者のレジ改修補助へ 政府"
    },
    {
      "time": "18:52",
      "title": "台風25号 死者11人行方不明3人に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596396?source=rss",
      "publishedAt": "2026-09-24T09:52:18.000Z",
      "xQuery": "台風25号 死者11人行方不明3人に"
    },
    {
      "time": "21:01",
      "title": "養魚場浸水 金魚など10万匹全滅か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596409?source=rss",
      "publishedAt": "2026-09-24T12:01:25.000Z",
      "xQuery": "養魚場浸水 金魚など10万匹全滅か"
    },
    {
      "time": "18:00",
      "title": "匿名投稿で攻撃 林泰輔県議が釈明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596390?source=rss",
      "publishedAt": "2026-09-24T09:00:21.000Z",
      "xQuery": "匿名投稿で攻撃 林泰輔県議が釈明"
    },
    {
      "time": "20:50",
      "title": "獣医師ミスで犬に障害 和解が成立",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596408?source=rss",
      "publishedAt": "2026-09-24T11:50:51.000Z",
      "xQuery": "獣医師ミスで犬に障害 和解が成立"
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
