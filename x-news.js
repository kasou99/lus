window.LUS_X_NEWS = {
  "updatedAt": "2026-06-16T12:41:15.473Z",
  "items": [
    {
      "time": "19:41",
      "title": "大手3行 預金金利0.4%に引き上げ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584498?source=rss",
      "publishedAt": "2026-06-16T10:41:59.000Z",
      "xQuery": "大手3行 預金金利0.4%に引き上げ"
    },
    {
      "time": "21:36",
      "title": "ストーカー加害者に新対策 警視庁",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584509?source=rss",
      "publishedAt": "2026-06-16T12:36:30.000Z",
      "xQuery": "ストーカー加害者に新対策 警視庁"
    },
    {
      "time": "20:49",
      "title": "栃木強殺事件前に目撃 2人目逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584505?source=rss",
      "publishedAt": "2026-06-16T11:49:53.000Z",
      "xQuery": "栃木強殺事件前に目撃 2人目逮捕"
    },
    {
      "time": "20:49",
      "title": "宿泊施設で集団食中毒 患者は97人",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584506?source=rss",
      "publishedAt": "2026-06-16T11:49:53.000Z",
      "xQuery": "宿泊施設で集団食中毒 患者は97人"
    },
    {
      "time": "17:45",
      "title": "苫小牧民報記者 SNSに容疑者名",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584481?source=rss",
      "publishedAt": "2026-06-16T08:45:04.000Z",
      "xQuery": "苫小牧民報記者 SNSに容疑者名"
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
