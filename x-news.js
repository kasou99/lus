window.LUS_X_NEWS = {
  "updatedAt": "2026-07-13T00:50:46.248Z",
  "items": [
    {
      "time": "07:36",
      "title": "米中央軍 イランに新たな攻撃開始",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587737?source=rss",
      "publishedAt": "2026-07-12T22:36:48.000Z",
      "xQuery": "米中央軍 イランに新たな攻撃開始"
    },
    {
      "time": "07:46",
      "title": "九州～近畿は猛暑続く 熱中症警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587738?source=rss",
      "publishedAt": "2026-07-12T22:46:53.000Z",
      "xQuery": "九州～近畿は猛暑続く 熱中症警戒"
    },
    {
      "time": "07:26",
      "title": "中国 日本大使館幹部呼び出し抗議",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587734?source=rss",
      "publishedAt": "2026-07-12T22:26:24.000Z",
      "xQuery": "中国 日本大使館幹部呼び出し抗議"
    },
    {
      "time": "08:16",
      "title": "東証上場の昭和HD消失? 異常事態",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587740?source=rss",
      "publishedAt": "2026-07-12T23:16:00.000Z",
      "xQuery": "東証上場の昭和HD消失? 異常事態"
    },
    {
      "time": "08:40",
      "title": "パンチくんに寄付金 暑さ対策強化",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587743?source=rss",
      "publishedAt": "2026-07-12T23:40:21.000Z",
      "xQuery": "パンチくんに寄付金 暑さ対策強化"
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
