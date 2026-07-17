window.LUS_X_NEWS = {
  "updatedAt": "2026-07-17T01:40:34.828Z",
  "items": [
    {
      "time": "09:07",
      "title": "イラン 交渉巡り強硬姿勢崩さず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588224?source=rss",
      "publishedAt": "2026-07-17T00:07:31.000Z",
      "xQuery": "イラン 交渉巡り強硬姿勢崩さず"
    },
    {
      "time": "08:52",
      "title": "関東甲信 今日も局地的な大雨注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588222?source=rss",
      "publishedAt": "2026-07-16T23:52:00.000Z",
      "xQuery": "関東甲信 今日も局地的な大雨注意"
    },
    {
      "time": "10:00",
      "title": "日経平均 一時2700円以上値下がり",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588230?source=rss",
      "publishedAt": "2026-07-17T01:00:34.000Z",
      "xQuery": "日経平均 一時2700円以上値下がり"
    },
    {
      "time": "09:39",
      "title": "タイの公務員試験 5800人超不正か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588227?source=rss",
      "publishedAt": "2026-07-17T00:39:01.000Z",
      "xQuery": "タイの公務員試験 5800人超不正か"
    },
    {
      "time": "09:26",
      "title": "登下校中にクマ 備えにハードル",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588225?source=rss",
      "publishedAt": "2026-07-17T00:26:52.000Z",
      "xQuery": "登下校中にクマ 備えにハードル"
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
