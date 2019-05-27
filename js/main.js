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
      totalPrice: 0
    }
    let multiplier = 200;
    let plusButton = document.querySelectorAll('.plus');
    let minusButton = document.querySelectorAll('.minus');

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
      let priceFieldChildren = document.getElementsByClassName('children-box-total');
      let priceFieldKids = document.getElementsByClassName('kids-box-total');
      let priceFieldParents = document.getElementsByClassName('parents-box-total');
      let priceField = document.querySelectorAll('.totalPrice');

      priceFieldChildren[0].innerHTML = orderHolder.childrenQuantity * 0;
      priceFieldKids[0].innerHTML = orderHolder.kidsQuantity * multiplier;
      priceFieldParents[0].innerHTML = orderHolder.parentsQuantity * multiplier;

      orderHolder.childrenTotal = Number(priceFieldChildren[0].innerHTML);
      orderHolder.kidsTotal = Number(priceFieldKids[0].innerHTML);
      orderHolder.parentsTotal = Number(priceFieldParents[0].innerHTML);

      let price = orderHolder.childrenTotal + orderHolder.kidsTotal + orderHolder.parentsTotal;

      priceField.forEach(function(field) {
        field.innerHTML = price
      });

      orderHolder.totalPrice = price;
    }
    plusButton.forEach(function (button) {
      button.addEventListener('click', function () {
        let input = this.previousElementSibling;
        let inputName = input.name;
        let currentHolderValue = orderHolder[inputName];

        currentHolderValue++;
        orderHolder[inputName] = currentHolderValue;

        _render();
        //input.value = currentHolderValue;

        let minusButton = input.previousElementSibling;
        if (input.value > 0) {
          minusButton.classList.remove('inactive');
        }
      })
    });

    minusButton.forEach(function (button) {
      button.addEventListener('click', function () {
        let input = this.nextElementSibling;
        let inputName = input.name;
        let currentHolderValue = orderHolder[inputName];

        currentHolderValue--;
        orderHolder[inputName] = currentHolderValue;

        _render();
        //input.value = currentHolderValue;

        if (input.value == 0) {
          this.classList.add('inactive');
        }
      })
    });

  })();


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
