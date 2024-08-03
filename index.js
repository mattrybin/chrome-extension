async function sayHello() {
  console.log("Hello")
  let [tab] = await chrome.tabs.query({ active: true })
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      const host = document.createElement("div")
      document.body.appendChild(host)
      const shadowRoot = host.attachShadow({ mode: "open" })

      const sheet = new CSSStyleSheet()
      sheet.replaceSync(`
        :host {
          position: absolute;
          top: calc(50% - 171px);
          right: 18px;
          height: fit-content;
          background: red;
          display: block;
          border: 2px solid blue;
          padding: 10px;
        }
        div {
        background: red;
        }
        `)

      shadowRoot.adoptedStyleSheets = [sheet]

      const fragment = document.createDocumentFragment()
      const wrapper = document.createElement("div")
      wrapper.insertAdjacentHTML("afterbegin", "<div classs='bg-red-500'>Hlloe</div>")

      fragment.append(wrapper)
      shadowRoot.append(fragment)
    }
  })
}
document.getElementById("myButton").addEventListener("click", sayHello)

const para = document.createElement("p")
para.textContent = "We hope you enjoyed the ride."
