window.LUS_X_NEWS = {
  "updatedAt": "2026-08-10T22:47:23.969Z",
  "items": [
    {
      "time": "07:26",
      "title": "台風が関東上陸へ 交通乱れに注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591272?source=rss",
      "publishedAt": "2026-08-10T22:26:28.000Z",
      "xQuery": "台風が関東上陸へ 交通乱れに注意"
    },
    {
      "time": "07:22",
      "title": "H3ロケット9号機 打ち上げ成功",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591271?source=rss",
      "publishedAt": "2026-08-10T22:22:08.000Z",
      "xQuery": "H3ロケット9号機 打ち上げ成功"
    },
    {
      "time": "23:47",
      "title": "避難所に幼なじみ 70年ぶりの再会",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591263?source=rss",
      "publishedAt": "2026-08-10T14:47:09.000Z",
      "xQuery": "避難所に幼なじみ 70年ぶりの再会"
    },
    {
      "time": "07:19",
      "title": "コロンビアで地震 110人超死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591270?source=rss",
      "publishedAt": "2026-08-10T22:19:52.000Z",
      "xQuery": "コロンビアで地震 110人超死亡"
    },
    {
      "time": "20:44",
      "title": "中1と小3死亡 遊具があおられ落水",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591245?source=rss",
      "publishedAt": "2026-08-10T11:44:56.000Z",
      "xQuery": "中1と小3死亡 遊具があおられ落水"
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
