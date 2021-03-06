document.addEventListener('DOMContentLoaded', function () {
  // Order functionality
  let orderFunc = (function () {
    // Mobile toggles
    let boxToggle = document.querySelector('.order-box-toggle');
    let orderBox = document.querySelector('.order-box');

    function boxClassToggle() {
      this.classList.toggle('open');
      orderBox.classList.toggle('open');
    }
    boxToggle.addEventListener('click', boxClassToggle);

    window.addEventListener('resize', () => {
      boxToggle.classList.remove('open');
      orderBox.classList.remove('open');
    });

    // Calculator
    let orderHolder = {
      childrenQuantity: 0,
      kidsQuantity: 0,
      parentsQuantity: 0,
      childrenTotal: 0,
      kidsTotal: 0,
      parentsTotal: 0,
      multiplier: 200,
      eventCost: 500,
      totalPrice: 0
    }

    // --- Functions
    function _render() {
      for (let [itemKey, itemValue] of Object.entries(orderHolder)) {
        let fields = document.getElementsByClassName(itemKey);
        // console.log(`${itemKey} ${itemValue}`);

        for (let [keyIn, valueIn] of Object.entries(fields)) {
          if (valueIn.tagName === 'INPUT') {
            valueIn.value = itemValue;
          }
          if (valueIn.tagName === 'SPAN') {
            valueIn.innerHTML = itemValue;
          }
        }
      }

      _totalSums();
    };
    function _totalSums() {
      orderHolder.childrenTotal = orderHolder.childrenQuantity * 0;
      orderHolder.kidsTotal = orderHolder.kidsQuantity * orderHolder.multiplier;
      orderHolder.parentsTotal = orderHolder.parentsQuantity * orderHolder.multiplier;
      orderHolder.totalPrice = orderHolder.childrenTotal + orderHolder.kidsTotal + orderHolder.parentsTotal + orderHolder.eventCost;

      document.getElementsByClassName('children-box-total')[0].innerHTML = orderHolder.childrenTotal;
      document.getElementsByClassName('kids-box-total')[0].innerHTML = orderHolder.kidsTotal;
      document.getElementsByClassName('parents-box-total')[0].innerHTML = orderHolder.parentsTotal;

      document.querySelectorAll('.totalPrice').forEach(function(field) {
        field.innerHTML = orderHolder.totalPrice
      });
    }

    // Plus click
    document.querySelectorAll('.plus').forEach(function (button) {
      button.addEventListener('click', function () {
        let input = this.previousElementSibling.name;

        orderHolder[input]++;
        _render();

        let inputs = [].slice.call(document.getElementsByClassName(input));
        for (let input in inputs) {
          if (inputs[input].value > 0) {
            inputs[input].previousElementSibling.classList.remove('inactive');
          }
        }
      })
    });

    // Minus click
    document.querySelectorAll('.minus').forEach(function (button) {
      button.addEventListener('click', function () {
        let input = this.nextElementSibling.name;

        orderHolder[input]--;
        _render();

        let inputs = [].slice.call(document.getElementsByClassName(input));
        for (let input in inputs) {
          if (inputs[input].value == 0) {
            inputs[input].previousElementSibling.classList.add('inactive');
          }
        }
      })
    });

  })();

  function preLoader() {
    $('body').removeClass('loading');
    $('body').addClass('loaded');

    document.addEventListener('transitionend', function () {
      $('.loader').remove();
    })
  }

  // Libs
  OverlayScrollbars(document.getElementsByClassName('scroll-box'), {
    className: 'os-theme-round-light',
    scrollbars: {
      visibility: 'visible',
      clickScrolling: true
    },
    overflowBehavior: {
      x: 'hidden'
    }
  });
});

window.addEventListener('load', (event) => {
  document.body.classList.remove('loading');
  document.body.classList.add('loaded');
});
