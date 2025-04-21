// ✅ 請將此網址替換成你實際的 Apps Script Web App URL
const API_URL = "https://script.google.com/macros/s/AKfycbwYXGogGZlvPEQ8zqkRx7xY8Y9aP6ea-sCPvwVMnadew2T7TNV-DqaVOhrihaSmk-q8/exec";

function submitCheck(action) {
  const barcode = document.getElementById("barcode").value.trim();
  const group = document.getElementById("group").value;
  const resultBox = document.getElementById("result");

  if (!barcode || !group) {
    resultBox.innerText = "⚠️ 請完整填寫條碼與組別";
    resultBox.style.color = "red";
    return;
  }

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ barcode, group, action })
  })
  .then(res => res.json())
  .then(data => {
    if (data.status === "success") {
      let msg = `✅ ${action} 成功\n`;
      msg += `👤 姓名：${data.name}\n`;
      msg += `📁 組別：${data.group}\n`;

      if (action === "簽退") {
        msg += `🕒 簽到時間：${data.signedInAt}\n`;
        msg += `🕒 簽退時間：${data.signedOutAt}\n`;
        msg += `⏳ 時數：${data.durationHours} 小時\n`;
      }

      resultBox.innerText = msg;
      resultBox.style.color = "green";

    } else {
      // 如果是組別不一致等錯誤
      resultBox.innerText = `❌ 錯誤：${data.message}`;
      resultBox.style.color = "red";
    }
  })
  .catch(error => {
    resultBox.innerText = `❌ 傳送失敗：${error}`;
    resultBox.style.color = "red";
  });
}
