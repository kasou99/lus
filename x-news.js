window.LUS_X_NEWS = {
  "updatedAt": "2026-10-12T05:25:27.146Z",
  "items": [
    {
      "time": "13:36",
      "title": "1週間天気 高温傾向が続く見込み",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598493?source=rss",
      "publishedAt": "2026-10-12T04:36:28.000Z",
      "xQuery": "1週間天気 高温傾向が続く見込み"
    },
    {
      "time": "12:14",
      "title": "サウジの空港 フーシ派が再び攻撃",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598483?source=rss",
      "publishedAt": "2026-10-12T03:14:10.000Z",
      "xQuery": "サウジの空港 フーシ派が再び攻撃"
    },
    {
      "time": "13:12",
      "title": "バイクと衝突し車が炎上 1人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598488?source=rss",
      "publishedAt": "2026-10-12T04:12:54.000Z",
      "xQuery": "バイクと衝突し車が炎上 1人死亡"
    },
    {
      "time": "13:14",
      "title": "住宅で女児死亡 外傷なく死因不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598490?source=rss",
      "publishedAt": "2026-10-12T04:14:29.000Z",
      "xQuery": "住宅で女児死亡 外傷なく死因不明"
    },
    {
      "time": "11:48",
      "title": "キャンプ場の池に高齢男性 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598479?source=rss",
      "publishedAt": "2026-10-12T02:48:20.000Z",
      "xQuery": "キャンプ場の池に高齢男性 死亡"
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
