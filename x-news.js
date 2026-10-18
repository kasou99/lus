window.LUS_X_NEWS = {
  "updatedAt": "2026-10-18T13:13:48.838Z",
  "items": [
    {
      "time": "19:52",
      "title": "19日大気不安定 激しい雨など注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599277?source=rss",
      "publishedAt": "2026-10-18T10:52:59.000Z",
      "xQuery": "19日大気不安定 激しい雨など注意"
    },
    {
      "time": "20:48",
      "title": "フランス各地 デモ乗じ破壊や略奪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599281?source=rss",
      "publishedAt": "2026-10-18T11:48:11.000Z",
      "xQuery": "フランス各地 デモ乗じ破壊や略奪"
    },
    {
      "time": "21:10",
      "title": "横浜市長選で当確 原沢氏どんな人",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599283?source=rss",
      "publishedAt": "2026-10-18T12:10:18.000Z",
      "xQuery": "横浜市長選で当確 原沢氏どんな人"
    },
    {
      "time": "18:47",
      "title": "漏えい急増は中国製LLM起因 指摘",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599269?source=rss",
      "publishedAt": "2026-10-18T09:47:35.000Z",
      "xQuery": "漏えい急増は中国製LLM起因 指摘"
    },
    {
      "time": "21:15",
      "title": "カーセンサーのサイト 一時停止",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599284?source=rss",
      "publishedAt": "2026-10-18T12:15:22.000Z",
      "xQuery": "カーセンサーのサイト 一時停止"
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
