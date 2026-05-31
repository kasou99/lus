window.LUS_X_NEWS = {
  "updatedAt": "2026-05-31T13:01:04.574Z",
  "items": [
    {
      "time": "20:24",
      "title": "台風 沖縄は猛烈な風に厳重警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582454?source=rss",
      "publishedAt": "2026-05-31T11:24:08.000Z",
      "xQuery": "台風 沖縄は猛烈な風に厳重警戒"
    },
    {
      "time": "20:58",
      "title": "新潟県知事選 花角氏が3選確実",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582457?source=rss",
      "publishedAt": "2026-05-31T11:58:36.000Z",
      "xQuery": "新潟県知事選 花角氏が3選確実"
    },
    {
      "time": "21:40",
      "title": "ナフサ100%水準戻る見通し 経産相",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582462?source=rss",
      "publishedAt": "2026-05-31T12:40:48.000Z",
      "xQuery": "ナフサ100%水準戻る見通し 経産相"
    },
    {
      "time": "20:38",
      "title": "バイク無免許で車と衝突 15歳死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582455?source=rss",
      "publishedAt": "2026-05-31T11:38:41.000Z",
      "xQuery": "バイク無免許で車と衝突 15歳死亡"
    },
    {
      "time": "21:41",
      "title": "エアコン買い替え 急ぐ動き強まる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582460?source=rss",
      "publishedAt": "2026-05-31T12:41:37.000Z",
      "xQuery": "エアコン買い替え 急ぐ動き強まる"
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
