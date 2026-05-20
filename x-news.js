window.LUS_X_NEWS = {
  "updatedAt": "2026-05-20T23:36:28.277Z",
  "items": [
    {
      "time": "08:03",
      "title": "21日 関東～近畿で警報級大雨恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581045?source=rss",
      "publishedAt": "2026-05-20T23:03:32.000Z",
      "xQuery": "21日 関東～近畿で警報級大雨恐れ"
    },
    {
      "time": "07:26",
      "title": "民事裁判の手続き 全面デジタル化",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581038?source=rss",
      "publishedAt": "2026-05-20T22:26:48.000Z",
      "xQuery": "民事裁判の手続き 全面デジタル化"
    },
    {
      "time": "07:30",
      "title": "米NVIDIA純利益3倍超 2～4月期",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581037?source=rss",
      "publishedAt": "2026-05-20T22:30:12.000Z",
      "xQuery": "米NVIDIA純利益3倍超 2～4月期"
    },
    {
      "time": "07:16",
      "title": "無免許で死亡ひき逃げ疑い 逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581034?source=rss",
      "publishedAt": "2026-05-20T22:16:59.000Z",
      "xQuery": "無免許で死亡ひき逃げ疑い 逮捕"
    },
    {
      "time": "07:20",
      "title": "薬の処方ミス 難病発症し患者死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581035?source=rss",
      "publishedAt": "2026-05-20T22:20:52.000Z",
      "xQuery": "薬の処方ミス 難病発症し患者死亡"
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
