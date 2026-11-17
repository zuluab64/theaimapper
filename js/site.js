/* The AIMapper - small scripts: the menu button and the Scorecard. No libraries. */
(function () {
  // ---- Menu button (small screens) ----
  var btn = document.querySelector(".menu-btn");
  var nav = document.getElementById("nav");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // The Escape key closes the menu and returns focus to the button.
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        btn.focus();
      }
    });
  }

  // ---- Scorecard ----
  var form = document.getElementById("scorecard");
  if (!form) return;

  var AREAS = [
    "Customer questions & support",
    "Admin, data entry & paperwork",
    "Marketing & content",
    "Scheduling & bookings",
    "Reporting & spreadsheets",
    "Sales follow-up & quotes",
    "Invoicing & finance",
    null // Other (name your own)
  ];

  // Two quick wins per area. Wording approved by Belinda, COPY.md section 9.
  var WINS = [
    ["Write down the ten questions you answer most, with your best answer to each, in one document.",
     "Use an AI assistant to draft replies from that document, and have a person read each one before it goes out."],
    ["Pick the one form your team retypes most, and list each field and where it ends up.",
     "Test a document-reading tool on ten real examples, and check every result against the original."],
    ["Collect five pieces you have written that sound like you, to use as examples of your voice.",
     "Use AI for first drafts only, and edit every piece yourself before it is published."],
    ["Put your booking link everywhere people ask you for a time: email signature, website and voicemail.",
     "Turn on automatic reminders the day before each appointment."],
    ["List the reports you rebuild by hand each week, and how long each one takes.",
     "Start with the one that takes longest, and set it up to refresh by itself from the source."],
    ["Write your three most common follow-up messages once, and save them as templates.",
     "Use AI to draft each quote from your notes, and check the numbers yourself."],
    ["Set invoices to go out automatically when work is marked done.",
     "Turn on automatic payment reminders for overdue invoices."],
    ["Write down the steps of this task as if you were training a new hire.",
     "Mark each step that never changes. Those are the ones to hand over first."]
  ];

  var BANDS = [
    ["7 to 9: Prime target.", "Fast, high return. Start here."],
    ["4 to 6: Strong candidate.", "Worth a closer look."],
    ["1 to 3: Lower priority for now.", "Revisit later."]
  ];

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function pick(kind, label, i) {
    var html = '<div class="sc-group" role="group" aria-label="' + label + '"><span class="mono" aria-hidden="true">' + label + '</span><div class="pick">';
    for (var v = 1; v <= 3; v++) {
      html += '<label><input type="radio" name="' + kind + i + '" value="' + v + '" data-type="' + kind + '" aria-label="' + label + " " + v + '"><span>' + v + '</span></label>';
    }
    return html + '</div></div>';
  }

  AREAS.forEach(function (name, i) {
    var row = document.createElement("fieldset");
    row.className = "sc-row";
    row.dataset.index = i;
    var title = name
      ? esc(name)
      : '<input type="text" data-name maxlength="60" aria-label="Other (name your own)" placeholder="Other (name your own)">';
    row.innerHTML =
      '<legend class="vh">' + (name ? esc(name) : "Other (name your own)") + '</legend>' +
      '<div class="sc-name"><span class="n">' + (i + 1) + '</span><span>' + title + '</span></div>' +
      '<div class="sc-controls">' +
        pick("time", "Time", i) +
        '<span class="sc-op" aria-hidden="true">&times;</span>' +
        pick("repeat", "Repeat", i) +
        '<span class="sc-op" aria-hidden="true">=</span>' +
        '<output class="sc-score" data-score aria-label="Score">&ndash;</output>' +
      '</div>';
    form.appendChild(row);
  });

  var $ = function (id) { return document.getElementById(id); };
  var topArea = $("topArea"), topScore = $("topScore"), topBand = $("topBand");
  var rowsEl = $("rows"), winsBox = $("winsBox"), winsTitle = $("winsTitle"), winsList = $("wins");
  var outcome = $("outcome"), autoBox = $("autoBox"), autoAns = $("autoAns"), saveBtn = $("saveBtn");

  var today = $("today");
  if (today) today.textContent = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  function value(row, kind) {
    var el = row.querySelector('[data-type="' + kind + '"]:checked');
    return el ? +el.value : 0;
  }
  function rowName(row) {
    var input = row.querySelector("[data-name]");
    if (input) return input.value.trim() || "Other";
    return AREAS[row.dataset.index];
  }
  function bandFor(score) { return BANDS[score >= 7 ? 0 : score >= 4 ? 1 : 2]; }

  var current = { top: null, score: 0 };

  function recalc() {
    var rows = form.querySelectorAll("[data-index]");
    var top = { score: 0, row: null };
    rows.forEach(function (row) {
      var score = value(row, "time") * value(row, "repeat");
      row.querySelector("[data-score]").textContent = score || "–";
      row.classList.remove("is-top");
      if (score > top.score) top = { score: score, row: row };
    });

    var html = "";
    rows.forEach(function (row) {
      var t = value(row, "time"), r = value(row, "repeat"), s = t * r;
      if (!s) return;
      html += '<tr' + (row === top.row ? ' class="is-best"' : '') + '><td>' + esc(rowName(row)) + '</td><td class="c">' + t + '</td><td class="c">' + r +
        '</td><td class="s">' + s + '</td><td class="b"><div class="bar"><i style="width:' + Math.round(s / 9 * 100) + '%"></i></div></td></tr>';
    });
    rowsEl.innerHTML = html;

    if (top.row) {
      top.row.classList.add("is-top");
      var name = rowName(top.row), band = bandFor(top.score), w = WINS[top.row.dataset.index];
      topArea.textContent = name;
      topScore.innerHTML = top.score + "<small>out of 9</small>";
      topBand.innerHTML = "<b>" + band[0] + "</b> " + band[1];
      topBand.hidden = false;
      winsTitle.textContent = "Two quick wins for " + name;
      winsList.innerHTML = "<li><span>1</span>" + esc(w[0]) + "</li><li><span>2</span>" + esc(w[1]) + "</li>";
      winsBox.hidden = false;
      saveBtn.disabled = false;
    } else {
      topArea.textContent = "–";
      topScore.innerHTML = "";
      topBand.hidden = true;
      winsBox.hidden = true;
      saveBtn.disabled = true;
    }
    current = { top: top.row, score: top.score };

    var a = outcome.value.trim();
    autoAns.textContent = a;
    autoBox.hidden = !a;
  }
  form.addEventListener("change", recalc);
  form.addEventListener("input", recalc);
  outcome.addEventListener("input", recalc);
  saveBtn.addEventListener("click", function () { window.print(); });
  recalc();

  // ---- Follow-up step. Sends the visitor's result to Belinda through Formspree. ----
  var ENDPOINT = "https://formspree.io/f/mrpglbov";
  var scForm = $("scForm");
  var msg = $("sendMsg");
  if (!scForm) return;

  scForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var emailEl = $("email");
    var email = (emailEl.value || "").trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      msg.textContent = "Please enter a valid email address.";
      msg.className = "msg is-err";
      emailEl.focus();
      return;
    }
    var lines = [].map.call(form.querySelectorAll("[data-index]"), function (row) {
      return rowName(row) + ": " + (value(row, "time") * value(row, "repeat")) + "/9";
    }).join(" | ");
    scForm.querySelector('[name=top_area]').value = current.top ? rowName(current.top) : "";
    scForm.querySelector('[name=tier]').value = current.top ? bandFor(current.score).join(" ") : "";
    scForm.querySelector('[name=scores]').value = lines;
    scForm.querySelector('[name=goal]').value = outcome.value;

    var send = $("sendBtn");
    send.disabled = true;
    msg.textContent = "Sending…";
    msg.className = "msg";
    fetch(ENDPOINT, { method: "POST", body: new FormData(scForm), headers: { "Accept": "application/json" } })
      .then(function (res) {
        if (!res.ok) throw new Error("bad status");
        msg.textContent = "Sent! We'll follow up on your result.";
        msg.className = "msg is-ok";
        scForm.reset();
      })
      .catch(function () {
        msg.textContent = "Couldn't send just now. Please email belinda_aber@theaimapper.com.";
        msg.className = "msg is-err";
      })
      .then(function () { send.disabled = false; });
  });
})();
