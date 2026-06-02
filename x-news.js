window.LUS_X_NEWS = {
  "updatedAt": "2026-06-02T01:22:27.531Z",
  "items": [
    {
      "time": "09:28",
      "title": "台風6号接近 奄美大島が暴風域に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582627?source=rss",
      "publishedAt": "2026-06-02T00:28:27.000Z",
      "xQuery": "台風6号接近 奄美大島が暴風域に"
    },
    {
      "time": "09:51",
      "title": "露がキーウに大規模攻撃 住宅炎上",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582629?source=rss",
      "publishedAt": "2026-06-02T00:51:20.000Z",
      "xQuery": "露がキーウに大規模攻撃 住宅炎上"
    },
    {
      "time": "09:56",
      "title": "自賠責運用益の助成金 不正相次ぐ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582630?source=rss",
      "publishedAt": "2026-06-02T00:56:43.000Z",
      "xQuery": "自賠責運用益の助成金 不正相次ぐ"
    },
    {
      "time": "08:20",
      "title": "母のケアマネ刺したか 男も死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582618?source=rss",
      "publishedAt": "2026-06-01T23:20:31.000Z",
      "xQuery": "母のケアマネ刺したか 男も死亡"
    },
    {
      "time": "08:30",
      "title": "事業所敷地内にクマ 4人がけが",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582621?source=rss",
      "publishedAt": "2026-06-01T23:30:00.000Z",
      "xQuery": "事業所敷地内にクマ 4人がけが"
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
