(function() {

  function addClass(elt, cls) {
    if(! elt) return;
    if(elt.classList) elt.classList.add(cls);
    else elt.className += ' ' + cls;
  }
  function removeClass(elt, cls) {
    if(! elt) return;
    if(elt.classList) elt.classList.remove(cls);
    else {
      var cls = elt.className.split(/\s+/);
      var lst = cls.filter(function(a) { return a != cls; });
      elt.className = lst.join(' ');
    }
  }

  TooltipMgr = function() {
    this.init();
  }
  TooltipMgr.prototype = {
    init: function() {
      this.addEvents();
    },
    setCurrent: function(tip) {
      if(this.current)
        this.current.hide();
      this.current = tip;
    },
    register(target, content, params) {
      if(! target) return;
      var tip = new Tooltip(target, content, params),
          skip = function(evt) { evt.preventDefault(); evt.stopPropagation(); },
          open = function(evt) { tip.show(); skip(evt); }.bind(this),
          close = function() { tip.hide(); return false; };
      target.addEventListener('click', open);
      //target.addEventListener('mouseout', close);
    },
    addEvents: function() {
      document.addEventListener('mousedown', function(evt) {
        console.log('?');
        this.hide();
      }.bind(this));
    },
    hide: function() {
      this.setCurrent(null);
    }
  }

  window.tooltipMgr = new TooltipMgr();
  window.addTooltip = function(target, content, params) {
    tooltipMgr.register(target, content, params);
  }

  Tooltip = function(target, content, params) {
    this.init(target, content, params);
  }
  Tooltip.prototype = {
    init: function(target, content, params) {
      this.target = target;
      this.content = content;
      if(params) {
        if(params.extClass)
          this.extClass = params.extClass;
      }
    },
    render: function() {
      if(this.elt) return;
      var elt = document.createElement('div');
      elt.addEventListener('mousedown', function(evt) { evt.stopPropagation(); });
      elt.className = 'tooltip fade bottom';
      elt.setAttribute('role', 'tooltip');
      if(this.extClass) elt.className += ' ' + this.extClass;
      var arrow = document.createElement('div');
      arrow.className = 'tooltip-arrow';
      elt.appendChild(arrow);
      var inner = document.createElement('div');
      inner.className = 'tooltip-inner';
      inner.innerHTML = this.content;
      elt.appendChild(inner);
      this.elt = elt;
    },
    show: function() {
      this.render();
      document.body.appendChild(this.elt);
      tooltipMgr.setCurrent(this);
      addClass(this.elt, 'in');
      requestAnimationFrame(this.position.bind(this));
    },
    position: function() {
      var sz = this.elt.getBoundingClientRect();
      var tgt = this.target.getBoundingClientRect();
      this.elt.style.top = '' + (tgt.top + tgt.height + window.pageYOffset) + 'px';
      this.elt.style.left = '' + (tgt.left + tgt.width / 2 - sz.width / 2 + window.pageXOffset) + 'px';
    },
    hide: function() {
      removeClass(this.elt, 'in');
    }
  }

})();
