window.LUS_X_NEWS = {
  "updatedAt": "2026-08-12T01:36:41.087Z",
  "items": [
    {
      "time": "10:03",
      "title": "台風15号は熱帯低気圧に 大雨注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591404?source=rss",
      "publishedAt": "2026-08-12T01:03:07.000Z",
      "xQuery": "台風15号は熱帯低気圧に 大雨注意"
    },
    {
      "time": "08:45",
      "title": "ミサイル発射 北朝鮮に小泉氏抗議",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591395?source=rss",
      "publishedAt": "2026-08-11T23:45:00.000Z",
      "xQuery": "ミサイル発射 北朝鮮に小泉氏抗議"
    },
    {
      "time": "07:51",
      "title": "日航機墜落事故41年 犠牲者を悼む",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591387?source=rss",
      "publishedAt": "2026-08-11T22:51:30.000Z",
      "xQuery": "日航機墜落事故41年 犠牲者を悼む"
    },
    {
      "time": "08:19",
      "title": "オフロード走行中か 車滑落し死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591390?source=rss",
      "publishedAt": "2026-08-11T23:19:27.000Z",
      "xQuery": "オフロード走行中か 車滑落し死亡"
    },
    {
      "time": "08:17",
      "title": "「四国新幹線」実現なるか 現状は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591392?source=rss",
      "publishedAt": "2026-08-11T23:17:08.000Z",
      "xQuery": "「四国新幹線」実現なるか 現状は"
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
