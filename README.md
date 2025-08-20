# CodeAI build by using google gemini api


# copy
let copyResponse = document.createElement("i");
    copyResponse.classList.add("fa-solid", "fa-copy");
    copyResponse.addEventListener("click", async () => {
      await navigator.clipboard.writeText(answer.innerText);
      copyResponse.style.color = "#033210";
      setTimeout(() => {
        copyResponse.style.color = "transparent";
      }, 1000)
    });
    
  # share
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
    
  # download
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

 # text-to-speech
 
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

  # speech to text
  
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

  # codeFormate & mark code text
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  
  # Math text highlight
    <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
    example:
    if (window.MathJax) {
          MathJax.typesetPromise([answer]);
        }
    Note: [answer] is the text you want to highlight.

# now in hljs
hljs.highlightElement(text => pre code);



















    
