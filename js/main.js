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
      let priceField = document.getElementsByClassName('totalPrice');

      priceFieldChildren[0].innerHTML = orderHolder.childrenQuantity * 0;
      priceFieldKids[0].innerHTML = orderHolder.kidsQuantity * multiplier;
      priceFieldParents[0].innerHTML = orderHolder.parentsQuantity * multiplier;


      let test = orderHolder.kidsQuantity * multiplier; // Number

      orderHolder.childrenTotal = Number(priceFieldChildren[0].innerHTML);
      orderHolder.kidsTotal = Number(priceFieldKids[0].innerHTML);
      orderHolder.parentsTotal = Number(priceFieldParents[0].innerHTML);

      let price = orderHolder.childrenTotal + orderHolder.kidsTotal + orderHolder.parentsTotal;

      priceField = price;
      orderHolder.totalPrice = price;
      //console.log(typeof orderHolder.parentsTotal);



      /*let priceFieldChildren = document.getElementsByClassName('children-box-total')[0].innerHTML;
      let priceFieldKids = document.getElementsByClassName('kids-box-total')[0].innerHTML;
      let priceFieldParents = document.getElementsByClassName('parents-box-total')[0].innerHTML;
      let priceField = document.getElementsByClassName('totalPrice')[0].innerHTML;

      priceFieldChildren = orderHolder.childrenQuantity * multiplier;
      priceFieldKids = orderHolder.kidsQuantity * multiplier;
      priceFieldParents = orderHolder.parentsQuantity * multiplier;

      /*console.log(priceFieldChildren);
      console.log(priceFieldKids);
      console.log(priceFieldParents);
      console.log(priceField);

      // let childrenTotal = totalPriceChildren[0].innerHTML = orderHolder.childrenQuantity * multiplier;
      // let kidsTotal = totalPriceKids[0].innerHTML = orderHolder.kidsQuantity * multiplier;
      // let parentsTotal = totalPriceParents[0].innerHTML = orderHolder.parentsQuantity * multiplier;

      console.log(orderHolder.childrenQuantity);
      console.log(orderHolder.kidsQuantity);
      console.log(orderHolder.parentsQuantity);

      let childrenTotal = orderHolder.childrenQuantity * multiplier;
      let kidsTotal = orderHolder.kidsQuantity * multiplier;
      let parentsTotal = orderHolder.parentsQuantity * multiplier;
      let price = childrenTotal + kidsTotal + parentsTotal;

      console.log(kidsTotal);
      console.log(priceFieldKids);

      priceFieldChildren = childrenTotal;
      priceFieldKids = kidsTotal;
      priceFieldParents = parentsTotal;

      console.log(priceFieldKids);

      /*console.log(priceFieldChildren);
      console.log(priceFieldKids);
      console.log(priceFieldParents);
      console.log(priceField);*/
/*

      priceField = price;
      orderHolder.totalPrice = price;

      /*console.log(childrenTotal);
      console.log(multiplier);
      /*console.log(kidsTotal);
      console.log(parentsTotal);*/

      /*orderHolder.childrenTotal = childrenTotal;
      orderHolder.kidsTotal = kidsTotal;
      orderHolder.parentsTotal = parentsTotal;*/

      // Set total price
      /*orderHolder.totalPrice = orderHolder.childrenTotal + orderHolder.kidsTotal + orderHolder.parentsTotal;
      totalPrice[0].innerHTML = orderHolder.totalPrice;
      //console.log(orderHolder.totalPrice);
      /*let total = totalPrice[0].innerHTML = orderHolder.childrenTotal + orderHolder.kidsTotal + orderHolder.parentsTotal;

      orderHolder.totalPrice = total;*/
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
