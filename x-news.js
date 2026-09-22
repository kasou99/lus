window.LUS_X_NEWS = {
  "updatedAt": "2026-09-22T13:18:06.742Z",
  "items": [
    {
      "time": "21:24",
      "title": "今年3度目の大雨被害 千葉に爪痕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596183?source=rss",
      "publishedAt": "2026-09-22T12:24:25.000Z",
      "xQuery": "今年3度目の大雨被害 千葉に爪痕"
    },
    {
      "time": "21:38",
      "title": "AI搭載の人型ロボ 防衛活用研究へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596184?source=rss",
      "publishedAt": "2026-09-22T12:38:00.000Z",
      "xQuery": "AI搭載の人型ロボ 防衛活用研究へ"
    },
    {
      "time": "19:54",
      "title": "事故巻き添えで3歳死亡 両親心境",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596173?source=rss",
      "publishedAt": "2026-09-22T10:54:20.000Z",
      "xQuery": "事故巻き添えで3歳死亡 両親心境"
    },
    {
      "time": "21:18",
      "title": "SUPに2人乗りし落ちたか 1人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596181?source=rss",
      "publishedAt": "2026-09-22T12:18:12.000Z",
      "xQuery": "SUPに2人乗りし落ちたか 1人死亡"
    },
    {
      "time": "21:01",
      "title": "AIで鉄道運行支援 日立が本格展開",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596176?source=rss",
      "publishedAt": "2026-09-22T12:01:07.000Z",
      "xQuery": "AIで鉄道運行支援 日立が本格展開"
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
