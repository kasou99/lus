window.LUS_X_NEWS = {
  "updatedAt": "2026-11-13T06:40:31.311Z",
  "items": [
    {
      "time": "14:37",
      "title": "政府 ロシアに首脳会談を打診",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602418?source=rss",
      "publishedAt": "2026-11-13T05:37:03.000Z",
      "xQuery": "政府 ロシアに首脳会談を打診"
    },
    {
      "time": "12:57",
      "title": "イラン側 バーレーンの米施設攻撃",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602406?source=rss",
      "publishedAt": "2026-11-13T03:57:37.000Z",
      "xQuery": "イラン側 バーレーンの米施設攻撃"
    },
    {
      "time": "14:43",
      "title": "クレカ不正利用 新たな手口に注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602420?source=rss",
      "publishedAt": "2026-11-13T05:43:47.000Z",
      "xQuery": "クレカ不正利用 新たな手口に注意"
    },
    {
      "time": "15:30",
      "title": "男児死亡のゼリー 包装に注意書き",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602423?source=rss",
      "publishedAt": "2026-11-13T06:30:33.000Z",
      "xQuery": "男児死亡のゼリー 包装に注意書き"
    },
    {
      "time": "14:19",
      "title": "ボビー被告 不同意性交を認める",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602416?source=rss",
      "publishedAt": "2026-11-13T05:19:30.000Z",
      "xQuery": "ボビー被告 不同意性交を認める"
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
