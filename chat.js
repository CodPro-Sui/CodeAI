document.addEventListener("DOMContentLoaded", () => {
  
  const userINPUT = document.getElementById("askai");
   
  let cancel = document.getElementById("stop");
  
  
  /*userINPUT.addEventListener("input", () => {
    
  });*/
  
  
  
  
  let abortController;
  let stopTyping = false;
  
  function stopGenerate() {
    if (abortController) abortController.abort();
    stopTyping = true;
  }
  
  //bars toggle
  let bar = document.getElementById("bar");
  let userDetails = document.querySelector(".userDetails");
  let un = document.getElementById("un");
  let um = document.getElementById("um");
  let keyOfQ = document.getElementById("keyOfQ");
  setInterval(() =>{
    un.innerHTML = localStorage.getItem("name") || "";
um.innerHTML = localStorage.getItem("email") || "";
  },1000);
  if (!(localStorage.getItem("keyOfQ"))) {
    localStorage.setItem("keyOfQ", userId());
  }
  keyOfQ.innerHTML = localStorage.getItem("keyOfQ");
  
  
  
  let isHide = true;
  bar.innerHTML = `<i class="fa-solid fa-bars-staggered"></i>`;
  let idOfUser = document.querySelector("#idOfUser");
  let hisTag = document.querySelector(".hisTag");
  
  keyOfQ.addEventListener("click", () => {
    navigator.clipboard.writeText(keyOfQ.innerHTML).then(() => {
      hisTag.style.border = "1px solid #1AA86F";
      setTimeout(() => {
        hisTag.style.border = "1px solid #B3B3B35E";
      }, 1000)
    }).catch(() => {
      hisTag.style.border = "1px solid red";
    })
  })
  
  bar.addEventListener("click", () => {
    if (isHide) {
      userDetails.style.display = "block";
      idOfUser.style.display = "block";
      userDetails.appendChild(idOfUser);
      hisTag.style.border = "1px solid #B3B3B35E";
      //idOfUser.style.position = "absolute";
      bar.style.transition = ".2s";
      bar.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    } else {
      userDetails.style.display = "none";
      idOfUser.style.display = "none";
      bar.style.transition = ".2s";
      bar.innerHTML = `<i class="fa-solid fa-bars-staggered"></i>`;
    }
    isHide = !isHide;
  });
  
  //send messages for ai
  const send = document.getElementById("send");
  
  setInterval(() => {
    if (userINPUT.value === "") {
      send.disabled = true;
      send.style.color = "#55555554";
    }
    if(!localStorage.getItem("name") || !localStorage.getItem("email")){
      document.querySelector(".dashboardAi").style.display = "none";
      document.querySelector(".signUp").style.display = "flex";
      
    }else{
      document.querySelector(".dashboardAi").style.display = "grid";
document.querySelector(".signUp").style.display = "none";
    }
  }, 1000);
  
  
  const mic = document.getElementById("mic");
  mic.addEventListener("click", () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("not support!");
      return;
    }
    let recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    
    recognition.onresult = (e) => {
      userINPUT.value += " " + e.results[0][0].transcript;
      if (userINPUT.value !== "") {
        send.disabled = false;
        send.style.color = "#2E323B";
      } else {
        send.disabled = true;
      }
      
    }
    recognition.onerror = (e) => {
      console.error("recognition failed" + e.error)
    }
    recognition.start();
  })
  
  
  userINPUT.addEventListener("input", () => {
    const val = userINPUT.value.trim();
    userINPUT.style.height = "auto";
    userINPUT.style.height = userINPUT.scrollHeight + "px";
    send.style.display = "inline-block";
    if (val === "") {
      mic.style.display = "inline-block";
      send.style.color = "#55555554";
      send.disabled = true;
    } else {
      mic.style.display = "none";
      send.style.color = "#2E323B";
      send.disabled = false;
    }
  })
  
  //display conversation 
  const messages = document.querySelector(".messages");
  let attention = document.querySelector(".attention");
  
  
  
  
  const API_KEY = "AIzaSyDBXZbA-bJ8WH0vXRyHb8zWtjHhg96OpVo";

  async function response(txt) {
    abortController = new AbortController();
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
    const payload = {
      contents: [
      {
        parts: [{ text: txt }]
      }]
    };
    
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
      signal: abortController.signal
    });
    
    const data = await res.json();
    return data.candidates[0].content.parts[0].text
  }
  
  
  function typeWriter(element, text, speed = 0, callback) {
    let i = 0;
    stopTyping = false;
    
    function typing() {
      if (stopTyping) return;
      if (i < text.length) {
        element.innerHTML = marked.parse(autoFormatCode(text.substring(0, i + 1)));
        i += 8;
        
        element.scrollIntoView({ behavior: "smooth", block: "end" });
        setTimeout(typing, speed);
      } else if (callback) {
        callback();
        userINPUT.readOnly = false;
        send.style.display = "inline-block";
        cancel.style.display = "none";
      }
    }
    typing();
  }
  
  function autoFormatCode(text) {
    text = text.replace(/^## (.*)$/gm, "<h2>$1</h2>").replace(/^### (.*)$/gm, "<h3>$1</h3>").replace(/^#### (.*)$/gm, "<h4>$1</h4>").replace(/^##### (.*)$/gm, "<h5>$1</h5>").replace(/^###### (.*)$/gm, "<h6>$1</h6>").replace(/^# (.*)$/gm, "<h1>$1</h1>");
    return text
      .split("\n\n")
      .map(block => {
        const codePattern = /[{};=<>]|^\s*(def|fn|function|class|for|if|else|while|let|const|print|#include|public|private)/m;
        if (codePattern.test(block)) {
          return `\`\`\`\n${block.trim()}\n\`\`\``;
        }
        return block.trim();
      })
      .join("\n\n");
  }
  
  
  
  cancel.style.display = "none";
  var lastQ = "";
  
  function out() {
    userINPUT.readOnly = true;
    attention.style.display = "none";
    messages.style.display = "block";
    cancel.style.display = "inline-block";
    let questionDiv = document.createElement("div");
    questionDiv.classList.add("qdiv");
    let query = document.createElement("p");
    let task = userINPUT.value.trim() || lastQ;
    lastQ = task;
    if (!task) return;
    query.innerText = task;
    userINPUT.value = "";
    userINPUT.style.height = "auto";
    mic.style.display = "inline-block";
    send.style.display = "none";
    
    let answerDiv = document.createElement("div");
    let answer = document.createElement("p");
    answerDiv.classList.add("adiv");
    answer.classList.add("answer");
    
    
    response(task).then(d => {
      
      let formattedMarkdown = autoFormatCode(d);
      let plainText = formattedMarkdown; // before converting to HTML
      
      answer.innerHTML = "";
      typeWriter(answer, plainText, 20, () => {
        answer.innerHTML = marked.parse(formattedMarkdown);
        answer.querySelectorAll("pre code").forEach(block => {
          
          hljs.highlightElement(block);
          let wrapper = document.createElement("div");
          wrapper.style.position = "relative";
          
          let cpBTN = document.createElement("button");
          cpBTN.innerHTML = `<i class="fa-solid fa-copy"></i>`;
          cpBTN.className = "mycpc";
          cpBTN.style.position = "absolute";
          cpBTN.style.top = "5px";
          cpBTN.style.right = "5px";
          
          
          cpBTN.onclick = async () => {
            try {
              await navigator.clipboard.writeText(block.innerText);
              cpBTN.innerHTML = `<i class="fa-solid fa-clipboard"></i>`;
              setTimeout(() => {
                cpBTN.innerHTML = `<i class="fa-solid fa-copy"></i>`;
              }, 1000)
            } catch (err) {
              alert("Unable to copy: " + err.message);
            }
          };
          
          block.parentElement.insertBefore(wrapper, block);
          wrapper.appendChild(block);
          wrapper.appendChild(cpBTN);
        })
        
        if (window.MathJax) {
          MathJax.typesetPromise([answer]);
        }
        ttool(answerDiv, answer, questionDiv, query);
        
      });
    }).catch(updateConnectionState);
    
    
    send.style.color = "#55555554";
    query.classList.add("query");
    questionDiv.appendChild(query);
    messages.appendChild(questionDiv);
    answerDiv.appendChild(answer);
    messages.appendChild(answerDiv);
  }
  send.addEventListener("click", out);
  
  //end send
  
  cancel.addEventListener("click", () => {
    cancel.style.display = "none";
    send.style.display = "inline-block";
    send.disabled = true;
    stopGenerate();
  })
  
  //check online
  function updateConnectionState() {
    let oldInfo = document.querySelector("#info");
    if (oldInfo) {
      oldInfo.remove()
    }
    
    let informState = document.createElement("div");
    informState.id = "info";
    informState.innerHTML = `<i class="fa-solid fa-server"></i> Unable to receive data from server!`;
    messages.appendChild(informState);
    cancel.style.display = "none";
    send.style.display = "inline-block";
    userINPUT.readOnly = false;
  }
  
  
  //generate id 
  function userId() {
    let cellData = new Uint8Array(8);
    crypto.getRandomValues(cellData);
    return Array.from(cellData, b => b.toString(16).padStart(2, "0")).join("");
  }
  
  
  function ttool(answerDiv, answer, questionDiv, query) {
    let toolPage = document.createElement("div");
    toolPage.id = "toolPage";
    
    //like
    let like = document.createElement("i");
    like.classList.add("fa-solid", "fa-thumbs-up");
    
    //dislike
    let dislike = document.createElement("i");
    dislike.classList.add("fa-solid", "fa-thumbs-down");
    
    like.addEventListener("click", () => {
      like.style.color = "#033210";
      dislike.style.color = "transparent";
    })
    dislike.addEventListener("click", () => {
      dislike.style.color = "#033210";
      like.style.color = "transparent";
    })
    
    //copy
    let copyResponse = document.createElement("i");
    copyResponse.classList.add("fa-solid", "fa-copy");
    copyResponse.addEventListener("click", async () => {
      await navigator.clipboard.writeText(answer.innerText);
      copyResponse.style.color = "#033210";
      setTimeout(() => {
        copyResponse.style.color = "transparent";
      }, 1000)
    });
    
    //share
    let share = document.createElement("i");
    share.classList.add("fa-solid", "fa-share-nodes");
    share.addEventListener("click", () => {
      if ("share" in navigator) {
        navigator.share({
          title: "AI txt",
          text: answer.innerText
        }).then(() => {
          share.style.color = "#033210";
          setTimeout(() => {
            share.style.color = "transparent";
          }, 1000)
        }).catch(() => {
          share.style.color = "#DE183A";
          setTimeout(() => {
            share.style.color = "transparent";
          }, 1000)
        })
      } else {
        navigator.vibrate(500);
        alert("Your browser don't support share feature!");
      }
    })
    
    //download
    let download = document.createElement("i");
    download.classList.add("fa-solid", "fa-download");
    download.addEventListener("click", () => {
      const blob = new Blob([answer.innerText], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "AI.txt";
      a.click();
      URL.revokeObjectURL(url);
      download.style.color = "#033210";
      setTimeout(() => {
        download.style.color = "transparent";
      }, 1000)
    })
    
    // regenerate
    let regenerate = document.createElement("i");
    regenerate.classList.add("fa-solid", "fa-arrows-rotate");
    regenerate.addEventListener("click", () => {
      messages.removeChild(answerDiv);
      messages.removeChild(questionDiv);
      userINPUT.value = query.innerText;
      out();
      speechSynthesis.cancel();
    });
    
    // speaking
    let speaking = document.createElement("i");
    speaking.classList.add("fa-solid", "fa-volume-high");
    let isSpeak = false;
    speaking.addEventListener("click", () => {
      if ("SpeechSynthesisUtterance" in window) {
        if (!isSpeak) {
          let spk = new SpeechSynthesisUtterance(answer.innerText);
          speechSynthesis.speak(spk);
          isSpeak = true;
          spk.onend = () => { isSpeak = false;
            speaking.style.color = "transparent";
          };
          spk.onerror = () => { isSpeak = false };
          speaking.style.color = "#033210";
        } else {
          speechSynthesis.cancel();
          isSpeak = false;
          speaking.style.color = "transparent";
        }
      } else {
        navigator.vibrate(600);
        alert("Your browser doesn't support speaking");
      }
    })
    
    toolPage.append(like, dislike, copyResponse, share, download, regenerate, speaking);
    answerDiv.appendChild(toolPage);
    
  }
  
  
  
})
