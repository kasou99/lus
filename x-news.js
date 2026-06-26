window.LUS_X_NEWS = {
  "updatedAt": "2026-06-26T09:16:48.241Z",
  "items": [
    {
      "time": "18:11",
      "title": "関東-九州で災害級の大雨に警戒を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585779?source=rss",
      "publishedAt": "2026-06-26T09:11:45.000Z",
      "xQuery": "関東-九州で災害級の大雨に警戒を"
    },
    {
      "time": "16:12",
      "title": "JR東あす一部の特急や在来線運休",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585754?source=rss",
      "publishedAt": "2026-06-26T07:12:27.000Z",
      "xQuery": "JR東あす一部の特急や在来線運休"
    },
    {
      "time": "18:04",
      "title": "大学生を集団暴行の疑い 6人逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585775?source=rss",
      "publishedAt": "2026-06-26T09:04:31.000Z",
      "xQuery": "大学生を集団暴行の疑い 6人逮捕"
    },
    {
      "time": "17:04",
      "title": "銃弾か 走行中の軽トラ荷台に穴",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585763?source=rss",
      "publishedAt": "2026-06-26T08:04:59.000Z",
      "xQuery": "銃弾か 走行中の軽トラ荷台に穴"
    },
    {
      "time": "17:31",
      "title": "ゴディバジャパン不振 今夏再建へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585770?source=rss",
      "publishedAt": "2026-06-26T08:31:57.000Z",
      "xQuery": "ゴディバジャパン不振 今夏再建へ"
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
