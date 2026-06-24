window.LUS_X_NEWS = {
  "updatedAt": "2026-06-24T06:52:58.408Z",
  "items": [
    {
      "time": "13:30",
      "title": "婚姻・出生数前年上回る 1-4月期",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585467?source=rss",
      "publishedAt": "2026-06-24T04:30:29.000Z",
      "xQuery": "婚姻・出生数前年上回る 1-4月期"
    },
    {
      "time": "13:02",
      "title": "旧統一の解散命令確定 残る懸念",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585468?source=rss",
      "publishedAt": "2026-06-24T04:02:01.000Z",
      "xQuery": "旧統一の解散命令確定 残る懸念"
    },
    {
      "time": "14:24",
      "title": "キオクシアHD 役員報酬が大幅増",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585480?source=rss",
      "publishedAt": "2026-06-24T05:24:07.000Z",
      "xQuery": "キオクシアHD 役員報酬が大幅増"
    },
    {
      "time": "15:34",
      "title": "小学校火災 失火の容疑で捜査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585485?source=rss",
      "publishedAt": "2026-06-24T06:34:19.000Z",
      "xQuery": "小学校火災 失火の容疑で捜査"
    },
    {
      "time": "13:33",
      "title": "仏で44.3℃ 熱中症などで40人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585475?source=rss",
      "publishedAt": "2026-06-24T04:33:05.000Z",
      "xQuery": "仏で44.3℃ 熱中症などで40人死亡"
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
