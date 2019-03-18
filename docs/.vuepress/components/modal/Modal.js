import "./Modal.less"
;(function(window) {
  function extendDefaults(source, properties) {
    var property
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property]
      }
    }
    return source
  }

  function getTransitionEnd() {
    var el = document.createElement("div")
    if (el.style.WebkitTransition) {
      return "webkitTransitionEnd"
    }
    return "transitionEnd"
  }

  function buildOut() {
    var content, contetnHolder, docFrag
    if (typeof this.options.content === "string") {
      content = this.options.content
    } else {
      content = this.options.content.innerHTML
    }

    docFrag = document.createDocumentFragment()

    this.modal = document.createElement("div")
    this.modal.className = "modal " + this.options.className
    this.modal.style.minWidth = this.options.minWidth + "px"
    this.modal.style.minHeight = this.options.minHeight + "px"

    if (this.options.closeButton) {
      this.closeButton = document.createElement("button")
      this.closeButton.className = "modal-close close-button"
      this.closeButton.innerHTML = "x"
      this.modal.appendChild(this.closeButton)
    }

    if (this.options.overlay) {
      this.overlay = document.createElement("div")
      this.overlay.className = "modal-overlay " + this.options.className
      docFrag.appendChild(this.overlay)
    }

    contetnHolder = document.createElement("div")
    contetnHolder.className = "modal-content"
    contetnHolder.innerHTML = content
    this.modal.appendChild(contetnHolder)

    docFrag.appendChild(this.modal)

    document.body.appendChild(docFrag)
  }

  function initializeEvents() {
    if (this.closeButton) {
      this.closeButton.addEventListener("click", this.close.bind(this))
    }

    if (this.overlay) {
      this.overlay.addEventListener("click", this.close.bind(this))
    }
  }
  window.Modal = function() {
    var defaults = {
      content: "",
      overlay: true,
      minWidth: 560,
      minHeight: 280,
      closeButton: true,
      className: "fade-and-drop"
    }

    this.closeButton = null
    this.modal = null
    this.overlay = null
    if (arguments[0] && typeof arguments[0] === "object") {
      this.options = extendDefaults(defaults, arguments[0])
    }
  }

  window.Modal.prototype.open = function() {
    buildOut.call(this)
    initializeEvents.call(this)

    window.getComputedStyle(this.modal)

    this.modal.className =
      this.modal.className +
      (this.modal.offsetHeight > window.innerHeight
        ? " modal-open modal-anchored"
        : " modal-open")
    this.overlay.className = this.overlay.className + " modal-open"
  }

  window.Modal.prototype.close = function() {
    var $this = this
    this.modal.className = this.modal.className.replace(" modal-open", "")
    this.overlay.className = this.overlay.className.replace(" modal-open", "")

    this.modal.addEventListener("webkitTransitionEnd", function() {
      $this.modal.parentNode.removeChild($this.modal)
    })

    this.overlay.addEventListener("webkitTransitionEnd", function() {
      $this.overlay.parentNode.removeChild($this.overlay)
    })
  }
})(window)
